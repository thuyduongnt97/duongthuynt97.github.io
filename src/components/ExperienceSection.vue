<script setup>
import { ref, watch } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { deliverablesSection } from '../data/experiences'
import { useDeliverables } from '../composables/useDeliverables'

const props = defineProps({ activeCategory: { type: String, default: 'all' } })
const emit = defineEmits(['update:activeCategory'])
const { filters, mainGroups, supportingGroups, setFilter, visibleGroups } = useDeliverables(props, emit)
const filterStrip = ref(null)

// Run after the active button renders, before the skill click's vertical scroll.
watch(() => props.activeCategory, category => {
  if (!window.matchMedia('(max-width: 1023px)').matches) return
  filterStrip.value?.querySelector(`#filter-${category}`)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    inline: 'center',
    block: 'nearest',
  })
}, { flush: 'post' })
</script>

<template>
  <section id="deliverables" class="border-b border-slate-200 py-14 scroll-mt-20 dark:border-slate-800/80" aria-labelledby="deliverables-heading">
    <span id="experience" class="absolute top-0 scroll-mt-20" aria-hidden="true" />
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <div class="min-w-0 space-y-5 lg:sticky lg:top-24 lg:col-span-4">
        <div>
          <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">{{ deliverablesSection.eyebrow }}</span>
          <h2 id="deliverables-heading" class="mt-1 text-2xl font-extrabold sm:text-3xl">{{ deliverablesSection.title }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ deliverablesSection.description }}</p>
        </div>
        <div ref="filterStrip" class="-mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0" role="group" aria-label="Lọc danh mục dự án">
          <button
            v-for="filter in filters" :id="`filter-${filter.id}`" :key="filter.id"
            type="button" :aria-pressed="activeCategory === filter.id" aria-controls="project-results"
            class="flex min-h-11 shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-xl border px-3.5 py-2 text-left text-xs transition-colors sm:text-sm lg:w-full"
            :class="activeCategory === filter.id ? 'border-amber-500 bg-amber-500 font-bold text-slate-950' : 'border-slate-200 bg-white font-medium hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900'"
            @click="setFilter(filter.id)"
          >
            <span>{{ filter.label }}</span>
            <span class="shrink-0 font-mono text-xs" aria-hidden="true">{{ filter.id === 'all' ? 'Full' : String(filter.count).padStart(2, '0') }}</span>
          </button>
        </div>
      </div>
      <div id="project-results" class="min-w-0 space-y-5 lg:col-span-8">
        <p class="sr-only" role="status" aria-live="polite">Đang hiển thị {{ visibleGroups.length }} nhóm dự án.</p>
        <ProjectCard v-for="group in mainGroups" :key="group.id" :group="group" />
        <div v-if="supportingGroups.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProjectCard v-for="group in supportingGroups" :key="group.id" :group="group" compact />
        </div>
      </div>
    </div>
  </section>
</template>
