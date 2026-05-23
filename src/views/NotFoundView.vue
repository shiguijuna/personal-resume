<script setup lang="ts">
import { useHead } from '@unhead/vue'

const handleGoHome = () => {
  window.location.href = '/'
}

useHead({
  title: '页面不存在 | shiguijun',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>

<template>
  <div class="error-page">
    <main id="main-content" class="error-shell">
      <RouterLink class="brand" to="/" aria-label="回到首页">shiguijun</RouterLink>
      <div class="error-body">
        <span class="error-code">404</span>
        <h1>页面未找到</h1>
        <p>你访问的页面不存在，可能已被移除或链接有误。</p>
        <div class="error-actions">
          <button class="primary-btn" @click="handleGoHome">返回首页</button>
          <RouterLink class="outline-btn" to="/#projects">查看项目</RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

.error-shell {
  text-align: center;
  padding: 48px 24px;
}

.brand {
  color: var(--color-ink);
  font-size: 22px;
  font-weight: 800;
}

.error-body {
  margin-top: 64px;

  .error-code {
    display: block;
    color: var(--color-primary);
    font-size: clamp(72px, 14vw, 120px);
    font-weight: 900;
    line-height: 1;
    opacity: 0.18;
  }

  h1 {
    margin-top: -0.3em;
    color: var(--color-ink);
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 800;
  }

  p {
    max-width: 480px;
    margin: 16px auto 0;
    color: var(--color-muted);
    font-size: 16px;
  }
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 38px;
}

.primary-btn,
.outline-btn {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
}

.primary-btn {
  color: #fff;
  background: var(--color-primary);
  border: none;
  box-shadow: 0 12px 28px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.outline-btn {
  color: var(--color-primary);
  border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
  background: var(--color-panel);
}
</style>
