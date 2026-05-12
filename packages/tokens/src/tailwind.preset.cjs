/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

/**
 * Talon Pilot · Tailwind CSS v3 配置
 * 用法：
 *   1) 拷贝本文件到项目根目录，重命名为 tailwind.config.js
 *   2) 在入口 CSS 顶部 @import "./tokens.css";（或把 :root{} 内联到 @layer base 中）
 *   3) 按需开启 darkMode / content / plugins
 *
 * 设计原则：把所有数值都映射到 CSS 变量，方便运行时换肤。
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  // 同时支持 .dark 类与 [data-theme="dark"] 属性
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          app: 'var(--tp-bg-app)',
          surface: 'var(--tp-bg-surface)',
          subtle: 'var(--tp-bg-subtle)',
          inverse: 'var(--tp-bg-inverse)',
        },
        border: {
          DEFAULT: 'var(--tp-border-default)',
          strong: 'var(--tp-border-strong)',
        },
        text: {
          primary: 'var(--tp-text-primary)',
          secondary: 'var(--tp-text-secondary)',
          tertiary: 'var(--tp-text-tertiary)',
          'on-primary': 'var(--tp-text-on-primary)',
        },
        primary: {
          50: 'var(--tp-primary-50)',
          100: 'var(--tp-primary-100)',
          200: 'var(--tp-primary-200)',
          300: 'var(--tp-primary-300)',
          400: 'var(--tp-primary-400)',
          500: 'var(--tp-primary-500)',
          600: 'var(--tp-primary-600)',
          700: 'var(--tp-primary-700)',
          800: 'var(--tp-primary-800)',
          900: 'var(--tp-primary-900)',
          DEFAULT: 'var(--tp-primary-500)',
        },
        status: {
          'progress-fg': 'var(--tp-status-progress-fg)',
          'progress-bg': 'var(--tp-status-progress-bg)',
          'pending-fg': 'var(--tp-status-pending-fg)',
          'pending-bg': 'var(--tp-status-pending-bg)',
          'done-fg': 'var(--tp-status-done-fg)',
          'done-bg': 'var(--tp-status-done-bg)',
          'blocked-fg': 'var(--tp-status-blocked-fg)',
          'blocked-bg': 'var(--tp-status-blocked-bg)',
          'idle-fg': 'var(--tp-status-idle-fg)',
          'idle-bg': 'var(--tp-status-idle-bg)',
          'info-fg': 'var(--tp-status-info-fg)',
          'info-bg': 'var(--tp-status-info-bg)',
        },
        accent: {
          violet: 'var(--tp-accent-violet)',
          'violet-soft': 'var(--tp-accent-violet-soft)',
          'violet-ink': 'var(--tp-accent-violet-ink)',
          orange: 'var(--tp-accent-orange)',
          'orange-soft': 'var(--tp-accent-orange-soft)',
          'orange-ink': 'var(--tp-accent-orange-ink)',
          green: 'var(--tp-accent-green)',
          'green-soft': 'var(--tp-accent-green-soft)',
          'green-ink': 'var(--tp-accent-green-ink)',
          amber: 'var(--tp-accent-amber)',
          'amber-soft': 'var(--tp-accent-amber-soft)',
          'amber-ink': 'var(--tp-accent-amber-ink)',
          cyan: 'var(--tp-accent-cyan)',
          'cyan-soft': 'var(--tp-accent-cyan-soft)',
          'cyan-ink': 'var(--tp-accent-cyan-ink)',
          pink: 'var(--tp-accent-pink)',
          'pink-soft': 'var(--tp-accent-pink-soft)',
          'pink-ink': 'var(--tp-accent-pink-ink)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        display: ['32px', { lineHeight: '40px', fontWeight: '600', letterSpacing: '-0.02em' }],
        h1: ['24px', { lineHeight: '32px', fontWeight: '600', letterSpacing: '-0.01em' }],
        h2: ['20px', { lineHeight: '28px', fontWeight: '600' }],
        h3: ['16px', { lineHeight: '24px', fontWeight: '600' }],
        body: ['14px', { lineHeight: '22px' }],
        'body-strong': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        caption: ['12px', { lineHeight: '18px' }],
        'mono-sm': ['12px', { lineHeight: '18px', fontWeight: '500' }],
      },
      spacing: {
        // 与 tokens 对齐；可直接 p-tp-3 / gap-tp-4
        'tp-0': '0px',
        'tp-1': '4px',
        'tp-2': '8px',
        'tp-3': '12px',
        'tp-4': '16px',
        'tp-5': '20px',
        'tp-6': '24px',
        'tp-8': '32px',
        'tp-10': '40px',
        'tp-14': '56px',
        'tp-20': '80px',
      },
      borderRadius: {
        sm: 'var(--tp-radius-sm)',
        md: 'var(--tp-radius-md)',
        lg: 'var(--tp-radius-lg)',
        xl: 'var(--tp-radius-xl)',
        pill: 'var(--tp-radius-pill)',
      },
      boxShadow: {
        card: 'var(--tp-shadow-card)',
        pop: 'var(--tp-shadow-pop)',
        focus: 'var(--tp-shadow-focus)',
      },
      height: {
        'control-sm': 'var(--tp-control-h-sm)',
        'control-md': 'var(--tp-control-h-md)',
        'control-lg': 'var(--tp-control-h-lg)',
      },
      transitionTimingFunction: {
        tp: 'cubic-bezier(.2,.8,.2,1)',
      },
      transitionDuration: {
        fast: '150ms',
        mid: '220ms',
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        overlay: '1040',
        modal: '1050',
        toast: '1080',
      },
    },
  },
  plugins: [
    // 状态标签 / 焦点环 / mono 数字三件套
    function ({ addUtilities, addComponents }) {
      addComponents({
        '.tp-focus-ring': {
          outline: 'none',
          boxShadow: 'var(--tp-shadow-focus)',
        },
        '.tp-nums': {
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'var(--tp-font-mono)',
        },
        '.tp-tag': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          height: '22px',
          padding: '0 8px',
          borderRadius: 'var(--tp-radius-sm)',
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '1',
        },
      });
      addUtilities({
        '.tp-status-progress': {
          backgroundColor: 'var(--tp-status-progress-bg)',
          color: 'var(--tp-status-progress-fg)',
        },
        '.tp-status-pending': {
          backgroundColor: 'var(--tp-status-pending-bg)',
          color: 'var(--tp-status-pending-fg)',
        },
        '.tp-status-done': {
          backgroundColor: 'var(--tp-status-done-bg)',
          color: 'var(--tp-status-done-fg)',
        },
        '.tp-status-blocked': {
          backgroundColor: 'var(--tp-status-blocked-bg)',
          color: 'var(--tp-status-blocked-fg)',
        },
        '.tp-status-idle': {
          backgroundColor: 'var(--tp-status-idle-bg)',
          color: 'var(--tp-status-idle-fg)',
        },
        '.tp-status-info': {
          backgroundColor: 'var(--tp-status-info-bg)',
          color: 'var(--tp-status-info-fg)',
        },
      });
    },
  ],
};
