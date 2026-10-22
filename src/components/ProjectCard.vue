<script setup>
import { computed, ref, watch } from 'vue'
import ProductLinks from './ProductLinks.vue'
import ProjectScreenshots from './ProjectScreenshots.vue'

const props = defineProps({
  group: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  collapsibleOnMobile: { type: Boolean, default: false },
})

const isExpandedMobile = ref(false)

watch(() => props.collapsibleOnMobile, val => {
  if (!val) isExpandedMobile.value = false
})

const category = computed(() => props.group.filterCategory)
const badgeClass = computed(() => ({
  webgis: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
  webapp: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  adtech: 'border-purple-500/20 bg-purple-500/10 text-purple-700 dark:text-purple-400',
  motion: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400',
})[category.value])
const borderClass = computed(() => ({ webgis: 'border-cyan-500', webapp: 'border-emerald-500', adtech: 'border-purple-500', motion: 'border-amber-500' })[category.value])
const textClass = computed(() => ({ webgis: 'text-cyan-700 dark:text-cyan-400', webapp: 'text-emerald-700 dark:text-emerald-400', adtech: 'text-purple-700 dark:text-purple-400', motion: 'text-amber-700 dark:text-amber-500' })[category.value])
const domainLabel = computed(() => [props.group.domain, props.group.period].filter(Boolean).join(' • '))
</script>

<template>
  <div v-reveal class="min-w-0">
    <article
      v-spotlight :data-cat="group.categories.join(' ')" :data-group="group.id"
      class="spotlight-card h-full rounded-2xl border border-slate-200 bg-white dark:border-slate-800"
      :class="compact ? 'p-4 sm:p-6 dark:bg-slate-900/75' : 'space-y-4 p-4 sm:p-6 dark:bg-slate-900/85'"
      :aria-labelledby="`group-heading-${group.id}`"
    >
      <span v-for="project in group.projects" :id="`project-${project.id}`" :key="project.id" class="absolute top-0 scroll-mt-24" aria-hidden="true" />
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="font-mono text-[13.5px]" :class="compact ? textClass : ['rounded-md border px-2.5 py-1 font-semibold', badgeClass]">{{ domainLabel }}</span>
        <span v-if="!compact" class="font-mono text-[13px] text-slate-500 dark:text-slate-400 font-medium">{{ group.techStack.join(' • ') }}</span>
      </div>
      <component :is="compact ? 'h4' : 'h3'" :id="`group-heading-${group.id}`" class="font-bold text-slate-900 dark:text-white" :class="compact ? 'mt-1 text-lg' : 'text-xl sm:text-[22px] sm:leading-snug'">{{ group.title }}</component>
      <div
        :class="[
          compact ? 'mt-2 space-y-2.5 text-[14.5px] leading-[1.65] text-slate-700 dark:text-slate-200' : ['space-y-3 border-l-2 pl-4 text-[15.5px] leading-[1.65] text-slate-700 dark:text-slate-200', borderClass],
          collapsibleOnMobile && !isExpandedMobile ? 'hidden md:block' : 'block'
        ]"
      >
        <p v-for="(section, index) in group.sections" :key="index">
          <strong v-if="section.label" class="text-slate-900 dark:text-white font-bold">• {{ section.label }}: </strong><span v-html="section.html" />
        </p>
      </div>
      <div v-if="collapsibleOnMobile" class="pt-1 md:hidden">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[13px] font-semibold text-amber-700 transition hover:border-amber-500 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-amber-400 dark:hover:border-amber-400"
          :aria-expanded="isExpandedMobile"
          @click="isExpandedMobile = !isExpandedMobile"
        >
          <span>{{ isExpandedMobile ? 'Thu gọn' : 'Xem chi tiết' }}</span>
          <span class="text-xs" aria-hidden="true">{{ isExpandedMobile ? '▲' : '▼' }}</span>
        </button>
      </div>
      <aside v-if="group.architecture" class="rounded-xl border border-purple-500/25 bg-purple-500/5 p-4 dark:bg-purple-500/10" aria-label="Kiến trúc chịu tải">
        <p class="text-[15px] font-bold text-purple-800 dark:text-purple-300">Kiến trúc chịu tải</p>
        <p class="mt-2 break-words font-mono text-[13.5px] leading-6 text-slate-800 dark:text-slate-200">{{ group.architecture }}</p>
      </aside>
      <ProjectScreenshots :projects="group.projects" />
      <div v-if="group.links.length" class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
        <ProductLinks :links="group.links" />
      </div>
    </article>
  </div>
</template>
