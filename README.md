# 中国少年茶人 - 学校端官方入口

## 项目概述

为学校用户提供权威展示、资源获取与教师端操作入口的一站式网页，兼顾品牌传播与项目转化。

## 核心功能

1. **项目权威展示**：品牌/IP、课程体系、媒体与背书、公益机制
2. **课程试听与资源**：公开课/片段试听，合规下载，资源检索与分级权限
3. **教师端入口**：登录/授权，课程管理、班级与学员数据查看，公益进度上报
4. **学校成果展示**：校内实践案例、数据可视化、证书/荣誉展示，可分享外链
5. **合作申请通道**：在线申请表、审核流转、进度通知与回访留资

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL + Prisma ORM
- **缓存**: Redis
- **认证**: JWT (jose)
- **状态管理**: TanStack Query + Zustand
- **表单**: React Hook Form + Zod

## 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 14+
- Redis (可选)
- pnpm / npm / yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 到 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置必要的环境变量：

- `DATABASE_URL`: PostgreSQL 数据库连接字符串
- `JWT_SECRET`: JWT 密钥（生产环境请使用强密码）
- 其他 OSS、邮件、短信服务配置

### 初始化数据库

```bash
# 生成 Prisma Client
npm run db:generate

# 推送数据库架构
npm run db:push

# 填充演示数据
npm run db:seed
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 测试账号

- 邮箱: `teacher@demo.com`
- 密码: `password123`

## 项目结构

```
/workspace
├── app/                    # Next.js App Router 页面
│   ├── (public)/          # 公开页面
│   │   ├── page.tsx       # 首页
│   │   ├── about/         # 项目介绍
│   │   ├── courses/       # 课程体系
│   │   ├── resources/     # 教学资源
│   │   ├── achievements/  # 学校成果
│   │   └── cooperation/   # 合作申请
│   ├── teacher/           # 教师端
│   │   ├── login/         # 登录页
│   │   └── dashboard/     # 工作台
│   └── api/               # API 路由
│       ├── auth/          # 认证接口
│       ├── courses/       # 课程接口
│       ├── resources/     # 资源接口
│       └── cooperation/   # 合作申请接口
├── components/            # React 组件
│   ├── ui/               # UI 基础组件
│   ├── teacher/          # 教师端组件
│   ├── header.tsx        # 公共头部
│   └── footer.tsx        # 公共底部
├── lib/                   # 工具函数
│   ├── prisma.ts         # Prisma Client
│   ├── auth.ts           # 认证工具
│   ├── utils.ts          # 通用工具
│   ├── oss.ts            # 对象存储
│   ├── audit.ts          # 审计日志
│   └── notifications.ts  # 通知服务
├── prisma/               # Prisma 配置
│   ├── schema.prisma     # 数据模型
│   └── seed.ts           # 种子数据
└── public/               # 静态资源
```

## 主要页面

### 公开页面

- `/` - 首页：品牌展示、核心特色、数据统计
- `/about` - 项目介绍：品牌故事、课程体系、公益机制
- `/courses` - 课程体系：课程列表和详情
- `/resources` - 教学资源：公开资源浏览
- `/achievements` - 学校成果：成果案例展示
- `/cooperation` - 合作申请：在线申请表单

### 教师端

- `/teacher/login` - 教师登录
- `/teacher/dashboard` - 工作台：数据概览、快捷操作
- `/teacher/courses` - 课程管理
- `/teacher/classes` - 班级管理
- `/teacher/analytics` - 学习数据
- `/teacher/resources` - 教学资源
- `/teacher/public-benefit` - 公益进度

## API 接口

### 认证 API

- `POST /api/auth/login` - 登录
- `POST /api/auth/logout` - 登出
- `GET /api/auth/me` - 获取当前用户

### 课程 API

- `GET /api/courses` - 获取课程列表
- `GET /api/courses/[id]` - 获取课程详情

### 资源 API

- `GET /api/resources/[id]/url` - 获取资源访问 URL（支持签名）

### 合作申请 API

- `POST /api/cooperation` - 提交合作申请
- `GET /api/cooperation` - 获取申请列表（管理员）

## 性能优化

- **SSG/ISR**: 静态页面使用静态生成和增量静态再生成
- **图片优化**: 使用 Next.js Image 组件自动优化
- **代码分割**: 自动代码分割，按需加载
- **缓存策略**: Redis 缓存热点数据

## 安全措施

- HTTPS 全站加密
- JWT 认证
- RBAC 权限控制
- 资源访问签名 URL
- SQL 注入防护（Prisma ORM）
- XSS 防护
- CSRF 防护

## SEO 优化

- 结构化数据（JSON-LD）
- Open Graph 标签
- 动态 sitemap.xml
- robots.txt
- 语义化 HTML
- 移动端优先设计

## 部署

### Vercel 部署（推荐）

```bash
npm run build
vercel --prod
```

### Docker 部署

```bash
docker build -t tea-master-portal .
docker run -p 3000:3000 tea-master-portal
```

### 环境变量配置

生产环境需要配置以下环境变量：

- 数据库连接
- JWT 密钥
- OSS 配置
- 邮件/短信服务配置
- CDN 域名

## 开发指南

### 添加新页面

1. 在 `app/` 目录下创建新路由
2. 使用 TypeScript 和 Server Components
3. 添加适当的 metadata
4. 实现响应式设计

### 添加 API 路由

1. 在 `app/api/` 下创建路由文件
2. 使用 Zod 验证输入
3. 实现错误处理
4. 添加认证检查（如需要）

### 数据库修改

1. 修改 `prisma/schema.prisma`
2. 运行 `npm run db:generate`
3. 运行 `npm run db:push` 或创建迁移

## 监控与日志

- 审计日志记录所有关键操作
- 错误日志使用 console.error
- 生产环境建议集成 Sentry 等监控服务

## 许可证

Copyright © 2024 中国少年茶人项目组

## 联系方式

如有问题或建议，请联系项目组。
