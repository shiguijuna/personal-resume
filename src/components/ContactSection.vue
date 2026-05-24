<script setup lang="ts">
import { contactInfo } from '@/constants'
</script>

<template>
  <footer id="contact" class="contact-section section-anchor animate-scroll">
    <div class="contact-inner">
      <div class="contact-copy">
        <h2>联系我</h2>
        <p>如果你的团队正在寻找注重细节、能稳定推进业务落地的前端工程师，欢迎联系我。</p>
        <ul>
          <li>电话 / 微信：{{ contactInfo.phone }}</li>
          <li>邮箱：{{ contactInfo.email }}</li>
          <li>城市：{{ contactInfo.city }}</li>
        </ul>
      </div>
      <div class="contact-panel">
        <a :href="`tel:${contactInfo.phone}`">拨打电话</a>
        <a :href="`mailto:${contactInfo.email}`">发送邮件</a>
        <button class="wechat-btn" :title="`微信号：${contactInfo.wechat}`">添加微信<span class="wechat-tip">{{ contactInfo.wechat }}</span></button>
      </div>
      <a
        class="map-card"
        :href="contactInfo.amapUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`打开地图查看${contactInfo.district}`"
      >
        <div class="map-visual">
          <span class="route one"></span>
          <span class="route two"></span>
          <span class="route three"></span>
          <span class="pin"></span>
        </div>
        <div>
          <strong>{{ contactInfo.district }}</strong>
          <span>点击查看地图定位</span>
        </div>
      </a>
    </div>
    <div class="copyright">
      <span>© {{ new Date().getFullYear() }} shiguijun · 个人博客 &amp; 作品集 · 基于 Vue 3 构建</span>
      <a class="beian" href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">皖ICP备2026014481号-1</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.section-anchor { @include shared.section-anchor; }
.contact-section { margin-top: 56px; color: var(--color-dark-section-text); background: var(--color-dark-section); }
.contact-inner { width: min(100% - 48px, var(--container)); margin: 0 auto; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 22px 48px; padding: 44px 0 34px; }
.contact-copy { grid-row: span 2; } .contact-copy h2 { font-size: 32px; } .contact-copy p { max-width: 520px; margin-top: 12px; color: rgba(255,255,255,0.72); } .contact-copy ul { display: grid; gap: 12px; margin-top: 24px; color: rgba(255,255,255,0.88); }
.contact-panel { display: grid; align-content: center; grid-template-columns: repeat(3,1fr); gap: 16px; } .contact-panel a, .contact-panel .wechat-btn { display: flex; min-height: 54px; align-items: center; justify-content: center; color: #fff; font-weight: 800; background: var(--color-primary); border-radius: 8px; } .contact-panel .wechat-btn { position: relative; cursor: pointer; border: none; font-size: inherit; font-family: inherit; transition: opacity 0.2s; } .contact-panel a:hover, .contact-panel .wechat-btn:hover { opacity: 0.88; } .wechat-tip { position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); padding: 6px 12px; color: #fff; font-size: 12px; font-weight: 600; white-space: nowrap; background: rgba(0,0,0,0.78); border-radius: 6px; opacity: 0; pointer-events: none; transition: opacity 0.18s; } .wechat-btn:hover .wechat-tip { opacity: 1; }
.map-card { display: grid; grid-template-columns: 1fr 0.84fr; gap: 22px; min-height: 190px; padding: 18px; color: #fff; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; } .map-card > div:last-child { display: grid; align-content: center; gap: 8px; } .map-card strong,.map-card span { display: block; } .map-card strong { font-size: 18px; line-height: 1.35; } .map-card span { color: rgba(255,255,255,0.72); font-size: 14px; }
.map-visual { position: relative; overflow: hidden; min-height: 154px; background: linear-gradient(135deg,color-mix(in srgb, var(--color-primary) 24%, transparent),transparent 45%),linear-gradient(160deg,color-mix(in srgb, var(--color-accent) 22%, transparent),transparent 55%),rgba(255,255,255,0.08); border-radius: 8px; } .map-visual::before { position: absolute; inset: 18px; content: ''; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; }
.route { position: absolute; height: 7px; background: rgba(255,255,255,0.7); border-radius: 999px; } .route.one { top: 44px; left: -18px; width: 78%; transform: rotate(-18deg); } .route.two { top: 100px; right: -28px; width: 88%; background: color-mix(in srgb, var(--color-accent) 72%, transparent); transform: rotate(22deg); } .route.three { bottom: 34px; left: 36px; width: 54%; background: color-mix(in srgb, var(--color-primary) 74%, transparent); transform: rotate(-4deg); }
.pin { position: absolute; left: 50%; top: 46%; width: 22px; height: 22px; background: var(--color-primary); border: 4px solid #fff; border-radius: 50% 50% 50% 0; box-shadow: 0 12px 28px rgba(0,0,0,0.24); transform: translate(-50%,-50%) rotate(-45deg); }
.copyright { width: min(100% - 48px, var(--container)); margin: 0 auto; padding: 18px 0 24px; color: rgba(255,255,255,0.5); font-size: 13px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; } .beian { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; } .beian:hover { color: rgba(255,255,255,0.8); }
@media (max-width:760px) { .contact-inner { width: min(100% - 32px, var(--container)); grid-template-columns: 1fr; } .contact-panel { grid-template-columns: 1fr; } .map-card { grid-template-columns: 1fr; } .copyright { width: min(100% - 32px, var(--container)); } }
</style>
