<script setup lang="ts">
import { contactInfo } from '@/constants'

const profileFacts = [
  { title: '6年前端开发工程师', desc: '长期参与中后台系统、小程序与数据可视化项目' },
  { title: contactInfo.city, desc: '可沟通远程、驻场或本地团队协作' },
  { title: '前端工程师 / 全职 / 一周内到岗', desc: '关注业务落地、页面体验与工程稳定性' },
  { title: '本科 / 上海海洋大学 / 2015.9-2019.7', desc: '具备完整本科教育背景和持续学习能力' },
  { title: contactInfo.phone, desc: '手机号 / 微信同号' },
  { title: contactInfo.email, desc: '电子邮箱' },
]
</script>

<template>
  <section id="about" class="about-section section-anchor animate-scroll" aria-labelledby="about-title">
    <div class="section-heading">
      <h2 id="about-title">关于 shiguijun</h2>
      <p>更完整地展示教育背景、求职意向和可落地的前端业务能力。</p>
    </div>
    <div class="about-layout">
      <aside class="education-card">
        <span class="card-label">Education</span>
        <strong>本科</strong>
        <p>上海海洋大学</p>
        <time>2015.9 - 2019.7</time>
        <div class="intent-list">
          <span>意向岗位：前端工程师</span>
          <span>工作形式：全职</span>
          <span>到岗时间：一周内</span>
        </div>
      </aside>
      <div class="about-main">
        <p class="about-lead">
          我是一名前端开发工程师，过去主要参与中后台管理系统、微信小程序、uni-app
          多端项目和数据可视化页面开发。熟悉从页面还原、接口联调、登录鉴权、权限控制到性能优化的完整流程，也能围绕业务场景沉淀可复用组件和通用请求能力。
        </p>
        <div class="profile-grid">
          <div v-for="item in profileFacts" :key="item.title" class="profile-item">
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-anchor {
  @include shared.section-anchor;
}
.about-section {
  @include shared.section-block;
}
.section-heading {
  @include shared.section-heading;
}
.about-layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 24px;
}
.education-card {
  padding: 28px;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
}
.education-card .card-label {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
}
.education-card strong {
  display: block;
  margin-top: 22px;
  color: var(--color-ink);
  font-size: 42px;
  line-height: 1;
}
.education-card p {
  margin-top: 12px;
  color: var(--color-about-secondary);
  font-size: 18px;
  font-weight: 700;
}
.education-card time {
  display: block;
  margin-top: 8px;
  color: var(--color-muted);
}
.intent-list {
  display: grid;
  gap: 10px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid var(--color-line);
}
.intent-list span {
  color: var(--color-subtle);
  font-size: 14px;
}
.about-main {
  padding: 32px;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
}
.about-lead {
  color: var(--color-subtle);
  font-size: 16px;
}
.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 28px;
}
.profile-item {
  min-height: 96px;
  padding: 18px;
  background: var(--color-soft);
  border: 1px solid var(--color-line);
  border-radius: 8px;
}
.profile-item strong,
.profile-item span {
  display: block;
}
.profile-item strong {
  color: var(--color-ink);
  font-size: 16px;
}
.profile-item span {
  margin-top: 6px;
  color: var(--color-muted);
  font-size: 13px;
}
@media (max-width: 1120px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
@media (max-width: 760px) {
  .about-section {
    width: min(100% - 32px, var(--container));
  }
  .about-main,
  .education-card {
    padding: 24px;
  }
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
