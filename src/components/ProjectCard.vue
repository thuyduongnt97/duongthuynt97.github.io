<script setup>
import { computed } from 'vue'
import ProductLinks from './ProductLinks.vue'

const props = defineProps({
  group: { type: Object, required: true },
  compact: { type: Boolean, default: false },
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
        <span class="font-mono text-xs" :class="compact ? textClass : ['rounded-md border px-2.5 py-1 font-semibold', badgeClass]">{{ domainLabel }}</span>
        <span v-if="!compact" class="font-mono text-xs text-slate-500 dark:text-slate-400">{{ group.techStack.join(' • ') }}</span>
      </div>
      <component :is="compact ? 'h4' : 'h3'" :id="`group-heading-${group.id}`" class="font-bold" :class="compact ? 'mt-1 text-base' : 'text-xl'">{{ group.title }}</component>
      <div :class="compact ? 'mt-1.5 space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400' : ['space-y-2.5 border-l-2 pl-4 text-sm text-slate-600 dark:text-slate-300', borderClass]">
        <p v-for="(section, index) in group.sections" :key="index">
          <strong v-if="section.label">• {{ section.label }}: </strong><span v-html="section.html" />
        </p>
      </div>
      <div v-if="group.links.length" class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
        <ProductLinks :links="group.links" />
      </div>
    </article>
  </div>
</template>
