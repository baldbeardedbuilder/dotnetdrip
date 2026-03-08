// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

const isProduction = process.env.CONTEXT == 'production';
const siteUrl = isProduction ? process.env.URL : process.env.DEPLOY_URL;


// https://astro.build/config
export default defineConfig({
  site: siteUrl || 'https://dotnetdrip.com',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: ['laserwave'],
      styleOverrides: {
        frames: {
          tooltipSuccessBackground: '#9333ea'
        },
        uiFontFamily: 'inherit',
        codeCopyButtonBackground: 'transparent',
        codeCopyButtonBorder: 'none',
        codeCopyButtonBorderColor: 'transparent',
        codeCopyButtonHoverBackground: 'rgba(147, 51, 234, 0.2)',
        codeCopyButtonActiveBackground: 'rgba(147, 51, 234, 0.3)',
        codeCopyButtonHoverOrFocusBackground: 'rgba(147, 51, 234, 0.2)'
      },
      frames: {
        showCopyToClipboardButton: true,
        copyButtonTooltipText: 'Copy this snippet'
      }
    }),
    sitemap()
  ],
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    }
  }
});
