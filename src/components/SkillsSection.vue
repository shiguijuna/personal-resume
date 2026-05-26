<script setup lang="ts">
const skills: { name: string; icon: string }[] = [
  { name: 'Vue2', icon: 'vue' },
  { name: 'Vue3', icon: 'vue' },
  { name: 'Nuxt', icon: 'nuxt' },
  { name: 'uni-app', icon: 'app' },
  { name: '微信小程序', icon: 'app' },
  { name: 'Element Plus', icon: 'element' },
  { name: 'Vant', icon: 'vant' },
  { name: 'ECharts', icon: 'echarts' },
  { name: 'Axios', icon: 'axios' },
  { name: 'Pinia / Vuex', icon: 'pinia' },
  { name: 'Sass', icon: 'sass' },
  { name: 'Git', icon: 'git' },
]
</script>

<template>
  <section id="skills" class="section-block section-anchor animate-scroll" aria-labelledby="skills-title">
    <div class="section-heading">
      <h2 id="skills-title">技术栈</h2>
    </div>
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.name" class="skill-item">
        <span class="icon-box">
          <TechIcon :name="skill.icon" />
        </span>
        <strong>{{ skill.name }}</strong>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-anchor {
  @include shared.section-anchor;
}
.section-block {
  @include shared.section-block;
}
.section-heading {
  @include shared.section-heading;
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.skill-item {
  display: flex;
  min-height: 72px;
  align-items: center;
  gap: 14px;
  padding: 0 22px;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
}
.skill-item .icon-box {
  display: inline-flex;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 6px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 8px;
}
.skill-item .icon-box svg {
  width: 100%;
  height: 100%;
}
.skill-item strong {
  color: var(--color-about-secondary);
  font-size: 15px;
}
@media (max-width: 1120px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 760px) {
  .section-block {
    width: min(100% - 32px, var(--container));
  }
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
