// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.DEPLOY_PRIME_URL || process.env.URL || 'https://dotnetdrip.com',
  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  }
});