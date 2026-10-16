<script setup>
import { skillsSection } from '../data/skills'
const props = defineProps({
  pillar: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-category'])

function handleClick() {
  emit('select-category', props.pillar.filterCategory || props.pillar.id)
}
</script>

<template>
  <div
    v-spotlight
    role="button"
    tabindex="0"
    :aria-pressed="isSelected"
    :aria-label="`${pillar.title} — Lọc dự án theo nhóm kỹ năng này`"
    aria-controls="deliverables"
    :data-category="pillar.filterCategory"
    class="spotlight-card min-w-0 rounded-2xl p-4 sm:p-6 bg-white dark:bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between cursor-pointer group"
    :class="[
      isSelected
        ? 'skill-selected border-amber-500'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    ]"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div>
      <!-- Card Header -->
      <div class="flex flex-wrap items-start justify-between gap-3 mb-3 sm:flex-nowrap sm:gap-4">
        <div class="min-w-0">
          <span
            class="text-xs font-mono font-semibold uppercase block"
            :class="[
              pillar.accentColor === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
              pillar.accentColor === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' :
              pillar.accentColor === 'purple' ? 'text-purple-700 dark:text-purple-400' :
              'text-amber-700 dark:text-amber-500'
            ]"
          >
            {{ pillar.categoryTitle }}
          </span>
          <h3 class="text-xl font-bold mt-0.5 text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
            {{ pillar.title }}
          </h3>
        </div>
        <div class="text-right shrink-0">
          <span
            class="inline-block px-3 py-1 rounded-xl font-mono font-extrabold text-sm border"
            :class="[
              pillar.accentColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
              pillar.accentColor === 'cyan' ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30' :
              pillar.accentColor === 'purple' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30' :
              'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
            ]"
          >
            {{ pillar.yearsBadge }}
          </span>
          <div class="text-[11px] font-mono text-slate-400 mt-1">
            {{ pillar.period }}
          </div>
        </div>
      </div>

      <!-- 3 Sub-metrics Grid -->
      <div
        class="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800 font-mono text-xs"
      >
        <div v-for="metric in pillar.subMetrics" :key="metric.label" class="min-w-0">
          <div class="truncate text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px]" :title="metric.label">
            {{ metric.label }}
          </div>
          <div
            class="truncate font-bold text-[11px] sm:text-xs"
            :title="metric.value"
            :class="[
              pillar.accentColor === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
              pillar.accentColor === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' :
              pillar.accentColor === 'purple' ? 'text-purple-700 dark:text-purple-400' :
              'text-amber-700 dark:text-amber-500'
            ]"
          >
            {{ metric.value }}
          </div>
        </div>
      </div>

      <!-- Deliverables List -->
      <div class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
        {{ skillsSection.deliverablesLabel }}
      </div>
      <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <li
          v-for="(del, idx) in pillar.deliverables"
          :key="idx"
          class="flex gap-2 items-start"
        >
          <span
            class="font-bold shrink-0"
            :class="[
              pillar.accentColor === 'emerald' ? 'text-emerald-500' :
              pillar.accentColor === 'cyan' ? 'text-cyan-400' :
              pillar.accentColor === 'purple' ? 'text-purple-400' :
              'text-amber-500'
            ]"
          >▸</span>
          <span class="leading-relaxed" v-html="del" />
        </li>
      </ul>
    </div>

    <!-- Tech Chips -->
    <div
      class="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400"
    >
      <span
        v-for="chip in pillar.chips"
        :key="chip"
        class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
      >
        {{ chip }}
      </span>
    </div>
  </div>
</template>
