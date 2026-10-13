<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { community, education } from '../data/profile'
</script>

<template>
  <section id="education" aria-labelledby="edu-title" class="education-section py-8 sm:py-12 lg:py-16 scroll-mt-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHead
        eyebrow="04 — Nền tảng"
        title="Học vấn &amp; cộng đồng"
        title-id="edu-title"
      />
      <div class="duo grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <article v-reveal v-spotlight class="card info card--spotlight-layer p-4 sm:p-6 rounded-2xl">
          <div class="card-spotlight" aria-hidden="true" />
          <div class="info__icon"><BaseIcon name="cap" /></div>
          <h3>{{ education.institution }}</h3>
          <div class="info__meta">{{ education.period }}</div>
          <p class="info__label">{{ education.degree }}</p>
          <p>{{ education.text }}</p>
        </article>
        <article v-reveal="80" v-spotlight class="card info card--spotlight-layer p-4 sm:p-6 rounded-2xl">
          <div class="card-spotlight" aria-hidden="true" />
          <div class="info__icon"><BaseIcon name="code" /></div>
          <h3>{{ community.title }}</h3>
          <div class="info__meta">{{ community.period }}</div>
          <p class="info__label">{{ community.role }}</p>
          <p>{{ community.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
