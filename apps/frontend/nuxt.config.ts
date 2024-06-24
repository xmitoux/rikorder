// dev環境でのみ使用するモジュール
const devModules = process.env.NODE_ENV === 'development'
  ? ['@nuxt/eslint']
  : [];

const modules = [
  'nuxt-quasar-ui',
  ...devModules,
];

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    // https://ja.vitejs.dev/config/server-options
    host: '0.0.0.0',
    port: 3001,
  },
  modules,
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
