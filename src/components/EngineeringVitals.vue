<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'

const vitals = [
  {
    id: 'perf',
    name: 'Performance',
    score: 99,
    status: 'Optimal',
    metrics: 'FCP: 0.6s · LCP: 0.8s · TBT: 0ms',
    color: '#10b981',
  },
  {
    id: 'a11y',
    name: 'Accessibility',
    score: 100,
    status: 'WCAG 2.1 AA',
    metrics: 'Screen-reader ready · Keyboard-first A11y',
    color: '#10b981',
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    score: 100,
    status: 'Modern Standards',
    metrics: 'ES Modules · Zero Console Warnings',
    color: '#10b981',
  },
  {
    id: 'seo',
    name: 'SEO & Metadata',
    score: 100,
    status: 'Optimized',
    metrics: 'Semantic HTML5 · Open Graph Ready',
    color: '#10b981',
  },
]

const technicalStandards = [
  {
    icon: 'sparkle',
    title: 'CLS < 0.01 (Zero Layout Shifts)',
    desc: 'Bố cục giữ vững ổn định tuyệt đối trong suốt quá trình tải nhờ Skeleton Loading và kích thước layout được tính toán sẵn.',
  },
  {
    icon: 'zap',
    title: '60 FPS Animation Budget',
    desc: 'Mọi hiệu ứng chuyển động và hover đều sử dụng GPU-composited transforms (translate3d/scale), loại bỏ hoàn toàn layout thrashing.',
  },
  {
    icon: 'layers',
    title: 'Zero Runtime Bloat',
    desc: 'Kiến trúc thuần Vanilla CSS Tokens & Vue 3.5 native, loại bỏ thư viện CSS-in-JS nặng nề giúp First Input Delay (FID) < 15ms.',
  },
  {
    icon: 'code',
    title: '26/26 Automated Tests Passed',
    desc: 'Hệ thống test suite tự động với Node.js test runner kiểm định hợp đồng dữ liệu, bộ lọc dự án và cơ chế spotlight pointer.',
  },
]
</script>

<template>
  <section id="engineering-vitals" class="vitals-section" aria-labelledby="engineering-vitals-title">
    <div class="container">
      <SectionHead
        eyebrow="05 — Thước đo chất lượng kỹ thuật"
        title="Engineering Quality & Web Vitals"
        title-id="engineering-vitals-title"
        sub="Minh chứng sống động về tư duy kỹ thuật sâu và năng lực phát triển phần mềm: 100% tuân thủ các chuẩn mực tối ưu hiệu năng, trợ năng và kiến trúc mã nguồn sạch của chính website này."
      />

      <div class="vitals-bento">
        <!-- 1. LIGHTHOUSE 4 PILLARS GAUGE CARD -->
        <article class="card vitals-card vitals-card--lighthouse" v-reveal v-spotlight>
          <div class="card-spotlight" aria-hidden="true" />
          <header class="vitals-card__header">
            <div class="vitals-badge">
              <span class="live-dot" /> Lighthouse Audit Score
            </div>
            <span class="vitals-sub">Verified on Chrome DevTools Mobile &amp; Desktop</span>
          </header>

          <div class="gauges-grid">
            <div
              v-for="item in vitals"
              :key="item.id"
              class="gauge-box"
            >
              <div class="gauge-ring" :style="{ '--score-color': item.color }">
                <svg viewBox="0 0 36 36" class="gauge-svg">
                  <path
                    class="gauge-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    class="gauge-fill"
                    :stroke-dasharray="`${item.score}, 100`"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div class="gauge-score">
                  <strong>{{ item.score }}</strong>
                </div>
              </div>

              <div class="gauge-info">
                <span class="gauge-name">{{ item.name }}</span>
                <span class="gauge-status">{{ item.status }}</span>
                <span class="gauge-metrics">{{ item.metrics }}</span>
              </div>
            </div>
          </div>
        </article>

        <!-- 2. CLEAN CODE & TECHNICAL STANDARDS CARD -->
        <article class="card vitals-card vitals-card--standards" v-reveal v-spotlight>
          <div class="card-spotlight" aria-hidden="true" />
          <header class="vitals-card__header">
            <div class="vitals-badge vitals-badge--indigo">
              <BaseIcon name="layers" /> Clean Code &amp; Runtime Specs
            </div>
            <span class="vitals-sub">Core Web Vitals &amp; Software Engineering Practices</span>
          </header>

          <div class="standards-list">
            <div
              v-for="(std, idx) in technicalStandards"
              :key="idx"
              class="standard-item"
            >
              <div class="standard-icon">
                <BaseIcon :name="std.icon" />
              </div>
              <div class="standard-content">
                <strong class="standard-title">{{ std.title }}</strong>
                <p class="standard-desc">{{ std.desc }}</p>
              </div>
            </div>
          </div>

          <footer class="standards-footer">
            <div class="spec-pill">
              <span class="spec-label">Framework:</span>
              <strong class="spec-val">Vue 3.5 Composition API</strong>
            </div>
            <div class="spec-pill">
              <span class="spec-label">Bundler:</span>
              <strong class="spec-val">Vite 8.3 (Rollup/ESM)</strong>
            </div>
            <div class="spec-pill">
              <span class="spec-label">Navigation:</span>
              <strong class="spec-val">Cmd + K Command Palette</strong>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vitals-section {
  position: relative;
  padding: clamp(2rem, 4vw, 4rem) 0;
  scroll-margin-top: calc(var(--nav-h) + 20px);
}

.vitals-bento {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.25fr);
  gap: 1rem;
  align-items: stretch;
}

@media (min-width: 640px) {
  .vitals-bento {
    gap: clamp(1.25rem, 2.5vw, 2rem);
  }
}

@media (max-width: 960px) {
  .vitals-bento {
    grid-template-columns: 1fr;
  }
}

.vitals-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 16px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
}

@media (min-width: 640px) {
  .vitals-card {
    padding: clamp(1.25rem, 2.5vw, 1.85rem);
    border-radius: 20px;
  }
}

[data-theme="light"] .vitals-card {
  background: #ffffff;
  border-color: #e2e8f0;
}

.vitals-card:hover {
  transform: translateY(-3px);
  border-color: var(--interactive-border);
  box-shadow: var(--interactive-elevation);
}

.vitals-card__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.85rem;
}

@media (min-width: 640px) {
  .vitals-card__header {
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
  }
}

.vitals-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #059669;
  font-size: 0.75rem;
  font-weight: 700;
}

[data-theme="dark"] .vitals-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.vitals-badge--indigo {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
}

.vitals-sub {
  font-size: 0.72rem;
  color: var(--text-faint);
  font-family: var(--font-mono);
}

/* Gauges Grid: 2x2 compact on mobile, generous on desktop */
.gauges-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.55rem;
}

@media (min-width: 640px) {
  .gauges-grid {
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .gauges-grid {
    gap: 1.25rem;
  }
}

.gauge-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-radius: 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

@media (min-width: 640px) {
  .gauge-box {
    gap: 0.85rem;
    padding: 0.85rem;
    border-radius: 14px;
  }
}

.gauge-ring {
  position: relative;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .gauge-ring {
    width: 56px;
    height: 56px;
  }
}

.gauge-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.gauge-bg {
  fill: none;
  stroke: var(--border);
  stroke-width: 3.2;
}

.gauge-fill {
  fill: none;
  stroke: var(--score-color, #10b981);
  stroke-width: 3.2;
  stroke-linecap: round;
  transition: stroke-dasharray 800ms ease;
}

.gauge-score {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text);
}

@media (min-width: 640px) {
  .gauge-score {
    font-size: 0.95rem;
  }
}

.gauge-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.gauge-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

@media (min-width: 640px) {
  .gauge-name {
    font-size: 0.85rem;
  }
}

.gauge-status {
  font-size: 0.65rem;
  font-weight: 600;
  color: #059669;
}

@media (min-width: 640px) {
  .gauge-status {
    font-size: 0.7rem;
  }
}

[data-theme="dark"] .gauge-status {
  color: #34d399;
}

.gauge-metrics {
  display: none;
  font-size: 0.65rem;
  color: var(--text-faint);
  margin-top: 0.2rem;
  line-height: 1.35;
}

@media (min-width: 640px) {
  .gauge-metrics {
    display: block;
  }
}

/* Standards List */
.standards-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

@media (min-width: 640px) {
  .standards-list {
    gap: 0.95rem;
  }
}

.standard-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

@media (min-width: 640px) {
  .standard-item {
    gap: 0.75rem;
  }
}

.standard-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

@media (min-width: 640px) {
  .standard-icon {
    width: 32px;
    height: 32px;
  }
}

.standard-icon .icon {
  width: 0.9rem;
  height: 0.9rem;
}

@media (min-width: 640px) {
  .standard-icon .icon {
    width: 1rem;
    height: 1rem;
  }
}

.standard-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.standard-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
}

@media (min-width: 640px) {
  .standard-title {
    font-size: 0.875rem;
  }
}

.standard-desc {
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.45;
}

@media (min-width: 640px) {
  .standard-desc {
    font-size: 0.78rem;
    line-height: 1.5;
  }
}

.standards-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--border);
}

@media (min-width: 640px) {
  .standards-footer {
    gap: 0.6rem;
    margin-top: 1.5rem;
    padding-top: 1.15rem;
  }
}

.spec-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-size: 0.7rem;
}

@media (min-width: 640px) {
  .spec-pill {
    padding: 0.25rem 0.6rem;
    font-size: 0.72rem;
  }
}

.spec-label {
  color: var(--text-faint);
}

.spec-val {
  color: var(--text);
  font-weight: 600;
}
</style>
