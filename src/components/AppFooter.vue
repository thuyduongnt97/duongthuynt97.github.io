<script setup>
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#04060A] pt-14 pb-24 md:pb-14 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <div class="min-w-0 break-words">
        <div class="inline-flex items-center gap-2 text-xs font-mono text-amber-500 mb-2">
          <span>● {{ profile.availability }}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {{ profile.name }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {{ profile.location }} • Email: <a :href="`mailto:${profile.email}`" class="text-amber-500 hover:underline">{{ profile.email }}</a>
        </p>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-3 font-mono">
          © {{ year }} {{ profile.name }} • {{ profile.title }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3 font-mono text-xs sm:text-sm">
        <a
          :href="`mailto:${profile.email}`"
          class="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition"
        >
          ✉️ Gửi Email
        </a>
        <a
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-amber-500 text-slate-800 dark:text-slate-200 font-semibold transition"
        >
          📄 Tải CV (PDF)
        </a>
        <a
          :href="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          class="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-amber-500 text-slate-800 dark:text-slate-200 font-semibold transition"
        >
          💻 GitHub ↗
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@media (max-width: 767px) {
  footer { padding-bottom: calc(6rem + env(safe-area-inset-bottom, 0px)); }
}
</style>
