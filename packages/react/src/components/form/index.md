---
title: Form 表单
nav: 组件
group: 表单录入
order: 11
---

# Form 表单

react-hook-form 的轻量布局层 — 提供标签、描述、错误信息及无障碍访问配置。`Form` 遵循 shadcn/ui 模式：不拥有校验逻辑或状态，而是提供可访问的 `<FormItem>`、`<FormLabel>`、`<FormDescription>`、`<FormMessage>` 原语，以及与 react-hook-form `<Controller>` 对接的 `<FormField>` 包装器。

## 基础

<code src="./demos/basic.tsx"></code>

## 校验

<code src="./demos/validation.tsx"></code>

字段出错时，`FormLabel` 变为红色，`FormControl` 添加 `aria-invalid="true"`，`FormMessage` 渲染错误信息。

## API

`Form` 和 `FormField` 分别是 `react-hook-form` 的 `FormProvider` 和基于 `Controller` 的包装器的重导出。

### FormItem

<API id="FormItem"></API>

### FormLabel

<API id="FormLabel"></API>

### FormControl

<API id="FormControl"></API>

### FormDescription

<API id="FormDescription"></API>

### FormMessage

<API id="FormMessage"></API>

### 对等依赖

`react-hook-form ^7.49` 是**对等依赖**，需与 `@talon-ui/react` 一起安装：

```bash
pnpm add react-hook-form
```

## 禁忌

- 不要在 `<FormItem>` 外单独使用 `<FormLabel>` — 标签会失去 `htmlFor` 绑定。
- 不要在表单中绕过 `<FormControl>` 直接使用输入控件 — 无障碍属性将不会被注入。
