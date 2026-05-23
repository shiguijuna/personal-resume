export interface BlogPost {
  slug: string
  title: string
  projectTitle: string
  projectSlug: string
  tag: string
  tags: string[]
  image: string
  date: string
  readingTime: string
  desc: string
  paragraphs: string[]
  practices: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'gastroscopy-management-review',
    title: '胃肠镜管理系统：权限路由、统计图表与打印能力实践',
    projectTitle: '胃肠镜管理系统',
    projectSlug: 'gastroscopy-management',
    tag: 'Vue',
    tags: ['Vue', 'Element UI', 'ECharts', '权限路由', '打印'],
    image: '/portfolio-images/gastroscopy-management.png',
    date: '2024-05-12',
    readingTime: '6 min',
    desc: '复盘医疗管理后台中动态权限、统计图表和打印能力的落地方式，重点关注可维护性和后台操作体验。',
    paragraphs: [
      '胃肠镜管理系统属于典型医疗后台管理场景，页面模块多、角色权限明确，并且涉及体检订单、体检报告等需要稳定打印的业务。开发时不能只追求页面还原，还要把登录状态、接口鉴权、菜单权限和按钮控制放在同一套可维护的结构中处理。',
      '权限部分以用户信息为入口，根据后台返回的菜单和角色信息动态添加路由，同时在页面中配合按钮权限控制新增、编辑、删除、审核等操作。这样可以减少不同角色看到无关入口的情况，也能把权限判断集中到更清晰的位置。',
      '统计模块使用 ECharts 承载用户统计、挂号统计、体检统计、问诊统计和销售统计等数据。图表封装时重点处理了容器尺寸、自适应刷新和接口数据转换，避免每个页面重复写相同的数据整理逻辑。',
      '打印能力主要围绕体检订单和报告输出展开。页面需要保证打印区域结构稳定、字段展示清楚，并在交互上避免用户快速重复触发。配合按钮 loading、防抖节流和路由懒加载，整体后台体验会更稳定。',
    ],
    practices: [
      '把 token、用户信息和菜单权限统一放入状态管理，减少页面重复取值。',
      '将搜索、上传、打印等后台高频能力封装为复用组件或复用逻辑。',
      '图表组件不要直接绑定原始接口数据，先做字段映射和空状态处理。',
      '对提交、打印、查询等高频操作增加 loading 或防抖，降低误操作。',
    ],
  },
  {
    slug: 'xiangyu-admin-permission',
    title: '享域到家后台：角色权限、订单管理与运营数据展示',
    projectTitle: '享域到家后台管理系统',
    projectSlug: 'xiangyu-admin',
    tag: 'Vue3',
    tags: ['Vue3', 'Pinia', 'Element Plus', '订单管理', '权限控制'],
    image: '/portfolio-images/xiangyu-admin.png',
    date: '2024-05-02',
    readingTime: '7 min',
    desc: '总结到家服务运营后台中角色权限、订单列表、用户数据和统计报表的前端组织方式。',
    paragraphs: [
      '享域到家后台管理系统面向运营人员，核心目标是让服务、技师、用户、订单、优惠活动和平台数据能够被快速查询和维护。后台系统的复杂度不只在页面数量，也在权限、筛选条件和状态流转的一致性。',
      '路由层面按照业务模块拆分登录、首页、服务管理、订单管理、客户管理、数据统计和系统设置等页面。结合 Pinia 管理用户信息、token、菜单权限和公共筛选状态，可以让页面之间的数据共享更清晰。',
      '订单管理是后台高频模块，通常需要组合订单状态、时间范围、用户信息、服务信息等条件筛选。前端实现时要保持表格、分页、详情弹窗和操作按钮的行为一致，避免不同列表页面出现交互差异。',
      '运营数据展示部分使用 ECharts 展示订单数量、销售额、用户增长和服务项目销售情况。图表不仅要能展示数据，还要配合空状态、加载状态和容器变化，避免出现后台常见的错位和空白问题。',
    ],
    practices: [
      '通过请求拦截器统一携带 token，响应拦截器统一处理登录失效和错误提示。',
      '菜单权限和按钮权限分层处理，避免只控制菜单但遗漏页面内操作。',
      '表格筛选条件建议集中管理，便于重置、回显和跨组件维护。',
      '运营图表要处理空数据、加载中、容器 resize 和接口字段变化。',
    ],
  },
  {
    slug: 'xiangyu-miniapp-payment',
    title: '享域到家小程序：登录、预约下单与微信支付闭环',
    projectTitle: '享域到家小程序',
    projectSlug: 'xiangyu-miniapp',
    tag: '小程序',
    tags: ['uni-app', '微信小程序', '登录鉴权', '订单流程', '微信支付'],
    image: '/portfolio-images/xiangyu-miniapp.png',
    date: '2024-04-18',
    readingTime: '7 min',
    desc: '围绕到家服务小程序，梳理从微信登录、服务选择、地址确认、订单提交到支付完成的前端流程。',
    paragraphs: [
      '享域到家小程序的核心链路是用户浏览服务、选择技师和时间、确认地址、提交订单并完成微信支付。这个流程里每一步都依赖前一步的状态，因此前端需要清楚维护用户选择、规格价格、地址信息和订单参数。',
      '登录流程使用 uni.login 获取 code，再由后端换取 token 并写入本地缓存。之后所有业务请求都通过统一封装的 uni.request 携带 token，并集中处理 loading、错误提示和登录过期。',
      '预约下单环节需要维护规格选择、预约时间、服务地址和订单备注等信息。通过选中规格数组可以完成规格高亮、价格联动和订单参数组装，提交订单前还要校验必要字段，减少后端无效请求。',
      '支付流程由后端创建订单并返回微信支付参数，前端调用 uni.requestPayment 唤起支付。前端不能把支付成功当成最终交易事实，还需要结合后端订单状态和支付回调结果完成页面状态更新。',
    ],
    practices: [
      '登录态、请求封装和错误处理要统一，不要在每个页面单独写请求逻辑。',
      '订单提交前先整理本地选择状态，保证传给后端的参数结构清晰。',
      '微信支付只负责唤起支付能力，订单最终状态应以后端结果为准。',
      '使用分包拆分首页、详情、订单和个人中心，降低主包加载压力。',
    ],
  },
  {
    slug: 'youxiang-guide-miniapp-flow',
    title: '优享向导小程序：筛选、预约、组局与分包优化',
    projectTitle: '优享向导小程序',
    projectSlug: 'youxiang-guide-miniapp',
    tag: 'uni-app',
    tags: ['uni-app', '微信能力', '筛选', '预约订单', '分包'],
    image: '/portfolio-images/youxiang-guide-miniapp.png',
    date: '2024-04-08',
    readingTime: '6 min',
    desc: '复盘本地生活向导小程序中向导筛选、服务预约、多人组局和页面分包的实现思路。',
    paragraphs: [
      '优享向导小程序面向本地游玩、旅游陪同、运动组局和社交搭子等场景，用户需要根据城市、服务类型、价格、热度等条件快速找到合适的向导。列表筛选体验是否顺畅，会直接影响后续预约转化。',
      '向导列表和详情页分别承担发现和决策职责。列表需要保持筛选条件、分页加载和空状态清晰；详情页则重点展示向导资料、服务内容、价格信息和预约入口。',
      '订单流程覆盖服务预约、订单提交和状态查看，前端要把预约时间、服务内容、用户信息和订单状态整理成稳定的数据流。对于多人组局场景，还要考虑成员信息、活动状态和分享传播能力。',
      '小程序原生能力包括定位、图片上传、手机号授权和分享转发。实现时需要兼顾授权失败、用户取消和网络异常等情况，不能只处理理想路径。',
    ],
    practices: [
      '筛选条件建议集中成一个查询对象，便于重置、分页和接口联动。',
      '向导卡片、订单列表、用户信息和弹窗选择器适合做成公共组件。',
      '授权类能力必须处理拒绝授权和二次触发场景。',
      '按首页、详情、订单、个人中心拆分分包，优化首屏打开速度。',
    ],
  },
  {
    slug: 'youxiang-guide-admin-ops',
    title: '优享向导后台：向导审核、订单评价管理与数据可视化',
    projectTitle: '优享向导后台管理系统',
    projectSlug: 'youxiang-guide-admin',
    tag: '后台',
    tags: ['Vue', 'Element UI', 'Axios', 'Vuex', 'ECharts'],
    image: '/portfolio-images/youxiang-guide-admin.png',
    date: '2024-03-28',
    readingTime: '7 min',
    desc: '总结本地生活运营后台中向导资料审核、订单评价管理和平台数据报表的前端落地方式。',
    paragraphs: [
      '优享向导后台管理系统服务于平台运营，管理对象包括向导资料、服务内容、用户数据、订单数据、评价数据、组局活动和运营报表。后台的核心价值是提升运营人员处理信息和跟踪履约的效率。',
      '向导管理模块需要支持资料查看、新增、编辑、审核、上下架等操作。表单字段较多时，需要关注校验、回显、上传、状态切换和提交反馈，避免运营人员反复确认同一份信息。',
      '订单和评价模块更关注状态筛选、详情查看、审核处理和内容质量控制。前端实现时要把状态字段、操作按钮和提示文案保持一致，降低运营误判概率。',
      '数据统计模块使用 ECharts 展示订单数量、平台流水、用户增长、向导入驻数量、服务类型占比和评价数据。图表区域需要处理接口加载、空数据、不同屏幕宽度和时间筛选切换。',
    ],
    practices: [
      '后台多角色场景中，菜单权限和按钮权限要统一配置和统一判断。',
      '复杂表单要注意编辑回显、上传状态、校验提示和提交后的状态刷新。',
      '评价审核类页面要保证操作结果反馈明确，避免内容状态混乱。',
      '数据可视化模块需要统一图表初始化、resize 和销毁逻辑。',
    ],
  },
]

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug)

export const getPostByProjectSlug = (projectSlug: string) =>
  posts.find((post) => post.projectSlug === projectSlug)

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>()
  posts.forEach((post) => post.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

export const getNextPost = (slug: string) => {
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return undefined
  return posts[(index + 1) % posts.length]
}
