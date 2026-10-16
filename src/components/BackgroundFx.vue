<script setup>
import { computed } from 'vue'
import { useScroll } from '../composables/useScroll'

const { scrollY } = useScroll()
const reduceMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

const offset1 = computed(() => (reduceMotion ? 'translateY(0)' : `translateY(${scrollY.value * -0.05}px)`))
const offset2 = computed(() => (reduceMotion ? 'translateY(0)' : `translateY(${scrollY.value * -0.08}px)`))
</script>

<template>
  <!-- AMBIENT GLOW -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
    <div
      class="absolute -top-40 left-1/4 w-[550px] h-[550px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[140px] transition-transform duration-100 ease-out"
      :style="{ transform: offset1 }"
    />
    <div
      class="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[140px] transition-transform duration-100 ease-out"
      :style="{ transform: offset2 }"
    />
  </div>
</template>
