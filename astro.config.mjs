import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import postcssNested from 'postcss-nested';
import postcss from 'postcss';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), solidJs()],
  outDir: './dist',
  site: 'https://tab.tihomir-selak.from.hr/',
  vite: {
    plugins: [postcss({
      plugins: [postcssNested()
      // other PostCSS plugins...
      ]
    })]
  }
});