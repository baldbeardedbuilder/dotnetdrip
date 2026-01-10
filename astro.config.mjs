// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sentry({
      project: "javascript-astro",
      org: "bald-bearded-builder",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),]
});