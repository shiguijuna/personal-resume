import { posts } from '../../data/posts'

export default defineEventHandler((event) => {
  const baseUrl = 'https://shiguijuna.store'

  const items = posts
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.desc}]]></description>
      <pubDate>${new Date(post.date + 'T00:00:00+08:00').toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`)
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>shiguijun | 前端开发工程师博客</title>
    <link>${baseUrl}</link>
    <description>shiguijun 的前端实践博客，涵盖 Vue、小程序、中后台系统、数据可视化等项目的复盘与技术分享。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return rss
})
