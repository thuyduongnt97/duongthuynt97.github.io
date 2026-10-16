<script setup>
import { onMounted } from 'vue'
import IconSprite from './components/IconSprite.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BackgroundFx from './components/BackgroundFx.vue'
import AppNav from './components/AppNav.vue'
import CommandPalette from './components/CommandPalette.vue'
import ProjectLightboxModal from './components/ProjectLightboxModal.vue'
import HeroSection from './components/HeroSection.vue'
import RecognitionSection from './components/RecognitionSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import CareerTimeline from './components/CareerTimeline.vue'
import AppFooter from './components/AppFooter.vue'
import { forceUnlockScroll } from './utils/scrollLock.js'
import { useSkillCategory } from './composables/useSkillCategory.js'

// Một state cho cả chọn kỹ năng, bộ lọc dự án và Command Palette.
const { selectedSkillCategory, selectSkillCategory } = useSkillCategory()

onMounted(() => {
  forceUnlockScroll()
})
</script>

<template>
  <a class="skip-link" href="#main">Bỏ qua đến nội dung chính</a>
  <IconSprite />
  <ScrollProgress />
  <BackgroundFx />
  <AppNav />
  <CommandPalette />
  <ProjectLightboxModal />

  <main id="main" class="max-w-7xl mx-auto overflow-x-hidden px-4 sm:px-6 lg:overflow-visible">
    <!-- 1. Hero Section -->
    <HeroSection />

    <!-- 2. Recognition & Awards Banner -->
    <RecognitionSection />

    <!-- 3. Dual-View Skill Matrix -->
    <SkillsSection
      :active-category="selectedSkillCategory"
      @select-category="selectSkillCategory"
    />

    <!-- 4. Deliverables & Selected Samples -->
    <ExperienceSection
      :active-category="selectedSkillCategory"
      @update:active-category="selectSkillCategory"
    />

    <!-- 5. Career Timeline -->
    <CareerTimeline />
  </main>

  <!-- Footer (id="contact") -->
  <AppFooter />
</template>
