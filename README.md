# shiguijun 个人博客 / 作品集

基于 Vue 3 + Element Plus + Pinia + Vue Router + Vite 构建的个人博客与作品集。

## 功能

- 个人简历与作品展示
- 技术栈展示（Vue / Nuxt / 小程序 / 中后台）
- 项目经历详情页
- 博客文章列表与详情
- 自定义主题色与暗色模式
- 响应式移动端适配

## 快速开始

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| UI 库 | Element Plus |
| 构建 | Vite |
| 语言 | TypeScript |
| 样式 | Sass, CSS Variables |
| SEO | @unhead/vue |
| 工具 | ESLint, Prettier |

## 部署

```bash
docker build -t personal-resume .
docker run -p 80:80 personal-resume
```
