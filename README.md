# PATIO — AI Model Advisor

Interactive CLI wizard that recommends the best open-source LLM for your stack, hardware, and use case.

```
 ____   _  _____ ___ ___
|  _ \ / \|_   _|_ _/ _ \
| |_) / _ \ | |  | | | | |
|  __/ ___ \| |  | | |_| |
|_| /_/   \_\_| |___\___/
```

## What it does

Answer six quick questions about your development environment and the advisor scores 30+ open-source models across six weighted dimensions to find the best fit — no API keys required.

### Wizard steps

1. **Role** — web, backend, mobile, or game development
2. **Tech stack** — languages, frameworks, runtime, platform
3. **Constraints** — memory limit, budget, deployment mode, privacy
4. **Use cases** — code generation, debugging, architecture, review, docs, testing
5. **License** — permissive, copyleft, or any
6. **Context** — codebase size and whether it's an existing project

### What you get

- **Primary recommendation** with score breakdown
- **Fallback model** from a different family
- **On-device option** for local/offline use
- Tuned inference config (temperature, top-p, max tokens)
- Starter prompt template for your use case
- Cost and latency estimates (local vs. cloud)
- RAG recommendation when your context exceeds the model's window
- Warnings about license, age, memory, and latency tradeoffs

## Install

```bash
npx ai-model-advisor
```

Or install globally:

```bash
npm install -g ai-model-advisor
ai-model-advisor
```

## Development

```bash
git clone https://github.com/patio-coop/ai-model-advisor.git
cd ai-model-advisor
npm install
npm run dev    # build + run
npm test       # run tests
```

## How scoring works

Models are first filtered by hard constraints (license, RAM, privacy, budget, deployment). Remaining candidates are scored across six dimensions:

| Dimension | Weight | What it measures |
|-----------|--------|------------------|
| Capability fit | 3.0x | Strength/weakness match to your role and use cases |
| Context match | 2.0x | Context window vs. your codebase size needs |
| Benchmarks | 2.0x | HumanEval, SWE-bench, Aider polyglot scores |
| Compute footprint | 1.5x | Latency, on-device viability, budget fit |
| Ecosystem | 1.0x | Tooling support (Ollama, llama.cpp, vLLM, etc.) |
| Fine-tuning | 0.5x | LoRA/adapter support, fine-tunability |

Live leaderboard data from HuggingFace, SWE-bench, and Aider is fetched in parallel to enrich results — but the tool works fully offline using its built-in model database.

## Architecture

```
src/
├── cli.js                 # Entry point, flag parsing, Ink render
├── app.js                 # State machine (welcome → wizard → loading → results)
├── theme.js               # Patio design system tokens
├── components/
│   ├── wizard.js          # 6-step questionnaire flow
│   ├── steps.js           # Individual step components
│   ├── loading.js         # Loading screen with per-source status
│   └── results.js         # Recommendation display
├── engine/
│   ├── models.js          # Static database of 30+ open LLMs
│   └── rules.js           # Scoring engine, prompt templates, cost estimates
└── api/
    ├── index.js           # Parallel fetcher + fuzzy model matching
    ├── huggingface.js     # HuggingFace API client
    ├── swebench.js        # SWE-bench leaderboard scraper
    └── aider.js           # Aider leaderboard scraper
```

## Tech stack

- [Ink](https://github.com/vadimdemedes/ink) + React — terminal UI framework
- [esbuild](https://esbuild.github.io/) — bundler
- Node.js built-in `fetch` — zero HTTP dependencies

## License

MIT
