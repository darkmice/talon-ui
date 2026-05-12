---
title: Toast 通知
nav: 组件
group: 反馈与导航
order: 32
---

# Toast 通知

带自动关闭和命令式 API 的瞬时浮动通知。`Toast` 是固定在右上角的浮动通知堆栈，封装 `@radix-ui/react-toast`，并提供命令式 `useToast()` 钩子。

## 初始化

在应用根部包裹一次 `<ToastProvider>`：

```tsx | pure
<ToastProvider>
  <App />
</ToastProvider>
```

然后在任意位置调用 `useToast()`：

```tsx | pure
const { toast } = useToast();
toast({ title: '已保存', tone: 'success' });
```

## 基础

<code src="./demos/basic.tsx"></code>

## 色调

<code src="./demos/tones.tsx"></code>

默认时长：`info`/`success` 4 秒，`warning` 6 秒，`error` 8 秒。

## 带操作

<code src="./demos/with-action.tsx"></code>

## API

```ts | pure
const { toast, dismiss } = useToast();

const id = toast({
  title?: ReactNode;
  description?: ReactNode;
  tone?: 'info' | 'success' | 'warning' | 'error';
  action?: ReactNode;
  duration?: number;
});

dismiss(id);    // 关闭单条
dismiss();      // 关闭全部
```

## 禁忌

- 不要同时显示超过 3 条 Toast — `ToastProvider` 默认截断队列，保留最新的可见。
- 不要在 Toast 中放长篇内容 — 若消息需要持久展示，请改用 `Banner`。
