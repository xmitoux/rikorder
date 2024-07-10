import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist'
import onlyWarn from 'eslint-plugin-only-warn';
import typescriptParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
export const customEslintRules = {
  rules: {
    'array-callback-return': ['error', { checkForEach: true }],
    'curly': 'error',
    'import/order': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': ["error", { alphabetical: true }],
    "vue/multi-word-component-names": 'off'
  },
};

export const customIgnores = {
  ignores: ['**/node_modules', '**/public', '**/vendor', '**/dist', '**/.nuxt'],
};

const configUnicornRecommended = eslintPluginUnicorn.configs['flat/recommended'];

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const customUnicornRules = {
  rules: {
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
  },
};

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const configPerfectionist = {
  plugins: {
    perfectionist,
  },
  rules: {
    'perfectionist/sort-exports': 'error',
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        'custom-groups': {
          value: {
            repo: '@repo/**',
          },
        },
        groups: [
          'builtin',
          'external',
          'repo',
          'internal',
          'parent',
          'sibling',
          'side-effect',
          'side-effect-style',
          'index',
          'object',
          'style',
          'type',
          'builtin-type',
          'external-type',
          'internal-type',
          'parent-type',
          'sibling-type',
          'index-type',
          'unknown',
        ],
        'newlines-between': 'always',
        'internal-pattern': [
          '@/**',
          '~/**'
        ],
      },
    ],
  },
};

const configOnlyWarn = {
  plugins: {
    onlyWarn,
  },
};

const configStylistic = stylistic.configs.customize({
  semi: true,
});

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const customStylisticRules = {
  rules: {
    '@stylistic/array-bracket-newline': ["error", "consistent"],
    '@stylistic/array-element-newline': ["error", "consistent"],
    '@stylistic/function-call-argument-newline': ["error", "consistent"],
    '@stylistic/function-call-spacing': ["error", "never"],
    '@stylistic/function-paren-newline': ["error", "consistent"],
    '@stylistic/indent': 'error',
    '@stylistic/no-extra-semi': "error",
    '@stylistic/no-mixed-operators': "error",
    '@stylistic/nonblock-statement-body-position': ["error", "below"],
    '@stylistic/object-curly-newline': ["error", { consistent: true }],
    '@stylistic/object-curly-spacing': ["error", "always"],
    '@stylistic/semi-style': ["error", "last"],
    '@stylistic/switch-colon-spacing': "error",
  }
}

export const eslintConfigNuxt = [
  customEslintRules,
  customIgnores,
  configUnicornRecommended,
  customUnicornRules,
  configPerfectionist,
  configOnlyWarn,
  configStylistic,
  customStylisticRules,
];

/**
 * @type {import('eslint').Linter.FlatConfig}
 * @description NestJS用のクラスデコレータに関する設定
 * @see https://typescript-eslint.io/blog/changes-to-consistent-type-imports-with-decorators/
 */
const configParser = {
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
    },
  },
};

export const eslintConfigCommon = createConfigForNuxt().append([
  ...eslintConfigNuxt,
  configParser,
]);
