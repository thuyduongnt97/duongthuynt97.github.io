<script setup>
import HeroPlayground from './HeroPlayground.vue'
import { profile } from '../data/profile'
</script>

<template>
  <section id="hero" class="py-12 lg:py-16 scroll-mt-20" aria-labelledby="hero-heading">
    <span id="home" class="absolute top-0 scroll-mt-20" aria-hidden="true" />
    <span id="about" class="absolute top-0 scroll-mt-20" aria-hidden="true" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <!-- CỘT TRÁI (7/12): THÔNG TIN ĐỊNH VỊ, TIÊU ĐỀ GRADIENT, CHỈ SỐ NỔI BẬT -->
      <div v-reveal class="min-w-0 lg:col-span-7 space-y-5">
        <!-- Status Badge -->
        <div
          class="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono"
        >
          <span class="w-2 h-2 shrink-0 rounded-full bg-emerald-500 animate-ping" aria-hidden="true" />
          <span>{{ profile.heroBadge }}</span>
        </div>

        <!-- Headline Gradient -->
        <h1 id="hero-heading" class="text-2xl sm:text-4xl lg:text-[50px] font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100" v-html="profile.heroHeadlineHtml" />

        <!-- Lead Paragraph -->
        <p
          class="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
          v-html="profile.lead"
        />

        <!-- Key Ecosystem Badges -->
        <div class="pt-1">
          <div class="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            {{ profile.ecosystemsLabel }}
          </div>
          <div class="flex flex-wrap gap-2 font-mono text-xs">
            <span
              v-for="eco in profile.ecosystems"
              :key="eco.id"
              class="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold"
              :class="[
                eco.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' :
                eco.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                eco.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                'text-amber-600 dark:text-amber-500'
              ]"
            >
              {{ eco.icon }} {{ eco.label }}
            </span>
          </div>
        </div>

        <!-- 4 Key Benchmarks -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div
            v-for="stat in profile.stats"
            :key="stat.label"
            class="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
          >
            <div
              class="text-2xl font-extrabold font-mono"
              :class="[
                stat.color === 'amber' ? 'text-amber-600 dark:text-amber-500' :
                stat.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-500' :
                stat.color === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' :
                'text-purple-600 dark:text-purple-400'
              ]"
            >
              {{ stat.value }}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Call To Actions -->
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a v-for="cta in profile.heroCtas" :key="cta.id" :href="cta.href" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm transition sm:w-auto sm:px-5" :class="cta.variant === 'primary' ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-amber-500 font-semibold text-slate-800 dark:text-slate-200'">{{ cta.label }}</a>
        </div>
      </div>

      <!-- CỘT PHẢI (5/12): INTERACTIVE WEBGIS & MOTION SANDBOX -->
      <div v-reveal="80" class="min-w-0 lg:col-span-5">
        <HeroPlayground />
      </div>
    </div>
  </section>
</template>
