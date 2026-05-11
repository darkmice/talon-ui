/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the Talon Community Dual License Agreement.
 */

import * as React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  loading?: boolean;
}

const variantCls: Record<Variant, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-text-on-primary',
  secondary: 'bg-bg-surface border border-border-strong hover:bg-bg-subtle text-text-primary',
  ghost: 'bg-transparent hover:bg-bg-subtle text-text-secondary hover:text-text-primary',
  danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
};

const sizeCls: Record<Size, string> = {
  sm: 'h-control-sm px-2.5 text-caption rounded-sm gap-1',
  md: 'h-control-md px-3.5 text-body rounded-md gap-1.5',
  lg: 'h-control-lg px-4 text-[15px] rounded-md gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  leading,
  trailing,
  loading,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center font-medium whitespace-nowrap',
        'transition duration-fast ease-tp',
        'focus-visible:tp-focus-ring focus-visible:outline-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantCls[variant],
        sizeCls[size],
        className,
      ].join(' ')}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : leading}
      {children}
      {trailing}
    </button>
  );
}

/* Usage:
 *   <Button variant="primary" size="md">保存</Button>
 *   <Button variant="ghost" leading={<Plus className="size-4"/>}>新建</Button>
 */
