<script setup>
import { computed } from 'vue'
import { resolveProjectUrl } from '../utils/portfolio'

const props = defineProps({
  links: { type: Array, required: true },
  compact: { type: Boolean, default: false },
  heading: { type: String, default: '📌 Một số sản phẩm minh họa tiêu biểu:' },
  showHeading: { type: Boolean, default: true },
})
const gridLayout = computed(() => props.links.length >= 4 || props.links.some(link => link.desktopUrl || link.mobileUrl))
const productCta = link => ({ demo: 'Mở demo', site: 'Xem website', github: 'Xem mã nguồn' })[link.kind] ?? 'Xem'
</script>

<template>
  <div v-if="links.length" class="w-full min-w-0 space-y-2.5">
    <p v-if="showHeading && !compact" class="font-mono text-xs text-slate-500 dark:text-slate-400">{{ heading }}</p>
    <ul class="gap-2" :class="gridLayout ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-wrap'" role="list">
      <li v-for="link in links" :key="link.id" class="min-w-0 max-w-full">
        <div v-if="link.desktopUrl || link.mobileUrl" class="flex h-full flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
          <span class="min-w-0 text-xs font-semibold">{{ link.label }}</span>
          <div class="flex shrink-0 gap-1 font-mono text-[11px]">
            <a :href="resolveProjectUrl(link.url)" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[38px] min-w-[38px] items-center justify-center rounded bg-cyan-500 px-2 py-1 font-bold text-slate-950 hover:bg-cyan-400" :aria-label="`${productCta(link)} (Auto): ${link.label}`">Auto ↗</a>
            <a v-if="link.desktopUrl" :href="resolveProjectUrl(link.desktopUrl)" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[38px] min-w-[38px] items-center justify-center rounded border border-slate-300 px-2 py-1 hover:border-amber-500 dark:border-slate-700" :aria-label="`${productCta(link)} (PC): ${link.label}`">PC</a>
            <a v-if="link.mobileUrl" :href="resolveProjectUrl(link.mobileUrl)" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[38px] min-w-[38px] items-center justify-center rounded border border-slate-300 px-2 py-1 hover:border-amber-500 dark:border-slate-700" :aria-label="`${productCta(link)} (Mobile): ${link.label}`">MB</a>
          </div>
        </div>
        <a
          v-else :href="resolveProjectUrl(link.url)" target="_blank" rel="noopener noreferrer"
          class="inline-flex h-full min-h-[38px] max-w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-colors"
          :class="[
            links.length >= 4 ? 'w-full' : '',
            link.id === 'omo-gieo-trieu-mam-xanh' ? 'border-amber-500 bg-amber-500 font-bold text-slate-950 hover:bg-amber-600' :
            link.id === 'short-bizfly' ? 'border-purple-600 bg-purple-600 font-bold text-white hover:bg-purple-700' :
            'border-slate-200 bg-white text-slate-700 hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
          ]"
          :aria-label="`${productCta(link)}: ${link.label}`" :title="link.description"
        ><span class="min-w-0 break-words">{{ link.label }}</span><span class="shrink-0" aria-hidden="true">↗</span></a>
      </li>
    </ul>
  </div>
</template>
