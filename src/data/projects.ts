export interface ProjectItem {
  slug: string
  title: string
  type: string
  role: string
  period: string
  platform: string
  tags: string[]
  image: string
  desc: string
  points: string[]
  responsibilities: string[]
  implementation: string[]
  modules: string[]
  highlights: string[]
}

export const projects: ProjectItem[] = [
  {
    slug: 'gastroscopy-management',
    title: '胃肠镜管理系统',
    type: '医疗管理系统',
    role: '前端开发',
    period: '项目制',
    platform: 'PC 中后台',
    tags: ['Vue', 'Element UI', 'ECharts', 'Axios', 'Vuex'],
    image: '/portfolio-images/gastroscopy-management.png',
    desc: '面向中小型诊所或医院的管理系统，覆盖首页、医疗服务、科室管理、内容管理、数据统计、系统管理等模块，帮助机构提升管理和运营效率。',
    points: ['动态路由与权限控制', '体检订单和报告打印', '统计图表与性能优化'],
    responsibilities: [
      '根据产品原型和 UI 设计完成后台页面开发与组件拆分',
      '完成登录鉴权、接口联调、列表筛选、表单提交和详情展示等业务功能',
      '根据用户权限动态生成菜单路由，并控制部分按钮操作权限',
      '配合测试反馈处理页面兼容、交互细节和数据展示问题',
    ],
    implementation: [
      '使用 Axios 请求拦截器统一携带 token，响应拦截器处理登录失效和错误提示',
      '结合 Vuex 存储 token、用户信息和公共状态，支持登录状态保持',
      '使用 router.addRoutes 按用户权限动态添加路由，实现不同角色菜单差异',
      '使用 ECharts 展示用户统计、挂号统计、体检统计、问诊统计和销售统计',
      '封装搜索组件、图片上传组件和打印相关逻辑，减少重复页面代码',
    ],
    modules: ['首页看板', '医疗服务', '科室管理', '内容管理', '数据统计', '系统管理'],
    highlights: [
      '将后台常用搜索、上传和打印能力沉淀为可复用模块',
      '通过按钮 loading、防抖节流和路由懒加载优化用户操作体验',
      '权限逻辑集中处理，降低页面内重复判断和后续维护成本',
    ],
  },
  {
    slug: 'xiangyu-admin',
    title: '享域到家后台管理系统',
    type: '到家服务运营后台',
    role: 'Web 前端工程师',
    period: '项目制',
    platform: 'PC 中后台',
    tags: ['Vue3', 'Pinia', 'Element Plus', 'Axios', 'ECharts'],
    image: '/portfolio-images/xiangyu-admin.png',
    desc: '用于管理服务项目、技师信息、用户信息、订单数据、优惠活动及平台运营数据的后台系统，支持运营人员进行查询、新增、编辑、审核和统计分析。',
    points: ['统一请求和登录态处理', '角色菜单与按钮权限', '订单和用户数据分析'],
    responsibilities: [
      '负责服务、订单、客户、统计和系统配置等后台页面开发',
      '与后端联调接口，统一处理登录状态、错误提示和权限菜单',
      '基于业务角色控制新增、编辑、删除、审核等按钮权限',
      '维护后台页面性能和交互一致性，提升运营操作效率',
    ],
    implementation: [
      '使用 Vue Router 按业务模块拆分登录、首页、订单、客户、数据统计等页面',
      '使用 Pinia 管理用户信息、token、菜单权限和公共筛选状态',
      '基于 Element Plus 表格、表单、弹窗、分页、上传等组件完成后台基础能力',
      '使用 ECharts 对订单数量、销售额、用户增长和服务销售情况进行图表展示',
      '通过路由懒加载降低首屏资源体积，提升系统访问速度',
    ],
    modules: [
      '登录模块',
      '服务/商品管理',
      '订单管理',
      '应用管理',
      '客户管理',
      '数据统计',
      '系统设置',
    ],
    highlights: [
      '后台功能结构清晰，能支撑运营人员高频查询和维护业务数据',
      '统一封装请求和登录失效处理，接口调用更稳定',
      '权限控制覆盖菜单和按钮两个层级，适配不同管理员角色',
    ],
  },
  {
    slug: 'xiangyu-miniapp',
    title: '享域到家小程序',
    type: 'O2O 到家健康服务',
    role: '前端开发',
    period: '项目制',
    platform: '微信小程序',
    tags: ['uni-app', 'Vue', 'Vant', '微信支付', 'uni.request'],
    image: '/portfolio-images/xiangyu-miniapp.png',
    desc: '面向用户提供上门推拿服务预约、服务项目浏览、技师选择、地址管理、订单管理、优惠活动及微信支付等功能，实现从浏览、预约、下单到支付的完整闭环。',
    points: ['登录鉴权和请求封装', '规格选择与订单组装', '分包优化加载体验'],
    responsibilities: [
      '负责小程序首页、服务详情、地址、订单和个人中心等页面开发',
      '完成微信登录、手机号授权、定位授权、订单提交和支付流程对接',
      '封装服务卡片、订单列表、地址选择、规格弹窗等公共组件',
      '处理小程序分包、页面加载、交互反馈和异常提示等体验问题',
    ],
    implementation: [
      '使用 uni.login 获取登录 code，由后端换取 token 后存储到本地缓存',
      '封装 uni.request 请求方法，统一处理 loading、错误提示和登录过期',
      '通过维护选中规格数组完成规格高亮、价格联动和订单参数组装',
      '提交订单后调用 uni.requestPayment 唤起微信支付，完成在线支付流程',
      '使用小程序分包机制拆分业务模块，降低主包体积',
    ],
    modules: ['服务浏览', '技师选择', '地址管理', '订单管理', '优惠活动', '微信支付'],
    highlights: [
      '覆盖用户从浏览到支付的完整交易路径',
      '公共组件复用度较高，便于后续业务页面扩展',
      '分包和请求封装提升了小程序加载速度与接口维护效率',
    ],
  },
  {
    slug: 'youxiang-guide-miniapp',
    title: '优享向导小程序',
    type: '本地生活向导服务',
    role: '前端开发',
    period: '项目制',
    platform: '微信小程序',
    tags: ['uni-app', 'Vue', '微信能力', '订单流程'],
    image: '/portfolio-images/youxiang-guide-miniapp.png',
    desc: '面向本地游玩、旅游陪同、运动组局、社交搭子等场景，提供向导浏览、向导详情、服务预约、多人组局、订单管理、用户中心等功能。',
    points: ['城市与类型筛选', '预约订单完整闭环', '定位、上传、分享转发'],
    responsibilities: [
      '负责首页、向导列表、向导详情、订单中心、个人中心等页面开发',
      '完成城市、类型、价格、热度等筛选逻辑和列表展示',
      '对接服务预约、订单提交和订单状态管理流程',
      '实现定位、图片上传、手机号授权和分享转发等微信原生能力',
    ],
    implementation: [
      '基于 uni-app + Vue 开发小程序页面和业务组件',
      '封装向导卡片、服务分类、订单列表、用户信息和弹窗选择器组件',
      '通过 uni.login 获取 code 并对接后端 token 登录态',
      '在请求拦截逻辑中统一携带 token，处理登录失效和响应数据',
      '按首页、详情、订单、个人中心拆分分包，优化首屏加载速度',
    ],
    modules: ['向导列表', '向导详情', '服务预约', '多人组局', '订单中心', '个人中心'],
    highlights: [
      '支持多维度筛选，帮助用户快速查找合适的本地向导',
      '围绕多人组局和个人主页增强平台社交属性',
      '登录态、请求和分包逻辑规范，便于后续模块维护',
    ],
  },
  {
    slug: 'youxiang-guide-admin',
    title: '优享向导后台管理系统',
    type: '本地生活运营后台',
    role: '前端开发',
    period: '项目制',
    platform: 'PC 中后台',
    tags: ['Vue', 'Element UI', 'Axios', 'Vuex', 'ECharts'],
    image: '/portfolio-images/youxiang-guide-admin.png',
    desc: '面向本地生活向导服务平台的运营管理系统，用于统一管理向导信息、服务内容、用户数据、订单数据、评价数据、组局活动及平台运营数据。',
    points: ['向导审核与上下架', '订单和评价管理', '运营数据可视化'],
    responsibilities: [
      '负责向导管理、服务管理、订单管理、客户管理、评价管理和统计页面开发',
      '实现向导资料新增、编辑、审核、上下架等核心运营功能',
      '完成订单状态筛选、预约信息查看、退款记录查看等管理能力',
      '配合后端完成权限菜单、按钮操作权限和接口异常处理',
    ],
    implementation: [
      '使用 Axios 封装统一请求，配合 Vuex 完成 token 存储和登录状态维护',
      '根据不同管理员角色动态生成菜单路由并控制按钮操作权限',
      '使用 Element UI 表格、表单、弹窗、分页、日期选择器完成后台基础页面',
      '使用 ECharts 展示订单数量、平台流水、用户增长、向导入驻和评价数据',
      '通过组件按需引入和路由懒加载减少首屏资源体积',
    ],
    modules: ['向导管理', '服务管理', '订单管理', '评价管理', '客户管理', '数据统计', '系统设置'],
    highlights: [
      '后台能力覆盖平台运营的核心管理链路',
      '权限体系适配多角色运营团队的分工需求',
      '数据可视化帮助运营人员快速观察平台业务情况',
    ],
  },
]

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug)

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return undefined
  return projects[(index + 1) % projects.length]
}
