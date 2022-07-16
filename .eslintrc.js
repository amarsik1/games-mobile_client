module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
    'react/function-component-definition': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
      { usePrettierrc: true },
    ],
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/style-prop-object': 'off',
  },
};
