<script setup lang="ts">
import { posts, getAllTags } from '@/data/posts'
import { useHead } from '@unhead/vue'
import { siteConfig } from '@/constants'

const allTags = getAllTags()
const activeTag = ref<string>('')

const filteredPosts = computed(() => {
  if (!activeTag.value) return posts
  return posts.filter((post) => post.tags.includes(activeTag.value))
})

const animateStaggerClass = (index: number): string => {
  const pos = index % 6
  return pos === 0 ? '' : `animate-stagger-${pos}`
}

useHead({
  title: `博客文章 | ${siteConfig.title}`,
  meta: [
    { name: 'description', content: 'shiguijun 的前端实践博客，涵盖 Vue、小程序、中后台系统、数据可视化等项目的复盘与技术分享。' },
    { name: 'keywords', content: 'shiguijun,前端博客,Vue,小程序,uni-app,中后台,ECharts,技术复盘' },
  ],
})
</script>

<template>
  <div class="blog-listing-page">
    <main id="main-content" class="listing-shell">
      <nav class="breadcrumb" aria-label="面包屑导航">
        <RouterLink to="/#home">首页</RouterLink>
        <span>/</span>
        <strong>博客文章</strong>
      </nav>

      <section class="listing-hero">
        <h1>博客文章</h1>
        <p>围绕 5 个项目整理的前端实践复盘，把权限、支付、分包、数据可视化等经验讲清楚。</p>
        <span class="post-count">共 {{ filteredPosts.length }} 篇文章</span>
      </section>

      <div class="filter-bar">
        <button
          class="filter-tag"
          :class="{ active: activeTag === '' }"
          @click="activeTag = ''"
        >
          全部
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="filter-tag"
          :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <Transition name="list-fade" mode="out-in">
        <div v-if="filteredPosts.length === 0" class="listing-empty">
          <p>没有找到对应标签的文章</p>
        </div>
        <div v-else class="listing-grid">
          <RouterLink
            v-for="(post, idx) in filteredPosts"
            :key="post.slug"
            class="post-card animate-scroll"
            :class="animateStaggerClass(idx)"
            :to="`/blog/${post.slug}`"
          >
            <div class="post-cover">
              <img :src="post.image" :alt="`${post.projectTitle} 文章封面`" loading="lazy" width="400" height="190" />
              <span class="post-tag">{{ post.tag }}</span>
            </div>
            <div class="post-content">
              <span class="post-project">{{ post.projectTitle }}</span>
              <h3>{{ post.title }}</h3>
              <p>{{ post.desc }}</p>
              <div class="post-meta">
                <span>{{ post.readingTime }}</span>
                <time>{{ post.date }}</time>
                <strong>阅读全文</strong>
              </div>
            </div>
          </RouterLink>
        </div>
      </Transition>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.blog-listing-page {
  min-height: 100vh;
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 96%, var(--color-primary)) 0%, var(--color-bg) 400px);
}

.listing-shell {
  width: min(100% - 48px, var(--container));
  margin: 0 auto;
  padding: 34px 0 64px;
}

.breadcrumb { @include shared.breadcrumb; }

.listing-hero {
  margin-top: 42px;
  padding-bottom: 34px;
  border-bottom: 1px solid var(--color-line);

  h1 {
    color: var(--color-ink);
    font-size: clamp(34px, 5.6vw, 56px);
    line-height: 1.14;
    letter-spacing: 0;
  }

  p {
    max-width: 720px;
    margin-top: 18px;
    color: var(--color-muted);
    font-size: 18px;
  }
}

.post-count {
  display: inline-block;
  margin-top: 12px;
  color: var(--color-muted);
  font-size: 15px;
  font-weight: 600;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.filter-tag {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  padding: 0 16px;
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 700;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 20px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s;

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  &.active {
    color: #fff;
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
}

.listing-empty {
  display: flex;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  color: var(--color-muted);
  font-size: 16px;
}

.listing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
}

.post-card {
  display: grid;
  grid-template-rows: 190px minmax(0, 1fr);
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover,
  &:focus-visible {
    border-color: color-mix(in srgb, var(--color-primary) 45%, transparent);
    box-shadow: 0 18px 44px color-mix(in srgb, var(--color-ink) 10%, transparent);
    transform: translateY(-3px);
  }
}

.post-cover {
  position: relative;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 16px;
  background: var(--color-dark-section);

  &::after {
    position: absolute;
    inset: 0;
    content: '';
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--color-ink) 20%, transparent), color-mix(in srgb, var(--color-ink) 72%, transparent)),
      linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 48%);
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.post-tag {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 6px;
}

.post-content {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .post-project {
    color: var(--color-primary);
    font-size: 13px;
    font-weight: 800;
  }

  h3 {
    margin-top: 8px;
    color: var(--color-ink);
    font-size: 18px;
    line-height: 1.35;
  }

  p {
    flex: 1;
    margin-top: 8px;
    color: var(--color-muted);
    font-size: 14px;
  }
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 18px;
  color: var(--color-muted);
  font-size: 13px;

  strong {
    margin-left: auto;
    color: var(--color-primary);
    font-weight: 800;
  }
}

.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.2s ease;
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
}

@media (max-width: 820px) {
  .listing-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .listing-shell {
    width: min(100% - 32px, var(--container));
    padding-top: 24px;
  }
}
</style>
