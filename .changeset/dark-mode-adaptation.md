---
"@talon-ui/react": patch
"@talon-ui/tokens": patch
---

深色模式适配:SegmentedControl 等组件由硬编码 `bg-white`/hex 改为语义 token + `dark:`
变体;Tooltip 白块根治;表单 hex→token;遮罩与 accent 深色处理;tokens 深色值 /
preset 补齐。修复手动 `data-theme=dark` 下组件不变深色的问题。
