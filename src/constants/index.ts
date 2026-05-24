export const siteConfig = {
  name: 'shiguijun',
  domain: 'https://shiguijuna.store',
  title: 'shiguijun | 前端开发工程师',
  description:
    'shiguijun的个人博客与作品集，展示 6 年前端开发经验、Vue / Nuxt / 小程序 / 中后台系统项目经历与技术文章。',
  keywords: 'shiguijun,前端开发工程师,个人博客,作品集,Vue,Nuxt,小程序,uni-app,中后台,ECharts',
  ogImage: '/og-image.png', // 建议尺寸 1200×630，放 public/og-image.png
}

const _p = ['180', '0373', '0972']

export const getPhone = () => _p.join('')

export const contactInfo = {
  get phone() {
    return getPhone()
  },
  email: 'shiguijuna@qq.com',
  get wechat() {
    return getPhone()
  },
  city: '河南 · 郑州',
  district: '新乡市卫滨区源湖园',
  amapUrl:
    'https://uri.amap.com/search?keyword=%E6%96%B0%E4%B9%A1%E5%B8%82%E5%8D%AB%E6%BB%A8%E5%8C%BA%E6%BA%90%E6%B9%96%E5%9B%AD',
}

export const resumeFile = {
  path: '/resume-shiguijun.docx?v=1',
  downloadName: '本科-六年-前端-史桂军-18003730972.docx',
}

export const themeColors = [
  { name: '经典蓝', hex: '#1769e8' },
  { name: '翡翠绿', hex: '#0fa37f' },
  { name: '日落橙', hex: '#e87a17' },
  { name: '玫红', hex: '#d9386a' },
  { name: '紫色', hex: '#7c3aed' },
  { name: '暗夜', hex: '#1a1a2e' },
] as const

export const navItems = [
  { label: '首页', href: '/home' },
  { label: '关于我', href: '/about' },
  { label: '技术栈', href: '/skills' },
  { label: '项目经历', href: '/projects' },
  { label: '博客', href: '/blog' },
  { label: '联系', href: '/contact' },
] as const
