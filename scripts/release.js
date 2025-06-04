#!/usr/bin/env node
const { execSync } = require('child_process');
const increment = process.env.npm_config_increment || 'patch';
execSync(`pnpm version ${increment}`, { stdio: 'inherit' });
execSync('git push --follow-tags', { stdio: 'inherit' });
execSync('pnpm publish --access public', { stdio: 'inherit' });
