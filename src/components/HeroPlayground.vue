<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '../data/profile'

const playground = profile.playground
const canvasRef = ref(null)
let context
let frameId = null
let resizeObserver
let motionQuery
let nodes = []
let width = 0
let height = 0
let previousTime = 0
let touchHideTimer = null
const touchListenerOptions = { passive: true }
const pointer = { x: -1000, y: -1000 }

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas || !context) return
  const rect = canvas.parentElement.getBoundingClientRect()
  const oldWidth = width
  const oldHeight = height
  width = rect.width
  height = rect.height
  const scale = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  context.setTransform(scale, 0, 0, scale, 0, 0)
  if (oldWidth && oldHeight) {
    nodes.forEach(node => {
      node.x *= width / oldWidth
      node.y *= height / oldHeight
    })
  }
  resetPointer()
  draw(0)
}

function updatePointer(event) {
  if (event.pointerType === 'touch') return
  clearTimeout(touchHideTimer)
  touchHideTimer = null
  setPointer(event.clientX, event.clientY)
}

function setPointer(clientX, clientY) {
  const rect = canvasRef.value.getBoundingClientRect()
  pointer.x = clientX - rect.left
  pointer.y = clientY - rect.top
  if (motionQuery?.matches) draw(0)
}

function resetPointer() {
  clearTimeout(touchHideTimer)
  touchHideTimer = null
  pointer.x = -1000
  pointer.y = -1000
  if (motionQuery?.matches) draw(0)
}

function leavePointer(event) {
  // Touch uses its own delayed dismissal, including pointercancel during a pan.
  if (event.pointerType !== 'touch') resetPointer()
}

function updateTouch(event) {
  const touch = event.touches[0]
  if (!touch) return
  clearTimeout(touchHideTimer)
  touchHideTimer = null
  setPointer(touch.clientX, touch.clientY)
}

function endTouch(event) {
  if (event.touches.length) {
    updateTouch(event)
    return
  }
  clearTimeout(touchHideTimer)
  touchHideTimer = setTimeout(resetPointer, 1000)
}

function draw(step) {
  if (!context) return
  context.clearRect(0, 0, width, height)
  context.strokeStyle = 'rgba(30, 41, 59, 0.45)'
  context.lineWidth = 1
  for (let x = 0; x < width; x += 30) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()
  }
  for (let y = 0; y < height; y += 30) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    node.x += node.vx * step
    node.y += node.vy * step
    if (node.x < 8 || node.x > width - 8) node.vx *= -1
    if (node.y < 8 || node.y > height - 8) node.vy *= -1
    node.x = Math.max(0, Math.min(width, node.x))
    node.y = Math.max(0, Math.min(height, node.y))
    for (let j = i + 1; j < nodes.length; j++) {
      const next = nodes[j]
      const distance = Math.hypot(node.x - next.x, node.y - next.y)
      if (distance < 60) {
        context.strokeStyle = `rgba(6, 182, 212, ${1 - distance / 60})`
        context.beginPath()
        context.moveTo(node.x, node.y)
        context.lineTo(next.x, next.y)
        context.stroke()
      }
    }
    context.fillStyle = '#06b6d4'
    context.beginPath()
    context.arc(node.x, node.y, 2.8, 0, Math.PI * 2)
    context.fill()
  }
  if (pointer.x < 0) return
  let clusterCount = 0
  nodes.forEach(node => {
    if (Math.hypot(node.x - pointer.x, node.y - pointer.y) < 80) {
      clusterCount++
      context.strokeStyle = 'rgba(245, 158, 11, 0.45)'
      context.beginPath()
      context.moveTo(node.x, node.y)
      context.lineTo(pointer.x, pointer.y)
      context.stroke()
    }
  })
  context.strokeStyle = 'rgba(245, 158, 11, 0.6)'
  context.fillStyle = 'rgba(245, 158, 11, 0.12)'
  context.beginPath()
  context.arc(pointer.x, pointer.y, 80, 0, Math.PI * 2)
  context.fill()
  context.stroke()
  context.fillStyle = '#f59e0b'
  context.beginPath()
  context.arc(pointer.x, pointer.y, 17, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#06090F'
  context.font = 'bold 11px "JetBrains Mono", monospace'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(String(clusterCount), pointer.x, pointer.y)
}

function animate(time) {
  frameId = null
  const step = previousTime ? Math.min((time - previousTime) / (1000 / 60), 2) : 1
  previousTime = time
  draw(step)
  frameId = requestAnimationFrame(animate)
}

function syncAnimation() {
  if (frameId !== null) cancelAnimationFrame(frameId)
  frameId = null
  previousTime = 0
  if (document.hidden || motionQuery?.matches) draw(0)
  else frameId = requestAnimationFrame(animate)
}

onMounted(() => {
  context = canvasRef.value?.getContext('2d')
  if (!context) return
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  resizeCanvas()
  nodes = Array.from({ length: 55 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
  }))
  window.addEventListener('resize', resizeCanvas)
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvasRef.value.parentElement)
  }
  document.addEventListener('visibilitychange', syncAnimation)
  motionQuery.addEventListener('change', syncAnimation)
  canvasRef.value.addEventListener('touchstart', updateTouch, touchListenerOptions)
  canvasRef.value.addEventListener('touchmove', updateTouch, touchListenerOptions)
  canvasRef.value.addEventListener('touchend', endTouch, touchListenerOptions)
  canvasRef.value.addEventListener('touchcancel', endTouch, touchListenerOptions)
  syncAnimation()
})
onBeforeUnmount(() => {
  clearTimeout(touchHideTimer)
  touchHideTimer = null
  canvasRef.value?.removeEventListener('touchstart', updateTouch, touchListenerOptions)
  canvasRef.value?.removeEventListener('touchmove', updateTouch, touchListenerOptions)
  canvasRef.value?.removeEventListener('touchend', endTouch, touchListenerOptions)
  canvasRef.value?.removeEventListener('touchcancel', endTouch, touchListenerOptions)
  if (frameId !== null) cancelAnimationFrame(frameId)
  frameId = null
  resizeObserver?.disconnect()
  window.removeEventListener('resize', resizeCanvas)
  document.removeEventListener('visibilitychange', syncAnimation)
  motionQuery?.removeEventListener('change', syncAnimation)
  nodes = []
  context = null
})
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
      <div class="flex min-w-0 items-center gap-1.5" aria-hidden="true">
        <span class="size-2.5 shrink-0 rounded-full bg-rose-500" />
        <span class="size-2.5 shrink-0 rounded-full bg-amber-500" />
        <span class="size-2.5 shrink-0 rounded-full bg-emerald-500" />
        <span class="ml-2 truncate font-mono text-xs text-slate-400">{{ playground.fileName }}</span>
      </div>
      <span class="rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] text-cyan-400">{{ playground.badge }}</span>
    </div>
    <div class="relative h-64 cursor-crosshair bg-[#05080F]">
      <canvas ref="canvasRef" id="gisCanvas" class="block h-full w-full touch-pan-y" role="img" aria-label="Mô phỏng WebGIS: 55 điểm tọa độ chuyển động; di chuột hoặc chạm tay để gom cụm và xem số điểm trong bán kính."
        @pointermove="updatePointer" @pointerleave="leavePointer" @pointercancel="leavePointer"
      />
      <div class="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
        <span v-for="tag in playground.tags" :key="tag.label" class="rounded border border-slate-700 bg-slate-900/90 px-2 py-0.5 font-mono text-[11px]" :class="tag.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'">{{ tag.label }}</span>
      </div>
      <div class="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 font-mono text-[11px] text-slate-300 backdrop-blur sm:text-xs">
        <span class="min-w-0 truncate" title="Di chuột hoặc chạm tay để gom cụm tọa độ">Di chuột hoặc chạm tay để gom cụm tọa độ</span>
        <span class="shrink-0 font-bold text-emerald-400">{{ playground.fps }}</span>
      </div>
    </div>
    <div class="space-y-2 border-t border-slate-800 bg-slate-950/95 p-4 font-mono text-xs">
      <div v-for="spec in playground.specs" :key="spec.label" class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-slate-400">
        <span>{{ spec.label }}</span>
        <span class="font-semibold" :class="spec.color === 'emerald' ? 'text-emerald-400' : spec.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'">{{ spec.value }}</span>
      </div>
    </div>
  </div>
</template>
