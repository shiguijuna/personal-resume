<template>
  <div class="portfolio-page">
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <AdvantageSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
    </main>
    <ContactSection />
  </div>
</template>

<style lang="scss" scoped>
.portfolio-page {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-soft) 72%, transparent), var(--color-bg) 520px),
    var(--color-bg);
}
</style>