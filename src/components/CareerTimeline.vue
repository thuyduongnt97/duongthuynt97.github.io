<script setup>
import { careerMilestones, timelineSection } from '../data/timeline'

const nodeColors = { amber: 'bg-amber-500', emerald: 'bg-emerald-500', purple: 'bg-purple-500', slate: 'bg-slate-500', cyan: 'bg-cyan-500' }
const textColors = { amber: 'text-amber-700 dark:text-amber-400', emerald: 'text-emerald-700 dark:text-emerald-500', purple: 'text-purple-700 dark:text-purple-400', slate: 'text-slate-500 dark:text-slate-400', cyan: 'text-cyan-700 dark:text-cyan-400' }
const badgeColors = {
  emerald: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  amber: 'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400',
  cyan: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-700 dark:text-cyan-400',
  slate: 'border-transparent bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
}
</script>

<template>
  <section id="timeline" class="py-14 scroll-mt-20" aria-labelledby="timeline-heading">
    <div class="mb-10">
      <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">{{ timelineSection.eyebrow }}</span>
      <h2 id="timeline-heading" class="mt-1 text-2xl font-extrabold sm:text-3xl">{{ timelineSection.title }}</h2>
    </div>
    <ol class="relative ml-3 space-y-10 border-l-2 border-slate-200 pl-6 sm:ml-6 sm:pl-8 dark:border-slate-800">
      <li v-for="(item, index) in careerMilestones" :key="item.id" v-reveal="index * 50" class="relative">
        <span class="absolute -left-[33px] top-1 size-4 rounded-full ring-4 ring-slate-50 sm:-left-[41px] dark:ring-[#06090F]" :class="nodeColors[item.color]" aria-hidden="true" />
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-mono text-xs font-bold" :class="item.periodStyle === 'pill' ? 'rounded bg-amber-500 px-2.5 py-0.5 text-slate-950' : textColors[item.color]">{{ item.period }}</span>
          <span v-for="badge in item.badges" :key="badge.label" class="rounded border px-2.5 py-0.5 font-mono text-xs" :class="badgeColors[badge.color]">{{ badge.label }}</span>
        </div>
        <h3 class="mt-2 text-lg font-bold" :class="{ 'sm:text-xl': !item.compact }">{{ item.role }} — {{ item.company }}</h3>
        <ul v-if="item.bulletPoints?.length" class="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="(point, pointIndex) in item.bulletPoints" :key="pointIndex" v-html="`• ${point}`" />
        </ul>
        <p v-else class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ item.summary }}</p>
      </li>
    </ol>
  </section>
</template>
