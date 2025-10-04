# 部署指南

## 生产环境部署清单

### 1. 环境准备

#### 必需服务
- [ ] PostgreSQL 14+ 数据库
- [ ] Node.js 18+ 运行环境
- [ ] Redis 服务（可选，用于缓存）
- [ ] 对象存储服务（阿里云 OSS 或七牛云）
- [ ] 邮件发送服务
- [ ] 短信发送服务（可选）

#### 域名与证书
- [ ] 购买并配置域名
- [ ] 配置 SSL 证书（建议使用 Let's Encrypt）
- [ ] 配置 CDN 加速

### 2. 环境变量配置

复制 `.env.example` 到 `.env` 并配置所有必需的环境变量：

```bash
cp .env.example .env
```

**关键配置项：**

1. **数据库配置**
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```

2. **JWT 密钥**（必须修改为强密码）
   ```
   JWT_SECRET="生成一个强随机密钥"
   ```

3. **对象存储配置**
   ```
   OSS_ACCESS_KEY_ID="your-key"
   OSS_ACCESS_KEY_SECRET="your-secret"
   OSS_BUCKET="bucket-name"
   OSS_ENDPOINT="https://oss-region.aliyuncs.com"
   CDN_DOMAIN="https://cdn.yourdomain.com"
   ```

4. **应用 URL**
   ```
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```

### 3. 数据库初始化

```bash
# 安装依赖
npm install

# 生成 Prisma Client
npm run db:generate

# 推送数据库架构
npm run db:push

# （可选）填充演示数据
npm run db:seed
```

### 4. 构建应用

```bash
npm run build
```

### 5. 部署方案

#### 方案 A: Vercel 部署（推荐）

1. 安装 Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. 登录 Vercel
   ```bash
   vercel login
   ```

3. 部署
   ```bash
   vercel --prod
   ```

4. 在 Vercel 控制台配置环境变量

5. 配置 PostgreSQL（推荐 Vercel Postgres 或 Supabase）

#### 方案 B: Docker 部署

1. 创建 Dockerfile
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   
   CMD ["npm", "start"]
   ```

2. 创建 docker-compose.yml
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       env_file:
         - .env
       depends_on:
         - postgres
         - redis
     
     postgres:
       image: postgres:14
       environment:
         POSTGRES_DB: tea_master_db
         POSTGRES_USER: user
         POSTGRES_PASSWORD: password
       volumes:
         - pgdata:/var/lib/postgresql/data
     
     redis:
       image: redis:7-alpine
   
   volumes:
     pgdata:
   ```

3. 构建并运行
   ```bash
   docker-compose up -d
   ```

#### 方案 C: 传统服务器部署

1. 安装 PM2
   ```bash
   npm install -g pm2
   ```

2. 构建应用
   ```bash
   npm run build
   ```

3. 启动应用
   ```bash
   pm2 start npm --name "tea-master-portal" -- start
   pm2 save
   pm2 startup
   ```

4. 配置 Nginx 反向代理
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 6. 性能优化

#### 数据库优化
- 为常用查询字段添加索引
- 定期执行 VACUUM 和 ANALYZE
- 监控慢查询并优化

#### CDN 配置
- 静态资源托管到 CDN
- 配置适当的缓存策略
- 启用 Gzip 压缩

#### 缓存策略
- 使用 Redis 缓存热点数据
- 配置 Next.js ISR（增量静态再生成）
- 浏览器缓存策略

### 7. 安全配置

#### 环境变量
- [ ] JWT_SECRET 使用强随机密钥
- [ ] 所有敏感信息通过环境变量配置
- [ ] 生产环境不使用 .env 文件，使用平台环境变量

#### HTTPS
- [ ] 配置 SSL 证书
- [ ] 强制 HTTPS 重定向
- [ ] 配置 HSTS 头

#### 数据库
- [ ] 使用强密码
- [ ] 限制数据库访问 IP
- [ ] 定期备份数据

#### 应用安全
- [ ] 配置 CORS 策略
- [ ] 启用 Rate Limiting
- [ ] 配置 CSP（内容安全策略）

### 8. 监控与日志

#### 应用监控
- 集成 Sentry 错误监控
- 配置性能监控（如 New Relic）
- 设置告警规则

#### 日志管理
- 配置日志聚合（如 ELK）
- 设置日志保留策略
- 监控关键业务指标

#### 健康检查
```javascript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date() });
}
```

### 9. 备份策略

#### 数据库备份
```bash
# 每日自动备份
pg_dump -U user -d tea_master_db > backup_$(date +%Y%m%d).sql
```

#### 文件备份
- 定期备份对象存储数据
- 配置灾难恢复方案

### 10. 上线前检查清单

- [ ] 所有环境变量已正确配置
- [ ] 数据库已初始化并迁移
- [ ] SSL 证书已配置
- [ ] CDN 已配置并测试
- [ ] 邮件发送服务已测试
- [ ] 短信发送服务已测试（如使用）
- [ ] 性能测试通过（Lighthouse > 85）
- [ ] 安全审计通过
- [ ] 备份策略已配置
- [ ] 监控和告警已配置
- [ ] DNS 解析已配置
- [ ] 错误页面已配置
- [ ] Sitemap 已生成
- [ ] Robots.txt 已配置

### 11. 发布后验证

1. **功能测试**
   - [ ] 首页加载正常
   - [ ] 所有公开页面可访问
   - [ ] 教师登录功能正常
   - [ ] 课程浏览正常
   - [ ] 资源下载正常
   - [ ] 合作申请提交成功

2. **性能测试**
   - [ ] 首屏加载时间 < 2.5s
   - [ ] Lighthouse 性能评分 > 85
   - [ ] 移动端体验良好

3. **SEO 验证**
   - [ ] 搜索引擎可抓取
   - [ ] Meta 标签正确
   - [ ] Sitemap 可访问
   - [ ] 结构化数据有效

### 12. 持续维护

- 定期更新依赖包
- 监控性能指标
- 收集用户反馈
- 定期安全审计
- 数据库性能优化
- 日志分析和问题修复

## 故障排查

### 常见问题

1. **数据库连接失败**
   - 检查 DATABASE_URL 配置
   - 确认数据库服务运行
   - 检查网络连接和防火墙

2. **资源加载失败**
   - 检查 OSS 配置
   - 验证 CDN 配置
   - 检查签名 URL 生成逻辑

3. **认证问题**
   - 检查 JWT_SECRET 配置
   - 验证 Cookie 设置
   - 检查 HTTPS 配置

## 技术支持

如遇到部署问题，请查看：
- README.md - 基本使用说明
- GitHub Issues - 已知问题和解决方案
- 项目文档 - 详细技术文档
