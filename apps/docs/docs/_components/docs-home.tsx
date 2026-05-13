import { Avatar, AvatarGroup, Button, Card, Progress, Tag } from '@talon-ui/react';

type Locale = 'zh-CN' | 'en-US';
type MetricAccent = 'primary' | 'cyan' | 'amber';

type HomeCopy = {
  eyebrow: string[];
  title: string;
  lead: string;
  supporting: string;
  primaryAction: string;
  secondaryAction: string;
  proof: Array<{ label: string; value: string; note: string }>;
  previewTitle: string;
  previewKicker: string;
  previewBadge: string;
  previewShellTitle: string;
  previewShellSubtitle: string;
  previewMetrics: Array<{ label: string; value: string; note: string; accent: MetricAccent }>;
  previewRows: Array<{ label: string; value: number; status: 'normal' | 'success' | 'warning' }>;
  previewFooter: string;
  previewFooterTag: string;
  blocksTitle: string;
  blockUnit: string;
  blockFootnote: string;
  designIntentLabel: string;
  designIntentLead: string;
  designIntentBody: string;
  blocks: Array<{
    title: string;
    count: string;
    description: string;
    samples: string[];
    href: string;
    cta: string;
  }>;
};

const COPY: Record<Locale, HomeCopy> = {
  'zh-CN': {
    eyebrow: ['适合后台与工作台', '45 个常用组件', '支持亮 / 暗主题'],
    title: '为后台和 AI 工作台准备的 React 组件库',
    lead: '从按钮、表单到数据展示，Talon UI 帮你更快搭出清晰、统一、稳定的产品界面。',
    supporting:
      '内置设计 Token、常用交互状态和成套页面组件，适合管理后台、运营平台、配置中心和 AI 工作台。',
    primaryAction: '开始使用',
    secondaryAction: '查看组件',
    proof: [
      { label: '组件覆盖', value: '45 个', note: '基础、表单、导航、反馈、展示能力一套齐。' },
      { label: '主题能力', value: '亮 / 暗', note: '同一套语义 Token，切换后依然统一。' },
      {
        label: '接入方式',
        value: 'Tailwind / CSS',
        note: '按你的项目栈直接接入，不需要重做样式体系。',
      },
    ],
    previewTitle: '界面预览',
    previewKicker: '一个清晰、耐看的工作台可以这样搭',
    previewBadge: 'Light Surface',
    previewShellTitle: '任务工作台',
    previewShellSubtitle: '列表、状态、操作放在一起，也能保持清楚。',
    previewMetrics: [
      {
        label: '待处理',
        value: '12',
        note: '任务、提醒和状态能放进同一套布局。',
        accent: 'primary',
      },
      { label: '完成率', value: '96%', note: '颜色、层级和反馈都更容易读懂。', accent: 'cyan' },
      {
        label: '双主题',
        value: 'Ready',
        note: '同一套 Token 直接支撑亮色和暗色。',
        accent: 'amber',
      },
    ],
    previewRows: [
      { label: '待办处理', value: 72, status: 'normal' },
      { label: '流程状态', value: 91, status: 'success' },
      { label: '结果反馈', value: 100, status: 'success' },
    ],
    previewFooter: '真正重要的是信息层级清楚、状态表达稳定、页面能长期使用。',
    previewFooterTag: '好读好用',
    blocksTitle: '按使用场景浏览组件',
    blockUnit: '个组件',
    blockFootnote: '这一组包含',
    designIntentLabel: '适合做什么',
    designIntentLead: '中后台、运营台、管理端、AI 工作台。',
    designIntentBody: '如果你在做需要大量表单、状态、数据和操作的界面，这套库会更顺手。',
    blocks: [
      {
        title: '基础组件',
        count: '10',
        description: '按钮、输入、排版、卡片这些最常用的底层能力。',
        samples: ['Button', 'Input', 'Card', 'Typography'],
        href: '/components/button',
        cta: '查看基础组件',
      },
      {
        title: '表单与选择',
        count: '13',
        description: '覆盖输入、选择、日期、上传等高频录入场景。',
        samples: ['Form', 'Select', 'DatePicker', 'Upload'],
        href: '/components/form',
        cta: '查看表单组件',
      },
      {
        title: '导航与反馈',
        count: '12',
        description: '帮助用户切换页面、完成确认、接收操作结果。',
        samples: ['Tabs', 'Modal', 'Toast', 'Breadcrumb'],
        href: '/components/tabs',
        cta: '查看导航反馈',
      },
      {
        title: '数据展示',
        count: '10',
        description: '适合状态面板、进度展示、折叠信息和业务信息行。',
        samples: ['Statistic', 'Progress', 'Collapse', 'BusinessRows'],
        href: '/components/statistic',
        cta: '查看数据展示',
      },
    ],
  },
  'en-US': {
    eyebrow: ['Built for admin apps', '45 essential components', 'Light / dark ready'],
    title: 'A React UI library for dashboards and AI workspaces',
    lead: 'From buttons and forms to data display, Talon UI helps teams build clearer, steadier, and more consistent product interfaces.',
    supporting:
      'It comes with design tokens, common interaction states, and page-ready components for admin panels, operations tools, settings surfaces, and AI workspaces.',
    primaryAction: 'Get started',
    secondaryAction: 'Browse components',
    proof: [
      {
        label: 'Coverage',
        value: '45 components',
        note: 'Core, form, navigation, feedback, and display building blocks.',
      },
      {
        label: 'Theme support',
        value: 'Light / dark',
        note: 'One semantic token system keeps both modes consistent.',
      },
      {
        label: 'Integration',
        value: 'Tailwind / CSS',
        note: 'Adopt it through the stack you already use.',
      },
    ],
    previewTitle: 'Interface preview',
    previewKicker: 'A calm workspace can look like this',
    previewBadge: 'Light Surface',
    previewShellTitle: 'Task workspace',
    previewShellSubtitle: 'Lists, status, and actions can live together without feeling crowded.',
    previewMetrics: [
      {
        label: 'Pending',
        value: '12',
        note: 'Tasks, reminders, and status fit in one coherent layout.',
        accent: 'primary',
      },
      {
        label: 'Success rate',
        value: '96%',
        note: 'Color, hierarchy, and feedback stay easy to read.',
        accent: 'cyan',
      },
      {
        label: 'Themes',
        value: 'Ready',
        note: 'The same token system supports light and dark modes.',
        accent: 'amber',
      },
    ],
    previewRows: [
      { label: 'To-do handling', value: 72, status: 'normal' },
      { label: 'Flow status', value: 91, status: 'success' },
      { label: 'Result feedback', value: 100, status: 'success' },
    ],
    previewFooter:
      'The real goal is stable hierarchy, readable states, and pages people can use every day.',
    previewFooterTag: 'clear and usable',
    blocksTitle: 'Browse by usage',
    blockUnit: 'components',
    blockFootnote: 'This set includes',
    designIntentLabel: 'Good for',
    designIntentLead: 'Admin apps, ops tools, management surfaces, and AI workspaces.',
    designIntentBody:
      'If your interface depends on forms, states, data, and actions, this library should feel natural to use.',
    blocks: [
      {
        title: 'Foundations',
        count: '10',
        description: 'Buttons, inputs, typography, and cards for day-to-day product work.',
        samples: ['Button', 'Input', 'Card', 'Typography'],
        href: '/components/button',
        cta: 'See foundations',
      },
      {
        title: 'Forms & selection',
        count: '13',
        description: 'Inputs, selectors, dates, uploads, and other high-frequency entry patterns.',
        samples: ['Form', 'Select', 'DatePicker', 'Upload'],
        href: '/components/form',
        cta: 'See form components',
      },
      {
        title: 'Navigation & feedback',
        count: '12',
        description: 'Switch screens, confirm actions, and return results with less friction.',
        samples: ['Tabs', 'Modal', 'Toast', 'Breadcrumb'],
        href: '/components/tabs',
        cta: 'See navigation',
      },
      {
        title: 'Data display',
        count: '10',
        description:
          'Useful for status boards, progress views, collapsible sections, and business rows.',
        samples: ['Statistic', 'Progress', 'Collapse', 'BusinessRows'],
        href: '/components/statistic',
        cta: 'See data display',
      },
    ],
  },
};

function withLocale(locale: Locale, href: string) {
  return locale === 'en-US' ? `/en-US${href}` : href;
}

export default function DocsHome({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <>
      <style>{`
        .talon-home {
          position: relative;
          overflow: hidden;
          padding: 40px 24px 88px;
          --home-grid-line: rgba(148, 163, 184, 0.08);
          --home-title-gradient: linear-gradient(132deg, #0f172a 0%, #1d36a6 18%, #4f60ff 52%, #1d9bf0 78%, #22d3ee 100%);
          --home-proof-bg: rgba(255, 255, 255, 0.84);
          --home-proof-border: var(--tp-border-default);
          --home-proof-shadow: 0 20px 40px -34px rgba(15, 23, 42, 0.24);
          --home-preview-halo: linear-gradient(135deg, rgba(79, 96, 255, 0.12), rgba(6, 182, 212, 0.12));
          --home-preview-card-border: rgba(224, 231, 255, 0.92);
          --home-preview-card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(244, 248, 255, 0.94) 100%);
          --home-preview-card-shadow: 0 30px 60px -42px rgba(15, 23, 42, 0.28);
          --home-preview-shell-bg: linear-gradient(180deg, rgba(250, 252, 255, 0.96) 0%, rgba(240, 245, 255, 0.98) 100%);
          --home-preview-shell-border: rgba(214, 223, 245, 0.95);
          --home-preview-shell-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
          --home-avatar-shadow: 0 12px 22px -18px rgba(15, 23, 42, 0.34);
          --home-avatar-indigo-fg: #3145c4;
          --home-avatar-indigo-bg: linear-gradient(180deg, rgba(111, 124, 255, 0.28) 0%, rgba(111, 124, 255, 0.16) 100%);
          --home-avatar-slate-fg: #35506f;
          --home-avatar-slate-bg: linear-gradient(180deg, rgba(148, 163, 184, 0.28) 0%, rgba(148, 163, 184, 0.16) 100%);
          --home-avatar-cyan-fg: #0f7490;
          --home-avatar-cyan-bg: linear-gradient(180deg, rgba(34, 211, 238, 0.28) 0%, rgba(34, 211, 238, 0.16) 100%);
          --home-avatar-amber-fg: #a16207;
          --home-avatar-amber-bg: linear-gradient(180deg, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0.16) 100%);
          --home-metric-bg: rgba(255, 255, 255, 0.94);
          --home-metric-border: rgba(214, 223, 245, 0.94);
          --home-metric-shadow: 0 18px 32px -26px rgba(15, 23, 42, 0.22);
          --home-row-bg: rgba(255, 255, 255, 0.92);
          --home-row-border: rgba(214, 223, 245, 0.9);
          --home-row-shadow: 0 14px 28px -28px rgba(15, 23, 42, 0.2);
          --home-block-bg: rgba(255, 255, 255, 0.9);
          --home-block-border: rgba(224, 231, 255, 0.92);
          --home-block-shadow: 0 22px 44px -34px rgba(15, 23, 42, 0.24);
          --home-block-hover-border: rgba(99, 102, 241, 0.34);
          --home-block-hover-shadow: 0 28px 52px -34px rgba(15, 23, 42, 0.26);
          --home-note-bg: rgba(79, 96, 255, 0.07);
          --home-note-border: rgba(199, 210, 254, 0.56);
          background:
            radial-gradient(circle at 12% 14%, rgba(79, 96, 255, 0.14) 0%, rgba(79, 96, 255, 0) 24%),
            radial-gradient(circle at 88% 18%, rgba(6, 182, 212, 0.11) 0%, rgba(6, 182, 212, 0) 22%),
            linear-gradient(180deg, rgba(79, 96, 255, 0.05) 0%, rgba(79, 96, 255, 0) 28%),
            var(--tp-bg-app);
        }
        [data-prefers-color='dark'] .talon-home {
          --home-grid-line: rgba(71, 85, 105, 0.16);
          --home-title-gradient: linear-gradient(132deg, #f8fafc 0%, #dbeafe 14%, #a5b4fc 42%, #7dd3fc 72%, #22d3ee 100%);
          --home-proof-bg: rgba(15, 23, 42, 0.72);
          --home-proof-border: rgba(71, 85, 105, 0.42);
          --home-proof-shadow: 0 20px 40px -30px rgba(2, 6, 23, 0.52);
          --home-preview-halo: linear-gradient(135deg, rgba(79, 96, 255, 0.28), rgba(6, 182, 212, 0.18));
          --home-preview-card-border: rgba(96, 165, 250, 0.18);
          --home-preview-card-bg: linear-gradient(180deg, rgba(14, 22, 38, 0.94) 0%, rgba(10, 18, 32, 0.98) 100%);
          --home-preview-card-shadow: 0 32px 64px -36px rgba(2, 6, 23, 0.7);
          --home-preview-shell-bg: linear-gradient(180deg, rgba(18, 28, 46, 0.94) 0%, rgba(13, 22, 38, 0.96) 100%);
          --home-preview-shell-border: rgba(71, 85, 105, 0.44);
          --home-preview-shell-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
          --home-avatar-shadow: 0 14px 24px -18px rgba(2, 6, 23, 0.6);
          --home-avatar-indigo-fg: #c7d2fe;
          --home-avatar-indigo-bg: linear-gradient(180deg, rgba(99, 102, 241, 0.42) 0%, rgba(79, 70, 229, 0.26) 100%);
          --home-avatar-slate-fg: #dbeafe;
          --home-avatar-slate-bg: linear-gradient(180deg, rgba(100, 116, 139, 0.42) 0%, rgba(71, 85, 105, 0.26) 100%);
          --home-avatar-cyan-fg: #cffafe;
          --home-avatar-cyan-bg: linear-gradient(180deg, rgba(6, 182, 212, 0.42) 0%, rgba(8, 145, 178, 0.26) 100%);
          --home-avatar-amber-fg: #fde68a;
          --home-avatar-amber-bg: linear-gradient(180deg, rgba(245, 158, 11, 0.42) 0%, rgba(217, 119, 6, 0.24) 100%);
          --home-metric-bg: rgba(17, 27, 45, 0.84);
          --home-metric-border: rgba(71, 85, 105, 0.42);
          --home-metric-shadow: 0 18px 32px -24px rgba(2, 6, 23, 0.6);
          --home-row-bg: rgba(17, 27, 45, 0.8);
          --home-row-border: rgba(71, 85, 105, 0.4);
          --home-row-shadow: 0 14px 28px -24px rgba(2, 6, 23, 0.55);
          --home-block-bg: rgba(15, 23, 42, 0.78);
          --home-block-border: rgba(71, 85, 105, 0.42);
          --home-block-shadow: 0 22px 44px -28px rgba(2, 6, 23, 0.62);
          --home-block-hover-border: rgba(129, 140, 248, 0.52);
          --home-block-hover-shadow: 0 26px 48px -28px rgba(2, 6, 23, 0.72);
          --home-note-bg: rgba(37, 99, 235, 0.12);
          --home-note-border: rgba(96, 165, 250, 0.26);
        }
        .talon-home::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(var(--home-grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--home-grid-line) 1px, transparent 1px);
          background-size: 120px 120px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 74%);
        }
        .talon-home__inner {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }
        .talon-home__hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.98fr);
          gap: 28px;
          align-items: stretch;
        }
        .talon-home__copy {
          padding-top: 24px;
        }
        .talon-home__eyebrow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .talon-home__title {
          margin: 0;
          max-width: 10ch;
          font-size: clamp(44px, 6.5vw, 72px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 760;
          background-image: var(--home-title-gradient);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .talon-home__lead {
          margin: 24px 0 0;
          max-width: 620px;
          font-size: 20px;
          line-height: 1.62;
          color: var(--tp-text-primary);
        }
        .talon-home__supporting {
          margin: 18px 0 0;
          max-width: 620px;
          font-size: 15px;
          line-height: 1.78;
          color: var(--tp-text-secondary);
        }
        .talon-home__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }
        .talon-home__proof {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 30px;
        }
        .talon-home__proof-item {
          border: 1px solid var(--home-proof-border);
          border-radius: 20px;
          padding: 18px 18px 16px;
          background: var(--home-proof-bg);
          box-shadow: var(--home-proof-shadow);
          backdrop-filter: blur(10px);
        }
        .talon-home__proof-label {
          display: block;
          margin-bottom: 8px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tp-text-tertiary);
        }
        .talon-home__proof-value {
          display: block;
          font-size: 24px;
          line-height: 1.05;
          font-weight: 760;
          letter-spacing: -0.03em;
          color: var(--tp-text-primary);
        }
        .talon-home__proof-note {
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.62;
          color: var(--tp-text-secondary);
        }
        .talon-home__preview {
          position: relative;
        }
        .talon-home__preview::before {
          content: '';
          position: absolute;
          inset: 18px -8px -20px 28px;
          border-radius: 32px;
          background: var(--home-preview-halo);
          filter: blur(30px);
          z-index: 0;
        }
        .talon-home__preview-card {
          position: relative;
          z-index: 1;
          height: 100%;
          border-radius: 28px;
          border: 1px solid var(--home-preview-card-border);
          background: var(--home-preview-card-bg);
          box-shadow: var(--home-preview-card-shadow);
        }
        .talon-home__preview-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }
        .talon-home__preview-kicker {
          margin: 0 0 6px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tp-text-tertiary);
        }
        .talon-home__preview-title {
          margin: 0;
          font-size: 26px;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--tp-text-primary);
        }
        .talon-home__preview-shell {
          border-radius: 24px;
          padding: 18px;
          background: var(--home-preview-shell-bg);
          border: 1px solid var(--home-preview-shell-border);
          box-shadow: var(--home-preview-shell-shadow);
        }
        .talon-home__preview-shell-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }
        .talon-home__preview-shell-title {
          font-size: 14px;
          font-weight: 650;
          color: var(--tp-text-primary);
        }
        .talon-home__preview-shell-subtitle {
          margin-top: 4px;
          font-size: 12px;
          color: var(--tp-text-secondary);
        }
        .talon-home__preview-avatar {
          box-shadow: var(--home-avatar-shadow);
        }
        .talon-home__preview-avatar--indigo {
          color: var(--home-avatar-indigo-fg);
          background: var(--home-avatar-indigo-bg);
        }
        .talon-home__preview-avatar--slate {
          color: var(--home-avatar-slate-fg);
          background: var(--home-avatar-slate-bg);
        }
        .talon-home__preview-avatar--cyan {
          color: var(--home-avatar-cyan-fg);
          background: var(--home-avatar-cyan-bg);
        }
        .talon-home__preview-avatar--amber {
          color: var(--home-avatar-amber-fg);
          background: var(--home-avatar-amber-bg);
        }
        .talon-home__preview-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }
        .talon-home__metric {
          position: relative;
          min-height: 120px;
          border-radius: 18px;
          padding: 16px 14px;
          background: var(--home-metric-bg);
          border: 1px solid var(--home-metric-border);
          box-shadow: var(--home-metric-shadow);
          overflow: hidden;
        }
        .talon-home__metric::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--metric-accent);
        }
        .talon-home__metric::after {
          content: '';
          position: absolute;
          width: 120px;
          height: 120px;
          right: -44px;
          bottom: -62px;
          border-radius: 999px;
          background: radial-gradient(circle, var(--metric-soft) 0%, rgba(255, 255, 255, 0) 72%);
        }
        .talon-home__metric--primary {
          --metric-accent: var(--tp-primary-500);
          --metric-soft: rgba(79, 96, 255, 0.18);
        }
        .talon-home__metric--cyan {
          --metric-accent: var(--tp-accent-cyan);
          --metric-soft: rgba(6, 182, 212, 0.16);
        }
        .talon-home__metric--amber {
          --metric-accent: var(--tp-accent-amber);
          --metric-soft: rgba(245, 158, 11, 0.16);
        }
        .talon-home__metric-label {
          position: relative;
          z-index: 1;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tp-text-tertiary);
        }
        .talon-home__metric-value {
          position: relative;
          z-index: 1;
          margin-top: 12px;
          font-size: 32px;
          line-height: 0.98;
          font-weight: 760;
          letter-spacing: -0.04em;
          color: var(--tp-text-primary);
        }
        .talon-home__metric-note {
          position: relative;
          z-index: 1;
          margin-top: 10px;
          font-size: 11px;
          line-height: 1.58;
          color: var(--tp-text-secondary);
        }
        .talon-home__preview-list {
          display: grid;
          gap: 12px;
        }
        .talon-home__preview-row {
          border-radius: 16px;
          padding: 14px 14px 12px;
          background: var(--home-row-bg);
          border: 1px solid var(--home-row-border);
          box-shadow: var(--home-row-shadow);
        }
        .talon-home__preview-row-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }
        .talon-home__preview-row-label {
          font-size: 13px;
          color: var(--tp-text-primary);
        }
        .talon-home__preview-row-note {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-size: 12px;
          color: var(--tp-text-secondary);
        }
        .talon-home__blocks {
          margin-top: 46px;
        }
        .talon-home__blocks-heading {
          margin: 0 0 16px;
          font-size: 28px;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--tp-text-primary);
        }
        .talon-home__blocks-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .talon-home__block-card {
          height: 100%;
          border-radius: 24px;
          background: var(--home-block-bg);
          border: 1px solid var(--home-block-border);
          box-shadow: var(--home-block-shadow);
          backdrop-filter: blur(8px);
        }
        .talon-home__block-card:hover {
          border-color: var(--home-block-hover-border);
          box-shadow: var(--home-block-hover-shadow);
        }
        .talon-home__block-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }
        .talon-home__block-title {
          margin: 0;
          font-size: 22px;
          line-height: 1.18;
          letter-spacing: -0.03em;
          color: var(--tp-text-primary);
        }
        .talon-home__block-description {
          margin: 0;
          font-size: 14px;
          line-height: 1.72;
          color: var(--tp-text-secondary);
        }
        .talon-home__samples {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 18px 0 22px;
        }
        .talon-home__block-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--tp-border-subtle);
        }
        .talon-home__block-count {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tp-text-tertiary);
        }
        .talon-home__surface-note {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 18px;
          background: var(--home-note-bg);
          border: 1px solid var(--home-note-border);
          color: var(--tp-text-secondary);
          font-size: 13px;
          line-height: 1.65;
        }
        .talon-home__surface-note strong {
          color: var(--tp-text-primary);
        }
        @media (max-width: 1080px) {
          .talon-home__hero {
            grid-template-columns: 1fr;
          }
          .talon-home__title {
            max-width: none;
          }
        }
        @media (max-width: 860px) {
          .talon-home {
            padding-inline: 16px;
            padding-bottom: 60px;
          }
          .talon-home__proof,
          .talon-home__blocks-grid,
          .talon-home__preview-grid {
            grid-template-columns: 1fr;
          }
          .talon-home__preview-shell-top,
          .talon-home__preview-row-head,
          .talon-home__block-top,
          .talon-home__block-footer,
          .talon-home__surface-note {
            flex-direction: column;
            align-items: flex-start;
          }
          .talon-home__title {
            font-size: 40px;
          }
          .talon-home__lead {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="talon-home">
        <div className="talon-home__inner">
          <section className="talon-home__hero">
            <div className="talon-home__copy">
              <div className="talon-home__eyebrow">
                {copy.eyebrow.map((item, index) => (
                  <Tag key={item} tone={index === 0 ? 'done' : index === 1 ? 'info' : 'progress'}>
                    {item}
                  </Tag>
                ))}
              </div>

              <h1 className="talon-home__title">{copy.title}</h1>
              <p className="talon-home__lead">{copy.lead}</p>
              <p className="talon-home__supporting">{copy.supporting}</p>

              <div className="talon-home__actions">
                <Button asChild size="lg">
                  <a href={withLocale(locale, '/getting-started/installation')}>
                    {copy.primaryAction}
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href={withLocale(locale, '/components/button')}>{copy.secondaryAction}</a>
                </Button>
              </div>

              <div className="talon-home__proof">
                {copy.proof.map((item) => (
                  <div key={item.label} className="talon-home__proof-item">
                    <span className="talon-home__proof-label">{item.label}</span>
                    <span className="talon-home__proof-value">{item.value}</span>
                    <p className="talon-home__proof-note">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="talon-home__preview">
              <Card padding="lg" className="talon-home__preview-card">
                <div className="talon-home__preview-head">
                  <div>
                    <p className="talon-home__preview-kicker">{copy.previewKicker}</p>
                    <h2 className="talon-home__preview-title">{copy.previewTitle}</h2>
                  </div>
                  <Tag tone="info">{copy.previewBadge}</Tag>
                </div>

                <div className="talon-home__preview-shell">
                  <div className="talon-home__preview-shell-top">
                    <div>
                      <div className="talon-home__preview-shell-title">
                        {copy.previewShellTitle}
                      </div>
                      <div className="talon-home__preview-shell-subtitle">
                        {copy.previewShellSubtitle}
                      </div>
                    </div>
                    <AvatarGroup max={4} ring="none">
                      <Avatar
                        fallback="@T"
                        status="online"
                        className="talon-home__preview-avatar talon-home__preview-avatar--indigo"
                      />
                      <Avatar
                        fallback="DL"
                        status="online"
                        className="talon-home__preview-avatar talon-home__preview-avatar--slate"
                      />
                      <Avatar
                        fallback="QA"
                        status="away"
                        className="talon-home__preview-avatar talon-home__preview-avatar--cyan"
                      />
                      <Avatar
                        fallback="OP"
                        status="online"
                        className="talon-home__preview-avatar talon-home__preview-avatar--amber"
                      />
                    </AvatarGroup>
                  </div>

                  <div className="talon-home__preview-grid">
                    {copy.previewMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className={`talon-home__metric talon-home__metric--${metric.accent}`}
                      >
                        <div className="talon-home__metric-label">{metric.label}</div>
                        <div className="talon-home__metric-value">{metric.value}</div>
                        <div className="talon-home__metric-note">{metric.note}</div>
                      </div>
                    ))}
                  </div>

                  <div className="talon-home__preview-list">
                    {copy.previewRows.map((row) => (
                      <div key={row.label} className="talon-home__preview-row">
                        <div className="talon-home__preview-row-head">
                          <span className="talon-home__preview-row-label">{row.label}</span>
                          <Tag
                            tone={
                              row.status === 'success'
                                ? 'done'
                                : row.status === 'warning'
                                  ? 'pending'
                                  : 'info'
                            }
                          >
                            {row.value}%
                          </Tag>
                        </div>
                        <Progress value={row.value} showInfo={false} status={row.status} />
                      </div>
                    ))}
                  </div>

                  <div className="talon-home__preview-row-note">
                    <span>{copy.previewFooter}</span>
                    <Tag tone="done">{copy.previewFooterTag}</Tag>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="talon-home__blocks">
            <h2 className="talon-home__blocks-heading">{copy.blocksTitle}</h2>
            <div className="talon-home__blocks-grid">
              {copy.blocks.map((block, index) => (
                <Card key={block.title} padding="lg" className="talon-home__block-card" hoverable>
                  <div className="talon-home__block-top">
                    <h3 className="talon-home__block-title">{block.title}</h3>
                    <Tag tone={index % 2 === 0 ? 'progress' : 'info'}>
                      {block.count} {copy.blockUnit}
                    </Tag>
                  </div>

                  <p className="talon-home__block-description">{block.description}</p>

                  <div className="talon-home__samples">
                    {block.samples.map((sample) => (
                      <Tag key={sample} tone="neutral">
                        {sample}
                      </Tag>
                    ))}
                  </div>

                  <div className="talon-home__block-footer">
                    <span className="talon-home__block-count">{copy.blockFootnote}</span>
                    <Button asChild variant="secondary">
                      <a href={withLocale(locale, block.href)}>{block.cta}</a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="talon-home__surface-note">
              <Tag tone="blocked">{copy.designIntentLabel}</Tag>
              <span>
                <strong>{copy.designIntentLead}</strong> {copy.designIntentBody}
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
