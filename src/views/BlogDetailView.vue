<script setup lang="ts">
import { getNextPost, getPostBySlug } from '@/data/posts'
import { getProjectBySlug } from '@/data/projects'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { siteConfig } from '@/constants'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const post = getPostBySlug(slug)

if (!post) {
  router.replace('/404')
}

const relatedProject = post ? getProjectBySlug(post.projectSlug) : undefined
const nextPost = post ? getNextPost(post.slug) : undefined
const articleToc = [
  '项目背景',
  '前端组织',
  '核心链路',
  '落地经验',
]

useHead({
  title: post ? `${post.title} | ${siteConfig.title} 博客` : '文章不存在',
  meta: [
    { name: 'description', content: post?.desc || '' },
    { name: 'keywords', content: post ? ['shiguijun', post.title, ...post.tags].join(',') : '' },
  ],
})
</script>

<template>
  <div v-if="post" class="blog-page">
    <main id="main-content" class="blog-shell">
      <nav class="breadcrumb" aria-label="面包屑导航">
        <RouterLink to="/#home">首页</RouterLink>
        <span>/</span>
        <RouterLink to="/#blog">博客精选</RouterLink>
        <span>/</span>
        <strong>{{ post.title }}</strong>
      </nav>

      <section class="article-hero">
        <span class="project-source">{{ post.projectTitle }}</span>
        <h1>{{ post.title }}</h1>
        <p>{{ post.desc }}</p>
        <div class="article-meta">
          <time>{{ post.date }}</time>
          <span>{{ post.readingTime }}</span>
          <span>{{ post.tag }}</span>
        </div>
        <div class="tag-list">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </section>

      <div class="article-layout">
        <article class="article-main">
          <section class="article-section article-guide">
            <h2>文章导读</h2>
            <div class="guide-grid">
              <span v-for="item in articleToc" :key="item">{{ item }}</span>
            </div>
          </section>

          <section class="article-section">
            <h2>复盘正文</h2>
            <p v-for="paragraph in post.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </section>

          <section class="article-section">
            <h2>关键实践</h2>
            <ul class="practice-list">
              <li v-for="item in post.practices" :key="item">{{ item }}</li>
            </ul>
          </section>
        </article>

        <aside class="article-side">
          <h2>文章信息</h2>
          <dl>
            <div>
              <dt>关联项目</dt>
              <dd>{{ post.projectTitle }}</dd>
            </div>
            <div>
              <dt>文章分类</dt>
              <dd>{{ post.tag }}</dd>
            </div>
            <div>
              <dt>阅读时间</dt>
              <dd>{{ post.readingTime }}</dd>
            </div>
          </dl>
          <div class="side-block">
            <strong>技术标签</strong>
            <div class="tag-list compact">
              <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
          <div v-if="relatedProject" class="side-block">
            <strong>关联项目</strong>
            <p>{{ relatedProject.desc }}</p>
            <RouterLink :to="`/projects/${relatedProject.slug}`">查看项目详情</RouterLink>
          </div>
        </aside>
      </div>

      <div class="article-actions">
        <RouterLink class="outline-action" to="/#blog">返回博客精选</RouterLink>
        <RouterLink v-if="nextPost" class="primary-action" :to="`/blog/${nextPost.slug}`">
          下一篇：{{ nextPost.projectTitle }}
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.blog-page {
  min-height: 100vh;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 96%, var(--color-primary)) 0%, var(--color-bg) 400px);
}

.blog-shell {
  width: min(100% - 48px, var(--container));
  margin: 0 auto;
  padding: 34px 0 56px;
}

.breadcrumb { @include shared.breadcrumb; }

.article-hero {
  margin-top: 42px;
  padding-bottom: 34px;
  border-bottom: 1px solid var(--color-line);

  h1 {
    max-width: 980px;
    margin-top: 12px;
    color: var(--color-ink);
    font-size: clamp(34px, 5.6vw, 56px);
    line-height: 1.14;
    letter-spacing: 0;
  }

  p {
    max-width: 860px;
    margin-top: 18px;
    color: var(--color-muted);
    font-size: 18px;
  }
}

.project-source {
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 900;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
  color: var(--color-muted);
  font-size: 14px;
}

.tag-list { @include shared.tag-list; }

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 36px;
  margin-top: 36px;
  align-items: start;
}

.article-main,
.article-side {
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
}

.article-main {
  padding: 34px;
}

.article-section {
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
    margin-top: 16px;
    color: var(--color-ink);
    font-size: 16px;
    line-height: 1.9;
    opacity: 0.85;
  }
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;

  span {
    min-height: 58px;
    padding: 18px 14px;
    color: var(--color-ink);
    font-weight: 800;
    text-align: center;
    background: var(--color-soft);
    border: 1px solid var(--color-line);
    border-radius: 8px;
  }
}

.practice-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
  padding-left: 0;
  color: var(--color-ink);
  list-style: none;
  opacity: 0.88;

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

.article-side { @include shared.sidebar-card; }

.side-block { @include shared.sidebar-block; }

.article-actions { @include shared.action-pair; }

.outline-action { @include shared.outline-action; }
.primary-action { @include shared.primary-action; }

@media (max-width: 920px) {
  .article-layout {
    grid-template-columns: 1fr;
  }

  .article-side {
    position: static;
  }
}

@media (max-width: 640px) {
  .blog-shell {
    width: min(100% - 32px, var(--container));
    padding-top: 24px;
  }

  .article-main,
  .article-side {
    padding: 22px;
  }

  .article-actions {
    display: grid;
  }

  .guide-grid {
    grid-template-columns: 1fr;
  }
}
</style>
