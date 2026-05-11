# Setup · React + Vite + Tailwind v4

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add lucide-react
```

**`vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({ plugins: [react(), tailwindcss()] });
```

**`src/index.css`** (the only CSS file you should need)

```css
@import 'tailwindcss';
@import '../../skills/talon-pilot-ui/assets/tailwind.v4.css';
/* tailwind.v4.css already @imports tokens.css */
```

**`src/main.tsx`**

```tsx
import './index.css';
```

Done. You can now use any class from `references/ui-kit.html` directly.
