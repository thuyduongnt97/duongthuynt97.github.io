<script setup>
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import ProjectMockupPreview from './ProjectMockupPreview.vue'
import { getAchievementSegments, getProjectDeliveryLabel, getProjectLinks } from '../utils/portfolio'
import { useProjectLightbox } from '../composables/useProjectLightbox'

const props = defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
})

const { openLightbox } = useProjectLightbox()

const isReversed = computed(() => !props.compact && props.index % 2 === 1)
const deliveryLabel = computed(() => getProjectDeliveryLabel(props.project))
const links = computed(() => getProjectLinks(props.project))
const achievements = computed(() => (props.project.achievements ?? []).map(getAchievementSegments))

const hasVisualPreview = computed(() => {
  return Boolean(
    props.project.imageUrl ||
    props.project.gifUrl ||
    props.project.videoUrl ||
    ['landing-pages', 'government-map', 'experiments', 'qr', 'maps', 'ads', 'emagazines', 'recognition-event', 'feature-core'].includes(props.project.id)
  )
})

const projectType = computed(() => {
  if (links.value.length > 0 || props.project.demoUrl) {
    return 'live' // Có Live Demo / Link chạy thực tế
  }
  if (hasVisualPreview.value) {
    return 'sandbox' // Có Sandbox mô phỏng trực quan
  }
  return 'ops' // Thuần bảo trì / vận hành nội bộ
})

const badgeConfig = computed(() => {
  if (projectType.value === 'live') {
    return {
      text: 'Live Demo',
      icon: null,
      dot: true,
    }
  }
  if (projectType.value === 'sandbox') {
    return {
      text: 'Interactive UI',
      icon: 'sparkle',
      dot: false,
    }
  }
  return {
    text: 'Vận hành nội bộ',
    icon: 'refresh',
    dot: false,
  }
})
</script>

<template>
  <!-- CASE STUDY FEATURED LAYOUT -->
  <article
    v-if="!compact"
    :id="`project-${project.id}`"
    v-reveal
    v-spotlight
    class="card case-study-card card--spotlight-layer"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div class="card-spotlight" aria-hidden="true" />

    <div class="case-study-grid flex flex-col gap-4 sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-10 items-stretch">
      <!-- CỘT 1: VISUAL MOCKUP & KEY IMPACT (METRICS) -->
      <div
        class="case-study__visual contents lg:flex lg:flex-col lg:gap-4 lg:justify-between lg:h-full"
        :class="isReversed ? 'lg:order-2' : 'lg:order-1'"
      >
        <!-- 2. Hộp Browser Mockup -->
        <div class="case-study__mockup-frame order-2">
          <ProjectMockupPreview :project="project" />
        </div>

        <!-- 3. Thanh Stats Mini (Horizontal mini-bar: 2-3 con số ấn tượng) -->
        <div v-if="project.caseStudy?.metrics?.length" class="case-study__stats-bar grid grid-cols-3 gap-2 order-3">
          <div
            v-for="metric in project.caseStudy.metrics.slice(0, 3)"
            :key="metric.label"
            class="case-study__stat-item"
          >
            <span class="stat-value font-display">{{ metric.value }}</span>
            <span class="stat-label">{{ metric.label }}</span>
          </div>
        </div>

        <!-- Fallback Achievements List if no structured case study -->
        <div v-else-if="achievements.length" class="case-study__achievements order-3">
          <ul class="achievements-list" role="list">
            <li v-for="(achievement, achIdx) in achievements" :key="achIdx" class="achievement-item">
              <span class="achievement-check" aria-hidden="true">✓</span>
              <span>
                <template v-for="(segment, segIdx) in achievement" :key="segIdx">
                  <strong v-if="segment.isMetric" class="achievement-metric">{{ segment.text }}</strong>
                  <template v-else>{{ segment.text }}</template>
                </template>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- CỘT 2: HEADER, TITLE, THÁCH THỨC & GIẢI PHÁP, TECH STACK -->
      <div
        class="case-study__content contents lg:flex lg:flex-col lg:justify-between lg:gap-5 lg:h-full"
        :class="isReversed ? 'lg:order-1' : 'lg:order-2'"
      >
        <!-- 1. Header & Title Group -->
        <div class="case-study__header-group order-1">
          <!-- Top Meta Row -->
          <header class="case-study__meta-bar">
            <div class="case-study__badges">
              <span class="badge-featured">
                ⭐ Featured Project
              </span>
              <span v-if="project.domain" class="badge-domain">
                <BaseIcon name="layers" class="badge-icon" />
                {{ project.domain }}
              </span>
              <span v-if="projectType === 'live'" class="badge-status badge-status--live">
                <span class="status-dot animate-ping" /> Live Demo
              </span>
              <span v-else-if="project.videoUrl" class="badge-status badge-status--video">
                <span class="status-dot animate-ping" /> Video Demo
              </span>
              <span v-else-if="projectType === 'sandbox'" class="badge-status badge-status--ui">
                <BaseIcon name="sparkle" class="badge-icon" /> Interactive UI
              </span>
              <span v-else class="badge-status badge-status--ops">
                <BaseIcon name="refresh" class="badge-icon" /> Vận hành nội bộ
              </span>
            </div>

            <div class="case-study__period">
              <span v-if="project.period" class="period-text">
                <BaseIcon name="calendar" class="period-icon" />
                {{ project.period }}
              </span>
              <span v-else-if="project.delivery === 'before-ai'">
                {{ deliveryLabel }}
              </span>
            </div>
          </header>

          <!-- Project Title & Subtitle -->
          <div class="case-study__title-wrap">
            <h4 :id="`project-title-${project.id}`" class="case-study__title font-display">
              {{ project.name }}
            </h4>
            <p v-if="project.role" class="case-study__role">
              {{ project.role }}
            </p>
          </div>

          <p v-if="project.description" class="case-study__desc">
            {{ project.description }}
          </p>
        </div>

        <!-- 4. Thách thức kỹ thuật & Giải pháp Frontend (border-l) -->
        <div v-if="project.caseStudy" class="case-study__points order-4">
          <div v-if="project.caseStudy.challenge" class="case-study__point case-study__point--challenge">
            <div class="point-head point-head--challenge">
              <span class="point-dot" aria-hidden="true" />
              <span>Thách thức kỹ thuật</span>
            </div>
            <p class="point-text">
              {{ project.caseStudy.challenge }}
            </p>
          </div>

          <div v-if="project.caseStudy.solution" class="case-study__point case-study__point--solution">
            <div class="point-head point-head--solution">
              <span class="point-dot" aria-hidden="true" />
              <span>Giải pháp Frontend</span>
            </div>
            <p class="point-text">
              {{ project.caseStudy.solution }}
            </p>
          </div>
        </div>

        <!-- 5. Dải tags công nghệ & Action Links (Xếp gọn gàng dưới cùng) -->
        <footer class="case-study__footer order-5">
          <ul v-if="project.techStack?.length" class="case-study__tech-list" role="list" aria-label="Công nghệ sử dụng">
            <li
              v-for="tech in project.techStack"
              :key="tech"
              class="case-study__tech-tag"
            >
              {{ tech }}
            </li>
          </ul>

          <div class="case-study__actions">
            <ProductLinks v-if="links.length" :links="links" compact />
            <button
              type="button"
              class="btn-case-study"
              @click="openLightbox(project)"
              :aria-label="`Xem chi tiết Case Study & UI Mockup ${project.name}`"
            >
              <BaseIcon name="layers" class="btn-icon" />
              <span>{{ links.length ? 'Case Study & UI' : 'Khám phá Case Study' }}</span>
              <BaseIcon name="arrow" class="btn-arrow" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  </article>

  <!-- SECONDARY / COMPACT SUPPORTING PROJECT LAYOUT -->
  <article
    v-else
    :id="`project-${project.id}`"
    v-reveal
    v-spotlight
    class="card compact-project-card card--spotlight-layer"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div class="card-spotlight" aria-hidden="true" />

    <!-- 1. Mockup thumbnail nhỏ (CHỈ hiển thị khi có Live Demo hoặc Sandbox mô phỏng) -->
    <div v-if="projectType !== 'ops'" class="compact-project__mockup">
      <ProjectMockupPreview :project="project" mini />
    </div>
    <!-- 2. Banner chuyên trách cho dự án hạ tầng & bảo trì nội bộ (KHÔNG BROWSER GIẢ) -->
    <div v-else class="compact-project__ops-banner">
      <div class="ops-banner-chip">
        <BaseIcon :name="project.icon || 'refresh'" class="ops-icon" />
        <span>Hệ thống nội bộ &bull; Vận hành</span>
      </div>
      <span v-if="project.period" class="ops-period font-mono">{{ project.period }}</span>
    </div>

    <div class="compact-project__body">
      <header>
        <div class="compact-project__meta">
          <!-- 1. Badge nhận diện minh bạch: Live Demo / Interactive UI / Vận hành nội bộ -->
          <span
            class="compact-badge-type"
            :class="`compact-badge-type--${projectType}`"
          >
            <span v-if="badgeConfig.dot" class="status-dot animate-ping" />
            <BaseIcon v-else-if="badgeConfig.icon" :name="badgeConfig.icon" class="badge-icon" />
            <span>{{ badgeConfig.text }}</span>
          </span>

          <span v-if="project.domain" class="compact-tag">{{ project.domain }}</span>
          <span v-else-if="project.status" class="compact-tag">{{ project.status }}</span>
          <span v-if="projectType !== 'ops' && project.period">{{ project.period }}</span>
        </div>
        <h4 :id="`project-title-${project.id}`" class="compact-project__title font-display">
          {{ project.name }}
        </h4>
        <p v-if="project.role" class="compact-project__role">{{ project.role }}</p>
      </header>

      <p v-if="project.description" class="compact-project__desc">
        {{ project.description }}
      </p>

      <!-- Với dự án Ops: Hiển thị gạch đầu dòng công việc thực tế ngay trên mặt card -->
      <ul
        v-if="projectType === 'ops' && project.achievements?.length"
        class="compact-project__ops-checklist"
        role="list"
        aria-label="Các đầu việc chính"
      >
        <li
          v-for="(ach, achIdx) in project.achievements"
          :key="achIdx"
          class="ops-check-item"
        >
          <span class="ops-check-icon" aria-hidden="true">✓</span>
          <span class="ops-check-text">{{ ach }}</span>
        </li>
      </ul>

      <footer class="compact-project__footer">
        <ul v-if="project.techStack?.length" class="compact-project__tags" role="list" aria-label="3 công nghệ chính">
          <li
            v-for="tech in project.techStack.slice(0, 3)"
            :key="tech"
            class="compact-project__tag"
          >
            {{ tech }}
          </li>
        </ul>
        <div class="compact-project__actions">
          <!-- Nhóm 1 (Live Demo): Links ra bài viết/demo thực tế -->
          <ProductLinks v-if="links.length" :links="links" compact />

          <!-- Nhóm 2 (Sandbox mô phỏng): Nút "✨ Khám phá Sandbox" -->
          <button
            v-if="projectType === 'sandbox'"
            type="button"
            class="compact-project__btn compact-project__btn--sandbox"
            @click="openLightbox(project)"
            :aria-label="`Khám phá sandbox mô phỏng cho ${project.name}`"
          >
            <BaseIcon name="layers" class="btn-icon" />
            <span>✨ Khám phá Sandbox</span>
            <BaseIcon name="arrow" class="btn-arrow" />
          </button>

          <!-- Nút phụ cho dự án Live: Chi tiết kiến trúc -->
          <button
            v-else-if="projectType === 'live' && links.length"
            type="button"
            class="compact-project__btn"
            @click="openLightbox(project)"
            :aria-label="`Xem chi tiết kiến trúc ${project.name}`"
          >
            <BaseIcon name="sparkle" class="btn-icon" />
            <span>Chi tiết kiến trúc</span>
            <BaseIcon name="arrow" class="btn-arrow" />
          </button>

          <!-- Nhóm 3 (Bảo trì / Vận hành): KHÔNG HIỂN THỊ NÚT "Xem Demo UI" GIẢ NỮA! -->
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped>
/* Case study card container */
.case-study-card {
  position: relative;
  border-radius: 1.25rem;
  padding: 1rem;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
}

@media (min-width: 640px) {
  .case-study-card {
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .case-study-card {
    padding: 2rem;
  }
}

.case-study-card:hover {
  border-color: var(--interactive-border);
  box-shadow: var(--shadow-lg);
}

/* Mockup frame */
.case-study__mockup-frame {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg);
  box-shadow: var(--shadow-sm);
}

/* Stats mini bar */
.case-study__stats-bar {
  padding: 0.55rem 0.75rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--bg-soft) 60%, transparent);
  border: 1px solid var(--border);
}

@media (min-width: 640px) {
  .case-study__stats-bar {
    padding: 0.85rem 1rem;
  }
}

.case-study__stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.2rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--interactive-accent);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .stat-value {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
  }
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
  line-height: 1.25;
  font-weight: 500;
}

/* Fallback achievements */
.case-study__achievements {
  padding: 1rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--bg-soft) 50%, transparent);
  border: 1px solid var(--border);
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.achievement-check {
  color: #10b981;
  font-weight: 700;
  flex-shrink: 0;
}

.achievement-metric {
  color: var(--text);
  font-weight: 600;
}

/* Header & Meta */
.case-study__header-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.case-study__meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.case-study__badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.badge-featured {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-domain {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 500;
  background: var(--bg-soft);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.badge-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
}

.badge-status--live {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.badge-status--video {
  background: rgba(99, 102, 241, 0.12);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.badge-status--ui {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
}

.badge-status--ops {
  background: rgba(100, 116, 139, 0.12);
  color: #94a3b8;
  border: 1px solid rgba(100, 116, 139, 0.25);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: currentColor;
}

.badge-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.case-study__period {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-faint);
}

.period-text {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.period-icon {
  width: 0.75rem;
  height: 0.75rem;
}

/* Title & Description */
.case-study__title {
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.case-study__role {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--interactive-accent);
  margin-top: 0.2rem;
}

.case-study__desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* Points (Challenge & Solution) */
.case-study__points {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.15rem 0;
}

@media (min-width: 640px) {
  .case-study__points {
    gap: 0.75rem;
    padding: 0.25rem 0;
  }
}

.case-study__point {
  padding: 0.55rem 0.75rem;
  border-radius: 0.75rem;
  border-left-width: 3px;
}

@media (min-width: 640px) {
  .case-study__point {
    padding: 0.85rem 1rem;
  }
}

.case-study__point--challenge {
  background: rgba(245, 158, 11, 0.05);
  border-left-color: #f59e0b;
}

.case-study__point--solution {
  background: var(--interactive-soft);
  border-left-color: var(--interactive-accent);
}

.point-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.point-head--challenge {
  color: #d97706;
}

[data-theme="dark"] .point-head--challenge {
  color: #fbbf24;
}

.point-head--solution {
  color: var(--interactive-accent);
}

.point-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: currentColor;
}

.point-text {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Footer & Tech Tags */
.case-study__footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

@media (min-width: 640px) {
  .case-study__footer {
    gap: 0.75rem;
    padding-top: 0.75rem;
  }
}

.case-study__tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

@media (min-width: 640px) {
  .case-study__tech-list {
    gap: 0.4rem;
  }
}

.case-study__tech-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 0.5rem;
  font-size: 0.72rem;
  font-weight: 500;
  background: var(--bg-soft);
  color: var(--text-muted);
  border: 1px solid var(--border);
  transition: border-color 150ms ease, color 150ms ease;
}

@media (min-width: 640px) {
  .case-study__tech-tag {
    padding: 0.25rem 0.65rem;
    font-size: 0.75rem;
  }
}

.case-study__tech-tag:hover {
  border-color: var(--interactive-border);
  color: var(--text);
}

.case-study__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

@media (min-width: 640px) {
  .case-study__actions {
    gap: 0.75rem;
  }
}

.btn-case-study {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border-radius: 0.75rem;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  margin-left: auto;
  transition: all 180ms ease;
}

.btn-case-study:hover {
  background: var(--interactive-accent);
  color: #fff;
  transform: translateY(-1px);
}

.btn-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.btn-arrow {
  width: 0.85rem;
  height: 0.85rem;
  transition: transform 180ms ease;
}

.btn-case-study:hover .btn-arrow {
  transform: translateX(2px);
}

/* Compact project card */
.compact-project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  padding: 0.85rem;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
  min-width: 0;
  max-width: 100%;
}

@media (min-width: 640px) {
  .compact-project-card {
    padding: 1.15rem;
  }
}

.compact-project-card:hover {
  transform: translateY(-3px);
  border-color: var(--interactive-border);
  box-shadow: var(--shadow-hover);
}

.compact-project__mockup {
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 0.75rem;
  background: var(--bg);
  flex-shrink: 0;
}

.compact-project__ops-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.ops-banner-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
}

.ops-banner-chip .ops-icon {
  width: 0.85rem;
  height: 0.85rem;
  color: var(--accent);
}

.ops-period {
  font-size: 0.68rem;
  color: var(--text-faint);
}

.compact-project__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 0.75rem;
  min-width: 0;
}

.compact-project__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-faint);
}

.compact-tag {
  padding: 0.15rem 0.5rem;
  border-radius: 0.35rem;
  background: var(--bg-soft);
  color: var(--text-muted);
}

.compact-project__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .compact-project__mockup {
    display: none;
  }

  .compact-project-card {
    padding: 0.9rem;
  }

  .compact-project__title {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    overflow-wrap: anywhere;
    line-height: 1.35;
  }

  .compact-project__desc {
    -webkit-line-clamp: 2;
  }

  .compact-project__meta,
  .compact-project__footer,
  .compact-project__actions {
    min-width: 0;
    max-width: 100%;
  }

  .compact-project__btn {
    margin-left: 0;
    max-width: 100%;
  }
}

.compact-project__role {
  font-size: 0.75rem;
  color: var(--interactive-accent);
  font-weight: 500;
  margin-top: 0.15rem;
}

.compact-project__desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.compact-project__footer {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.compact-project__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.compact-project__tag {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  border-radius: 0.35rem;
  font-size: 0.7rem;
  font-weight: 500;
  background: var(--bg-soft);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.compact-project__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.compact-project__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 0.5rem;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
  transition: all 150ms ease;
}

.compact-project__btn:hover {
  background: var(--interactive-accent);
  color: #fff;
}

.compact-badge-type {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 600;
  white-space: nowrap;
}

.compact-badge-type--live {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.compact-badge-type--sandbox {
  background: rgba(139, 92, 246, 0.12);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.25);
}

.compact-badge-type--ops {
  background: rgba(100, 116, 139, 0.12);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.compact-project__ops-checklist {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.25rem;
  padding: 0.55rem 0.75rem;
  background: var(--bg-soft);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
}

.ops-check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--text-muted);
}

.ops-check-icon {
  color: #10b981;
  font-weight: bold;
  font-size: 0.75rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

.compact-project__btn--sandbox {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.25);
}

.compact-project__btn--sandbox:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  color: #c4b5fd;
}

@media (prefers-reduced-motion: reduce) {
  .case-study-card,
  .compact-project-card,
  .btn-case-study,
  .compact-project__btn {
    transition: none;
  }
}
</style>
