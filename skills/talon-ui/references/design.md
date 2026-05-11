# Talon Pilot · Design System

> AI 自治交付平台的视觉与交互规范。
> 风格关键词：**清晰 / 克制 / 工程感 / 可信赖**。
> 适用于 Web Dashboard、配置向导、看板与协作场景。

---

## 1. 设计原则

1. **结构先于装饰** — 信息层级、留白与对齐优先于颜色与图形。
2. **状态即信息** — 用色用形传递任务/节点/同事的实时状态，避免装饰性配色。
3. **AI 在场而不喧宾** — AI 角色以头像 + 蓝色高亮呈现，与人类成员同级，不使用霓虹/魔法色。
4. **密度可控** — 同一页面允许"概览态/列表态/紧凑态"切换，永远给出空间呼吸。
5. **可直接行动** — 每个卡片都暴露 1 个主操作 + 至多 1 组次操作。

---

## 2. 色彩 Tokens

### 2.1 中性与底色（暖中性偏冷白）

| Token               | Value     | 用途            |
| ------------------- | --------- | --------------- |
| `--bg-app`          | `#F6F7F9` | 页面底色        |
| `--bg-surface`      | `#FFFFFF` | 卡片 / 弹窗     |
| `--bg-subtle`       | `#F1F3F7` | hover、嵌套区块 |
| `--bg-inverse`      | `#0E1116` | 终端 / 深色模块 |
| `--border-default`  | `#E6E8EE` | 1px 描边        |
| `--border-strong`   | `#D5D9E0` | 输入框、聚焦边  |
| `--text-primary`    | `#0F172A` | 标题 / 正文     |
| `--text-secondary`  | `#475569` | 说明 / 标签     |
| `--text-tertiary`   | `#94A3B8` | 占位 / 时间戳   |
| `--text-on-primary` | `#FFFFFF` | 主色按钮文字    |

### 2.2 主色（Indigo Blue）

```
--primary-50   #EEF2FF
--primary-100  #E0E7FF
--primary-200  #C7D2FE
--primary-500  #4F60FF   ← Brand
--primary-600  #3B4DE6   ← Hover
--primary-700  #2E3DBF   ← Active
```

### 2.3 状态色（必须成对使用：text + bg）

| 语义               | text      | bg        | 用途            |
| ------------------ | --------- | --------- | --------------- |
| 进行中 In-progress | `#2E5BFF` | `#E8EEFF` | 任务/节点运行   |
| 等待验收 Pending   | `#B26B00` | `#FFF1DB` | 等待人工/AI验收 |
| 已完成 Done        | `#0E8A55` | `#DCF5E8` | 成功 / 在线     |
| 阻塞 Blocked       | `#C8322B` | `#FCE3E1` | 失败 / 离线     |
| 未开始 Idle        | `#64748B` | `#EEF1F5` | 草稿 / 未启动   |
| 提示 Info          | `#1F6FEB` | `#E5EFFD` | 系统提示横幅    |

### 2.4 同事头像点缀色

`#7C5CFF` 紫 · `#FF7A45` 橙 · `#10B981` 绿 · `#F59E0B` 琥珀 · `#06B6D4` 青 · `#EC4899` 粉
（仅用于头像背景圆/技能 chip 渐变，不用于其他 UI）

---

## 3. 字体 Typography

```
font-family-sans: "Inter", "PingFang SC", "Microsoft YaHei",
                  system-ui, -apple-system, sans-serif;
font-family-mono: "JetBrains Mono", "SF Mono", "Menlo", monospace;
```

| Token         | size / line | weight | 用例           |
| ------------- | ----------- | ------ | -------------- |
| `display`     | 32 / 40     | 600    | 页面主标题     |
| `h1`          | 24 / 32     | 600    | 模块标题       |
| `h2`          | 20 / 28     | 600    | 卡片标题       |
| `h3`          | 16 / 24     | 600    | 小节标题       |
| `body`        | 14 / 22     | 400    | 正文           |
| `body-strong` | 14 / 22     | 500    | 字段标签       |
| `caption`     | 12 / 18     | 400    | 时间、辅助说明 |
| `mono-sm`     | 12 / 18     | 500    | 节点 ID / 路径 |

数字一律使用 `font-variant-numeric: tabular-nums`。

---

## 4. 间距 / 圆角 / 阴影

```
spacing scale:  4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80
radius:         sm 6  ·  md 10  ·  lg 14  ·  xl 20  ·  pill 999
shadow-card:    0 1px 2px rgba(15,23,42,.04), 0 1px 0 rgba(15,23,42,.02)
shadow-pop:     0 12px 32px -12px rgba(15,23,42,.18)
shadow-focus:   0 0 0 3px rgba(79,96,255,.18)
```

栅格：12 列、24px gutter；侧栏宽 240（折叠 64）。

---

## 5. 图标

- 线性图标，stroke `1.6px`，端点 `round`，尺寸 16/20/24。
- 默认色 `--text-secondary`；激活时上色为 `--primary-500`。
- 不使用拟物 / 三色填充图标。Emoji 仅在欢迎语等极少场景出现。

---

## 6. 组件清单

### 6.1 Button

- `primary` 蓝底白字，hover `--primary-600`。
- `secondary` 白底 1px 描边，hover `--bg-subtle`。
- `ghost` 透明，hover `--bg-subtle`。
- `danger` 红底白字。
- 尺寸 sm 28 · md 36 · lg 44；圆角 md。
- 支持 leading icon、loading spinner、split menu。

### 6.2 Input / Select / Textarea

- 高 36，圆角 md，placeholder `--text-tertiary`。
- focus：边框 `--primary-500` + `shadow-focus`。
- prefix/suffix 槽位（搜索图标、单位）。

### 6.3 Tag / Chip

- 高 22，圆角 sm，字号 12，左右 padding 8。
- 状态标（见 2.3），技能标（中性灰底）。

### 6.4 Avatar

- 28 / 32 / 40 三档；右下状态点 8px。
- 群组：最多展示 3 个，溢出 `+N` chip。

### 6.5 Card

- 白底，1px 边 `--border-default`，radius lg，padding 20。
- hover：边色 `--primary-200`，shadow-card 略增强。

### 6.6 Tabs

- 下划线式，激活线 2px `--primary-500`，文字 600。
- 数字徽标紧跟 tab 文字（caption + 灰底胶囊）。

### 6.7 Progress

- 高 6，圆角 pill；颜色随状态映射。
- 配套右侧百分比文字，tabular-nums。

### 6.8 Kanban Column

- 列宽 280–320，列头：状态点 + 标题 + 计数。
- 卡片：编号 + 标题 + 标签 + 负责人 + 进度 + 时间戳。

### 6.9 Stepper

- 圆形序号 28px；完成态 = 蓝色对勾；当前态 = 蓝底白字；未到 = 灰描边。
- 步骤之间用 1px 直线连接，激活段 `--primary-200`。

### 6.10 Toast / Banner

- Banner：左侧 4px 状态色竖条，圆角 md，浅色底。
- Toast：白底 + 状态色图标 + 标题 + 关闭。

### 6.11 Empty / Loading / Skeleton

- 空态：图形占位 + 一句话 + 一个 CTA。
- Skeleton：`--bg-subtle` 1.4s 呼吸动画。

### 6.12 数据条目（Row）

- 高 56；左 icon、中标题+副标题、右操作；分隔线 `--border-default`。

### 6.13 代码 / 终端

- 深底 `--bg-inverse`，mono 字体，行号 `#3B4252` 灰，关键字 `#A5B4FC`，字符串 `#86EFAC`。

### 6.14 代码 Diff 块（浅色嵌入）

- 嵌在白底卡片中：`--bg-subtle` 行号槽 + 白底正文，mono 12px。
- 新增行：底色 `#E6F8EC`，行号槽 `#CDEFD8`，前缀 `+` 绿色 `#0E8A55`。
- 删除行：底色 `#FCE3E1`，行号槽 `#F4C7C3`，前缀 `−` 红色 `#C8322B`。
- 顶部一行显示文件路径（mono），底部"展开全部 (N 行)"链接。

### 6.15 AI 执行卡（Action Card）

- 用于聊天流中展示 @talon 的一次执行：白底 + 1px 边 + radius md。
- 顶部行：AI 头像 · `@talon` · 时间戳 · 右上状态徽标（"AI 已完成"绿 / "正在执行"蓝）。
- 主体：标题（一句话动作） + 子项（带勾的清单 / 文件引用 / 进度条）。
- 底部：右对齐的 1 个次操作按钮（"查看变更 / 查看详情"），不放主操作。
- 进行中态：进度条满宽 + 右侧"N/M 步骤完成"caption。

### 6.16 聊天气泡（Message）

- 不带气泡背景，靠头像 + 16px 缩进的内容区分发言人。
- 头部：`@username` 加粗 + 灰色时间戳，间距 8px。
- AI 与人类外观一致；只在头像底色上区分（AI 用 primary-100）。

### 6.17 聊天输入框（Composer）

- 高 56–80，圆角 md，1px 边，内含两行：
  - 输入区（占位"给 @talon 发送消息..."）
  - 工具行：左侧 ghost 图标按钮（添加 / @ / 截图 / 表情 / 附件），右侧 split menu（继续执行 ▾）+ primary 圆形发送按钮 36×36。

### 6.18 信息表（Key-Value Panel）

- 卡片内左右两列：左列 `--text-secondary`、右列 `--text-primary`。
- 行高 32，字号 13；行间无分隔线，仅依靠间距。
- 状态值用 inline tag，时间 / ID 用 mono。

### 6.19 指标网格（Stat Grid）

- 2×N 或 1×N 网格，单元：label（caption 灰）+ value（h3 加粗，tabular-nums）。
- 不加边框、不加图标，仅靠排版形成节奏。

### 6.20 文件引用条目（File Ref Row）

- 行高 32：左 16px 文件图标 + mono 路径（中点截断），右 caption 时间。
- 整行 hover `--bg-subtle`。

### 6.21 详情页二级 Tab

- 顶栏内联，下划线式（同 6.6），用于切换"白板 / 终端 / 代码 / 数据库 / API 调试 / 聊天"等同对象不同视图。
- 与左主导航独立；详情页关闭后状态不保留。

### 6.22 快捷操作卡片组（Quick Actions）

- 2×N 网格，单元为 secondary 按钮等高 36，gap 8。
- 用于"暂停任务 / 修改计划 / 创建快照 / 回滚到快照"这类成对的次操作。

### 6.23 三栏外壳（Settings Shell）

- 主侧栏 240（同 6.app）+ 二级侧栏 240（设置子导航）+ 内容区。
- 二级侧栏分组：组标题 caption 11px、组内项 36 高，激活项 `--primary-50` + `--primary-700` + 左侧 leading icon。
- 内容区顶端用面包屑（caption + `/` 分隔），右上挂操作日志、帮助、通知。

### 6.24 顶栏统计带（Hero Stat Strip）

- 卡内一行展示 3–5 个指标：左 28×28 浅色 icon 容器 + 主数字（h1，tabular-nums）+ 副标签。
- 单元间距 40，垂直分隔线可省。第 1 单元数字下挂状态点+文字（如"执行节点在线"）。

### 6.25 角色行（Role Row）

- 行高 40：左 24×24 圆角 icon、中角色名、右 "N 人 + 头像群组 + 溢出 chip"。
- 标题旁可挂主操作链接"管理成员"。

### 6.26 多条进度块（Multi-Bar Progress）

- 同卡片内 N 行：左标签、右"已用 / 总量"，下方 6px 进度条。
- 每条颜色对应资源类别：蓝（节点）/ 紫（AI 同事）/ 橙（任务）/ 绿（存储）/ 蓝（时长）。
- 仅展示真实数据；不要为视觉拼配色。

### 6.27 AI 同事班底卡（Persona Card）

- 宽 110、padding 12，列表横向排布；顶部 80×96 头像（圆角 md，冷灰底色），下方居中名称、角色（caption）、状态点、两条 11px 指标（成功率 / 活跃任务）。
- 状态点：在线绿 / 编写中琥珀 / 离线灰。

### 6.28 节点行（Runtime Row）

- 高 56：左 32 设备图标、中"名称（粗）+ 状态点 + 引擎 chip"、右 Lease 数 + CPU/内存 mini 进度（宽 60，2 条堆叠）。
- 离线行整体降透明度至 0.7，CPU/内存值显示 `–`。

### 6.29 健康度仪表（Score Donut）

- 直径 120，环宽 12，颜色按分段：≥90 绿、70–89 蓝、50–69 琥珀、<50 红。
- 中心：32px 数字 + 12px 等级（优秀 / 良好 / 一般 / 较差）。

### 6.30 评估行（Metric Check Row）

- 行高 28：左 16 状态图标（✓/!/×）、中标签、右数值（mono），无分隔线。
- 用于"执行节点在线率 100%、自治完成率 98%"类紧凑数据汇总。

### 6.31 风险提示行（Risk Row）

- 左 16 黄色感叹号、中文案（13px）、右 "去配置/去查看"链接（primary-600）。
- 卡顶可挂总数徽标，底部"查看全部风险 (N) →"。

### 6.32 通知铃（Bell Badge）

- 36×36 ghost 按钮 + 右上角 8×8 圆点（数字 ≤9 显数字，否则 `9+`），红底白字。

### 6.33 下拉选择（Select / Dropdown）

- 触发器同 input 高 36，右侧 chevron。展开面板：白底、border-default、shadow-pop、radius md、padding 4。
- 选项行高 32，hover `--bg-subtle`，选中 `--primary-50` + 文字 `--primary-700`，右侧打勾。
- 支持顶部搜索框、分组标题（caption uppercase）、危险项（红字）、底部固定操作（"管理选项"）。
- 多选：选项左侧 checkbox；触发器内显示选中 chip + 计数。

### 6.34 下拉菜单（Action Menu）

- 由"…"按钮触发；面板宽 ≥160，最大 320。
- 项结构：左 16 icon + 标签 + 右 caption（快捷键 mono）；项之间 4px gap。
- 支持次级展开（子菜单 chevron 右）、分隔线（1px border-default 上下 4px gap）。

### 6.35 弹出气泡（Popover / Tooltip）

- Tooltip：黑底 `#0F172A` 白字 12px，padding 6×8，radius sm，箭头 6px。
- Popover：白底卡，宽 240–360，padding 16，shadow-pop，自带关闭按钮。

### 6.36 模态对话框（Modal）

- 居中宽 480/640/800 三档，radius lg，padding 24，遮罩 `rgba(15,23,42,.4)`。
- 头部：标题（h2） + 关闭 ×；底部：右对齐主+次按钮，按钮间 8px gap。
- ESC 关闭、首焦自动落在第一个可交互控件。

### 6.37 抽屉（Drawer）

- 右侧滑入，宽 400/520/720；头尾固定，主体可滚。
- 用于"详情查看 / 资源配置 / 多步表单"，比 Modal 容纳更多字段。

### 6.38 日期选择（Date Picker）

- 触发器同 input；面板：月份切换头 + 7 列日历 + 底部"今天 / 清除 / 确定"。
- 选中日 `--primary-500` 实心圆，今天用边框圈，禁用日 `--text-tertiary` 划线。
- 范围模式：起止之间用 `--primary-50` 横条贯穿。

### 6.39 时间选择（Time Picker）

- 三列滚动列（时/分/秒），列宽 56，行高 32，激活行 `--primary-50`。

### 6.40 滑块（Slider）

- 轨道高 4，已选段 `--primary-500`、未选段 `--bg-subtle`。
- 拖柄 16×16 白底 + 1.5px primary 边 + shadow-card；hover 放大到 18。
- 双拖柄区间模式；可选刻度点。

### 6.41 数值输入（Number / Stepper）

- input 36 + 右侧上下两个 14 高箭头按键，hover 显示。
- 长按持续步进；支持单位后缀（caption）。

### 6.42 分页（Pagination）

- 32×32 方块按钮：当前页 `--primary-500` 实心、其余 ghost；省略号居中显示 `…`。
- 左右分页器；右侧"每页 N 条"select。

### 6.43 面包屑（Breadcrumb）

- 13px caption；分隔符 `/` 用 `--text-tertiary`；末项加粗 `--text-primary`。
- 折叠：第 2~倒数第 2 折成 `…` dropdown。

### 6.44 Toast 通知

- 右上角堆叠，宽 360，shadow-pop；左 16 状态图标 + 标题 + 描述 + 关闭。
- 自动消失 4s（错误 8s）；同时最多 3 条，更多入队。

### 6.45 文件上传（Uploader）

- 虚线 dashed border-strong + radius md + padding 24 居中：上传图标 + "点击或拖入文件" + 副说明。
- 已上传项列表：左文件 icon + 名 + size mono、中进度条、右"取消/重传/删除"。

### 6.46 搜索 Combobox

- 输入框 + 实时下拉结果；结果分组（最近/匹配项/新建），高亮匹配子串 `--primary-600` + 加粗。
- 支持键盘上下选 + Enter 确认 + Esc 关闭。

### 6.47 标签页面板（Accordion / Collapse）

- 每段头部行高 44：左 chevron + 标题 + 右 caption / 计数；展开时 chevron 旋 90°。

### 6.48 评分（Rating）

- 5 颗星 16px；激活 `#F59E0B`、未选 `--border-strong`；半星支持。

### 6.49 徽标（Badge）

- 数字徽标：12 高，最小宽 12，红底白字、tabular-nums；超 99 显示 `99+`。
- 点徽标：8×8 圆点，附在容器右上 `-2 -2`。

### 6.50 用户菜单（User Menu）

- 触发器：头像 + 名 + chevron；面板宽 240，顶部用户卡（头像 + 名 + 邮箱），下接菜单项 + 分隔 + 退出登录（红字）。

---

## 7. 交互细节

- **过渡**：默认 `150ms cubic-bezier(.2,.8,.2,1)`；模态/抽屉 `220ms`。
- **Hover/Active**：所有可点元素必须有可见状态变化（颜色或位移 1px）。
- **聚焦可见**：键盘 focus 必现 `shadow-focus` 环。
- **空数据**：永远给出原因 + 下一步建议。
- **状态变更**：使用细微的位移 + 状态色淡入，避免颜色突变。

---

## 8. 文案口吻

- 中文为主，技术词保留英文（API、Runtime、CLI）。
- 操作动词放前：「新建项目」「连接测试」「查看变更」。
- 不使用感叹号、不堆砌副词；错误信息说明原因 + 给方案。

---

## 9. 不要做的事

- ❌ 紫粉魔法渐变背景 / 神经网络装饰图。
- ❌ 阴影 > 24px 的悬浮卡。
- ❌ 同时使用超过两种状态色块在一个组件内。
- ❌ 用纯图标按钮表达破坏性操作（必须配文字）。
- ❌ 在正文里用 emoji 作为列表项目符。
