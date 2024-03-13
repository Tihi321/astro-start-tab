import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import postcssNested from 'postcss-nested';
import postcss from 'postcss';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  outDir: './docs',
  site: 'https://www.start.tihomir-selak.from.hr',
  vite: {
    plugins: [
      postcss({
        plugins: [
          postcssNested(),
          // other PostCSS plugins...
        ],
      }),
    ],
  },
});
