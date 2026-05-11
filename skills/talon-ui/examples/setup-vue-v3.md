# Setup · Vue 3 + Vite + Tailwind v3

```bash
pnpm create vite my-app --template vue-ts
cd my-app
pnpm add -D tailwindcss postcss autoprefixer
pnpm add lucide-vue-next
npx tailwindcss init -p
```

Replace `tailwind.config.js` with a copy of `skills/talon-pilot-ui/assets/tailwind.v3.config.js`
(adjust `content` globs to point at `./src/**/*.{vue,ts,tsx}`).

**`src/style.css`**

```css
@import '../../skills/talon-pilot-ui/assets/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`src/main.ts`**

```ts
import './style.css';
```

Done. All `bg-primary-500`, `tp-status-done`, `h-control-md`, `shadow-pop`, etc. now resolve.
