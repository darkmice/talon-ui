---
title: Tooltip 文字提示
nav: 组件
group: 反馈与导航
order: 35
---

# Tooltip 文字提示

悬停或聚焦时出现的深色背景提示标签。`Tooltip` 是紧贴触发器显示的深色低对比度提示，封装 `@radix-ui/react-tooltip`。

## 基础

<code src="./demos/basic.tsx"></code>

## 方向

<code src="./demos/sides.tsx"></code>

## 图标触发器

<code src="./demos/on-icon.tsx"></code>

## 使用说明

`Tooltip` 需要父级 `<TooltipProvider>`。通常在应用根部放置一次，包裹整个组件树：

```tsx
<TooltipProvider delayDuration={200} skipDelayDuration={300}>
  <App />
</TooltipProvider>
```

`delayDuration` 控制悬停多久后出现 Tooltip；`skipDelayDuration` 控制关闭一个 Tooltip 后下一个即时出现的等待时间。

## API

<API id="TooltipContent"></API>

## 禁忌

- 不要将关键信息放在 Tooltip 中 — 它默认隐藏且触控设备无法访问。
- 不要在没有 `<TooltipProvider>` 的情况下使用 — Tooltip 将静默失效。
