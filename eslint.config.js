import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const eslintDir = path.dirname(require.resolve('eslint/package.json'));
const { FlatCompat } = require(path.join(eslintDir, '../@eslint/eslintrc/dist/eslintrc.cjs'));
const recommendedConfig = require(path.join(eslintDir, '../@eslint/js/src/configs/eslint-recommended.js'));
const allConfig = require(path.join(eslintDir, '../@eslint/js/src/configs/eslint-all.js'));

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig,
  allConfig,
});

export default compat.config({
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  env: {
    node: true,
    es2020: true,
  },
});
