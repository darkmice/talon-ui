---
title: Avatar 头像
nav: 组件
group: 基础组件
order: 5
---

# Avatar 头像

带图片、文字 fallback、状态点和重叠群组的圆形人物标记。`Avatar` 封装 Radix Avatar 原语，提供 Talon Pilot 尺寸、fallback 和可选状态点。`AvatarGroup` 自动叠加多个头像，并生成 `+N` 溢出标识。

## 基础

<code src="./demos/basic.tsx"></code>

## 尺寸

<code src="./demos/sizes.tsx"></code>

| 尺寸 | 像素 | 使用场景 |
|---|---|---|
| `sm` | 28 | 列表行、行内提及 |
| `md`（默认） | 32 | 组成员、默认聊天 |
| `lg` | 40 | 主视图 / 个人资料头部 |

## 状态点

<code src="./demos/status.tsx"></code>

状态点尺寸 8px，外圈使用 `bg-bg-surface` 色，在任意背景上均清晰可辨。

| 状态 | 色彩 Token |
|---|---|
| `online` | `--tp-status-done-fg`（Talon 绿） |
| `away` | `--tp-status-pending-fg`（Talon 琥珀） |
| `offline` | `--tp-text-tertiary`（Talon 灰） |

## 群组

<code src="./demos/group.tsx"></code>

当传入的头像数量超过 `max` 时，多余的头像折叠为 `+N` 标识，与群组尺寸保持一致。

## API

### Avatar

<API id="Avatar"></API>

### AvatarGroup

<API id="AvatarGroup"></API>

## 禁忌

- 不要在 `AvatarGroup` 重叠的相邻头像上使用 `status` — 状态点会与相邻头像的圆环冲突。
- 不要在密集列表行中使用 `lg` 尺寸；请用 `sm` 或 `md`。
