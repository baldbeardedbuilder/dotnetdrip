// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const isProduction = process.env.CONTEXT == 'production';
const siteUrl = isProduction ? process.env.URL : process.env.DEPLOY_URL;


// https://astro.build/config
export default defineConfig({
  site: siteUrl || 'https://dotnetdrip.com',
  output: 'static',
  integrations: [sitemap()],
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    }
  }
});
