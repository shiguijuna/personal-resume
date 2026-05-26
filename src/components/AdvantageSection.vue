<script setup lang="ts">
const techAdvantages = [
  {
    title: '页面还原与布局能力',
    desc: '熟练使用 HTML + CSS 完成页面架构，使用定位、浮动、Flex 等方案，结合 pxCook、蓝湖等技术工具高质量还原设计稿。',
    icon: 'html',
  },
  {
    title: 'Vue 中后台与移动端开发',
    desc: '熟练使用 Vue2、Vue3 全家桶（Vue + Axios + Vue Router + Pinia / Vuex），配合 Element UI 进行 PC 端中后台开发，配合 Vant 进行移动端项目开发。',
    icon: 'vue',
  },
  {
    title: 'React 技术栈',
    desc: '熟悉 React 技术栈，掌握函数组件、Hooks、组件通信、状态管理及路由配置，能够基于 React 完成常见业务模块和前端页面开发。',
    icon: 'react',
  },
  {
    title: '小程序与 uni-app',
    desc: '熟练掌握微信小程序开发、uni-app 开发，能够完成登录授权、页面分包、订单流程、支付对接和常见原生能力调用。',
    icon: 'app',
  },
  {
    title: '地图与数据可视化',
    desc: '熟练使用百度地图 SDK，并能使用 ECharts 进行数据可视化大屏开发，完成图表展示、数据组织、响应式布局和交互优化。',
    icon: 'chart',
  },
  {
    title: '工程化与版本控制',
    desc: '熟练掌握 npm、yarn 等包管理工具，熟悉 webpack 工程化配置以及 Git 版本控制工具，能够维护项目构建与协作流程。',
    icon: 'git',
  },
  {
    title: 'CI/CD 自动化部署',
    desc: '熟练使用 GitLab、Jenkins 等工具搭建 CI/CD 流水线，实现项目的自动化构建、测试与持续部署。',
    icon: 'pipeline',
  },
  {
    title: 'Nginx 生产环境部署',
    desc: '熟练使用 Nginx 进行 Web 服务器配置，掌握反向代理、负载均衡、动静分离及 HTTPS 部署，能够独立完成前端项目的生产环境部署与性能优化。',
    icon: 'shield',
  },
  {
    title: 'AI 辅助开发',
    desc: '熟练运用 AI 辅助开发，擅长 Vibe Coding 模式下通过高质量 Prompt 驱动代码生成；熟练使用 GitHub Copilot、OpenAI Codex、Claude Code 等主流 AI 编程工具，有效提升前端页面与业务逻辑的开发效率。',
    icon: 'ai',
  },
]
</script>

<template>
  <section id="advantages" class="section-block section-anchor animate-scroll" aria-labelledby="advantages-title">
    <div class="section-heading">
      <h2 id="advantages-title">技术优势</h2>
      <p>相比单纯罗列技术名，更关注在真实项目中能解决什么问题。</p>
    </div>
    <div class="advantage-grid">
      <article v-for="item in techAdvantages" :key="item.title" class="advantage-card">
        <span class="icon-box">
          <TechIcon :name="item.icon" />
        </span>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </article>
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
.advantage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.advantage-card {
  display: flex;
  gap: 16px;
  min-height: 156px;
  padding: 24px;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
}
.advantage-card .icon-box {
  display: inline-flex;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 7px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 8px;
}
.advantage-card .icon-box svg {
  width: 100%;
  height: 100%;
}
.advantage-card h3 {
  color: var(--color-ink);
  font-size: 18px;
}
.advantage-card p {
  margin-top: 8px;
  color: var(--color-muted);
  font-size: 14px;
}
@media (max-width: 1120px) {
  .advantage-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 760px) {
  .section-block {
    width: min(100% - 32px, var(--container));
  }
  .advantage-grid {
    grid-template-columns: 1fr;
  }
  .advantage-card {
    grid-template-columns: 1fr;
  }
}
</style>
