import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import { THEME } from '../theme.js';
import {
  StepRole,
  StepStack,
  StepConstraints,
  StepUseCases,
  StepLicense,
  StepContext,
} from './steps.js';

// ─── Step metadata ───────────────────────────────────────────────────

const STEPS = [
  { key: 'role', title: 'ROLE', component: StepRole },
  { key: 'stack', title: 'TECH STACK', component: StepStack },
  { key: 'constraints', title: 'CONSTRAINTS', component: StepConstraints },
  { key: 'useCases', title: 'USE CASES', component: StepUseCases },
  { key: 'license', title: 'LICENSE', component: StepLicense },
  { key: 'context', title: 'CONTEXT', component: StepContext },
];

const INITIAL_STATE = {
  role: '',
  stack: { languages: '', frameworks: '', runtime: '', platform: '' },
  constraints: { maxMemory: '', budget: '', deployment: '', privacy: '' },
  useCases: [],
  license: '',
  context: { contextSize: '', existingProject: null },
};

const { colors } = THEME;

// ─── Patio Header ────────────────────────────────────────────────────

const PatioHeader = () => (
  <Box flexDirection="column" alignItems="center" marginBottom={1}>
    <Box borderStyle={THEME.borders.header} borderColor={colors.accent} paddingX={2} paddingY={0} flexDirection="column" alignItems="center">
      <Text color={colors.accent} bold>
        {THEME.wordmark}
      </Text>
    </Box>
    <Box marginTop={0}>
      <Text color={colors.accent} bold>
        {' '}{THEME.brand.tagline}{' '}
      </Text>
    </Box>
    <Text color={colors.textSecondary} dimColor>
      {THEME.brand.subtitle}
    </Text>
  </Box>
);

// ─── Step progress (numbered, Figma-style) ───────────────────────────

const StepProgress = ({ current, total }) => {
  const nodes = [];
  for (let i = 1; i <= total; i++) {
    const done = i < current;
    const active = i === current;

    // Step number
    if (active) {
      nodes.push(
        <Text key={`n${i}`} color={colors.accent} bold inverse>
          {` ${i} `}
        </Text>
      );
    } else if (done) {
      nodes.push(
        <Text key={`n${i}`} color={colors.accent} bold>
          {` ${i} `}
        </Text>
      );
    } else {
      nodes.push(
        <Text key={`n${i}`} color={colors.textSecondary} dimColor>
          {` ${i} `}
        </Text>
      );
    }

    // Connector line between numbers
    if (i < total) {
      const lineColor = i < current ? colors.accent : colors.textSecondary;
      const lineDim = i >= current;
      nodes.push(
        <Text key={`l${i}`} color={lineColor} dimColor={lineDim}>
          {'\u2500\u2500'}
        </Text>
      );
    }
  }

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box>{nodes}</Box>
      <Box marginTop={0}>
        <Text color={colors.accent} bold>
          {STEPS[current - 1].title}
        </Text>
        <Text color={colors.textSecondary}>
          {' '}({current}/{total})
        </Text>
      </Box>
    </Box>
  );
};

// ─── Progress bar ────────────────────────────────────────────────────

const ProgressBar = ({ current, total }) => {
  const width = 30;
  const filled = Math.round((current / total) * width);
  const empty = width - filled;

  return (
    <Box>
      <Text color={colors.accent}>{'\u2588'.repeat(filled)}</Text>
      <Text color={colors.textSecondary}>{'\u2591'.repeat(empty)}</Text>
    </Box>
  );
};

// ─── Navigation hint ─────────────────────────────────────────────────

const NavHint = ({ step, total }) => (
  <Box marginTop={1} borderStyle={THEME.borders.section} borderColor={colors.accent} paddingX={1}>
    <Text color={colors.accent}>
      {step > 1 ? '\u2190 / b = back' : ''}
      {step > 1 && step < total ? '  \u2022  ' : ''}
      {step < total ? 'Complete step to advance \u2192' : 'Complete to finish'}
    </Text>
  </Box>
);

// ─── Wizard ──────────────────────────────────────────────────────────

const Wizard = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState(INITIAL_STATE);

  const currentKey = STEPS[step].key;
  const StepComponent = STEPS[step].component;

  // Determine whether the current step has enough data to auto-advance
  const isStepComplete = useCallback(
    (key, val) => {
      switch (key) {
        case 'role':
        case 'license':
          return typeof val === 'string' && val.length > 0;
        case 'stack':
          return val && val.runtime && val.platform;
        case 'constraints':
          return val && val.maxMemory && val.budget && val.deployment && val.privacy;
        case 'useCases':
          return false; // manual advance with Tab
        case 'context':
          return val && val.contextSize && val.existingProject !== null;
        default:
          return false;
      }
    },
    [],
  );

  const handleChange = useCallback(
    (val) => {
      const next = { ...inputs, [currentKey]: val };
      setInputs(next);

      // Auto-advance for single-select steps
      if (isStepComplete(currentKey, val)) {
        if (step < STEPS.length - 1) {
          setStep(step + 1);
        } else {
          onComplete(next);
        }
      }
    },
    [inputs, currentKey, step, isStepComplete, onComplete],
  );

  // Global navigation
  useInput((input, key) => {
    // Back navigation
    if ((key.leftArrow || input === 'b') && step > 0) {
      if (input === 'b') {
        setStep(step - 1);
      } else if (currentKey !== 'stack') {
        // leftArrow is safe for non-text steps
        setStep(step - 1);
      }
    }

    // For multi-select (useCases), Tab advances to next step
    if (key.tab && !key.shift && currentKey === 'useCases') {
      if (step < STEPS.length - 1) {
        setStep(step + 1);
      } else {
        onComplete(inputs);
      }
    }
  });

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {/* Patio branded header */}
      <PatioHeader />

      {/* Step progress — numbered with green line */}
      <StepProgress current={step + 1} total={STEPS.length} />

      {/* Green progress bar */}
      <ProgressBar current={step + 1} total={STEPS.length} />

      {/* Step content */}
      <Box
        flexDirection="column"
        borderStyle={THEME.borders.section}
        borderColor={colors.accent}
        paddingX={2}
        paddingY={1}
        marginTop={1}
      >
        <StepComponent value={inputs[currentKey]} onChange={handleChange} />
      </Box>

      {/* Nav hint */}
      <NavHint step={step + 1} total={STEPS.length} />
    </Box>
  );
};

export default Wizard;
