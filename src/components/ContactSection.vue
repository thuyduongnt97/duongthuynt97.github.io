<script setup>
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
</script>

<template>
  <section id="contact" class="contact py-8 sm:py-12 lg:py-16 scroll-mt-24" aria-labelledby="contact-title">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-reveal class="cta p-5 sm:p-8 lg:p-12">
        <span class="eyebrow">06 — Liên hệ</span>
        <h2 id="contact-title">Cùng phát triển <span class="gradient-text">sản phẩm web</span></h2>
        <p>Kết nối với mình về frontend, landing page, trải nghiệm tương tác hoặc phát triển sản phẩm fullstack.</p>
        <div class="cta__row flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6">
          <a v-if="profile.email" class="btn btn--primary" :href="`mailto:${profile.email}`">
            <BaseIcon name="mail" /> Gửi email
          </a>
          <a v-if="profile.github" class="btn btn--ghost" :href="profile.github" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="github" /> GitHub
          </a>
          <a v-if="profile.linkedin" class="btn btn--ghost" :href="profile.linkedin" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="linkedin" /> LinkedIn
          </a>
          <a class="btn btn--ghost" :href="profile.cvUrl" download>
            <BaseIcon name="download" /> Tải CV (PDF)
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
