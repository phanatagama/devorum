module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'airbnb',
  ],
  rules: {
    'comma-dangle': 'off',
    'default-param-last': 'off',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'arrow-body-style': 'off',
    'prefer-template': 'off',
    'import/named': 'off',
    'no-alert': 'off',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'implicit-arrow-linebreak': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'lines-around-directive': 'off',
    'react/jsx-props-no-spreading': 'off',
    'object-shorthand': 'off',
    'react/prop-types': 'off',
    'default-case': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-redeclare': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'spaced-comment': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-undef': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-no-bind': 'off',
    'react/self-closing-comp': 'off',

    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/no-unescaped-entities': 'off',

    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],

    // #region  //*=========== Unused Import ===========
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // #endregion  //*======== Unused Import ===========

    // #region  //*=========== Import Sort ===========
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css files
          ['^.+\\.s?css$'],
          // Lib and hooks
          ['^@/lib', '^@/hooks'],
          // static data
          ['^@/data'],
          // components
          ['^@/components', '^@/container'],
          // zustand store
          ['^@/store'],
          // Other imports
          ['^@/'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^@/types'],
          // other that didnt fit in
          ['^'],
        ],
      },
    ],
    // #endregion  //*======== Import Sort ===========
  },
  globals: {
    React: true,
    JSX: true,
  },
};
