<script setup lang="ts">
import { getNextProject, getProjectBySlug } from '@/data/projects'
import { getPostByProjectSlug } from '@/data/posts'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { siteConfig } from '@/constants'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const project = getProjectBySlug(slug)

if (!project) {
  router.replace('/404')
}

const nextProject = project ? getNextProject(project.slug) : undefined
const relatedPost = project ? getPostByProjectSlug(project.slug) : undefined

useHead({
  title: project ? `${project.title} | ${siteConfig.title} 项目经历` : '项目不存在',
  meta: [
    { name: 'description', content: project?.desc || '' },
    {
      name: 'keywords',
      content: project ? ['shiguijun', project.title, ...project.tags].join(',') : '',
    },
  ],
})
</script>

<template>
  <div v-if="project" class="project-page">
    <main id="main-content" class="project-shell">
      <nav class="breadcrumb" aria-label="面包屑导航">
        <RouterLink to="/#home">首页</RouterLink>
        <span>/</span>
        <RouterLink to="/#projects">项目经历</RouterLink>
        <span>/</span>
        <strong>{{ project.title }}</strong>
      </nav>

      <section class="detail-hero">
        <div>
          <h1>{{ project.title }}</h1>
          <p>{{ project.desc }}</p>
          <div class="tag-list">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </section>

      <div class="detail-layout">
        <article class="detail-main">
          <section class="detail-section">
            <h2>项目概述</h2>
            <p>{{ project.desc }}</p>
          </section>

          <section class="detail-section">
            <h2>我的职责</h2>
            <ul class="text-list">
              <li v-for="item in project.responsibilities" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section class="detail-section">
            <h2>技术实现</h2>
            <ul class="text-list">
              <li v-for="item in project.implementation" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section class="detail-section">
            <h2>功能模块</h2>
            <div class="module-grid">
              <span v-for="item in project.modules" :key="item">{{ item }}</span>
            </div>
          </section>

          <section class="detail-section">
            <h2>项目亮点</h2>
            <ul class="highlight-list">
              <li v-for="item in project.highlights" :key="item">{{ item }}</li>
            </ul>
          </section>
        </article>

        <aside class="summary-card">
          <h2>项目概览</h2>
          <dl>
            <div>
              <dt>项目角色</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div>
              <dt>项目周期</dt>
              <dd>{{ project.period }}</dd>
            </div>
            <div>
              <dt>项目类型</dt>
              <dd>{{ project.type }}</dd>
            </div>
            <div>
              <dt>运行平台</dt>
              <dd>{{ project.platform }}</dd>
            </div>
          </dl>
          <div class="summary-block">
            <strong>技术栈</strong>
            <div class="tag-list compact">
              <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="summary-block">
            <strong>核心模块</strong>
            <ul>
              <li v-for="item in project.modules.slice(0, 6)" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div v-if="relatedPost" class="summary-block">
            <strong>项目复盘</strong>
            <p>{{ relatedPost.desc }}</p>
            <RouterLink :to="`/blog/${relatedPost.slug}`">阅读技术文章</RouterLink>
          </div>
        </aside>
      </div>

      <div class="detail-actions">
        <RouterLink class="outline-action" to="/#projects">返回项目列表</RouterLink>
        <RouterLink v-if="nextProject" class="primary-action" :to="`/projects/${nextProject.slug}`">
          查看下一个项目
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.project-page {
  min-height: 100vh;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-soft) 80%, transparent),
      var(--color-bg) 380px
    ),
    var(--color-bg);
}

.project-shell {
  width: min(100% - 48px, var(--container));
  margin: 0 auto;
  padding: 34px 0 56px;
}

.breadcrumb {
  @include shared.breadcrumb;
}

.detail-hero {
  margin-top: 42px;
  padding-bottom: 34px;
  border-bottom: 1px solid var(--color-line);

  h1 {
    color: var(--color-ink);
    font-size: clamp(38px, 6vw, 60px);
    line-height: 1.12;
    letter-spacing: 0;
  }

  p {
    max-width: 860px;
    margin-top: 18px;
    color: var(--color-subtle);
    font-size: 18px;
  }
}

.tag-list {
  @include shared.tag-list;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 36px;
  margin-top: 36px;
  align-items: start;
}

.detail-main,
.summary-card {
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
}

.detail-main {
  padding: 34px;
}

.detail-section {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--color-line);

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }

  h2 {
    color: var(--color-ink);
    font-size: 24px;
  }

  p {
    margin-top: 14px;
    color: var(--color-subtle);
  }
}

.text-list,
.highlight-list {
  display: grid;
  gap: 10px;
  margin-top: 16px;
  padding-left: 20px;
  color: var(--color-subtle);
  list-style: disc;
}

.highlight-list {
  list-style: none;
  padding-left: 0;

  li {
    position: relative;
    padding-left: 24px;

    &::before {
      position: absolute;
      left: 0;
      top: 2px;
      color: var(--color-accent);
      content: '\2713';
      font-weight: 900;
    }
  }
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;

  span {
    padding: 16px;
    color: var(--color-about-secondary);
    font-weight: 700;
    background: var(--color-soft);
    border: 1px solid var(--color-line);
    border-radius: 8px;
  }
}

.summary-card {
  @include shared.sidebar-card;
}

.summary-block {
  @include shared.sidebar-block;
}

.detail-actions {
  @include shared.action-pair;
}

.outline-action {
  @include shared.outline-action;
}
.primary-action {
  @include shared.primary-action;
}

@media (max-width: 920px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }
}

@media (max-width: 640px) {
  .project-shell {
    width: min(100% - 32px, var(--container));
    padding-top: 24px;
  }

  .detail-main,
  .summary-card {
    padding: 22px;
  }

  .module-grid,
  .detail-actions {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    display: grid;
  }
}
</style>
