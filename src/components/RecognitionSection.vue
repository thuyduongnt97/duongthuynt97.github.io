<script setup>
import { recognition } from '../data/recognition'
</script>

<template>
  <section id="recognition" class="border-y border-slate-200 py-8 scroll-mt-20 dark:border-slate-800/80" aria-label="Ghi nhận, giải thưởng và cột mốc">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div v-for="(item, index) in recognition.items" :key="item.id" v-reveal="index * 50" class="min-w-0">
        <article
          v-spotlight
          class="spotlight-card flex h-full items-start gap-4 rounded-2xl border p-5"
          :class="item.id === 'professional' ? 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-amber-500/10 dark:via-slate-900/90 dark:to-slate-900/90' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80'"
        >
          <span class="flex size-11 shrink-0 items-center justify-center rounded-xl border text-lg" :class="item.color === 'amber' ? 'border-amber-500/40 bg-amber-500/20 text-amber-500' : item.color === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' : 'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'" aria-hidden="true">{{ item.emoji }}</span>
          <div class="min-w-0">
            <span class="font-mono text-xs font-bold uppercase tracking-wider" :class="item.color === 'amber' ? 'text-amber-700 dark:text-amber-400' : item.color === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' : 'text-emerald-700 dark:text-emerald-400'">{{ item.badge }}</span>
            <h3 class="mt-0.5 text-base font-bold">{{ item.title }}</h3>
            <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
