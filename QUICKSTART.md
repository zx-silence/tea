# 快速开始指南

本指南将帮助您在 5 分钟内启动中国少年茶人学校端官方入口系统。

## 🚀 快速启动（开发环境）

### 方式一：使用 SQLite（最快，仅用于开发）

如果您想快速体验系统而不想配置 PostgreSQL，可以暂时使用 SQLite：

1. **修改数据库配置**
   
   编辑 `.env` 文件，将 `DATABASE_URL` 改为：
   ```env
   DATABASE_URL="file:./dev.db"
   ```

2. **安装依赖并初始化**
   ```bash
   npm install
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问系统**
   - 打开浏览器访问: http://localhost:3000
   - 教师端登录: http://localhost:3000/teacher/login
   - 测试账号: `teacher@demo.com` / `password123`

### 方式二：使用 PostgreSQL（推荐用于生产）

1. **准备 PostgreSQL 数据库**
   
   确保您已安装并运行 PostgreSQL，然后创建数据库：
   ```sql
   CREATE DATABASE tea_master_db;
   ```

2. **配置环境变量**
   
   编辑 `.env` 文件中的 `DATABASE_URL`：
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/tea_master_db"
   ```
   
   替换 `username` 和 `password` 为您的 PostgreSQL 用户名和密码。

3. **安装依赖并初始化**
   ```bash
   npm install
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问系统**
   - 打开浏览器访问: http://localhost:3000

## 📱 系统功能预览

### 公开页面

1. **首页** (/)
   - 品牌展示
   - 核心特色
   - 数据统计

2. **项目介绍** (/about)
   - 品牌故事
   - 核心价值
   - 课程体系
   - 公益机制

3. **课程体系** (/courses)
   - 课程列表
   - 课程详情
   - 免费试听

4. **教学资源** (/resources)
   - 公开资源浏览
   - 分类展示

5. **学校成果** (/achievements)
   - 成果案例
   - 数据可视化

6. **合作申请** (/cooperation)
   - 在线申请表单
   - 自动通知

### 教师端功能

登录后访问 `/teacher/dashboard`：

1. **工作台**
   - 数据概览
   - 班级列表
   - 学习记录
   - 快捷操作

2. **课程管理** (/teacher/courses)
   - 浏览所有课程
   - 查看课程详情

3. **班级管理** (/teacher/classes)
   - 查看班级信息
   - 学生统计

4. **教学资源** (/teacher/resources)
   - 资源浏览
   - 资源下载

## 🔧 常用命令

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 数据库相关
npm run db:generate    # 生成 Prisma Client
npm run db:push        # 推送数据库架构
npm run db:seed        # 填充演示数据
```

## 📊 演示数据说明

运行 `npm run db:seed` 后，系统会创建以下演示数据：

- **学校**: 示范小学 (DEMO001)
- **教师**: 李老师 (teacher@demo.com / password123)
- **班级**: 四年级一班 (35名学生)
- **课程**: 
  - 茶文化启蒙（基础课程，含3个课节）
  - 茶艺基础（基础课程，含2个课节）
- **资源**: 宣传片、知识手册等公开资源
- **成果**: 首届校园茶艺展演案例
- **公益项目**: 2024年度茶文化教育公益计划

## 🎯 下一步

1. **浏览公开页面**
   - 查看首页和各个功能页面
   - 体验响应式设计

2. **登录教师端**
   - 使用测试账号登录
   - 浏览工作台和各个管理功能

3. **测试合作申请**
   - 提交合作申请表单
   - 查看表单验证

4. **自定义内容**
   - 修改品牌信息
   - 添加课程和资源
   - 上传学校成果

## ⚙️ 配置说明

### 必需配置

- `DATABASE_URL`: 数据库连接字符串
- `JWT_SECRET`: JWT 密钥（生产环境必须修改）

### 可选配置

- `REDIS_URL`: Redis 缓存服务
- `OSS_*`: 对象存储配置（用于文件上传）
- `EMAIL_*`: 邮件服务配置（用于通知）
- `SMS_*`: 短信服务配置（用于通知）

详细配置说明请查看 `.env.example` 文件。

## 🐛 常见问题

### 1. 数据库连接失败

**问题**: `Error: P1001: Can't reach database server`

**解决方案**:
- 确认 PostgreSQL 服务正在运行
- 检查 `DATABASE_URL` 配置是否正确
- 检查数据库用户名和密码
- 确认数据库已创建

### 2. 端口被占用

**问题**: `Error: listen EADDRINUSE: address already in use :::3000`

**解决方案**:
```bash
# 方式1: 修改端口
PORT=3001 npm run dev

# 方式2: 杀掉占用端口的进程（macOS/Linux）
lsof -ti:3000 | xargs kill -9

# 方式2: 杀掉占用端口的进程（Windows）
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 3. Prisma Client 未生成

**问题**: `Cannot find module '@prisma/client'`

**解决方案**:
```bash
npm run db:generate
```

### 4. 种子数据执行失败

**问题**: 执行 `npm run db:seed` 报错

**解决方案**:
```bash
# 先清空数据库
npm run db:push -- --force-reset
# 重新填充数据
npm run db:seed
```

## 📚 更多文档

- [README.md](./README.md) - 项目概述和详细说明
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 生产环境部署指南
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 开发贡献指南

## 💬 获取帮助

如果您遇到问题：

1. 查看本文档的常见问题部分
2. 查看项目 README.md
3. 搜索或创建 GitHub Issue
4. 联系项目维护团队

---

祝您使用愉快！🎉
