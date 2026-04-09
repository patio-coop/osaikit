import { build } from 'esbuild';

await build({
  entryPoints: ['src/cli.js'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: 'dist/cli.js',
  jsx: 'automatic',
  jsxImportSource: 'react',
  banner: { js: '#!/usr/bin/env node' },
  external: [
    'ink',
    'ink-big-text',
    'ink-gradient',
    'ink-select-input',
    'ink-spinner',
    'ink-text-input',
    'react',
    'react/jsx-runtime',
    'chalk',
    'cli-boxes',
    'yoga-wasm-web',
  ],
  loader: { '.js': 'jsx' },
  logLevel: 'info',
});
