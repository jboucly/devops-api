module.exports = {
  plugins: ['simple-import-sort', 'unused-imports'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
      ecmaVersion: 2015, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
  },
  rules: {
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-this-alias': [
          'error',
          {
              allowDestructuring: true, // Allow `const { props, state } = this`; false by default
              allowedNames: ['that'], // Allow `const self = this`; `[]` by default
          },
      ],
      '@typescript-eslint/no-inferrable-types': [
          'error',
          {
              ignoreProperties: true,
              ignoreParameters: true,
          },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'simple-import-sort/sort': 'error', // Show error on import JS
      'sort-imports': 'off', // Desactivate sort-imports of vsCode or eslint
      'import/order': 'off', // Desactivate import/order of vsCode or eslint
      'no-unused-vars': 'off', // Desactivate imports JS no used
      'unused-imports/no-unused-imports': 2, // Config for used-imports plugin
      'unused-imports/no-unused-vars': 'off', // Config for used-imports plugin,
      'prettier/prettier': [
          'error',
          {
              endOfLine: 'auto',
          },
      ],
  },
  overrides: [
      {
          files: 'server/**/*.js',
          rules: {
              'simple-import-sort/sort': 'off',
              'import/order': ['error', { 'newlines-between': 'always' }],
          },
      },
  ],
};
