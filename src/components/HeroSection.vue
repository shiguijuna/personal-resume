<script setup lang="ts">
const stats = [
  { value: '6年', label: '前端开发经验' },
  { value: '本科', label: '上海海洋大学' },
  { value: '全职', label: '前端工程师方向' },
  { value: '一周内', label: '可到岗' },
]
</script>

<template>
  <section id="home" class="hero section-anchor">
    <div class="hero-content">
      <div class="hero-copy">
        <h1>shiguijun</h1>
        <p class="hero-title">6年前端开发工程师，专注 Vue / Nuxt / 小程序 / 中后台系统</p>
        <p class="hero-desc">熟悉前端工程化与业务页面落地，具备中后台系统、小程序项目和数据可视化的完整开发经验，能够在产品、UI、后端和测试之间高效推进需求上线。</p>
        <div class="hero-actions">
          <a class="primary-action" href="#projects">查看项目</a>
          <a class="secondary-action" href="#advantages">技术优势</a>
        </div>
        <div class="hero-stats" aria-label="个人概览">
          <div v-for="item in stats" :key="item.label" class="stat-item">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-label="前端工作台视觉展示">
        <div class="code-window">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <pre><code>const profile = {
  name: 'shiguijun',
  role: 'Frontend Engineer',
  experience: '6 years',
  focus: ['Vue', 'Mini Program', 'Admin System']
}

function deliverFeature(task) {
  return designToCode(task)
    .connectApi()
    .optimizeUX()
}</code></pre>
        </div>
        <div class="dashboard-card">
          <div class="chart-line"></div>
          <div class="metric-grid">
            <span>权限系统</span>
            <span>订单流程</span>
            <span>数据统计</span>
            <span>移动适配</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-anchor { @include shared.section-anchor; }
.hero { padding: 58px 0 44px; border-bottom: 1px solid var(--color-line); }
.hero-content { width: min(100% - 48px, var(--container)); margin: 0 auto; display: grid; grid-template-columns: minmax(0,0.92fr) minmax(420px,1.08fr); align-items: center; gap: 64px; }
.hero-copy h1 { color: var(--color-ink); font-size: clamp(54px,8vw,92px); font-weight: 900; line-height: 1; letter-spacing: 0; }
.hero-title { margin-top: 24px; color: var(--color-ink); font-size: clamp(18px,2.2vw,23px); font-weight: 700; }
.hero-desc { max-width: 620px; margin-top: 18px; color: var(--color-muted); font-size: 16px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 34px; } .hero-actions a { display: inline-flex; min-width: 146px; min-height: 56px; align-items: center; justify-content: center; border-radius: 8px; font-weight: 800; }
.primary-action { color: #fff; background: var(--color-primary); box-shadow: 0 18px 30px color-mix(in srgb, var(--color-primary) 20%, transparent); }
.secondary-action { color: var(--color-primary); border: 1px solid color-mix(in srgb, var(--color-primary) 38%, transparent); background: var(--color-panel); }
.hero-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; margin-top: 54px; }
.stat-item { padding-left: 18px; border-left: 1px solid var(--color-line); } .stat-item strong,.stat-item span { display: block; } .stat-item strong { color: var(--color-ink); font-size: 19px; line-height: 1.3; } .stat-item span { color: var(--color-muted); font-size: 13px; }
.hero-visual { position: relative; min-height: 470px; }
.code-window { position: absolute; top: 22px; left: 0; z-index: 2; width: 54%; min-width: 350px; max-width: 405px; min-height: 360px; padding: 20px 22px; color: var(--color-code-text); background: var(--color-code-bg); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; box-shadow: 0 28px 70px color-mix(in srgb, var(--color-ink) 20%, transparent); transition: box-shadow .22s,transform .22s,z-index 0s .05s; } .code-window:hover,.code-window:focus-within { z-index: 4; box-shadow: 0 34px 82px color-mix(in srgb, var(--color-ink) 26%, transparent); transform: translateY(-4px); } .code-window pre { margin-top: 20px; overflow: hidden; font-size: 12px; line-height: 1.65; white-space: pre-wrap; }
.window-dots { display: flex; gap: 8px; } .window-dots span { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; } .window-dots span:nth-child(2) { background: #febc2e; } .window-dots span:nth-child(3) { background: #28c840; }
.dashboard-card { position: absolute; right: 0; top: 46px; z-index: 1; width: 50%; min-width: 330px; max-width: 390px; min-height: 360px; padding: 30px; background: var(--color-panel); border: 1px solid var(--color-line); border-radius: 8px; box-shadow: var(--shadow-soft); transition: border-color .22s,box-shadow .22s,transform .22s,z-index 0s .05s; } .dashboard-card:hover,.dashboard-card:focus-within { z-index: 5; border-color: color-mix(in srgb, var(--color-primary) 28%, transparent); box-shadow: 0 34px 82px color-mix(in srgb, var(--color-ink) 18%, transparent); transform: translateY(-4px); }
.chart-line { height: 154px; border: 1px solid var(--color-chart-line); border-radius: 8px; background: linear-gradient(135deg,transparent 45%,color-mix(in srgb, var(--color-primary) 28%, transparent) 46%,color-mix(in srgb, var(--color-primary) 28%, transparent) 49%,transparent 50%),linear-gradient(160deg,transparent 48%,color-mix(in srgb, var(--color-accent) 34%, transparent) 49%,color-mix(in srgb, var(--color-accent) 34%, transparent) 52%,transparent 53%),repeating-linear-gradient(0deg,var(--color-panel),var(--color-panel) 35px,var(--color-soft) 36px); }
.metric-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-top: 24px; } .metric-grid span { padding: 16px 12px; color: var(--color-subtle); font-size: 14px; font-weight: 700; text-align: center; background: var(--color-soft); border-radius: 8px; }
@media (max-width:1120px) { .hero-content { grid-template-columns: 1fr; gap: 28px; } .hero-visual { min-height: 440px; } }
@media (max-width:760px) { .hero { padding-top: 34px; } .hero-content { width: min(100% - 32px, var(--container)); } .hero-actions a { flex: 1 1 150px; } .hero-stats { grid-template-columns: 1fr; gap: 14px; margin-top: 34px; } .hero-visual { min-height: auto; } .code-window,.dashboard-card { position: relative; top: auto; right: auto; left: auto; width: 100%; min-width: 0; } .dashboard-card { min-height: auto; margin-top: 18px; } }
</style>
