/**
 * Results display component — renders the full recommendation output
 * with Patio Design System branding. Styled sections for primary/fallback/
 * on-device models, config, deployment details, leaderboard context, and warnings.
 */

import React from 'react';
import { Box, Text, Newline } from 'ink';
import { THEME } from '../theme.js';

const C = THEME.colors;

// ── Utility helpers ──────────────────────────────────────────────────

function Section({ title, borderColor = 'gray', borderStyle = 'round', children, ...rest }) {
  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={borderColor}
      paddingX={2}
      paddingY={1}
      marginBottom={1}
      {...rest}
    >
      {title ? (
        <Box marginBottom={1}>
          <Text bold color={borderColor}>{title}</Text>
        </Box>
      ) : null}
      {children}
    </Box>
  );
}

function Row({ label, value, valueColor = 'white' }) {
  return (
    <Box gap={1}>
      <Text dimColor>{label}:</Text>
      <Text color={valueColor}>{String(value ?? '—')}</Text>
    </Box>
  );
}

function ScoreBar({ score }) {
  if (score == null) return null;
  const pct = Math.round(score * 100);
  const filled = Math.round(pct / 5);
  const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(20 - filled);
  const color = pct >= 80 ? C.accent : pct >= 60 ? C.warning : C.error;
  return (
    <Box gap={1}>
      <Text dimColor>Score:</Text>
      <Text color={color}>{bar}</Text>
      <Text bold color={color}> {pct}%</Text>
    </Box>
  );
}

// ── Header ───────────────────────────────────────────────────────────

function Header() {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      paddingX={4}
      paddingY={1}
      marginBottom={1}
      borderStyle="double"
      borderColor={C.accent}
    >
      <Text bold color={C.accent}>PATIO</Text>
      <Text bold color={C.accentDim}>RECOMMENDATION</Text>
    </Box>
  );
}

// ── Primary Model ────────────────────────────────────────────────────

function PrimaryModel({ primary }) {
  if (!primary) return null;
  const { model, reason, scoreBreakdown } = primary;
  const modelName = typeof model === 'object' ? model.name : model;
  const finalScore = scoreBreakdown?.finalScore;
  const dimensions = scoreBreakdown?.dimensions;
  return (
    <Section title="PRIMARY MODEL" borderColor={C.accent}>
      <Text bold color={C.accent}>{modelName}</Text>
      {model?.params ? <Text dimColor> ({model.params})</Text> : null}
      <Newline />
      <Text italic>{reason}</Text>
      <Newline />
      <ScoreBar score={finalScore} />
      {dimensions ? (
        <Box flexDirection="column" marginTop={1}>
          <Text dimColor underline>SCORE BREAKDOWN</Text>
          {Object.entries(dimensions).map(([key, dim]) => (
            <Row
              key={key}
              label={key.toUpperCase()}
              value={typeof dim === 'object' ? `${Math.round(dim.weighted * 100)}% (w:${dim.weight}x)` : `${Math.round(dim * 100)}%`}
            />
          ))}
        </Box>
      ) : null}
    </Section>
  );
}

// ── Model Config ─────────────────────────────────────────────────────

function ModelConfig({ config }) {
  if (!config) return null;
  const fields = [
    ['Temperature', config.temperature],
    ['Top P', config.topP],
    ['Max Tokens', config.maxTokens?.toLocaleString()],
    ['Context Window', config.contextWindow?.toLocaleString()],
  ];
  return (
    <Section title="MODEL CONFIGURATION" borderColor={C.blue}>
      {fields.map(([label, value]) => (
        <Row key={label} label={label} value={value} valueColor={C.blue} />
      ))}
    </Section>
  );
}

// ── Deployment & Cost ────────────────────────────────────────────────

function Deployment({ primary, costEstimate, latencyEstimate }) {
  return (
    <Section title="DEPLOYMENT" borderColor={C.accent}>
      <Row
        label="Option"
        value={primary?.deploymentOption}
        valueColor={C.accent}
      />
      {costEstimate ? (
        <Box flexDirection="column" marginTop={1}>
          <Text dimColor underline>COST ESTIMATE</Text>
          <Row label="Local" value={costEstimate.local} valueColor={C.success} />
          <Row label="Cloud" value={costEstimate.cloud} valueColor={C.warning} />
        </Box>
      ) : null}
      {latencyEstimate ? (
        <Box flexDirection="column" marginTop={1}>
          <Text dimColor underline>LATENCY ESTIMATE</Text>
          <Row label="Local" value={latencyEstimate.local} valueColor={C.success} />
          <Row label="Cloud" value={latencyEstimate.cloud} valueColor={C.warning} />
        </Box>
      ) : null}
    </Section>
  );
}

// ── Prompt Template ──────────────────────────────────────────────────

function PromptTemplate({ template }) {
  if (!template) return null;
  const label = typeof template === 'object' ? template.label : null;
  const body = typeof template === 'object' ? template.template : template;
  return (
    <Section title={label ? `PROMPT TEMPLATE — ${label.toUpperCase()}` : 'PROMPT TEMPLATE'} borderColor="gray" borderStyle="single">
      <Box borderStyle="round" borderColor="gray" paddingX={1} paddingY={0}>
        <Text color="white" wrap="wrap">{body}</Text>
      </Box>
    </Section>
  );
}

// ── Fallback Model ───────────────────────────────────────────────────

function FallbackModel({ fallback }) {
  if (!fallback) return null;
  return (
    <Section title="FALLBACK MODEL" borderColor={C.teal}>
      <Text bold color={C.teal}>{typeof fallback.model === 'object' ? fallback.model.name : fallback.model}</Text>
      <Newline />
      <Text italic>{fallback.reason}</Text>
      <Newline />
      <ScoreBar score={fallback.scoreBreakdown?.finalScore} />
      {fallback.deploymentOption ? (
        <Row label="Deployment" value={fallback.deploymentOption} valueColor={C.teal} />
      ) : null}
    </Section>
  );
}

// ── On-Device Option ─────────────────────────────────────────────────

function OnDevice({ onDevice }) {
  if (!onDevice) return null;
  return (
    <Section title="ON-DEVICE OPTION" borderColor={C.accentDim}>
      <Text bold color={C.accentDim}>{typeof onDevice.model === 'object' ? onDevice.model.name : onDevice.model}</Text>
      <Newline />
      <Text italic>{onDevice.reason}</Text>
      <Newline />
      <ScoreBar score={onDevice.scoreBreakdown?.finalScore} />
      {onDevice.config ? (
        <Box flexDirection="column" marginTop={1}>
          {Object.entries(onDevice.config).map(([k, v]) => (
            <Row key={k} label={k} value={v} valueColor={C.accentDim} />
          ))}
        </Box>
      ) : null}
    </Section>
  );
}

// ── Leaderboard Context ──────────────────────────────────────────────

function LeaderboardContext({ leaderboards, primaryModel, fallbackModel }) {
  if (!leaderboards) return null;

  const rankings = [];

  const findRank = (list, modelName) => {
    if (!list || !Array.isArray(list)) return null;
    const idx = list.findIndex(
      (entry) =>
        (entry.modelId || entry.model || '').toLowerCase().includes(modelName.toLowerCase()),
    );
    return idx >= 0 ? idx + 1 : null;
  };

  for (const rawModel of [primaryModel, fallbackModel].filter(Boolean)) {
    const modelName2 = typeof rawModel === 'object' ? rawModel.name : rawModel;
    if (!modelName2) continue;
    const name = modelName2.replace(/[_-]/g, ' ');

    if (leaderboards.huggingface) {
      const rank = findRank(leaderboards.huggingface, name);
      if (rank) rankings.push({ model: modelName2, board: 'HuggingFace Open LLM', rank });
    }
    if (leaderboards.swebench) {
      const rank = findRank(leaderboards.swebench, name);
      if (rank) rankings.push({ model: modelName2, board: 'SWE-bench Verified', rank });
    }
    if (leaderboards.aider) {
      const rank = findRank(leaderboards.aider, name);
      if (rank) rankings.push({ model: modelName2, board: 'Aider Polyglot', rank });
    }
  }

  if (rankings.length === 0) return null;

  return (
    <Section title="LEADERBOARD RANKINGS" borderColor="white">
      {rankings.map((r, i) => (
        <Box key={i} gap={1}>
          <Text color={C.accent}>#{r.rank}</Text>
          <Text dimColor>{r.board}</Text>
          <Text bold>{r.model}</Text>
        </Box>
      ))}
      {leaderboards.fetchedAt ? (
        <Box marginTop={1}>
          <Text dimColor>Data fetched: {leaderboards.fetchedAt}</Text>
        </Box>
      ) : null}
      {leaderboards.errors?.length ? (
        <Box marginTop={1}>
          <Text color={C.warning} dimColor>
            ({leaderboards.errors.length} source(s) unavailable)
          </Text>
        </Box>
      ) : null}
    </Section>
  );
}

// ── RAG Advisory ─────────────────────────────────────────────────────

function RagAdvisory({ ragRecommended, ragReason }) {
  if (!ragRecommended) return null;
  return (
    <Box
      borderStyle="round"
      borderColor={C.warning}
      paddingX={2}
      paddingY={1}
      marginBottom={1}
    >
      <Box flexDirection="column">
        <Text bold color={C.warning}>RAG RECOMMENDED</Text>
        <Newline />
        <Text color={C.warning} wrap="wrap">
          {ragReason || 'Consider adding retrieval-augmented generation for better results with your data.'}
        </Text>
      </Box>
    </Box>
  );
}

// ── Warnings ─────────────────────────────────────────────────────────

function Warnings({ warnings }) {
  if (!warnings || warnings.length === 0) return null;
  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={C.error}
      paddingX={2}
      paddingY={1}
      marginBottom={1}
    >
      <Text bold color={C.error}>WARNINGS</Text>
      <Newline />
      {warnings.map((w, i) => (
        <Box key={i} gap={1}>
          <Text color={C.error}>{'\u2022'}</Text>
          <Text color={C.error} wrap="wrap">{w}</Text>
        </Box>
      ))}
    </Box>
  );
}

// ── Main Results Component ───────────────────────────────────────────

export default function Results({ recommendation, leaderboards }) {
  if (!recommendation) {
    return (
      <Box padding={2}>
        <Text color={C.error}>No recommendation data available.</Text>
      </Box>
    );
  }

  const {
    primary,
    fallback,
    onDevice,
    costEstimate,
    latencyEstimate,
    ragRecommended,
    ragReason,
    warnings,
  } = recommendation;

  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      {/* 1. Header */}
      <Header />

      {/* 2. Primary Model */}
      <PrimaryModel primary={primary} />

      {/* 3. Model Config */}
      <ModelConfig config={primary?.config} />

      {/* 4. Deployment */}
      <Deployment primary={primary} costEstimate={costEstimate} latencyEstimate={latencyEstimate} />

      {/* 5. Prompt Template */}
      <PromptTemplate template={primary?.promptTemplate} />

      {/* 6. Fallback Model */}
      <FallbackModel fallback={fallback} />

      {/* 7. On-Device Option */}
      <OnDevice onDevice={onDevice} />

      {/* 8. Leaderboard Context */}
      <LeaderboardContext
        leaderboards={leaderboards}
        primaryModel={primary?.model}
        fallbackModel={fallback?.model}
      />

      {/* 9. RAG Advisory */}
      <RagAdvisory ragRecommended={ragRecommended} ragReason={ragReason} />

      {/* 10. Warnings */}
      <Warnings warnings={warnings} />

      {/* Footer */}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>Powered by </Text>
        <Text bold color={C.accent}>PATIO</Text>
        <Text dimColor> — patio.coop</Text>
      </Box>
    </Box>
  );
}
