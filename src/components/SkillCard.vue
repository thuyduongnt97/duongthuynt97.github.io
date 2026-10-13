<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  skill: { type: Object, required: true },
  fullWidth: { type: Boolean, default: false },
})
</script>

<template>
  <article
    v-reveal
    v-spotlight
    class="card card--spotlight-layer bento-card"
    :class="{ 'bento-card--full': fullWidth || skill.type === 'highlights' }"
    :aria-label="skill.title"
  >
    <div class="card-spotlight" aria-hidden="true" />
    <header class="bento-card__head">
      <div class="bento-card__icon" aria-hidden="true">
        <BaseIcon :name="skill.icon || 'code'" />
      </div>
      <div class="bento-card__titles">
        <h3 class="bento-card__title">{{ skill.title }}</h3>
        <p v-if="skill.subtitle" class="bento-card__subtitle">{{ skill.subtitle }}</p>
      </div>
    </header>

    <div v-if="skill.type === 'highlights' || skill.highlights" class="bento-card__body">
      <ul class="bento-highlights grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4" role="list" :aria-label="skill.title">
        <li
          v-for="(item, idx) in skill.highlights"
          :key="idx"
          class="bento-highlight-item"
          :class="[
            idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
            idx === 4 ? 'md:col-span-2 lg:col-span-3' : ''
          ]"
        >
          <span class="bento-highlight-bullet" aria-hidden="true">
            <BaseIcon name="check" />
          </span>
          <div class="bento-highlight-content">
            <strong class="bento-highlight-title">{{ item.title }}</strong>
            <p v-if="item.desc" class="bento-highlight-desc hidden sm:block">{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="bento-card__body">
      <ul class="bento-pills" role="list" :aria-label="skill.title">
        <li
          v-for="chip in skill.chips"
          :key="chip"
          class="bento-pill"
        >
          {{ chip }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.bento-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface-solid);
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
}

@media (min-width: 640px) {
  .bento-card {
    padding: 1.5rem;
    border-radius: 16px;
  }
}

.bento-card.reveal.is-visible {
  transition: opacity .35s var(--ease), transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
}

.bento-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: var(--shadow-hover);
}

[data-theme="dark"] .bento-card:hover {
  border-color: var(--border-strong);
}

.bento-card--full {
  padding: 1rem;
}

@media (min-width: 640px) {
  .bento-card--full {
    padding: 1.5rem 1.75rem;
  }
}

.bento-card__head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

@media (min-width: 640px) {
  .bento-card__head {
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }
}

.bento-card__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
}

@media (min-width: 640px) {
  .bento-card__icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
}

.bento-card__icon .icon {
  width: 1.15rem;
  height: 1.15rem;
}

@media (min-width: 640px) {
  .bento-card__icon .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.bento-card__titles {
  min-width: 0;
}

.bento-card__title {
  color: var(--text);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.015em;
  overflow-wrap: anywhere;
}

@media (min-width: 640px) {
  .bento-card__title {
    font-size: 1.15rem;
  }
}

.bento-card__subtitle {
  margin-top: 0.15rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1.45;
}

@media (min-width: 640px) {
  .bento-card__subtitle {
    margin-top: 0.2rem;
    font-size: 0.8125rem;
  }
}

.bento-card__body {
  flex: 1 1 auto;
  min-width: 0;
}

/* Bento Badges / Pills */
.bento-pills {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.35rem;
}

@media (min-width: 640px) {
  .bento-pills {
    gap: 0.5rem;
  }
}

.bento-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.4;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
  overflow-wrap: anywhere;
  transition: transform 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

@media (min-width: 640px) {
  .bento-pill {
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
  }
}

.bento-pill:hover {
  transform: translateY(-1px);
  background: var(--bg-soft);
  color: var(--text);
  border-color: var(--accent);
}

/* Card Thế mạnh thực chiến: Bullet Points */
.bento-highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg-soft) 60%, transparent);
  border: 1px solid var(--border);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

@media (min-width: 640px) {
  .bento-highlight-item {
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
  }
}

.bento-highlight-item:hover {
  transform: translateY(-2px);
  border-color: var(--interactive-border);
  box-shadow: var(--shadow-sm);
}

.bento-highlight-bullet {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
}

@media (min-width: 640px) {
  .bento-highlight-bullet {
    width: 22px;
    height: 22px;
    margin-top: 0.1rem;
  }
}

.bento-highlight-bullet .icon {
  width: 0.65rem;
  height: 0.65rem;
}

@media (min-width: 640px) {
  .bento-highlight-bullet .icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}

.bento-highlight-content {
  min-width: 0;
}

.bento-highlight-title {
  display: block;
  color: var(--text);
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.35;
}

@media (min-width: 640px) {
  .bento-highlight-title {
    font-size: 0.875rem;
    line-height: 1.4;
  }
}

.bento-highlight-desc {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.8125rem;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .bento-card, .bento-pill, .bento-highlight-item {
    transition: none;
  }
}
</style>
