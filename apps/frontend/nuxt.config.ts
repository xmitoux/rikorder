// dev環境でのみ使用するモジュール
const devModules = process.env.NODE_ENV === 'development'
  ? ['@nuxt/eslint']
  : [];

const modules = [
  ...devModules,
];

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
      port: 3001
  },
  modules,
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
