<script setup lang="ts">
import { projects } from '@/data/projects'
</script>

<template>
  <section id="projects" class="section-block section-anchor animate-scroll" aria-labelledby="projects-title">
    <div class="section-heading section-heading-row">
      <div>
        <h2 id="projects-title">项目经历</h2>
        <p>每个项目都可以进入详情页，查看职责、模块和技术实现。</p>
      </div>
      <span>共 {{ projects.length }} 个项目</span>
    </div>
    <div class="project-grid">
      <RouterLink
        v-for="project in projects"
        :key="project.slug"
        class="project-card"
        :to="`/projects/${project.slug}`"
      >
        <div class="project-preview">
          <img
            :src="project.image"
            :alt="`${project.title} 项目图片`"
            loading="lazy"
            width="150"
            height="132"
          />
        </div>
        <div class="project-body">
          <h3>{{ project.title }}</h3>
          <div class="tag-list">
            <span v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
          </div>
          <p>{{ project.desc }}</p>
          <ul>
            <li v-for="point in project.points" :key="point">{{ point }}</li>
          </ul>
          <strong class="detail-link">查看详情</strong>
        </div>
      </RouterLink>
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
.section-heading-row {
  @include shared.section-heading-row;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.project-card {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 20px;
  min-height: 248px;
  padding: 20px;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
  @include shared.card-hover;
}
.project-preview {
  overflow: hidden;
  align-self: start;
  min-height: 132px;
  background: var(--color-preview-bg);
  border-radius: 6px;
}
.project-preview img {
  display: block;
  width: 100%;
  height: 132px;
  object-fit: cover;
}
.project-body h3 {
  color: var(--color-ink);
  font-size: 18px;
  line-height: 1.35;
}
.project-body p {
  margin-top: 12px;
  color: var(--color-muted);
  font-size: 14px;
}
.project-body ul {
  display: grid;
  gap: 5px;
  margin-top: 12px;
  padding-left: 16px;
  color: var(--color-list-text);
  font-size: 13px;
  list-style: disc;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.tag-list span {
  padding: 3px 8px;
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 700;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  border-radius: 6px;
}
.detail-link {
  display: inline-flex;
  margin-top: 16px;
  color: var(--color-primary);
  font-size: 14px;
}
@media (max-width: 1120px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 760px) {
  .section-block {
    width: min(100% - 32px, var(--container));
  }
  .project-grid {
    grid-template-columns: 1fr;
  }
  .project-card {
    grid-template-columns: 1fr;
  }
  .section-heading-row {
    display: block;
  }
  .section-heading-row > span {
    display: block;
    margin-top: 8px;
  }
}
</style>
