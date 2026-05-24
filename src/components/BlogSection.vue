<script setup lang="ts">
import { posts } from '@/data/posts'

const featuredPost = posts[0]
const morePosts = posts.slice(1)
</script>

<template>
  <section id="blog" class="section-block section-anchor animate-scroll">
    <div class="section-heading section-heading-row">
      <div>
        <h2>博客精选</h2>
        <p>围绕 5 个项目整理的前端实践复盘，把权限、支付、分包、数据可视化等经验讲清楚。</p>
      </div>
      <span>共 {{ posts.length }} 篇文章</span>
      <RouterLink to="/blog" class="view-all-link">
        查看全部
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </RouterLink>
    </div>
    <div class="blog-feature-layout">
      <RouterLink v-if="featuredPost" class="blog-feature-card" :to="`/blog/${featuredPost.slug}`">
        <div class="blog-cover">
          <img
            :src="featuredPost.image"
            :alt="`${featuredPost.projectTitle} 文章封面`"
            loading="lazy"
            width="400"
            height="210"
          />
          <span>{{ featuredPost.tag }}</span>
          <strong>{{ featuredPost.projectTitle }}</strong>
        </div>
        <div class="blog-content">
          <span class="blog-project">重点复盘</span>
          <h3>{{ featuredPost.title }}</h3>
          <p>{{ featuredPost.desc }}</p>
          <div class="tag-list mini">
            <span v-for="tag in featuredPost.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
          </div>
          <div class="blog-meta">
            <span>{{ featuredPost.readingTime }}</span>
            <time>{{ featuredPost.date }}</time>
            <strong>阅读全文</strong>
          </div>
        </div>
      </RouterLink>

      <div class="blog-grid">
        <RouterLink
          v-for="post in morePosts"
          :key="post.slug"
          class="blog-card"
          :to="`/blog/${post.slug}`"
        >
          <div class="blog-compact-head">
            <img
              :src="post.image"
              :alt="`${post.projectTitle} 文章封面`"
              loading="lazy"
              width="300"
              height="108"
            />
            <span>{{ post.tag }}</span>
            <time>{{ post.date }}</time>
          </div>
          <div class="blog-content">
            <span class="blog-project">{{ post.projectTitle }}</span>
            <h3>{{ post.title }}</h3>
            <p>{{ post.desc }}</p>
            <div class="blog-meta">
              <span>{{ post.readingTime }}</span>
              <strong>阅读全文</strong>
            </div>
          </div>
        </RouterLink>
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
.section-heading-row {
  @include shared.section-heading-row;
}
.blog-feature-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 24px;
  align-items: stretch;
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.blog-card,
.blog-feature-card {
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  @include shared.card-hover;
}
.blog-feature-card {
  display: grid;
  min-height: 460px;
  grid-template-rows: 210px minmax(0, 1fr);
}
.blog-content {
  padding: 18px 20px 20px;
}
.blog-content .blog-project {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
}
.blog-content h3 {
  margin-top: 8px;
  color: var(--color-ink);
  font-size: 20px;
  line-height: 1.35;
}
.blog-content p {
  min-height: 72px;
  margin-top: 8px;
  color: var(--color-muted);
  font-size: 14px;
}
.blog-cover {
  position: relative;
  display: flex;
  min-height: 132px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 18px;
  background: var(--color-dark-section);
}
.blog-cover::after {
  position: absolute;
  inset: 0;
  content: '';
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-ink) 38%, transparent),
      color-mix(in srgb, var(--color-ink) 82%, transparent)
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-primary) 16%, transparent),
      transparent 42%
    );
}
.blog-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blog-cover span {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 6px;
}
.blog-cover strong {
  position: relative;
  z-index: 1;
  max-width: 320px;
  color: #fff;
  font-size: 24px;
  line-height: 1.25;
}
.blog-compact-head {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  min-height: 108px;
  overflow: hidden;
  padding: 14px 18px;
  color: #fff;
  font-size: 12px;
  background: var(--color-dark-section);
  border-bottom: 1px solid var(--color-line);
}
.blog-compact-head::after {
  position: absolute;
  inset: 0;
  content: '';
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-ink) 22%, transparent),
      color-mix(in srgb, var(--color-ink) 76%, transparent)
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-primary) 14%, transparent),
      transparent 48%
    );
}
.blog-compact-head img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blog-compact-head span {
  position: relative;
  z-index: 1;
  height: fit-content;
  padding: 5px 9px;
  color: #fff;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
}
.blog-compact-head time {
  position: relative;
  z-index: 1;
  color: rgba(255, 255, 255, 0.88);
}
.blog-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 18px;
  color: var(--color-muted);
  font-size: 13px;
}
.blog-meta strong {
  margin-left: auto;
  color: var(--color-primary);
  font-weight: 800;
}
.tag-list.mini {
  margin-top: 16px;
}
.tag-list.mini span {
  font-size: 12px;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
  transition:
    gap 0.2s,
    opacity 0.2s;

  &:hover {
    gap: 10px;
    opacity: 0.8;
  }
}

@media (max-width: 1120px) {
  .blog-feature-layout {
    grid-template-columns: repeat(2, 1fr);
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 760px) {
  .section-block {
    width: min(100% - 32px, var(--container));
  }
  .blog-feature-layout {
    grid-template-columns: 1fr;
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
  .blog-feature-card {
    min-height: auto;
    grid-template-rows: auto;
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
