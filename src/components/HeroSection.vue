<script setup>
import HeroShowcaseCard from './HeroShowcaseCard.vue'
import { profile } from '../data/profile'
</script>

<template>
  <section id="hero" class="hero-section scroll-mt-16" aria-labelledby="hero-heading">
    <span id="home" class="absolute top-0 scroll-mt-20" aria-hidden="true" />
    <span id="about" class="absolute top-0 scroll-mt-20" aria-hidden="true" />

    <!-- Clean, Dark Subtle Gradient Backdrop (No Grid, No Crosses) -->
    <div class="hero-backdrop" aria-hidden="true" />

    <div class="hero-shell relative z-10">
      <div class="hero-grid">
        <!-- Cột Trái Rộng Rãi 60%: Nội dung giới thiệu & thông số -->
        <div class="hero-copy min-w-0">
          <div class="hero-badges">
            <span class="hero-status inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 font-mono text-emerald-800 dark:text-emerald-300">
              <span class="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              {{ profile.heroBadge }}
            </span>
            <a href="#recognition" class="hero-award rounded-full border border-amber-500/40 bg-amber-500/15 font-semibold text-amber-900 transition-colors hover:bg-amber-500/25 dark:text-amber-300">
              {{ profile.heroRecognition }}
            </a>
          </div>

          <h1 id="hero-heading" class="hero-heading font-extrabold text-slate-900 dark:text-white" v-html="profile.heroHeadlineHtml" />
          <p class="hero-lead text-slate-700 dark:text-[#E2E8F0]" v-html="profile.lead" />

          <!-- 4 Pill-tags kỹ năng nằm trên 1 hàng ngang trên màn hình lớn -->
          <ul class="hero-technologies flex flex-wrap lg:flex-nowrap gap-2" aria-label="Kỹ năng Fullstack nổi bật">
            <li v-for="highlight in profile.highlights" :key="highlight.text" class="whitespace-nowrap rounded-xl border border-cyan-500/35 bg-cyan-500/15 px-3 py-1.5 text-[14px] font-semibold text-cyan-900 dark:bg-cyan-500/20 dark:text-cyan-200 shadow-sm">
              {{ highlight.text }}
            </li>
          </ul>

          <!-- 4 Ô thống kê thực tế -->
          <dl class="hero-stats grid grid-cols-4 gap-2.5">
            <div v-for="stat in profile.stats" :key="stat.label" class="min-w-0 rounded-xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 dark:border-slate-800 dark:bg-[rgba(15,23,42,0.95)]">
              <dt class="sr-only">{{ stat.label }}</dt>
              <dd class="font-mono text-2xl font-extrabold sm:text-[30px]" :class="stat.color === 'amber' ? 'text-amber-500 dark:text-amber-400' : stat.color === 'emerald' ? 'text-emerald-500 dark:text-emerald-400' : stat.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' : 'text-purple-600 dark:text-purple-400'">{{ stat.value }}</dd>
              <dd class="mt-1 text-[13.5px] sm:text-[14px] leading-snug font-medium text-slate-600 dark:text-[#CBD5E1]" aria-hidden="true">{{ stat.label }}</dd>
            </div>
          </dl>

          <!-- 2 Nút bấm hành động -->
          <div class="hero-actions flex flex-wrap gap-3 pt-1">
            <a v-for="cta in profile.heroCtas" :key="cta.id" :href="cta.href" class="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-center text-[15px] sm:text-[16px] font-bold transition-all shadow-md" :class="cta.variant === 'primary' ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-400' : 'border border-slate-300 bg-white/95 text-slate-800 hover:border-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-amber-400'">{{ cta.label }}</a>
          </div>
        </div>

        <!-- Cột Phải Nhỏ Gọn 40%: Đúng 1 Khung Card Duy Nhất (max-width: 460px) -->
        <div class="hero-showcase min-w-0">
          <HeroShowcaseCard />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding: 1.25rem 0 2rem;
}

/* Subtle Dark Gradient Backdrop (No Grid, No Crosses) */
.hero-backdrop {
  position: absolute;
  inset: -1.5rem -2.5rem -2.5rem -2.5rem;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  background: radial-gradient(ellipse at 50% 15%, #0d1527 0%, #080d1a 65%, #050811 100%);
}

.hero-shell {
  width: 100%;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.25rem;
}

.hero-status,
.hero-award {
  padding: 0.45rem 0.85rem;
  font-size: 0.875rem; /* ~14px */
  font-weight: 600;
  line-height: 1.45;
  white-space: nowrap;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 1.75rem;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  min-width: 0;
  max-width: 100%;
}

.hero-heading {
  font-size: clamp(1.9rem, 2.65vw, 2.5rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.03em;
  min-width: 0;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: normal;
}

.hero-heading :deep(span) {
  display: inline;
}

.hero-heading :deep(.gradient-amber) {
  background: linear-gradient(to right, #fbbf24, #fb923c, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-heading :deep(.gradient-cyan) {
  background: linear-gradient(to right, #22d3ee, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-lead {
  font-size: 1.05rem; /* ~16.8px */
  line-height: 1.65;
  min-width: 0;
  max-width: 100%;
}

.hero-stats > div {
  background: rgba(15, 23, 42, 0.95);
}

.hero-showcase {
  max-width: 460px;
  width: 100%;
  margin-left: auto;
}

@media (min-width: 1024px) {
  .hero-section {
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
  }

  .hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 0.25rem;
  }

  /* Tỷ lệ 2 cột: Cột trái 60% (1.4fr) - Cột phải 40% (0.9fr), gap 48px, căn giữa theo chiều dọc */
  .hero-grid {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
    gap: 48px;
    align-items: center;
  }
}

@media (min-width: 1024px) and (max-height: 750px) {
  .hero-section {
    padding-top: 1.25rem;
    padding-bottom: 1rem;
  }

  .hero-copy {
    gap: 0.75rem;
  }
}

@media (max-width: 420px) {
  .hero-stats {
    gap: 0.375rem;
  }

  .hero-stats > div {
    padding: 0.75rem 0.5rem;
  }

  .hero-actions > a {
    flex: 1 1 0;
    padding-inline: 0.75rem;
  }
}
</style>