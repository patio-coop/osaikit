/**
 * AI Model Advisor — CLI entry point.
 * Renders the interactive TUI with ink.
 */

import { render } from 'ink';
import React from 'react';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function printHelp() {
  console.log(`
  AI Model Advisor — find the right open LLM for your stack

  Usage
    $ ai-model-advisor

  Options
    --help, -h       Show this help message
    --version, -v    Show version number

  Description
    Interactive CLI wizard that recommends the best open-source LLM
    based on your use case, hardware, and requirements. Fetches live
    data from HuggingFace, SWE-bench, and Aider leaderboards.

  Examples
    $ ai-model-advisor
    $ npx ai-model-advisor
`);
}

function printVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
    console.log(pkg.version);
  } catch {
    console.log('0.1.0');
  }
}

// Parse flags
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  printVersion();
  process.exit(0);
}

// Launch the TUI
const App = (await import('./app.js')).default;

const { waitUntilExit } = render(React.createElement(App));
await waitUntilExit();
