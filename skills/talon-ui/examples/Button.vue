<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  { variant: 'primary', size: 'md' },
);

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

const cls = computed(() => [
  'inline-flex items-center justify-center font-medium whitespace-nowrap',
  'transition duration-fast ease-tp',
  'focus-visible:tp-focus-ring focus-visible:outline-none',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  variantCls[props.variant],
  sizeCls[props.size],
]);
</script>

<template>
  <button :class="cls" :disabled="disabled || loading">
    <Loader2 v-if="loading" class="size-4 animate-spin" />
    <slot name="leading" v-else />
    <slot />
    <slot name="trailing" />
  </button>
</template>

<!-- Usage:
  <Button variant="primary">保存</Button>
  <Button variant="ghost"><template #leading><Plus class="size-4"/></template>新建</Button>
-->
