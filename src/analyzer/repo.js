/**
 * Repo analyzer — scans a local repository to auto-detect
 * languages, frameworks, runtime, platform, and project size.
 * Returns an inputs object compatible with the recommendation engine.
 */

import { readdirSync, readFileSync, statSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';
import { tmpdir } from 'node:os';

// ── File extension → language mapping ───────────────────────────────

const EXT_TO_LANG = {
  '.js': 'JavaScript',
  '.mjs': 'JavaScript',
  '.cjs': 'JavaScript',
  '.jsx': 'JavaScript',
  '.ts': 'TypeScript',
  '.tsx': 'TypeScript',
  '.py': 'Python',
  '.rs': 'Rust',
  '.go': 'Go',
  '.java': 'Java',
  '.kt': 'Kotlin',
  '.cs': 'C#',
  '.fs': 'F#',
  '.cpp': 'C++',
  '.c': 'C',
  '.rb': 'Ruby',
  '.php': 'PHP',
  '.swift': 'Swift',
  '.dart': 'Dart',
  '.lua': 'Lua',
  '.zig': 'Zig',
  '.ex': 'Elixir',
  '.exs': 'Elixir',
  '.erl': 'Erlang',
  '.scala': 'Scala',
  '.r': 'R',
  '.R': 'R',
  '.jl': 'Julia',
  '.vue': 'Vue',
  '.svelte': 'Svelte',
};

// ── Framework detection from manifest files ─────────────────────────

const FRAMEWORK_DETECTORS = [
  // JS/TS ecosystem
  { file: 'package.json', detect: detectNpmFrameworks },
  // Python
  { file: 'requirements.txt', detect: detectPythonFrameworks },
  { file: 'pyproject.toml', detect: detectPyprojectFrameworks },
  { file: 'Pipfile', detect: detectPipfileFrameworks },
  // Rust
  { file: 'Cargo.toml', detect: detectCargoFrameworks },
  // Go
  { file: 'go.mod', detect: detectGoFrameworks },
  // Ruby
  { file: 'Gemfile', detect: detectGemfileFrameworks },
  // Java/Kotlin
  { file: 'pom.xml', detect: detectMavenFrameworks },
  { file: 'build.gradle', detect: detectGradleFrameworks },
  { file: 'build.gradle.kts', detect: detectGradleFrameworks },
  // .NET
  { file: null, pattern: '*.csproj', detect: detectDotnetFrameworks },
  // Dart/Flutter
  { file: 'pubspec.yaml', detect: detectDartFrameworks },
];

function detectNpmFrameworks(content) {
  const frameworks = [];
  const pkg = JSON.parse(content);
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  const checks = [
    ['react', 'React'],
    ['next', 'Next.js'],
    ['vue', 'Vue'],
    ['nuxt', 'Nuxt'],
    ['svelte', 'Svelte'],
    ['@sveltejs/kit', 'SvelteKit'],
    ['angular', 'Angular'],
    ['@angular/core', 'Angular'],
    ['express', 'Express'],
    ['fastify', 'Fastify'],
    ['hono', 'Hono'],
    ['koa', 'Koa'],
    ['nestjs', 'NestJS'],
    ['@nestjs/core', 'NestJS'],
    ['electron', 'Electron'],
    ['react-native', 'React Native'],
    ['expo', 'Expo'],
    ['tailwindcss', 'Tailwind CSS'],
    ['prisma', 'Prisma'],
    ['drizzle-orm', 'Drizzle'],
    ['typeorm', 'TypeORM'],
    ['mongoose', 'Mongoose'],
    ['jest', 'Jest'],
    ['vitest', 'Vitest'],
    ['mocha', 'Mocha'],
    ['playwright', 'Playwright'],
    ['cypress', 'Cypress'],
    ['vite', 'Vite'],
    ['webpack', 'webpack'],
    ['esbuild', 'esbuild'],
    ['ink', 'Ink'],
    ['three', 'Three.js'],
    ['@trpc/server', 'tRPC'],
    ['graphql', 'GraphQL'],
    ['apollo-server', 'Apollo'],
    ['socket.io', 'Socket.IO'],
    ['redux', 'Redux'],
    ['zustand', 'Zustand'],
    ['@tanstack/react-query', 'React Query'],
    ['astro', 'Astro'],
    ['remix', 'Remix'],
    ['@remix-run/node', 'Remix'],
    ['gatsby', 'Gatsby'],
  ];

  for (const [dep, name] of checks) {
    if (allDeps[dep]) frameworks.push(name);
  }

  return frameworks;
}

function detectPythonFrameworks(content) {
  const frameworks = [];
  const lines = content.toLowerCase();
  const checks = [
    ['django', 'Django'],
    ['flask', 'Flask'],
    ['fastapi', 'FastAPI'],
    ['starlette', 'Starlette'],
    ['sqlalchemy', 'SQLAlchemy'],
    ['pytorch', 'PyTorch'],
    ['torch', 'PyTorch'],
    ['tensorflow', 'TensorFlow'],
    ['numpy', 'NumPy'],
    ['pandas', 'pandas'],
    ['scikit-learn', 'scikit-learn'],
    ['celery', 'Celery'],
    ['pytest', 'pytest'],
    ['pydantic', 'Pydantic'],
    ['langchain', 'LangChain'],
    ['transformers', 'Transformers'],
    ['streamlit', 'Streamlit'],
    ['gradio', 'Gradio'],
  ];
  for (const [dep, name] of checks) {
    if (lines.includes(dep)) frameworks.push(name);
  }
  return frameworks;
}

function detectPyprojectFrameworks(content) {
  return detectPythonFrameworks(content);
}

function detectPipfileFrameworks(content) {
  return detectPythonFrameworks(content);
}

function detectCargoFrameworks(content) {
  const frameworks = [];
  const checks = [
    ['actix-web', 'Actix Web'],
    ['axum', 'Axum'],
    ['rocket', 'Rocket'],
    ['tokio', 'Tokio'],
    ['serde', 'Serde'],
    ['diesel', 'Diesel'],
    ['sqlx', 'SQLx'],
    ['warp', 'Warp'],
    ['bevy', 'Bevy'],
    ['tauri', 'Tauri'],
    ['clap', 'Clap'],
    ['wasm-bindgen', 'wasm-bindgen'],
  ];
  for (const [dep, name] of checks) {
    if (content.includes(dep)) frameworks.push(name);
  }
  return frameworks;
}

function detectGoFrameworks(content) {
  const frameworks = [];
  const checks = [
    ['gin-gonic/gin', 'Gin'],
    ['gorilla/mux', 'Gorilla Mux'],
    ['labstack/echo', 'Echo'],
    ['go-fiber/fiber', 'Fiber'],
    ['go-chi/chi', 'Chi'],
    ['gorm.io/gorm', 'GORM'],
    ['ent/ent', 'Ent'],
    ['grpc', 'gRPC'],
    ['cobra', 'Cobra'],
  ];
  for (const [dep, name] of checks) {
    if (content.includes(dep)) frameworks.push(name);
  }
  return frameworks;
}

function detectGemfileFrameworks(content) {
  const frameworks = [];
  const checks = [
    ['rails', 'Rails'],
    ['sinatra', 'Sinatra'],
    ['hanami', 'Hanami'],
    ['rspec', 'RSpec'],
    ['sidekiq', 'Sidekiq'],
  ];
  for (const [dep, name] of checks) {
    if (content.includes(dep)) frameworks.push(name);
  }
  return frameworks;
}

function detectMavenFrameworks(content) {
  const frameworks = [];
  const checks = [
    ['spring-boot', 'Spring Boot'],
    ['spring-framework', 'Spring'],
    ['quarkus', 'Quarkus'],
    ['micronaut', 'Micronaut'],
  ];
  for (const [dep, name] of checks) {
    if (content.includes(dep)) frameworks.push(name);
  }
  return frameworks;
}

function detectGradleFrameworks(content) {
  return detectMavenFrameworks(content);
}

function detectDotnetFrameworks(content) {
  const frameworks = [];
  if (content.includes('Microsoft.AspNetCore')) frameworks.push('ASP.NET Core');
  if (content.includes('Microsoft.EntityFrameworkCore')) frameworks.push('EF Core');
  if (content.includes('Blazor')) frameworks.push('Blazor');
  return frameworks;
}

function detectDartFrameworks(content) {
  const frameworks = [];
  if (content.includes('flutter')) frameworks.push('Flutter');
  return frameworks;
}

// ── Language → runtime mapping ──────────────────────────────────────

function inferRuntime(languages) {
  const langSet = new Set(languages.map((l) => l.toLowerCase()));
  if (langSet.has('typescript') || langSet.has('javascript')) return 'node';
  if (langSet.has('python')) return 'python';
  if (langSet.has('rust')) return 'rust';
  if (langSet.has('go')) return 'go';
  if (langSet.has('java') || langSet.has('kotlin') || langSet.has('scala')) return 'jvm';
  if (langSet.has('c#') || langSet.has('f#')) return 'dotnet';
  if (langSet.has('ruby')) return 'ruby';
  if (langSet.has('swift')) return 'swift';
  if (langSet.has('dart')) return 'dart';
  return 'node'; // fallback
}

// ── Framework → platform mapping ────────────────────────────────────

function inferPlatform(frameworks, languages) {
  const fwSet = new Set(frameworks.map((f) => f.toLowerCase()));
  const langSet = new Set(languages.map((l) => l.toLowerCase()));

  // CLI (check before browser since Ink uses React but is a CLI framework)
  if (fwSet.has('ink') || fwSet.has('clap') || fwSet.has('cobra')) return 'console';

  // Mobile
  if (fwSet.has('react native') || fwSet.has('expo') || fwSet.has('flutter')) return 'ios';
  if (langSet.has('swift') || langSet.has('dart')) return 'ios';

  // Desktop
  if (fwSet.has('electron') || fwSet.has('tauri')) return 'pc';

  // Browser
  if (fwSet.has('react') || fwSet.has('vue') || fwSet.has('svelte') ||
      fwSet.has('angular') || fwSet.has('next.js') || fwSet.has('nuxt') ||
      fwSet.has('astro') || fwSet.has('gatsby') || fwSet.has('remix') ||
      fwSet.has('sveltekit')) return 'browser';

  // Server
  if (fwSet.has('express') || fwSet.has('fastify') || fwSet.has('hono') ||
      fwSet.has('nestjs') || fwSet.has('django') || fwSet.has('flask') ||
      fwSet.has('fastapi') || fwSet.has('axum') || fwSet.has('actix web') ||
      fwSet.has('gin') || fwSet.has('rails') || fwSet.has('spring boot') ||
      fwSet.has('asp.net core')) return 'server';

  // Games
  if (fwSet.has('bevy') || fwSet.has('three.js')) return 'pc';

  return 'server'; // fallback
}

// ── Role inference ──────────────────────────────────────────────────

function inferRole(platform, frameworks) {
  const fwSet = new Set(frameworks.map((f) => f.toLowerCase()));

  if (platform === 'ios' || platform === 'android') return 'mobile';
  if (fwSet.has('bevy') || fwSet.has('three.js')) return 'games';

  if (platform === 'browser') return 'webdev';
  if (platform === 'server' || platform === 'console') return 'backend';
  return 'webdev'; // fallback
}

// ── Context size inference based on repo stats ──────────────────────

function inferContextSize(fileCount, totalLines) {
  if (totalLines > 50_000 || fileCount > 500) return 'huge';
  if (totalLines > 10_000 || fileCount > 100) return 'large';
  if (totalLines > 2_000 || fileCount > 30) return 'medium';
  return 'small';
}

// ── Use case inference ──────────────────────────────────────────────

function inferUseCases(frameworks, fileCount) {
  const useCases = ['codegen']; // always useful
  const fwSet = new Set(frameworks.map((f) => f.toLowerCase()));

  // If testing frameworks found, they care about testing
  if (fwSet.has('jest') || fwSet.has('vitest') || fwSet.has('mocha') ||
      fwSet.has('pytest') || fwSet.has('rspec') || fwSet.has('playwright') ||
      fwSet.has('cypress')) {
    useCases.push('testing');
  }

  // Larger projects benefit from code review and debugging
  if (fileCount > 20) {
    useCases.push('code-review');
    useCases.push('debug');
  }

  // Large projects benefit from architecture guidance
  if (fileCount > 50) {
    useCases.push('architecture');
  }

  return useCases;
}

// ── Recursive file walker ───────────────────────────────────────────

const IGNORE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.nuxt',
  '__pycache__', '.venv', 'venv', 'env', '.env', 'target',
  'vendor', '.cache', 'coverage', '.turbo', '.output',
  'out', '.svelte-kit', '.vercel', '.netlify',
]);

function walkDir(dir, maxDepth = 8, depth = 0) {
  const results = { files: [], extensions: new Map(), totalLines: 0 };

  if (depth > maxDepth) return results;

  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.isDirectory()) continue;
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const sub = walkDir(fullPath, maxDepth, depth + 1);
      results.files.push(...sub.files);
      for (const [ext, count] of sub.extensions) {
        results.extensions.set(ext, (results.extensions.get(ext) || 0) + count);
      }
      results.totalLines += sub.totalLines;
    } else if (entry.isFile()) {
      const ext = extname(entry.name);
      if (ext && EXT_TO_LANG[ext]) {
        results.files.push(fullPath);
        results.extensions.set(ext, (results.extensions.get(ext) || 0) + 1);

        // Count lines (cap at 1MB per file to avoid reading huge binaries)
        try {
          const stat = statSync(fullPath);
          if (stat.size < 1_048_576) {
            const content = readFileSync(fullPath, 'utf-8');
            results.totalLines += content.split('\n').length;
          }
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  return results;
}

// ── Remote URL detection ────────────────────────────────────────────

const URL_PATTERN = /^(https?:\/\/|git@|ssh:\/\/)/;

function isRemoteUrl(value) {
  return URL_PATTERN.test(value);
}

// ── Remote repo cloning ─────────────────────────────────────────────

function cloneRepo(url, dest) {
  execSync(`git clone --depth 1 ${url} "${dest}"`, {
    stdio: 'pipe',
    timeout: 120_000, // 2 min max for clone
  });
}

// ── Analyze a local path OR fetch + analyze a remote URL ───────────
//
// If `repoPath` looks like a URL (https://, git@, ssh://), clones it
// to a temporary directory, runs the analyzer, then cleans up.
// Otherwise delegates to the local-only analyzeRepo().

export function analyzeRepoOrFetch(repoPath) {
  if (isRemoteUrl(repoPath)) {
    const tmpDir = mkdtempSync(join(tmpdir(), 'osaikit-repo-'));
    console.error(`\n  Cloning ${repoPath} ...`);
    try {
      cloneRepo(repoPath, tmpDir);
      console.error(`  \x1b[32m✓\x1b[0m Cloned to ${tmpDir}`);
      const result = analyzeRepo(tmpDir);
      // Override the analysis path to show the original URL
      result.analysis.path = repoPath;
      return result;
    } finally {
      // Cleanup temp directory
      try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ignore */ }
    }
  }
  return analyzeRepo(repoPath);
}

// ── Main analyzer (local only) ──────────────────────────────────────

export function analyzeRepo(repoPath) {
  if (!existsSync(repoPath)) {
    throw new Error(`Path does not exist: ${repoPath}`);
  }

  const stat = statSync(repoPath);
  if (!stat.isDirectory()) {
    throw new Error(`Not a directory: ${repoPath}`);
  }

  // 1. Walk the repo to gather file stats
  const { files, extensions, totalLines } = walkDir(repoPath);

  // 2. Detect languages from file extensions (sorted by frequency)
  const langCounts = new Map();
  for (const [ext, count] of extensions) {
    const lang = EXT_TO_LANG[ext];
    if (lang) {
      langCounts.set(lang, (langCounts.get(lang) || 0) + count);
    }
  }
  const languages = [...langCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);

  // 3. Detect frameworks from manifest files
  const frameworks = [];
  for (const detector of FRAMEWORK_DETECTORS) {
    if (detector.file) {
      const filePath = join(repoPath, detector.file);
      if (existsSync(filePath)) {
        try {
          const content = readFileSync(filePath, 'utf-8');
          frameworks.push(...detector.detect(content));
        } catch {
          // skip
        }
      }
    } else if (detector.pattern) {
      // Handle glob patterns (e.g., *.csproj)
      try {
        const entries = readdirSync(repoPath);
        for (const entry of entries) {
          if (entry.endsWith('.csproj') || entry.endsWith('.fsproj')) {
            const content = readFileSync(join(repoPath, entry), 'utf-8');
            frameworks.push(...detector.detect(content));
          }
        }
      } catch {
        // skip
      }
    }
  }

  // Deduplicate frameworks
  const uniqueFrameworks = [...new Set(frameworks)];

  // 4. Infer runtime, platform, role
  const runtime = inferRuntime(languages);
  const platform = inferPlatform(uniqueFrameworks, languages);
  const role = inferRole(platform, uniqueFrameworks);

  // 5. Infer context size from repo stats
  const contextNeeds = inferContextSize(files.length, totalLines);

  // 6. Infer use cases
  const useCases = inferUseCases(uniqueFrameworks, files.length);

  // 7. Build the inputs object for the recommendation engine
  const inputs = {
    role,
    languages,
    frameworks: uniqueFrameworks,
    runtime,
    platform,
    useCases,
    license: 'any',
    contextNeeds,
    existingProject: true,
    constraints: {
      maxMemory: 'unlimited',
      budget: 'low',
      deployment: 'local',
      privacy: 'relaxed',
    },
  };

  // 8. Build a summary for display
  const analysis = {
    path: repoPath,
    fileCount: files.length,
    totalLines,
    languages: languages.map((l) => ({
      name: l,
      files: langCounts.get(l),
    })),
    frameworks: uniqueFrameworks,
    runtime,
    platform,
    role,
    contextNeeds,
    useCases,
  };

  return { inputs, analysis };
}
