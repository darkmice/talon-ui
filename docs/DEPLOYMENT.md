# Docs Deployment

这个仓库现在支持两种 Cloudflare 部署方式：

1. 推荐：Cloudflare 原生 Git 连接 + Workers Static Assets
2. 备选：GitHub Actions 直传 Cloudflare Pages

如果你已经在 Cloudflare 控制台里连 GitHub，优先走第 1 种。

## 推荐方案：Cloudflare 原生 Git 构建

仓库根目录已经补好了 [`wrangler.jsonc`](../wrangler.jsonc)，项目名固定为：

```txt
talon-ui-docs
```

### 在 Cloudflare 面板里这样填

- 项目名：`talon-ui-docs`
- Build command：

```txt
pnpm --filter @talon-ui/tokens build && pnpm --filter @talon-ui/react build && pnpm docs:build
```

- Deploy command：

```txt
npx wrangler deploy
```

- Non-production branch deploy command：

```txt
npx wrangler versions upload
```

- Root directory：留空，或者填仓库根目录

不要填 `apps/docs/dist`。  
那个目录是 **构建产物目录**，不是 monorepo 的构建根目录。

### 为什么不能只填 `pnpm docs:build`

`apps/docs/.dumirc.ts` 里把 `@talon-ui/react` 指到了 `packages/react/dist/index.js`。  
所以在 Cloudflare 的干净构建环境里，必须先跑：

1. `packages/tokens` build
2. `packages/react` build
3. `apps/docs` build

否则文档站在 Cloudflare 首次构建时很可能直接找不到 `packages/react/dist`。

## 备选方案：GitHub Actions 直传 Pages

仓库里也保留了 [`.github/workflows/deploy-docs.yml`](../.github/workflows/deploy-docs.yml) 这条直传链路。

如果你不想在 Cloudflare 里配 Git 构建，也可以：

1. 在 Cloudflare 创建一个 `talon-ui-docs` Pages 项目
2. 给 GitHub 仓库配置：

```txt
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

之后由 GitHub Actions 构建并上传 `apps/docs/dist`。

## 自动部署规则

- `main`：生产部署
- 非生产分支 / Pull Request：预览部署

## 接入后怎么验证

### 本地验证

```bash
pnpm --filter @talon-ui/tokens build
pnpm --filter @talon-ui/react build
pnpm docs:build
```

### 线上验证

- 如果走 Cloudflare 原生 Git 构建：去 Cloudflare 的 Deployments / Builds 页面看构建日志和预览 URL
- 如果走 GitHub Actions：去 GitHub Actions 看 `Deploy docs` workflow 的 Job Summary

## 自定义域名

第一次生产部署成功后，再到 Cloudflare 里绑定自定义域名即可，不需要再改仓库代码。
