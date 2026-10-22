<script setup>
import { nextTick, ref } from 'vue'
import SkillCard from './SkillCard.vue'
import { detailedTable, pillars, skillsSection } from '../data/skills'

defineProps({ activeCategory: { type: String, default: 'all' } })
const emit = defineEmits(['select-category'])
const currentView = ref('bento')
const mobileViewLabels = { bento: '1. Nhóm năng lực', table: '2. Chi tiết số năm' }

async function switchView(mode, focus = false) {
  currentView.value = mode
  if (focus) {
    await nextTick()
    document.getElementById(`tab-${mode}`)?.focus()
  }
}

function handleTabKey(event, index) {
  let target
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') target = (index + 1) % skillsSection.views.length
  if (event.key === 'Home') target = 0
  if (event.key === 'End') target = skillsSection.views.length - 1
  if (target === undefined) return
  event.preventDefault()
  switchView(skillsSection.views[target].id, true)
}

async function handlePillarSelect(category) {
  emit('select-category', category)
  await nextTick()
  const section = document.getElementById('deliverables') || document.getElementById('experience')
  section?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <section id="skill-matrix" class="min-w-0 border-b border-slate-200 py-14 scroll-mt-20 dark:border-slate-800/80" aria-labelledby="skills-heading">
    <span id="skills" class="absolute top-0 scroll-mt-20" aria-hidden="true" />
    <div class="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div class="min-w-0">
        <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">{{ skillsSection.eyebrow }}</span>
        <h2 id="skills-heading" class="mt-1 text-2xl font-extrabold sm:text-[32px] sm:leading-tight text-slate-900 dark:text-white">{{ skillsSection.title }}</h2>
        <p class="mt-2 text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300" v-html="skillsSection.subtitleHtml" />
      </div>
      <div class="grid w-full max-w-full grid-cols-2 self-start rounded-xl border border-slate-300 bg-slate-200/80 p-1 sm:w-auto lg:max-w-[50%] lg:self-auto dark:border-slate-800 dark:bg-slate-900" role="tablist" aria-label="Chế độ xem kỹ năng">
        <button
          v-for="(view, index) in skillsSection.views" :id="`tab-${view.id}`" :key="view.id"
          type="button" role="tab" :aria-selected="currentView === view.id" :aria-controls="`skill-view-${view.id}`"
          :tabindex="currentView === view.id ? 0 : -1"
          class="min-h-11 min-w-0 rounded-lg px-2.5 py-2 text-center font-mono text-xs transition-colors sm:px-4 sm:text-left sm:text-[13.5px]"
          :class="currentView === view.id ? 'bg-amber-500 font-bold text-slate-950' : 'font-semibold text-slate-600 hover:text-amber-700 dark:text-slate-400 dark:hover:text-amber-400'"
          @click="switchView(view.id)" @keydown="handleTabKey($event, index)"
        ><span class="whitespace-nowrap sm:hidden">{{ mobileViewLabels[view.id] }}</span><span class="hidden sm:inline">{{ view.label }}</span></button>
      </div>
    </div>

    <div v-show="currentView === 'bento'" id="skill-view-bento" role="tabpanel" aria-labelledby="tab-bento" class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <SkillCard v-for="pillar in pillars" :key="pillar.id" :pillar="pillar" :is-selected="activeCategory === pillar.filterCategory" @select-category="handlePillarSelect" />
    </div>
    <div v-show="currentView === 'table'" id="skill-view-table" role="tabpanel" aria-labelledby="tab-table" class="min-w-0">
      <div class="space-y-3 md:hidden">
        <article v-for="row in detailedTable" :key="row.id" :data-skill="row.id" class="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/90">
          <div class="flex items-start justify-between gap-3">
            <h3 class="min-w-0 text-sm font-bold">{{ row.skill }}</h3>
            <span class="shrink-0 whitespace-nowrap rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs font-bold dark:bg-slate-800" :class="row.color === 'amber' ? 'text-amber-700 dark:text-amber-500' : row.color === 'purple' ? 'text-purple-700 dark:text-purple-400' : row.color === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' : 'text-cyan-700 dark:text-cyan-400'">{{ row.years }}</span>
          </div>
          <div class="mt-3 font-mono text-xs text-slate-500 dark:text-slate-400">
            <div>{{ row.timeline }}</div>
            <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden="true">
              <div class="h-full rounded-full" :style="{ width: `${row.percent}%` }" :class="row.color === 'amber' ? 'bg-amber-500' : row.color === 'purple' ? 'bg-purple-500' : row.color === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'" />
            </div>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300" v-html="row.deliverables" />
        </article>
      </div>
      <div class="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block dark:border-slate-800 dark:bg-slate-900/90">
      <div class="overflow-x-auto" tabindex="0" role="region" aria-label="Bảng kỹ năng chi tiết">
        <table class="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption class="sr-only">Số năm kinh nghiệm, trục thời gian và công việc thực tế của từng nhóm công nghệ</caption>
          <thead>
            <tr class="border-b border-slate-200 bg-slate-100/70 font-mono text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
              <th v-for="(heading, index) in skillsSection.tableHeaders" :key="heading" scope="col" class="px-4 py-3.5 font-semibold" :class="index === 1 ? 'w-36' : index === 2 ? 'w-44' : ''">{{ heading }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/70 dark:divide-slate-800/80">
            <tr v-for="row in detailedTable" :key="row.id" class="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
              <th scope="row" class="px-4 py-4 align-top font-bold">{{ row.skill }}</th>
              <td class="whitespace-nowrap px-4 py-4 align-top font-mono font-bold" :class="row.color === 'amber' ? 'text-amber-700 dark:text-amber-500' : row.color === 'purple' ? 'text-purple-700 dark:text-purple-400' : row.color === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' : 'text-cyan-700 dark:text-cyan-400'">{{ row.years }}</td>
              <td class="whitespace-nowrap px-4 py-4 align-top font-mono text-xs text-slate-500 dark:text-slate-400">
                <div>{{ row.timeline }}</div>
                <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden="true">
                  <div class="h-full rounded-full" :style="{ width: `${row.percent}%` }" :class="row.color === 'amber' ? 'bg-amber-500' : row.color === 'purple' ? 'bg-purple-500' : row.color === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'" />
                </div>
              </td>
              <td class="px-4 py-4 align-top text-slate-600 dark:text-slate-300" v-html="row.deliverables" />
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </section>
</template>
