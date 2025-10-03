# 贡献指南

感谢您对中国少年茶人项目的关注！本文档将指导您如何参与项目开发。

## 开发环境设置

### 前置要求

- Node.js 18+
- PostgreSQL 14+
- Git
- pnpm / npm / yarn

### 本地开发设置

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd workspace
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件配置数据库等信息
   ```

4. **初始化数据库**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   - 公开页面: http://localhost:3000
   - 教师端: http://localhost:3000/teacher/login
   - 测试账号: teacher@demo.com / password123

## 代码规范

### TypeScript

- 使用 TypeScript 编写所有代码
- 启用严格模式
- 为函数和变量提供类型注解
- 避免使用 `any` 类型

### React 组件

- 优先使用函数组件
- 使用 Server Components（默认）
- 需要客户端交互时使用 `'use client'`
- 组件文件名使用 kebab-case

### 样式

- 使用 Tailwind CSS
- 遵循响应式设计原则
- 移动端优先（mobile-first）

### 提交规范

使用 Conventional Commits 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

示例：
```
feat: 添加教师端课程管理功能
fix: 修复登录页面验证错误
docs: 更新部署文档
```

## 开发流程

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
```

### 2. 开发功能

- 编写代码
- 添加必要的注释
- 确保代码符合规范

### 3. 测试

- 功能测试
- 浏览器兼容性测试
- 移动端测试

### 4. 提交代码

```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### 5. 创建 Pull Request

- 提供清晰的 PR 描述
- 关联相关 Issue
- 等待代码审查

## 项目结构

```
/workspace
├── app/                # Next.js 应用路由
│   ├── (public)/      # 公开页面
│   ├── teacher/       # 教师端
│   └── api/           # API 路由
├── components/        # React 组件
├── lib/               # 工具函数
├── prisma/            # 数据库 schema
└── public/            # 静态资源
```

## 常见任务

### 添加新页面

1. 在 `app/` 下创建路由文件夹
2. 创建 `page.tsx` 文件
3. 添加 metadata
4. 实现页面组件

### 添加 API 路由

1. 在 `app/api/` 下创建路由
2. 实现 HTTP 方法处理函数
3. 使用 Zod 验证输入
4. 添加错误处理

### 修改数据模型

1. 编辑 `prisma/schema.prisma`
2. 运行 `npm run db:generate`
3. 运行 `npm run db:push`
4. 更新种子数据（如需要）

## 测试

### 功能测试

- 测试所有新功能
- 确保现有功能不受影响
- 测试错误处理

### 性能测试

- 使用 Lighthouse 检查性能
- 确保 LCP < 2.5s
- 优化资源加载

### 安全测试

- 检查认证和授权
- 验证输入验证
- 测试 XSS 和 CSRF 防护

## 文档

- 为新功能添加文档
- 更新 README.md（如需要）
- 添加代码注释
- 更新 API 文档

## 获取帮助

- 查看现有文档
- 搜索已有 Issues
- 创建新 Issue 提问
- 联系项目维护者

## 许可证

通过贡献代码，您同意您的贡献将在项目相同许可证下发布。
