import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      }
    }),
  ],
  shortcuts: {
    'btn': 'px-4 py-2 rounded transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    'btn-primary': 'btn bg-primary text-on-primary hover:bg-primary/80',
    'btn-success': 'btn bg-green-500 text-white hover:bg-green-600',
    'btn-error': 'btn bg-red-500 text-white hover:bg-red-600',
  },
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      surface: 'var(--color-surface)',
      'on-surface': 'var(--color-on-surface)',
      'on-primary': 'var(--color-on-primary)',
    },
  },
});