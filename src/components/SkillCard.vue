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
    class="spotlight-card min-w-0 rounded-2xl p-5 sm:p-7 bg-white dark:bg-slate-900/85 border transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-sm"
    :class="[
      isSelected
        ? 'skill-selected border-amber-500 ring-2 ring-amber-500/30'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    ]"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div>
      <!-- Card Header -->
      <div class="flex flex-wrap items-start justify-between gap-3 mb-3.5 sm:flex-nowrap sm:gap-4">
        <div class="min-w-0">
          <span
            class="text-[13px] font-mono font-bold uppercase block tracking-wider"
            :class="[
              pillar.accentColor === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
              pillar.accentColor === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' :
              pillar.accentColor === 'purple' ? 'text-purple-700 dark:text-purple-400' :
              'text-amber-700 dark:text-amber-500'
            ]"
          >
            {{ pillar.categoryTitle }}
          </span>
          <h3 class="text-xl sm:text-[22px] font-bold mt-1 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
            {{ pillar.title }}
          </h3>
        </div>
        <div class="text-right shrink-0">
          <span
            class="inline-block px-3.5 py-1.5 rounded-xl font-mono font-extrabold text-[15px] sm:text-[16px] border shadow-sm"
            :class="[
              pillar.accentColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40' :
              pillar.accentColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40' :
              pillar.accentColor === 'purple' ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40' :
              'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
            ]"
          >
            {{ pillar.yearsBadge }}
          </span>
          <div class="text-[13px] font-mono text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {{ pillar.period }}
          </div>
        </div>
      </div>

      <!-- 3 Sub-metrics Grid -->
      <div
        class="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 font-mono"
      >
        <div v-for="metric in pillar.subMetrics" :key="metric.label" class="min-w-0">
          <div class="truncate text-slate-600 dark:text-slate-400 text-[13px] font-medium" :title="metric.label">
            {{ metric.label }}
          </div>
          <div
            class="truncate font-bold text-[16px] sm:text-[17px] mt-0.5 text-slate-900 dark:text-white"
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
      <div class="text-[13px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2.5">
        {{ skillsSection.deliverablesLabel }}
      </div>
      <ul class="space-y-2.5 text-[15px] sm:text-[15.5px] text-slate-700 dark:text-[#CBD5E1] leading-[1.65]">
        <li
          v-for="(del, idx) in pillar.deliverables"
          :key="idx"
          class="flex gap-2.5 items-start"
        >
          <span
            class="font-bold text-base shrink-0 mt-0.5"
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
      class="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[13.5px] font-mono text-slate-700 dark:text-slate-300 font-medium"
    >
      <span
        v-for="chip in pillar.chips"
        :key="chip"
        class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
      >
        {{ chip }}
      </span>
    </div>
  </div>
</template>
