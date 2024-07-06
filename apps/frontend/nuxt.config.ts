// dev環境でのみ使用するモジュール
const devModules = process.env.NODE_ENV === 'development'
  ? ['@nuxt/eslint']
  : [];

// prod環境でのみ使用するモジュール
const prodModules = process.env.NODE_ENV === 'production'
  ? ['@vite-pwa/nuxt']
  : [];

const modules = [
  'nuxt-quasar-ui',
  ...devModules,
  ...prodModules,
];

const pwa = process.env.NODE_ENV === 'production'
  ? {
      manifest: {
        start_url: '/',
        display: 'standalone',
        lang: 'ja',
        name: 'Rikorder',
        short_name: 'Rikorder',
        description: 'Rikorder',
        theme_color: '#F48FB1',
        background_color: '#ffffff',
        icons: [
          {
            sizes: '64x64',
            src: 'pwa-64x64.png',
            type: 'image/png',
          },
          {
            sizes: '192x192',
            src: 'pwa-192x192.png',
            type: 'image/png',
          },
          {
            sizes: '512x512',
            src: 'pwa-512x512.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'maskable-icon-512x512.png',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: null,
      },
    }
  : {};

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    // https://ja.vitejs.dev/config/server-options
    host: '0.0.0.0',
    port: 3001,
  },
  modules,
  // @ts-ignore
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_API_URL,
    },
  },
  nitro: {
    preset: 'vercel',
    output: {
      dir: '../../.vercel/output',
    },
  },
  srcDir: 'src/',
  app: {
    head: {
      link: [
        { href: `/favicon.ico`, rel: 'icon', sizes: '64x64' },
        { href: `/apple-touch-icon-180x180.png`, rel: 'apple-touch-icon' },
        // Kosugi Maru font 読み込み
        { href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap', rel: 'stylesheet' },
      ],
      meta: [
        // PWAの表示領域より上の部分の色
        { content: '#F8BBD0', name: 'theme-color' },
      ],

    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  components: [
    '~/components',
    { path: '~/components/ui-parts', prefix: 'UI' },
  ],
  // @ts-ignore
  pwa,
  quasar: {
    extras: {
      fontIcons: [
        'mdi-v7',
      ],
    },
    iconSet: 'mdi-v7',
    sassVariables: true,
  },
});
