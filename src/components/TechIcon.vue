<script setup lang="ts">
import { h, type FunctionalComponent } from 'vue'

defineProps<{ name: string }>()

const icons: Record<string, FunctionalComponent> = {
  html: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M7 8l-5 4 5 4' }),
    h('path', { d: 'M17 8l5 4-5 4' }),
    h('path', { d: 'M14 4l-4 16' }),
  ]),
  vue: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 1.6 2 22.4h20L12 1.6z' }),
    h('path', { d: 'M12 1.6 8.5 13h7L12 1.6z', fill: 'currentColor', opacity: '.4' }),
  ]),
  react: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('ellipse', { cx: '12', cy: '12', rx: '10', ry: '3', transform: 'rotate(0 12 12)' }),
    h('ellipse', { cx: '12', cy: '12', rx: '10', ry: '3', transform: 'rotate(60 12 12)' }),
    h('ellipse', { cx: '12', cy: '12', rx: '10', ry: '3', transform: 'rotate(120 12 12)' }),
    h('circle', { cx: '12', cy: '12', r: '2', fill: 'currentColor', stroke: 'none' }),
  ]),
  app: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '5', y: '3', width: '14', height: '18', rx: '3' }),
    h('circle', { cx: '12', cy: '17', r: '1' }),
    h('path', { d: 'M8 9h8v5H8z' }),
  ]),
  chart: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M4 20V8M10 20V4M16 20V12M22 20H2' }),
  ]),
  git: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: '6', cy: '18', r: '3' }),
    h('circle', { cx: '6', cy: '6', r: '3' }),
    h('circle', { cx: '18', cy: '12', r: '3' }),
    h('path', { d: 'M6 15V9m0 0a6 6 0 016 6h3' }),
  ]),
  pipeline: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M22 12h-4l-3-6-4 12-3-6-3 6H3' }),
  ]),
  shield: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M12 2 3 6v6c0 5 4 9 9 11 5-2 9-6 9-11V6l-9-4z' }),
    h('path', { d: 'm8 12 2 2 6-6', 'stroke-width': '3' }),
  ]),
  ai: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M12 3 9 9l-6 1.5 6 3L12 21l3-7.5L21 12l-6-3-3-6z' }),
    h('path', { d: 'M18 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1z' }),
  ]),
  nuxt: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 4 3 20h18z' }),
    h('path', { d: 'M12 9 9 15h6z', opacity: '.4' }),
  ]),
  sass: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '4', y: '4', width: '16', height: '16', rx: '4' }),
    h('text', { x: '12', y: '16', 'text-anchor': 'middle', fill: 'currentColor', stroke: 'none', 'font-weight': 'bold', 'font-size': '12', 'font-family': 'system-ui' }, 'S'),
  ]),
  element: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '4', y: '4', width: '16', height: '16', rx: '3' }),
    h('path', { d: 'M8 8h8M8 12h8M8 16h6' }),
  ]),
  vant: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '3', y: '5', width: '18', height: '14', rx: '3' }),
    h('path', { d: 'm9 11 2-2 4 4-4 4-2-2' }),
  ]),
  echarts: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M4 20V4M10 20V10M16 20V14M22 20H2' }),
    h('path', { d: 'M4 16 10 11l6 3 6-7' }),
  ]),
  axios: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M12 2v20M7 7l5-5 5 5M7 17l5 5 5-5' }),
  ]),
  pinia: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('polygon', { points: '12,2 4,7 4,17 12,22 20,17 20,7' }),
    h('circle', { cx: '12', cy: '12', r: '3', fill: 'currentColor', stroke: 'none' }),
  ]),
}

const fallback: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('path', { d: 'M12 6v6l4 2' }),
])
</script>

<template>
  <component :is="icons[name] || fallback" />
</template>
