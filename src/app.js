/**
 * Main app component — orchestrates the full TUI flow:
 *   welcome  ->  wizard  ->  loading  ->  results
 *
 * Patio Design System branding applied throughout.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, Newline } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import Wizard from './components/wizard.js';
import Results from './components/results.js';
import Loading from './components/loading.js';
import { recommend } from './engine/rules.js';
import { fetchAllLeaderboards, enrichModelWithLeaderboardData } from './api/index.js';
import { THEME } from './theme.js';

// ── Patio Header — reused across wizard/loading screens ──────────────

function PatioHeader({ compact = false }) {
  if (compact) {
    return (
      <Box marginBottom={1} gap={1}>
        <Text bold color={THEME.colors.accent}>PATIO</Text>
        <Text dimColor>|</Text>
        <Text color={THEME.colors.textSecondary}>{THEME.brand.tagline}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box gap={1}>
        <Text bold color={THEME.colors.accent}>PATIO</Text>
        <Text color={THEME.colors.textSecondary}>— {THEME.brand.tagline}</Text>
      </Box>
    </Box>
  );
}

// ── Main App ─────────────────────────────────────────────────────────

export default function App() {
  const [stage, setStage] = useState('welcome');
  const [answers, setAnswers] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [leaderboards, setLeaderboards] = useState(null);
  const [sourceStatus, setSourceStatus] = useState({
    huggingface: 'pending',
    swebench: 'pending',
    aider: 'pending',
  });

  // Auto-advance from welcome after a brief pause
  useEffect(() => {
    if (stage !== 'welcome') return;
    const timer = setTimeout(() => setStage('wizard'), 1500);
    return () => clearTimeout(timer);
  }, [stage]);

  // Handle wizard completion
  const onWizardComplete = useCallback((wizardAnswers) => {
    setAnswers(wizardAnswers);
    setStage('loading');
  }, []);

  // Fetch leaderboards & run engine once we enter loading stage
  useEffect(() => {
    if (stage !== 'loading' || !answers) return;

    let cancelled = false;

    async function run() {
      // Fetch leaderboards with per-source status tracking
      let leaderboardData = null;
      try {
        leaderboardData = await fetchAllLeaderboards({
          onSourceComplete: (source, status) => {
            if (!cancelled) {
              setSourceStatus((prev) => ({ ...prev, [source]: status }));
            }
          },
        });
      } catch {
        // Leaderboards are optional — continue without them
      }

      if (cancelled) return;
      setLeaderboards(leaderboardData);

      // Run the recommendation engine
      let result;
      try {
        result = recommend(answers);

        // Enrich with leaderboard data if available
        if (leaderboardData && result) {
          result = enrichModelWithLeaderboardData(result, leaderboardData);
        }
      } catch (err) {
        result = {
          primary: {
            model: 'Error',
            reason: `Engine error: ${err.message}`,
            config: {},
            deploymentOption: '—',
            promptTemplate: null,
            score: 0,
            scoreBreakdown: {},
          },
          fallback: null,
          onDevice: null,
          costEstimate: null,
          latencyEstimate: null,
          ragRecommended: false,
          ragReason: null,
          warnings: [`Recommendation engine encountered an error: ${err.message}`],
        };
      }

      if (!cancelled) {
        setRecommendation(result);
        setStage('results');
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [stage, answers]);

  // ── Welcome screen ───────────────────────────────────────────────

  if (stage === 'welcome') {
    return (
      <Box flexDirection="column" alignItems="center" paddingY={1}>
        {/* Globe decoration */}
        <Box marginBottom={1}>
          <Text color={THEME.colors.accent} dimColor>{THEME.logo}</Text>
        </Box>

        {/* PATIO BigText with green gradient */}
        <Gradient name="mind">
          <BigText text="PATIO" font="chrome" />
        </Gradient>

        {/* Subtitle */}
        <Text bold color={THEME.colors.accent}>{THEME.brand.tagline}</Text>
        <Newline />

        {/* Tagline */}
        <Text color={THEME.colors.textSecondary}>{THEME.brand.subtitle}</Text>

        {/* Loading hint */}
        <Box marginTop={1}>
          <Text dimColor>Starting wizard...</Text>
        </Box>
      </Box>
    );
  }

  // ── Wizard screen ────────────────────────────────────────────────

  if (stage === 'wizard') {
    return (
      <Box flexDirection="column" paddingX={1}>
        <PatioHeader />
        <Wizard onComplete={onWizardComplete} />
      </Box>
    );
  }

  // ── Loading screen ───────────────────────────────────────────────

  if (stage === 'loading') {
    return (
      <Box flexDirection="column" paddingX={1} paddingY={1}>
        <PatioHeader />
        <Loading sourceStatus={sourceStatus} />
      </Box>
    );
  }

  // ── Results screen ───────────────────────────────────────────────

  if (stage === 'results') {
    return (
      <Box flexDirection="column">
        <Results recommendation={recommendation} leaderboards={leaderboards} />
      </Box>
    );
  }

  return null;
}
