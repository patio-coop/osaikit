#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/theme.js
var THEME;
var init_theme = __esm({
  "src/theme.js"() {
    THEME = {
      brand: {
        name: "PATIO",
        tagline: "AI MODEL ADVISOR",
        subtitle: "Find the right open LLM for your stack"
      },
      colors: {
        // Primary
        accent: "#35FF38",
        // neon green - CTAs, highlights, active states
        accentDim: "#45FA4F",
        // secondary green
        // Backgrounds
        bgDark: "#191A17",
        // hero bg
        bgMedium: "#232420",
        // card bg
        bgLight: "#F7F7F7",
        // light sections
        // Text
        textPrimary: "white",
        textSecondary: "gray",
        textOnDark: "white",
        textOnLight: "#000000",
        // Accents
        blue: "#96D8FD",
        teal: "#94C9E7",
        // Semantic
        success: "#35FF38",
        warning: "#FFB800",
        error: "#FF4444",
        info: "#96D8FD"
      },
      borders: {
        header: "double",
        section: "single",
        card: "round",
        highlight: "bold"
      },
      // ASCII wireframe globe — inspired by Figma hero section
      logo: [
        "         .--~~--.         ",
        "        /  .--.  \\        ",
        "       | /    \\ |        ",
        "    .--+--------+--.     ",
        "   /   |  .--.  |   \\    ",
        "  |  --+--    --+--  |   ",
        "   \\   |  `--'  |   /    ",
        "    `--+--------+--'     ",
        "       | \\    / |        ",
        "        \\  `--'  /        ",
        "         `--~~--'         "
      ].join("\n"),
      // "PATIO" block wordmark — clean, bold, max 5 lines
      wordmark: [
        " ____   _  _____ ___ ___  ",
        "|  _ \\ / \\|_   _|_ _/ _ \\ ",
        "| |_) / _ \\ | |  | | | | |",
        "|  __/ ___ \\| |  | | |_| |",
        "|_| /_/   \\_\\_| |___\\___/ "
      ].join("\n")
    };
  }
});

// src/components/steps.js
import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import SelectInput from "ink-select-input";
import TextInput from "ink-text-input";
import { jsx, jsxs } from "react/jsx-runtime";
var Hint, Label, IndicatorComponent, ItemComponent, ROLES, StepRole, RUNTIMES, PLATFORMS, SUB_FIELDS, SUB_LABELS, StepStack, MEMORY_OPTS, BUDGET_OPTS, DEPLOY_OPTS, PRIVACY_OPTS, CONSTRAINT_FIELDS, CONSTRAINT_LABELS, CONSTRAINT_OPTIONS, StepConstraints, USE_CASE_ITEMS, StepUseCases, LICENSE_OPTS, StepLicense, CONTEXT_SIZE_OPTS, YES_NO, CONTEXT_FIELDS, CONTEXT_LABELS, StepContext;
var init_steps = __esm({
  "src/components/steps.js"() {
    Hint = ({ children }) => /* @__PURE__ */ jsx(Box, { marginTop: 1, children: /* @__PURE__ */ jsx(Text, { color: "gray", dimColor: true, children }) });
    Label = ({ children }) => /* @__PURE__ */ jsx(Box, { marginBottom: 1, children: /* @__PURE__ */ jsx(Text, { bold: true, color: "white", children }) });
    IndicatorComponent = ({ isSelected }) => /* @__PURE__ */ jsx(Text, { color: "green", children: isSelected ? "\u276F " : "  " });
    ItemComponent = ({ isSelected, label }) => /* @__PURE__ */ jsx(Text, { color: isSelected ? "green" : "white", bold: isSelected, children: label });
    ROLES = [
      { label: "Web Development    \u2014 frontend, full-stack, SSR", value: "webdev" },
      { label: "Backend / API      \u2014 services, data pipelines", value: "backend" },
      { label: "Mobile             \u2014 iOS, Android, cross-platform", value: "mobile" },
      { label: "Games              \u2014 engines, shaders, tooling", value: "games" }
    ];
    StepRole = ({ value, onChange }) => /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
      /* @__PURE__ */ jsx(Label, { children: "WHAT KIND OF DEVELOPMENT DO YOU DO?" }),
      /* @__PURE__ */ jsx(
        SelectInput,
        {
          items: ROLES,
          initialIndex: ROLES.findIndex((r) => r.value === value) ?? 0,
          onSelect: (item) => onChange(item.value),
          indicatorComponent: IndicatorComponent,
          itemComponent: ItemComponent
        }
      ),
      /* @__PURE__ */ jsx(Hint, { children: "Use arrow keys to move, Enter to select" })
    ] });
    RUNTIMES = [
      { label: "Node.js", value: "node" },
      { label: "Python", value: "python" },
      { label: "Rust", value: "rust" },
      { label: "JVM (Java/Kotlin)", value: "jvm" },
      { label: ".NET (C#/F#)", value: "dotnet" },
      { label: "Go", value: "go" }
    ];
    PLATFORMS = [
      { label: "Browser", value: "browser" },
      { label: "Server", value: "server" },
      { label: "iOS", value: "ios" },
      { label: "Android", value: "android" },
      { label: "Console / CLI", value: "console" },
      { label: "PC / Desktop", value: "pc" }
    ];
    SUB_FIELDS = ["languages", "frameworks", "runtime", "platform"];
    SUB_LABELS = {
      languages: "LANGUAGES (comma-separated)",
      frameworks: "FRAMEWORKS / LIBRARIES (comma-separated)",
      runtime: "PRIMARY RUNTIME",
      platform: "TARGET PLATFORM"
    };
    StepStack = ({ value, onChange }) => {
      const data = value || { languages: "", frameworks: "", runtime: "", platform: "" };
      const [fieldIdx, setFieldIdx] = useState(0);
      const field = SUB_FIELDS[fieldIdx];
      const update = (key, val) => onChange({ ...data, [key]: val });
      const advanceField = () => {
        if (fieldIdx < SUB_FIELDS.length - 1) {
          setFieldIdx(fieldIdx + 1);
        }
      };
      const handleTextSubmit = () => advanceField();
      const handleSelectSubmit = (item) => {
        update(field, item.value);
        if (fieldIdx < SUB_FIELDS.length - 1) {
          setFieldIdx(fieldIdx + 1);
        }
      };
      useInput((input, key) => {
        if (key.shift && key.tab) {
          if (fieldIdx > 0) setFieldIdx(fieldIdx - 1);
        } else if (key.tab && !key.shift) {
          advanceField();
        }
      });
      const renderSubIndicator = () => /* @__PURE__ */ jsx(Box, { marginBottom: 1, gap: 1, children: SUB_FIELDS.map((f, i) => /* @__PURE__ */ jsxs(Text, { color: i <= fieldIdx ? "green" : "gray", bold: i === fieldIdx, children: [
        i < fieldIdx ? "\u2713" : i === fieldIdx ? "\u25B6" : "\u25CB",
        " ",
        SUB_LABELS[f].split(" ")[0]
      ] }, f)) });
      const renderField = () => {
        switch (field) {
          case "languages":
          case "frameworks":
            return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
              /* @__PURE__ */ jsx(Label, { children: SUB_LABELS[field] }),
              /* @__PURE__ */ jsxs(Box, { children: [
                /* @__PURE__ */ jsx(Text, { color: "green", children: "> " }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    value: data[field] || "",
                    onChange: (val) => update(field, val),
                    onSubmit: handleTextSubmit,
                    placeholder: field === "languages" ? "e.g. TypeScript, Python, Rust" : "e.g. React, FastAPI, Axum"
                  }
                )
              ] })
            ] });
          case "runtime":
            return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
              /* @__PURE__ */ jsx(Label, { children: SUB_LABELS[field] }),
              /* @__PURE__ */ jsx(
                SelectInput,
                {
                  items: RUNTIMES,
                  initialIndex: Math.max(0, RUNTIMES.findIndex((r) => r.value === data.runtime)),
                  onSelect: handleSelectSubmit,
                  indicatorComponent: IndicatorComponent,
                  itemComponent: ItemComponent
                }
              )
            ] });
          case "platform":
            return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
              /* @__PURE__ */ jsx(Label, { children: SUB_LABELS[field] }),
              /* @__PURE__ */ jsx(
                SelectInput,
                {
                  items: PLATFORMS,
                  initialIndex: Math.max(0, PLATFORMS.findIndex((p) => p.value === data.platform)),
                  onSelect: handleSelectSubmit,
                  indicatorComponent: IndicatorComponent,
                  itemComponent: ItemComponent
                }
              )
            ] });
          default:
            return null;
        }
      };
      return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
        renderSubIndicator(),
        renderField(),
        /* @__PURE__ */ jsx(Hint, { children: field === "languages" || field === "frameworks" ? "Type values, press Enter to continue \u2022 Tab / Shift+Tab to jump between fields" : "Arrow keys + Enter to select \u2022 Tab / Shift+Tab to jump between fields" })
      ] });
    };
    MEMORY_OPTS = [
      { label: "8 GB", value: "8GB" },
      { label: "16 GB", value: "16GB" },
      { label: "32 GB", value: "32GB" },
      { label: "64 GB", value: "64GB" },
      { label: "Unlimited", value: "unlimited" }
    ];
    BUDGET_OPTS = [
      { label: "Free / open-source only", value: "free" },
      { label: "Low  ($0 \u2013 $20/mo)", value: "low" },
      { label: "Medium ($20 \u2013 $100/mo)", value: "medium" },
      { label: "High ($100+/mo)", value: "high" }
    ];
    DEPLOY_OPTS = [
      { label: "Local only", value: "local" },
      { label: "Cloud", value: "cloud" },
      { label: "Hybrid (local + cloud)", value: "hybrid" }
    ];
    PRIVACY_OPTS = [
      { label: "Strict \u2014 no data leaves my machine", value: "strict" },
      { label: "Moderate \u2014 anonymized telemetry OK", value: "moderate" },
      { label: "Relaxed \u2014 cloud APIs are fine", value: "relaxed" }
    ];
    CONSTRAINT_FIELDS = ["maxMemory", "budget", "deployment", "privacy"];
    CONSTRAINT_LABELS = {
      maxMemory: "MAXIMUM RAM AVAILABLE",
      budget: "MONTHLY BUDGET",
      deployment: "DEPLOYMENT TARGET",
      privacy: "DATA PRIVACY REQUIREMENTS"
    };
    CONSTRAINT_OPTIONS = {
      maxMemory: MEMORY_OPTS,
      budget: BUDGET_OPTS,
      deployment: DEPLOY_OPTS,
      privacy: PRIVACY_OPTS
    };
    StepConstraints = ({ value, onChange }) => {
      const data = value || { maxMemory: "", budget: "", deployment: "", privacy: "" };
      const [fieldIdx, setFieldIdx] = useState(0);
      const field = CONSTRAINT_FIELDS[fieldIdx];
      const handleSelect = (item) => {
        const updated = { ...data, [field]: item.value };
        onChange(updated);
        if (fieldIdx < CONSTRAINT_FIELDS.length - 1) {
          setFieldIdx(fieldIdx + 1);
        }
      };
      useInput((_input, key) => {
        if (key.shift && key.tab) {
          if (fieldIdx > 0) setFieldIdx(fieldIdx - 1);
        } else if (key.tab && !key.shift) {
          if (fieldIdx < CONSTRAINT_FIELDS.length - 1) setFieldIdx(fieldIdx + 1);
        }
      });
      const options = CONSTRAINT_OPTIONS[field] || [];
      return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
        /* @__PURE__ */ jsx(Box, { marginBottom: 1, gap: 1, children: CONSTRAINT_FIELDS.map((f, i) => /* @__PURE__ */ jsxs(Text, { color: i <= fieldIdx ? "green" : "gray", bold: i === fieldIdx, children: [
          i < fieldIdx ? "\u2713" : i === fieldIdx ? "\u25B6" : "\u25CB",
          " ",
          CONSTRAINT_LABELS[f].split(" ")[0]
        ] }, f)) }),
        /* @__PURE__ */ jsx(Label, { children: CONSTRAINT_LABELS[field] }),
        /* @__PURE__ */ jsx(
          SelectInput,
          {
            items: options,
            initialIndex: Math.max(0, options.findIndex((o) => o.value === data[field])),
            onSelect: handleSelect,
            indicatorComponent: IndicatorComponent,
            itemComponent: ItemComponent
          }
        ),
        /* @__PURE__ */ jsx(Hint, { children: "Arrow keys + Enter to select \\u2022 Tab / Shift+Tab to jump between fields" })
      ] });
    };
    USE_CASE_ITEMS = [
      { key: "codegen", label: "Code generation" },
      { key: "debug", label: "Debugging assistance" },
      { key: "architecture", label: "Architecture / design" },
      { key: "code-review", label: "Code review" },
      { key: "docs", label: "Documentation writing" },
      { key: "testing", label: "Test generation" }
    ];
    StepUseCases = ({ value, onChange }) => {
      const selected = value || [];
      const [cursor, setCursor] = useState(0);
      const [done] = useState(false);
      const toggle = (key) => {
        const next = selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key];
        onChange(next);
      };
      useInput((input, key) => {
        if (key.upArrow) {
          setCursor((c) => c > 0 ? c - 1 : USE_CASE_ITEMS.length - 1);
        } else if (key.downArrow) {
          setCursor((c) => c < USE_CASE_ITEMS.length - 1 ? c + 1 : 0);
        } else if (input === " ") {
          toggle(USE_CASE_ITEMS[cursor].key);
        } else if (key.return && !done) {
          toggle(USE_CASE_ITEMS[cursor].key);
        }
      });
      return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
        /* @__PURE__ */ jsx(Label, { children: "SELECT ALL THAT APPLY:" }),
        USE_CASE_ITEMS.map((item, i) => {
          const isSelected = selected.includes(item.key);
          const isCursor = i === cursor;
          return /* @__PURE__ */ jsxs(Box, { children: [
            /* @__PURE__ */ jsx(Text, { color: isCursor ? "green" : "white", children: isCursor ? "\u276F " : "  " }),
            /* @__PURE__ */ jsxs(Text, { color: isSelected ? "green" : "gray", children: [
              isSelected ? "\u2611" : "\u2610",
              " "
            ] }),
            /* @__PURE__ */ jsx(Text, { color: isCursor ? "white" : "gray", bold: isCursor, children: item.label })
          ] }, item.key);
        }),
        /* @__PURE__ */ jsx(Hint, { children: "Space to toggle \\u2022 Arrow keys to move \\u2022 Press Tab when done" })
      ] });
    };
    LICENSE_OPTS = [
      { label: "Any license is fine", value: "any" },
      { label: "Permissive only (MIT, Apache, BSD)", value: "permissive" },
      { label: "Copyleft OK (GPL, AGPL, LGPL)", value: "copyleft" }
    ];
    StepLicense = ({ value, onChange }) => /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
      /* @__PURE__ */ jsx(Label, { children: "LICENSE PREFERENCE FOR AI MODELS:" }),
      /* @__PURE__ */ jsx(
        SelectInput,
        {
          items: LICENSE_OPTS,
          initialIndex: Math.max(0, LICENSE_OPTS.findIndex((o) => o.value === value)),
          onSelect: (item) => onChange(item.value),
          indicatorComponent: IndicatorComponent,
          itemComponent: ItemComponent
        }
      ),
      /* @__PURE__ */ jsx(Hint, { children: "Arrow keys + Enter to select" })
    ] });
    CONTEXT_SIZE_OPTS = [
      { label: "Small   (< 4K tokens)", value: "small" },
      { label: "Medium  (4K \u2013 16K tokens)", value: "medium" },
      { label: "Large   (16K \u2013 100K tokens)", value: "large" },
      { label: "Huge    (100K+ tokens)", value: "huge" }
    ];
    YES_NO = [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ];
    CONTEXT_FIELDS = ["contextSize", "existingProject"];
    CONTEXT_LABELS = {
      contextSize: "HOW MUCH CONTEXT DO YOU TYPICALLY NEED?",
      existingProject: "IS THIS FOR AN EXISTING PROJECT?"
    };
    StepContext = ({ value, onChange }) => {
      const data = value || { contextSize: "", existingProject: null };
      const [fieldIdx, setFieldIdx] = useState(0);
      const field = CONTEXT_FIELDS[fieldIdx];
      const handleSelect = (item) => {
        const updated = { ...data, [field]: item.value };
        onChange(updated);
        if (fieldIdx < CONTEXT_FIELDS.length - 1) {
          setFieldIdx(fieldIdx + 1);
        }
      };
      useInput((_input, key) => {
        if (key.shift && key.tab) {
          if (fieldIdx > 0) setFieldIdx(fieldIdx - 1);
        } else if (key.tab && !key.shift) {
          if (fieldIdx < CONTEXT_FIELDS.length - 1) setFieldIdx(fieldIdx + 1);
        }
      });
      const options = field === "contextSize" ? CONTEXT_SIZE_OPTS : YES_NO;
      return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
        /* @__PURE__ */ jsx(Box, { marginBottom: 1, gap: 1, children: CONTEXT_FIELDS.map((f, i) => /* @__PURE__ */ jsxs(Text, { color: i <= fieldIdx ? "green" : "gray", bold: i === fieldIdx, children: [
          i < fieldIdx ? "\u2713" : i === fieldIdx ? "\u25B6" : "\u25CB",
          " ",
          f === "contextSize" ? "CONTEXT" : "EXISTING?"
        ] }, f)) }),
        /* @__PURE__ */ jsx(Label, { children: CONTEXT_LABELS[field] }),
        /* @__PURE__ */ jsx(
          SelectInput,
          {
            items: options,
            initialIndex: Math.max(0, options.findIndex((o) => o.value === data[field])),
            onSelect: handleSelect,
            indicatorComponent: IndicatorComponent,
            itemComponent: ItemComponent
          }
        ),
        /* @__PURE__ */ jsx(Hint, { children: "Arrow keys + Enter to select \\u2022 Tab / Shift+Tab to jump between fields" })
      ] });
    };
  }
});

// src/components/wizard.js
import React2, { useState as useState2, useCallback } from "react";
import { Box as Box2, Text as Text2, useInput as useInput2 } from "ink";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var STEPS, INITIAL_STATE, colors, PatioHeader, StepProgress, ProgressBar, NavHint, Wizard, wizard_default;
var init_wizard = __esm({
  "src/components/wizard.js"() {
    init_theme();
    init_steps();
    STEPS = [
      { key: "role", title: "ROLE", component: StepRole },
      { key: "stack", title: "TECH STACK", component: StepStack },
      { key: "constraints", title: "CONSTRAINTS", component: StepConstraints },
      { key: "useCases", title: "USE CASES", component: StepUseCases },
      { key: "license", title: "LICENSE", component: StepLicense },
      { key: "context", title: "CONTEXT", component: StepContext }
    ];
    INITIAL_STATE = {
      role: "",
      stack: { languages: "", frameworks: "", runtime: "", platform: "" },
      constraints: { maxMemory: "", budget: "", deployment: "", privacy: "" },
      useCases: [],
      license: "",
      context: { contextSize: "", existingProject: null }
    };
    ({ colors } = THEME);
    PatioHeader = () => /* @__PURE__ */ jsxs2(Box2, { flexDirection: "column", alignItems: "center", marginBottom: 1, children: [
      /* @__PURE__ */ jsx2(Box2, { borderStyle: THEME.borders.header, borderColor: colors.accent, paddingX: 2, paddingY: 0, flexDirection: "column", alignItems: "center", children: /* @__PURE__ */ jsx2(Text2, { color: colors.accent, bold: true, children: THEME.wordmark }) }),
      /* @__PURE__ */ jsx2(Box2, { marginTop: 0, children: /* @__PURE__ */ jsxs2(Text2, { color: colors.accent, bold: true, children: [
        " ",
        THEME.brand.tagline,
        " "
      ] }) }),
      /* @__PURE__ */ jsx2(Text2, { color: colors.textSecondary, dimColor: true, children: THEME.brand.subtitle })
    ] });
    StepProgress = ({ current, total }) => {
      const nodes = [];
      for (let i = 1; i <= total; i++) {
        const done = i < current;
        const active = i === current;
        if (active) {
          nodes.push(
            /* @__PURE__ */ jsx2(Text2, { color: colors.accent, bold: true, inverse: true, children: ` ${i} ` }, `n${i}`)
          );
        } else if (done) {
          nodes.push(
            /* @__PURE__ */ jsx2(Text2, { color: colors.accent, bold: true, children: ` ${i} ` }, `n${i}`)
          );
        } else {
          nodes.push(
            /* @__PURE__ */ jsx2(Text2, { color: colors.textSecondary, dimColor: true, children: ` ${i} ` }, `n${i}`)
          );
        }
        if (i < total) {
          const lineColor = i < current ? colors.accent : colors.textSecondary;
          const lineDim = i >= current;
          nodes.push(
            /* @__PURE__ */ jsx2(Text2, { color: lineColor, dimColor: lineDim, children: "\u2500\u2500" }, `l${i}`)
          );
        }
      }
      return /* @__PURE__ */ jsxs2(Box2, { flexDirection: "column", marginBottom: 1, children: [
        /* @__PURE__ */ jsx2(Box2, { children: nodes }),
        /* @__PURE__ */ jsxs2(Box2, { marginTop: 0, children: [
          /* @__PURE__ */ jsx2(Text2, { color: colors.accent, bold: true, children: STEPS[current - 1].title }),
          /* @__PURE__ */ jsxs2(Text2, { color: colors.textSecondary, children: [
            " ",
            "(",
            current,
            "/",
            total,
            ")"
          ] })
        ] })
      ] });
    };
    ProgressBar = ({ current, total }) => {
      const width = 30;
      const filled = Math.round(current / total * width);
      const empty = width - filled;
      return /* @__PURE__ */ jsxs2(Box2, { children: [
        /* @__PURE__ */ jsx2(Text2, { color: colors.accent, children: "\u2588".repeat(filled) }),
        /* @__PURE__ */ jsx2(Text2, { color: colors.textSecondary, children: "\u2591".repeat(empty) })
      ] });
    };
    NavHint = ({ step, total }) => /* @__PURE__ */ jsx2(Box2, { marginTop: 1, borderStyle: THEME.borders.section, borderColor: colors.accent, paddingX: 1, children: /* @__PURE__ */ jsxs2(Text2, { color: colors.accent, children: [
      step > 1 ? "\u2190 / b = back" : "",
      step > 1 && step < total ? "  \u2022  " : "",
      step < total ? "Complete step to advance \u2192" : "Complete to finish"
    ] }) });
    Wizard = ({ onComplete }) => {
      const [step, setStep] = useState2(0);
      const [inputs, setInputs] = useState2(INITIAL_STATE);
      const currentKey = STEPS[step].key;
      const StepComponent = STEPS[step].component;
      const isStepComplete = useCallback(
        (key, val) => {
          switch (key) {
            case "role":
            case "license":
              return typeof val === "string" && val.length > 0;
            case "stack":
              return val && val.runtime && val.platform;
            case "constraints":
              return val && val.maxMemory && val.budget && val.deployment && val.privacy;
            case "useCases":
              return false;
            // manual advance with Tab
            case "context":
              return val && val.contextSize && val.existingProject !== null;
            default:
              return false;
          }
        },
        []
      );
      const handleChange = useCallback(
        (val) => {
          const next = { ...inputs, [currentKey]: val };
          setInputs(next);
          if (isStepComplete(currentKey, val)) {
            if (step < STEPS.length - 1) {
              setStep(step + 1);
            } else {
              onComplete(next);
            }
          }
        },
        [inputs, currentKey, step, isStepComplete, onComplete]
      );
      useInput2((input, key) => {
        if ((key.leftArrow || input === "b") && step > 0) {
          if (input === "b") {
            setStep(step - 1);
          } else if (currentKey !== "stack") {
            setStep(step - 1);
          }
        }
        if (key.tab && !key.shift && currentKey === "useCases") {
          if (step < STEPS.length - 1) {
            setStep(step + 1);
          } else {
            onComplete(inputs);
          }
        }
      });
      return /* @__PURE__ */ jsxs2(Box2, { flexDirection: "column", paddingX: 2, paddingY: 1, children: [
        /* @__PURE__ */ jsx2(PatioHeader, {}),
        /* @__PURE__ */ jsx2(StepProgress, { current: step + 1, total: STEPS.length }),
        /* @__PURE__ */ jsx2(ProgressBar, { current: step + 1, total: STEPS.length }),
        /* @__PURE__ */ jsx2(
          Box2,
          {
            flexDirection: "column",
            borderStyle: THEME.borders.section,
            borderColor: colors.accent,
            paddingX: 2,
            paddingY: 1,
            marginTop: 1,
            children: /* @__PURE__ */ jsx2(StepComponent, { value: inputs[currentKey], onChange: handleChange })
          }
        ),
        /* @__PURE__ */ jsx2(NavHint, { step: step + 1, total: STEPS.length })
      ] });
    };
    wizard_default = Wizard;
  }
});

// src/components/results.js
import React3 from "react";
import { Box as Box3, Text as Text3, Newline } from "ink";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Section({ title, borderColor = "gray", borderStyle = "round", children, ...rest }) {
  return /* @__PURE__ */ jsxs3(
    Box3,
    {
      flexDirection: "column",
      borderStyle,
      borderColor,
      paddingX: 2,
      paddingY: 1,
      marginBottom: 1,
      ...rest,
      children: [
        title ? /* @__PURE__ */ jsx3(Box3, { marginBottom: 1, children: /* @__PURE__ */ jsx3(Text3, { bold: true, color: borderColor, children: title }) }) : null,
        children
      ]
    }
  );
}
function Row({ label, value, valueColor = "white" }) {
  return /* @__PURE__ */ jsxs3(Box3, { gap: 1, children: [
    /* @__PURE__ */ jsxs3(Text3, { dimColor: true, children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsx3(Text3, { color: valueColor, children: String(value ?? "\u2014") })
  ] });
}
function ScoreBar({ score }) {
  if (score == null) return null;
  const pct = Math.round(score * 100);
  const filled = Math.round(pct / 5);
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(20 - filled);
  const color = pct >= 80 ? C.accent : pct >= 60 ? C.warning : C.error;
  return /* @__PURE__ */ jsxs3(Box3, { gap: 1, children: [
    /* @__PURE__ */ jsx3(Text3, { dimColor: true, children: "Score:" }),
    /* @__PURE__ */ jsx3(Text3, { color, children: bar }),
    /* @__PURE__ */ jsxs3(Text3, { bold: true, color, children: [
      " ",
      pct,
      "%"
    ] })
  ] });
}
function Header() {
  return /* @__PURE__ */ jsxs3(
    Box3,
    {
      flexDirection: "column",
      alignItems: "center",
      paddingX: 4,
      paddingY: 1,
      marginBottom: 1,
      borderStyle: "double",
      borderColor: C.accent,
      children: [
        /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.accent, children: "PATIO" }),
        /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.accentDim, children: "RECOMMENDATION" })
      ]
    }
  );
}
function PrimaryModel({ primary }) {
  if (!primary) return null;
  const { model, reason, scoreBreakdown } = primary;
  const modelName = typeof model === "object" ? model.name : model;
  const finalScore = scoreBreakdown?.finalScore;
  const dimensions = scoreBreakdown?.dimensions;
  return /* @__PURE__ */ jsxs3(Section, { title: "PRIMARY MODEL", borderColor: C.accent, children: [
    /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.accent, children: modelName }),
    model?.params ? /* @__PURE__ */ jsxs3(Text3, { dimColor: true, children: [
      " (",
      model.params,
      ")"
    ] }) : null,
    /* @__PURE__ */ jsx3(Newline, {}),
    /* @__PURE__ */ jsx3(Text3, { italic: true, children: reason }),
    /* @__PURE__ */ jsx3(Newline, {}),
    /* @__PURE__ */ jsx3(ScoreBar, { score: finalScore }),
    dimensions ? /* @__PURE__ */ jsxs3(Box3, { flexDirection: "column", marginTop: 1, children: [
      /* @__PURE__ */ jsx3(Text3, { dimColor: true, underline: true, children: "SCORE BREAKDOWN" }),
      Object.entries(dimensions).map(([key, dim]) => /* @__PURE__ */ jsx3(
        Row,
        {
          label: key.toUpperCase(),
          value: typeof dim === "object" ? `${Math.round(dim.weighted * 100)}% (w:${dim.weight}x)` : `${Math.round(dim * 100)}%`
        },
        key
      ))
    ] }) : null
  ] });
}
function ModelConfig({ config }) {
  if (!config) return null;
  const fields = [
    ["Temperature", config.temperature],
    ["Top P", config.topP],
    ["Max Tokens", config.maxTokens?.toLocaleString()],
    ["Context Window", config.contextWindow?.toLocaleString()]
  ];
  return /* @__PURE__ */ jsx3(Section, { title: "MODEL CONFIGURATION", borderColor: C.blue, children: fields.map(([label, value]) => /* @__PURE__ */ jsx3(Row, { label, value, valueColor: C.blue }, label)) });
}
function Deployment({ primary, costEstimate, latencyEstimate }) {
  return /* @__PURE__ */ jsxs3(Section, { title: "DEPLOYMENT", borderColor: C.accent, children: [
    /* @__PURE__ */ jsx3(
      Row,
      {
        label: "Option",
        value: primary?.deploymentOption,
        valueColor: C.accent
      }
    ),
    costEstimate ? /* @__PURE__ */ jsxs3(Box3, { flexDirection: "column", marginTop: 1, children: [
      /* @__PURE__ */ jsx3(Text3, { dimColor: true, underline: true, children: "COST ESTIMATE" }),
      /* @__PURE__ */ jsx3(Row, { label: "Local", value: costEstimate.local, valueColor: C.success }),
      /* @__PURE__ */ jsx3(Row, { label: "Cloud", value: costEstimate.cloud, valueColor: C.warning })
    ] }) : null,
    latencyEstimate ? /* @__PURE__ */ jsxs3(Box3, { flexDirection: "column", marginTop: 1, children: [
      /* @__PURE__ */ jsx3(Text3, { dimColor: true, underline: true, children: "LATENCY ESTIMATE" }),
      /* @__PURE__ */ jsx3(Row, { label: "Local", value: latencyEstimate.local, valueColor: C.success }),
      /* @__PURE__ */ jsx3(Row, { label: "Cloud", value: latencyEstimate.cloud, valueColor: C.warning })
    ] }) : null
  ] });
}
function PromptTemplate({ template }) {
  if (!template) return null;
  const label = typeof template === "object" ? template.label : null;
  const body = typeof template === "object" ? template.template : template;
  return /* @__PURE__ */ jsx3(Section, { title: label ? `PROMPT TEMPLATE \u2014 ${label.toUpperCase()}` : "PROMPT TEMPLATE", borderColor: "gray", borderStyle: "single", children: /* @__PURE__ */ jsx3(Box3, { borderStyle: "round", borderColor: "gray", paddingX: 1, paddingY: 0, children: /* @__PURE__ */ jsx3(Text3, { color: "white", wrap: "wrap", children: body }) }) });
}
function FallbackModel({ fallback }) {
  if (!fallback) return null;
  return /* @__PURE__ */ jsxs3(Section, { title: "FALLBACK MODEL", borderColor: C.teal, children: [
    /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.teal, children: typeof fallback.model === "object" ? fallback.model.name : fallback.model }),
    /* @__PURE__ */ jsx3(Newline, {}),
    /* @__PURE__ */ jsx3(Text3, { italic: true, children: fallback.reason }),
    /* @__PURE__ */ jsx3(Newline, {}),
    /* @__PURE__ */ jsx3(ScoreBar, { score: fallback.scoreBreakdown?.finalScore }),
    fallback.deploymentOption ? /* @__PURE__ */ jsx3(Row, { label: "Deployment", value: fallback.deploymentOption, valueColor: C.teal }) : null
  ] });
}
function OnDevice({ onDevice }) {
  if (!onDevice) return null;
  return /* @__PURE__ */ jsxs3(Section, { title: "ON-DEVICE OPTION", borderColor: C.accentDim, children: [
    /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.accentDim, children: typeof onDevice.model === "object" ? onDevice.model.name : onDevice.model }),
    /* @__PURE__ */ jsx3(Newline, {}),
    /* @__PURE__ */ jsx3(Text3, { italic: true, children: onDevice.reason }),
    /* @__PURE__ */ jsx3(Newline, {}),
    /* @__PURE__ */ jsx3(ScoreBar, { score: onDevice.scoreBreakdown?.finalScore }),
    onDevice.config ? /* @__PURE__ */ jsx3(Box3, { flexDirection: "column", marginTop: 1, children: Object.entries(onDevice.config).map(([k, v]) => /* @__PURE__ */ jsx3(Row, { label: k, value: v, valueColor: C.accentDim }, k)) }) : null
  ] });
}
function LeaderboardContext({ leaderboards, primaryModel, fallbackModel }) {
  if (!leaderboards) return null;
  const rankings = [];
  const findRank = (list, modelName) => {
    if (!list || !Array.isArray(list)) return null;
    const idx = list.findIndex(
      (entry) => (entry.modelId || entry.model || "").toLowerCase().includes(modelName.toLowerCase())
    );
    return idx >= 0 ? idx + 1 : null;
  };
  for (const rawModel of [primaryModel, fallbackModel].filter(Boolean)) {
    const modelName2 = typeof rawModel === "object" ? rawModel.name : rawModel;
    if (!modelName2) continue;
    const name = modelName2.replace(/[_-]/g, " ");
    if (leaderboards.huggingface) {
      const rank = findRank(leaderboards.huggingface, name);
      if (rank) rankings.push({ model: modelName2, board: "HuggingFace Open LLM", rank });
    }
    if (leaderboards.swebench) {
      const rank = findRank(leaderboards.swebench, name);
      if (rank) rankings.push({ model: modelName2, board: "SWE-bench Verified", rank });
    }
    if (leaderboards.aider) {
      const rank = findRank(leaderboards.aider, name);
      if (rank) rankings.push({ model: modelName2, board: "Aider Polyglot", rank });
    }
  }
  if (rankings.length === 0) return null;
  return /* @__PURE__ */ jsxs3(Section, { title: "LEADERBOARD RANKINGS", borderColor: "white", children: [
    rankings.map((r, i) => /* @__PURE__ */ jsxs3(Box3, { gap: 1, children: [
      /* @__PURE__ */ jsxs3(Text3, { color: C.accent, children: [
        "#",
        r.rank
      ] }),
      /* @__PURE__ */ jsx3(Text3, { dimColor: true, children: r.board }),
      /* @__PURE__ */ jsx3(Text3, { bold: true, children: r.model })
    ] }, i)),
    leaderboards.fetchedAt ? /* @__PURE__ */ jsx3(Box3, { marginTop: 1, children: /* @__PURE__ */ jsxs3(Text3, { dimColor: true, children: [
      "Data fetched: ",
      leaderboards.fetchedAt
    ] }) }) : null,
    leaderboards.errors?.length ? /* @__PURE__ */ jsx3(Box3, { marginTop: 1, children: /* @__PURE__ */ jsxs3(Text3, { color: C.warning, dimColor: true, children: [
      "(",
      leaderboards.errors.length,
      " source(s) unavailable)"
    ] }) }) : null
  ] });
}
function RagAdvisory({ ragRecommended, ragReason }) {
  if (!ragRecommended) return null;
  return /* @__PURE__ */ jsx3(
    Box3,
    {
      borderStyle: "round",
      borderColor: C.warning,
      paddingX: 2,
      paddingY: 1,
      marginBottom: 1,
      children: /* @__PURE__ */ jsxs3(Box3, { flexDirection: "column", children: [
        /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.warning, children: "RAG RECOMMENDED" }),
        /* @__PURE__ */ jsx3(Newline, {}),
        /* @__PURE__ */ jsx3(Text3, { color: C.warning, wrap: "wrap", children: ragReason || "Consider adding retrieval-augmented generation for better results with your data." })
      ] })
    }
  );
}
function Warnings({ warnings }) {
  if (!warnings || warnings.length === 0) return null;
  return /* @__PURE__ */ jsxs3(
    Box3,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: C.error,
      paddingX: 2,
      paddingY: 1,
      marginBottom: 1,
      children: [
        /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.error, children: "WARNINGS" }),
        /* @__PURE__ */ jsx3(Newline, {}),
        warnings.map((w, i) => /* @__PURE__ */ jsxs3(Box3, { gap: 1, children: [
          /* @__PURE__ */ jsx3(Text3, { color: C.error, children: "\u2022" }),
          /* @__PURE__ */ jsx3(Text3, { color: C.error, wrap: "wrap", children: w })
        ] }, i))
      ]
    }
  );
}
function Results({ recommendation, leaderboards }) {
  if (!recommendation) {
    return /* @__PURE__ */ jsx3(Box3, { padding: 2, children: /* @__PURE__ */ jsx3(Text3, { color: C.error, children: "No recommendation data available." }) });
  }
  const {
    primary,
    fallback,
    onDevice,
    costEstimate,
    latencyEstimate,
    ragRecommended,
    ragReason,
    warnings
  } = recommendation;
  return /* @__PURE__ */ jsxs3(Box3, { flexDirection: "column", paddingX: 1, paddingY: 1, children: [
    /* @__PURE__ */ jsx3(Header, {}),
    /* @__PURE__ */ jsx3(PrimaryModel, { primary }),
    /* @__PURE__ */ jsx3(ModelConfig, { config: primary?.config }),
    /* @__PURE__ */ jsx3(Deployment, { primary, costEstimate, latencyEstimate }),
    /* @__PURE__ */ jsx3(PromptTemplate, { template: primary?.promptTemplate }),
    /* @__PURE__ */ jsx3(FallbackModel, { fallback }),
    /* @__PURE__ */ jsx3(OnDevice, { onDevice }),
    /* @__PURE__ */ jsx3(
      LeaderboardContext,
      {
        leaderboards,
        primaryModel: primary?.model,
        fallbackModel: fallback?.model
      }
    ),
    /* @__PURE__ */ jsx3(RagAdvisory, { ragRecommended, ragReason }),
    /* @__PURE__ */ jsx3(Warnings, { warnings }),
    /* @__PURE__ */ jsxs3(Box3, { justifyContent: "center", marginTop: 1, children: [
      /* @__PURE__ */ jsx3(Text3, { dimColor: true, children: "Powered by " }),
      /* @__PURE__ */ jsx3(Text3, { bold: true, color: C.accent, children: "PATIO" }),
      /* @__PURE__ */ jsx3(Text3, { dimColor: true, children: " \u2014 patio.coop" })
    ] })
  ] });
}
var C;
var init_results = __esm({
  "src/components/results.js"() {
    init_theme();
    C = THEME.colors;
  }
});

// src/components/loading.js
import React4 from "react";
import { Box as Box4, Text as Text4 } from "ink";
import Spinner from "ink-spinner";
function Loading({ sourceStatus = {} }) {
  return React4.createElement(
    Box4,
    {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1,
      borderStyle: "round",
      borderColor: "green"
    },
    // Title row with spinner
    React4.createElement(
      Box4,
      { gap: 1, marginBottom: 1 },
      React4.createElement(Text4, { color: "green" }, React4.createElement(Spinner, { type: "dots" })),
      React4.createElement(Text4, { bold: true, color: "white" }, "Fetching live leaderboard data...")
    ),
    ...SOURCES.map((source) => {
      const status = sourceStatus[source.key] || "pending";
      let icon;
      let color;
      if (status === "done") {
        icon = "\u2714";
        color = "green";
      } else if (status === "error") {
        icon = "\u2716";
        color = "red";
      } else {
        icon = null;
        color = "gray";
      }
      return React4.createElement(
        Box4,
        { key: source.key, gap: 1, marginLeft: 2 },
        status === "pending" ? React4.createElement(Text4, { color: "green" }, React4.createElement(Spinner, { type: "dots" })) : React4.createElement(Text4, { color }, icon),
        React4.createElement(
          Text4,
          { color: status === "done" ? "white" : status === "error" ? "red" : "gray" },
          source.label
        )
      );
    }),
    // Hint
    React4.createElement(
      Box4,
      { marginTop: 1 },
      React4.createElement(
        Text4,
        { dimColor: true, color: "gray" },
        "This takes a few seconds \u2014 results are cached for the session."
      )
    )
  );
}
var SOURCES;
var init_loading = __esm({
  "src/components/loading.js"() {
    SOURCES = [
      { key: "huggingface", label: "HuggingFace Open LLM Leaderboard" },
      { key: "swebench", label: "SWE-bench Verified" },
      { key: "aider", label: "Aider Polyglot Benchmark" }
    ];
  }
});

// src/engine/models.js
function parseMemGB(memStr) {
  if (!memStr) return Infinity;
  const match = memStr.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}
var MODELS;
var init_models = __esm({
  "src/engine/models.js"() {
    MODELS = [
      // ── DeepSeek Coder V2 ──────────────────────────────────────────────
      {
        id: "deepseek-coder-v2-16b",
        name: "DeepSeek Coder V2 Lite",
        family: "DeepSeek Coder V2",
        params: "16B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "instruction-following", "math", "reasoning", "fill-in-middle"],
        weaknesses: ["multilingual-prose", "creative-writing"],
        minRAM: "16GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 73.8, swebench: 15.2, aiderPolyglot: 18.4 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-06-17",
        provider: "DeepSeek",
        url: "https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct"
      },
      {
        id: "deepseek-coder-v2-236b",
        name: "DeepSeek Coder V2",
        family: "DeepSeek Coder V2",
        params: "236B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "reasoning", "math", "instruction-following", "fill-in-middle", "architecture"],
        weaknesses: ["compute-heavy"],
        minRAM: "128GB",
        typicalLatency: "high",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["vllm", "huggingface"],
        deploymentOptions: ["cloud"],
        benchmarks: { humaneval: 90.2, swebench: 22.6, aiderPolyglot: 35.1 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-06-17",
        provider: "DeepSeek",
        url: "https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct"
      },
      // ── DeepSeek V3 ────────────────────────────────────────────────────
      {
        id: "deepseek-v3",
        name: "DeepSeek V3",
        family: "DeepSeek V3",
        params: "671B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "reasoning", "math", "instruction-following", "multilingual", "architecture"],
        weaknesses: ["compute-heavy", "high-memory"],
        minRAM: "256GB",
        typicalLatency: "high",
        fineTunable: false,
        adapterSupport: false,
        ecosystem: ["vllm", "huggingface"],
        deploymentOptions: ["cloud"],
        benchmarks: { humaneval: 91.6, swebench: 26.8, aiderPolyglot: 49.6 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-12-26",
        provider: "DeepSeek",
        url: "https://huggingface.co/deepseek-ai/DeepSeek-V3"
      },
      // ── CodeLlama ──────────────────────────────────────────────────────
      {
        id: "codellama-7b",
        name: "CodeLlama 7B",
        family: "CodeLlama",
        params: "7B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "instruction-following"],
        weaknesses: ["reasoning", "architecture", "multilingual"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 33.5, swebench: 2.1, aiderPolyglot: 5.8 },
        defaultConfig: { temperature: 0.1, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2023-08-24",
        provider: "Meta",
        url: "https://huggingface.co/codellama/CodeLlama-7b-Instruct-hf"
      },
      {
        id: "codellama-13b",
        name: "CodeLlama 13B",
        family: "CodeLlama",
        params: "13B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "instruction-following"],
        weaknesses: ["reasoning", "architecture", "multilingual"],
        minRAM: "16GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 36, swebench: 3.4, aiderPolyglot: 7.2 },
        defaultConfig: { temperature: 0.1, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2023-08-24",
        provider: "Meta",
        url: "https://huggingface.co/codellama/CodeLlama-13b-Instruct-hf"
      },
      {
        id: "codellama-34b",
        name: "CodeLlama 34B",
        family: "CodeLlama",
        params: "34B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "reasoning", "instruction-following"],
        weaknesses: ["architecture", "multilingual"],
        minRAM: "32GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 48.8, swebench: 6.2, aiderPolyglot: 11.5 },
        defaultConfig: { temperature: 0.1, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2023-08-24",
        provider: "Meta",
        url: "https://huggingface.co/codellama/CodeLlama-34b-Instruct-hf"
      },
      {
        id: "codellama-70b",
        name: "CodeLlama 70B",
        family: "CodeLlama",
        params: "70B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "reasoning", "instruction-following"],
        weaknesses: ["architecture", "multilingual", "compute-heavy"],
        minRAM: "64GB",
        typicalLatency: "high",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["vllm", "huggingface", "llama.cpp"],
        deploymentOptions: ["cloud", "hybrid"],
        benchmarks: { humaneval: 53, swebench: 8.5, aiderPolyglot: 14.3 },
        defaultConfig: { temperature: 0.1, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-01-29",
        provider: "Meta",
        url: "https://huggingface.co/codellama/CodeLlama-70b-Instruct-hf"
      },
      // ── StarCoder2 ─────────────────────────────────────────────────────
      {
        id: "starcoder2-3b",
        name: "StarCoder2 3B",
        family: "StarCoder2",
        params: "3B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "multilingual"],
        weaknesses: ["reasoning", "instruction-following", "architecture"],
        minRAM: "4GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 31.7, swebench: 1.8, aiderPolyglot: 4.9 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-02-28",
        provider: "BigCode",
        url: "https://huggingface.co/bigcode/starcoder2-3b"
      },
      {
        id: "starcoder2-7b",
        name: "StarCoder2 7B",
        family: "StarCoder2",
        params: "7B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "multilingual"],
        weaknesses: ["reasoning", "instruction-following", "architecture"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 35.4, swebench: 2.5, aiderPolyglot: 6.4 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-02-28",
        provider: "BigCode",
        url: "https://huggingface.co/bigcode/starcoder2-7b"
      },
      {
        id: "starcoder2-15b",
        name: "StarCoder2 15B",
        family: "StarCoder2",
        params: "15B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "multilingual"],
        weaknesses: ["reasoning", "architecture"],
        minRAM: "16GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 46.3, swebench: 5.1, aiderPolyglot: 9.7 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-02-28",
        provider: "BigCode",
        url: "https://huggingface.co/bigcode/starcoder2-15b"
      },
      // ── Llama 3.1 ──────────────────────────────────────────────────────
      {
        id: "llama-3.1-8b",
        name: "Llama 3.1 8B Instruct",
        family: "Llama 3.1",
        params: "8B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "reasoning", "multilingual", "codegen"],
        weaknesses: ["specialized-code-tasks"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 62.2, swebench: 10.1, aiderPolyglot: 15.6 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-07-23",
        provider: "Meta",
        url: "https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct"
      },
      {
        id: "llama-3.1-70b",
        name: "Llama 3.1 70B Instruct",
        family: "Llama 3.1",
        params: "70B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "reasoning", "multilingual", "codegen", "architecture", "math"],
        weaknesses: ["compute-heavy"],
        minRAM: "64GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["cloud", "hybrid"],
        benchmarks: { humaneval: 80.5, swebench: 18.3, aiderPolyglot: 30.2 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-07-23",
        provider: "Meta",
        url: "https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct"
      },
      {
        id: "llama-3.1-405b",
        name: "Llama 3.1 405B Instruct",
        family: "Llama 3.1",
        params: "405B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "reasoning", "multilingual", "codegen", "architecture", "math"],
        weaknesses: ["compute-heavy", "high-memory"],
        minRAM: "256GB",
        typicalLatency: "high",
        fineTunable: false,
        adapterSupport: false,
        ecosystem: ["vllm", "huggingface"],
        deploymentOptions: ["cloud"],
        benchmarks: { humaneval: 89, swebench: 23.1, aiderPolyglot: 40.5 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-07-23",
        provider: "Meta",
        url: "https://huggingface.co/meta-llama/Meta-Llama-3.1-405B-Instruct"
      },
      // ── Llama 3.2 (small/on-device) ───────────────────────────────────
      {
        id: "llama-3.2-1b",
        name: "Llama 3.2 1B Instruct",
        family: "Llama 3.2",
        params: "1B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "on-device", "low-latency"],
        weaknesses: ["codegen", "reasoning", "architecture"],
        minRAM: "2GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "hybrid"],
        benchmarks: { humaneval: 14.6, swebench: null, aiderPolyglot: 1.2 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 2048 },
        releaseDate: "2024-09-25",
        provider: "Meta",
        url: "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct"
      },
      {
        id: "llama-3.2-3b",
        name: "Llama 3.2 3B Instruct",
        family: "Llama 3.2",
        params: "3B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "on-device", "low-latency", "codegen"],
        weaknesses: ["reasoning", "architecture"],
        minRAM: "4GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "hybrid"],
        benchmarks: { humaneval: 25.6, swebench: 1.4, aiderPolyglot: 3.8 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 2048 },
        releaseDate: "2024-09-25",
        provider: "Meta",
        url: "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct"
      },
      // ── Mistral / Mixtral ──────────────────────────────────────────────
      {
        id: "mistral-7b",
        name: "Mistral 7B Instruct v0.3",
        family: "Mistral",
        params: "7B",
        contextWindow: 32768,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "reasoning", "codegen", "multilingual"],
        weaknesses: ["specialized-code-tasks", "architecture"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 40.2, swebench: 4.8, aiderPolyglot: 9.1 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-05-22",
        provider: "Mistral AI",
        url: "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3"
      },
      {
        id: "mixtral-8x7b",
        name: "Mixtral 8x7B Instruct",
        family: "Mixtral",
        params: "46.7B",
        contextWindow: 32768,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "reasoning", "codegen", "multilingual", "math"],
        weaknesses: ["memory-footprint"],
        minRAM: "48GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["cloud", "hybrid"],
        benchmarks: { humaneval: 45.1, swebench: 7.2, aiderPolyglot: 12.8 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-01-08",
        provider: "Mistral AI",
        url: "https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1"
      },
      {
        id: "mixtral-8x22b",
        name: "Mixtral 8x22B Instruct",
        family: "Mixtral",
        params: "141B",
        contextWindow: 65536,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["instruction-following", "reasoning", "codegen", "multilingual", "math", "architecture"],
        weaknesses: ["compute-heavy", "high-memory"],
        minRAM: "128GB",
        typicalLatency: "high",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["vllm", "huggingface"],
        deploymentOptions: ["cloud"],
        benchmarks: { humaneval: 55.8, swebench: 10.4, aiderPolyglot: 18.9 },
        defaultConfig: { temperature: 0.1, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-04-17",
        provider: "Mistral AI",
        url: "https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1"
      },
      // ── CodeGemma ──────────────────────────────────────────────────────
      {
        id: "codegemma-2b",
        name: "CodeGemma 2B",
        family: "CodeGemma",
        params: "2B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "on-device"],
        weaknesses: ["reasoning", "instruction-following", "architecture", "multilingual"],
        minRAM: "4GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "hybrid"],
        benchmarks: { humaneval: 31.1, swebench: null, aiderPolyglot: 3.2 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-04-09",
        provider: "Google",
        url: "https://huggingface.co/google/codegemma-2b"
      },
      {
        id: "codegemma-7b",
        name: "CodeGemma 7B Instruct",
        family: "CodeGemma",
        params: "7B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "fill-in-middle", "instruction-following"],
        weaknesses: ["reasoning", "architecture", "multilingual"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 44.4, swebench: 4.2, aiderPolyglot: 8.1 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-04-09",
        provider: "Google",
        url: "https://huggingface.co/google/codegemma-7b-it"
      },
      // ── Qwen2.5-Coder ─────────────────────────────────────────────────
      {
        id: "qwen2.5-coder-1.5b",
        name: "Qwen2.5-Coder 1.5B Instruct",
        family: "Qwen2.5-Coder",
        params: "1.5B",
        contextWindow: 32768,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "on-device", "low-latency", "multilingual"],
        weaknesses: ["reasoning", "architecture"],
        minRAM: "2GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "hybrid"],
        benchmarks: { humaneval: 43.6, swebench: 2.8, aiderPolyglot: 5.5 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-11-11",
        provider: "Alibaba",
        url: "https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct"
      },
      {
        id: "qwen2.5-coder-7b",
        name: "Qwen2.5-Coder 7B Instruct",
        family: "Qwen2.5-Coder",
        params: "7B",
        contextWindow: 32768,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "instruction-following", "multilingual", "reasoning"],
        weaknesses: ["architecture"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 70.4, swebench: 12.5, aiderPolyglot: 18.2 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-11-11",
        provider: "Alibaba",
        url: "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct"
      },
      {
        id: "qwen2.5-coder-14b",
        name: "Qwen2.5-Coder 14B Instruct",
        family: "Qwen2.5-Coder",
        params: "14B",
        contextWindow: 32768,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "instruction-following", "reasoning", "multilingual", "math"],
        weaknesses: [],
        minRAM: "16GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 78.2, swebench: 16.8, aiderPolyglot: 24.6 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-11-11",
        provider: "Alibaba",
        url: "https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct"
      },
      {
        id: "qwen2.5-coder-32b",
        name: "Qwen2.5-Coder 32B Instruct",
        family: "Qwen2.5-Coder",
        params: "32B",
        contextWindow: 32768,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "instruction-following", "reasoning", "multilingual", "math", "architecture"],
        weaknesses: [],
        minRAM: "32GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 92.7, swebench: 21.4, aiderPolyglot: 33.8 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 4096 },
        releaseDate: "2024-11-11",
        provider: "Alibaba",
        url: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct"
      },
      // ── Phi-3 ──────────────────────────────────────────────────────────
      {
        id: "phi-3-mini",
        name: "Phi-3 Mini (3.8B)",
        family: "Phi-3",
        params: "3.8B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["reasoning", "math", "codegen", "on-device", "instruction-following"],
        weaknesses: ["multilingual", "architecture"],
        minRAM: "4GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 58.5, swebench: 5.6, aiderPolyglot: 8.9 },
        defaultConfig: { temperature: 0, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-04-23",
        provider: "Microsoft",
        url: "https://huggingface.co/microsoft/Phi-3-mini-128k-instruct"
      },
      {
        id: "phi-3-medium",
        name: "Phi-3 Medium (14B)",
        family: "Phi-3",
        params: "14B",
        contextWindow: 128e3,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["reasoning", "math", "codegen", "instruction-following", "multilingual"],
        weaknesses: ["architecture"],
        minRAM: "16GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 62.8, swebench: 8.9, aiderPolyglot: 14.2 },
        defaultConfig: { temperature: 0, topP: 0.9, maxTokens: 4096 },
        releaseDate: "2024-05-21",
        provider: "Microsoft",
        url: "https://huggingface.co/microsoft/Phi-3-medium-128k-instruct"
      },
      // ── WizardCoder ────────────────────────────────────────────────────
      {
        id: "wizardcoder-15b",
        name: "WizardCoder 15B V1.0",
        family: "WizardCoder",
        params: "15B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: true,
        license: "copyleft",
        commercialUse: false,
        strengths: ["codegen", "instruction-following"],
        weaknesses: ["reasoning", "architecture", "multilingual", "outdated"],
        minRAM: "16GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 57.3, swebench: 4.1, aiderPolyglot: 7.8 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2023-06-14",
        provider: "WizardLM",
        url: "https://huggingface.co/WizardLM/WizardCoder-15B-V1.0"
      },
      {
        id: "wizardcoder-33b",
        name: "WizardCoder 33B V1.1",
        family: "WizardCoder",
        params: "33B",
        contextWindow: 16384,
        quantizable: true,
        onDevice: false,
        license: "copyleft",
        commercialUse: false,
        strengths: ["codegen", "instruction-following", "reasoning"],
        weaknesses: ["architecture", "multilingual", "outdated"],
        minRAM: "32GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 79.9, swebench: 7.8, aiderPolyglot: 13.5 },
        defaultConfig: { temperature: 0, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2023-11-09",
        provider: "WizardLM",
        url: "https://huggingface.co/WizardLM/WizardCoder-33B-V1.1"
      },
      // ── Granite Code ───────────────────────────────────────────────────
      {
        id: "granite-code-3b",
        name: "Granite Code 3B Instruct",
        family: "Granite Code",
        params: "3B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "on-device", "enterprise", "multilingual"],
        weaknesses: ["reasoning", "architecture"],
        minRAM: "4GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 28, swebench: 1.5, aiderPolyglot: 3.9 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-05-06",
        provider: "IBM",
        url: "https://huggingface.co/ibm-granite/granite-3b-code-instruct"
      },
      {
        id: "granite-code-8b",
        name: "Granite Code 8B Instruct",
        family: "Granite Code",
        params: "8B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: true,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "enterprise", "multilingual", "instruction-following"],
        weaknesses: ["reasoning", "architecture"],
        minRAM: "8GB",
        typicalLatency: "low",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 42.7, swebench: 4.8, aiderPolyglot: 8.3 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-05-06",
        provider: "IBM",
        url: "https://huggingface.co/ibm-granite/granite-8b-code-instruct"
      },
      {
        id: "granite-code-20b",
        name: "Granite Code 20B Instruct",
        family: "Granite Code",
        params: "20B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "enterprise", "multilingual", "instruction-following", "reasoning"],
        weaknesses: ["architecture"],
        minRAM: "24GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 52.4, swebench: 7.1, aiderPolyglot: 12 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-05-06",
        provider: "IBM",
        url: "https://huggingface.co/ibm-granite/granite-20b-code-instruct"
      },
      {
        id: "granite-code-34b",
        name: "Granite Code 34B Instruct",
        family: "Granite Code",
        params: "34B",
        contextWindow: 8192,
        quantizable: true,
        onDevice: false,
        license: "permissive",
        commercialUse: true,
        strengths: ["codegen", "enterprise", "multilingual", "instruction-following", "reasoning"],
        weaknesses: ["architecture", "context-window-small"],
        minRAM: "32GB",
        typicalLatency: "medium",
        fineTunable: true,
        adapterSupport: true,
        ecosystem: ["ollama", "llama.cpp", "vllm", "huggingface", "lm-studio"],
        deploymentOptions: ["local", "cloud", "hybrid"],
        benchmarks: { humaneval: 58.1, swebench: 9.2, aiderPolyglot: 14.7 },
        defaultConfig: { temperature: 0.2, topP: 0.95, maxTokens: 2048 },
        releaseDate: "2024-05-06",
        provider: "IBM",
        url: "https://huggingface.co/ibm-granite/granite-34b-code-instruct"
      }
    ];
  }
});

// src/engine/rules.js
function parseMaxMemory(constraint) {
  if (!constraint) return Infinity;
  return MEMORY_TIERS[constraint] ?? Infinity;
}
function passesHardConstraints(model, inputs) {
  const reasons = [];
  if (inputs.license === "permissive" && model.license !== "permissive") {
    reasons.push(`License "${model.license}" does not meet "permissive" requirement`);
  }
  if (inputs.license === "copyleft" && model.license === "restricted") {
    reasons.push(`License "${model.license}" is restricted`);
  }
  const maxMem = parseMaxMemory(inputs.constraints?.maxMemory);
  const modelMem = parseMemGB(model.minRAM);
  if (modelMem > maxMem) {
    reasons.push(`Requires ${model.minRAM} RAM but max is ${inputs.constraints.maxMemory}`);
  }
  if (inputs.constraints?.privacy === "strict") {
    if (!model.deploymentOptions.includes("local")) {
      reasons.push("Strict privacy requires local deployment, which this model does not support");
    }
  }
  if (inputs.constraints?.budget === "free") {
    if (!model.deploymentOptions.includes("local")) {
      reasons.push("Free budget requires local deployment capability");
    }
  }
  if (inputs.constraints?.deployment === "local" && !model.deploymentOptions.includes("local")) {
    reasons.push("Local deployment required but not supported");
  }
  return { passes: reasons.length === 0, reasons };
}
function scoreCapabilityFit(model, inputs) {
  let score = 0;
  let maxScore = 0;
  const details = [];
  const desiredStrengths = /* @__PURE__ */ new Set();
  for (const uc of inputs.useCases) {
    const boosts = USE_CASE_BOOSTS[uc];
    if (boosts) {
      boosts.strengthMatch.forEach((s) => desiredStrengths.add(s));
    }
  }
  const roleBoost = ROLE_BOOSTS[inputs.role];
  if (roleBoost) {
    roleBoost.strengths.forEach((s) => desiredStrengths.add(s));
  }
  maxScore = desiredStrengths.size;
  for (const s of desiredStrengths) {
    if (model.strengths.includes(s)) {
      score += 1;
      details.push(`+1 has "${s}"`);
    }
  }
  for (const w of model.weaknesses) {
    if (desiredStrengths.has(w)) {
      score -= 0.5;
      details.push(`-0.5 weakness in "${w}"`);
    }
  }
  const normalized = maxScore > 0 ? Math.max(0, score / maxScore) : 0;
  return { score: normalized, details, weight: WEIGHTS.capabilityFit };
}
function scoreContextMatch(model, inputs) {
  const needed = CONTEXT_THRESHOLDS[inputs.contextNeeds] || 32768;
  const details = [];
  let score;
  if (model.contextWindow >= needed) {
    score = 1;
    details.push(`Context ${model.contextWindow.toLocaleString()} >= needed ${needed.toLocaleString()}`);
  } else {
    score = model.contextWindow / needed;
    details.push(
      `Context ${model.contextWindow.toLocaleString()} < needed ${needed.toLocaleString()} (${(score * 100).toFixed(0)}% coverage)`
    );
  }
  return { score, details, weight: WEIGHTS.contextMatch };
}
function scoreBenchmarks(model, inputs) {
  const details = [];
  const scores = [];
  if (model.benchmarks.humaneval != null) {
    const normalized = model.benchmarks.humaneval / 100;
    scores.push(normalized);
    details.push(`HumanEval: ${model.benchmarks.humaneval}%`);
  }
  for (const uc of inputs.useCases) {
    const boosts = USE_CASE_BOOSTS[uc];
    if (!boosts?.benchmarkField) continue;
    const val = model.benchmarks[boosts.benchmarkField];
    if (val != null) {
      const maxVals = { humaneval: 100, swebench: 50, aiderPolyglot: 60 };
      const normalized = val / (maxVals[boosts.benchmarkField] || 100);
      scores.push(normalized);
      details.push(`${boosts.benchmarkField}: ${val} (for "${uc}" use case)`);
    }
  }
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  return { score: avgScore, details, weight: WEIGHTS.benchmarkScores };
}
function scoreComputeFootprint(model, inputs) {
  const details = [];
  let score;
  const latencyScores = { low: 1, medium: 0.6, high: 0.3 };
  score = latencyScores[model.typicalLatency] || 0.5;
  details.push(`Latency: ${model.typicalLatency} (${score})`);
  if (inputs.constraints?.deployment === "local" && model.onDevice) {
    score = Math.min(1, score + 0.2);
    details.push("+0.2 on-device viable for local deployment");
  }
  if (inputs.role === "mobile" && model.onDevice) {
    score = Math.min(1, score + 0.2);
    details.push("+0.2 on-device viable for mobile");
  }
  if (inputs.constraints?.budget === "free" || inputs.constraints?.budget === "low") {
    if (model.onDevice) {
      score = Math.min(1, score + 0.15);
      details.push("+0.15 on-device saves cost");
    }
  }
  return { score, details, weight: WEIGHTS.computeFootprint };
}
function scoreEcosystem(model, _inputs) {
  const maxTools = 5;
  const score = model.ecosystem.length / maxTools;
  const details = [`${model.ecosystem.length}/${maxTools} supported tools (${model.ecosystem.join(", ")})`];
  return { score, details, weight: WEIGHTS.ecosystemRichness };
}
function scoreFineTuning(model, inputs) {
  let score = 0;
  const details = [];
  if (model.fineTunable) {
    score += 0.5;
    details.push("+0.5 fine-tunable");
  }
  if (model.adapterSupport) {
    score += 0.5;
    details.push("+0.5 adapter support (LoRA etc.)");
  }
  if (inputs.existingProject && model.fineTunable) {
    score = Math.min(1, score + 0.2);
    details.push("+0.2 existing project benefits from fine-tuning");
  }
  return { score, details, weight: WEIGHTS.fineTuningSupport };
}
function scoreModel(model, inputs) {
  const dimensions = {
    capabilityFit: scoreCapabilityFit(model, inputs),
    contextMatch: scoreContextMatch(model, inputs),
    benchmarkScores: scoreBenchmarks(model, inputs),
    computeFootprint: scoreComputeFootprint(model, inputs),
    ecosystemRichness: scoreEcosystem(model, inputs),
    fineTuningSupport: scoreFineTuning(model, inputs)
  };
  let totalWeightedScore = 0;
  let totalWeight = 0;
  for (const dim of Object.values(dimensions)) {
    totalWeightedScore += dim.score * dim.weight;
    totalWeight += dim.weight;
  }
  const finalScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  return {
    model,
    finalScore,
    dimensions,
    totalWeightedScore,
    totalWeight
  };
}
function selectDeployment(model, inputs) {
  const pref = inputs.constraints?.deployment;
  if (pref && model.deploymentOptions.includes(pref)) return pref;
  if (inputs.constraints?.privacy === "strict" && model.deploymentOptions.includes("local")) return "local";
  if (inputs.constraints?.budget === "free" && model.deploymentOptions.includes("local")) return "local";
  if (model.deploymentOptions.includes("local")) return "local";
  if (model.deploymentOptions.includes("hybrid")) return "hybrid";
  return "cloud";
}
function adjustConfig(model, inputs) {
  const config = { ...model.defaultConfig };
  if (inputs.useCases.includes("codegen")) {
    config.temperature = Math.min(config.temperature, 0.1);
  }
  if (inputs.useCases.includes("architecture") && !inputs.useCases.includes("codegen")) {
    config.temperature = Math.max(config.temperature, 0.3);
  }
  if (inputs.contextNeeds === "large" || inputs.contextNeeds === "huge") {
    config.maxTokens = Math.min(model.contextWindow, Math.max(config.maxTokens, 8192));
  }
  return config;
}
function selectPromptTemplate(inputs) {
  const primaryUseCase = inputs.useCases[0] || "codegen";
  const tmpl = PROMPT_TEMPLATES[primaryUseCase] || PROMPT_TEMPLATES.codegen;
  const filled = tmpl.template.replace(/\{\{ROLE\}\}/g, inputs.role || "software").replace(/\{\{LANGUAGES\}\}/g, (inputs.languages || []).join(", ") || "the project languages").replace(/\{\{FRAMEWORKS\}\}/g, (inputs.frameworks || []).join(", ") || "the project frameworks").replace(/\{\{RUNTIME\}\}/g, inputs.runtime || "the target runtime").replace(/\{\{PLATFORM\}\}/g, inputs.platform || "the target platform").replace(/\{\{TASK\}\}/g, "[describe your task here]");
  return { useCase: primaryUseCase, label: tmpl.label, template: filled };
}
function estimateCosts(model) {
  const memGB = parseMemGB(model.minRAM);
  let localCost;
  if (memGB <= 8) localCost = "$0/mo (runs on consumer hardware)";
  else if (memGB <= 16) localCost = "~$5-10/mo electricity (consumer GPU)";
  else if (memGB <= 32) localCost = "~$10-20/mo electricity (workstation GPU)";
  else if (memGB <= 64) localCost = "~$30-80/mo electricity (multi-GPU or cloud instance)";
  else localCost = "~$200-800/mo (multi-GPU server or cloud)";
  let cloudCost;
  if (memGB <= 8) cloudCost = "~$0.10-0.20/hr (T4/L4 instance)";
  else if (memGB <= 16) cloudCost = "~$0.30-0.70/hr (A10G instance)";
  else if (memGB <= 32) cloudCost = "~$0.70-1.50/hr (A100 40GB)";
  else if (memGB <= 64) cloudCost = "~$1.50-3.00/hr (A100 80GB)";
  else if (memGB <= 128) cloudCost = "~$3.00-6.00/hr (multi-A100)";
  else cloudCost = "~$8.00-15.00/hr (8xA100 / H100 cluster)";
  return { local: localCost, cloud: cloudCost };
}
function estimateLatency(model) {
  const map = {
    low: { local: "50-200ms/token", cloud: "100-400ms first token" },
    medium: { local: "200-500ms/token", cloud: "300-800ms first token" },
    high: { local: "500ms-2s/token (if feasible)", cloud: "500ms-1.5s first token" }
  };
  return map[model.typicalLatency] || map.medium;
}
function evaluateRAG(primaryModel, inputs) {
  if (inputs.contextNeeds === "huge" && primaryModel.contextWindow < 32768) {
    return {
      ragRecommended: true,
      ragReason: `Your codebase context needs ("huge") exceeds this model's ${primaryModel.contextWindow.toLocaleString()}-token window. Use RAG (retrieval-augmented generation) to chunk and retrieve relevant code sections. Tools: LlamaIndex, LangChain, or custom embeddings with FAISS/Chroma.`
    };
  }
  if (inputs.contextNeeds === "large" && primaryModel.contextWindow < 16384) {
    return {
      ragRecommended: true,
      ragReason: `Your context needs ("large") exceed this model's ${primaryModel.contextWindow.toLocaleString()}-token window. RAG will help retrieve only the relevant code context. Consider chunking by file or function.`
    };
  }
  if (inputs.existingProject && inputs.contextNeeds !== "small") {
    return {
      ragRecommended: true,
      ragReason: `For existing projects with substantial codebases, RAG helps the model understand your specific patterns and conventions by retrieving relevant code snippets on demand.`
    };
  }
  return { ragRecommended: false, ragReason: null };
}
function generateWarnings(primary, _fallback, _onDevice, inputs) {
  const warnings = [];
  if (primary.model.license !== "permissive") {
    warnings.push(
      `Primary model "${primary.model.name}" has a "${primary.model.license}" license. Verify compliance for your use case.`
    );
  }
  if (!primary.model.commercialUse && inputs.constraints?.budget !== "free") {
    warnings.push(
      `"${primary.model.name}" may not permit commercial use. Check the license before deploying in production.`
    );
  }
  if (primary.model.typicalLatency === "high" && inputs.useCases.includes("codegen")) {
    warnings.push(
      `"${primary.model.name}" has high latency which may impact interactive code generation. The fallback model may be faster for real-time use.`
    );
  }
  const memGB = parseMemGB(primary.model.minRAM);
  const maxMem = parseMaxMemory(inputs.constraints?.maxMemory);
  if (maxMem !== Infinity && memGB >= maxMem * 0.8) {
    warnings.push(
      `"${primary.model.name}" requires ${primary.model.minRAM} RAM, close to your ${inputs.constraints.maxMemory} limit. Performance may degrade. Quantized versions (Q4/Q5) can reduce memory by 50-60%.`
    );
  }
  if (primary.model.contextWindow < 16384 && inputs.contextNeeds !== "small") {
    warnings.push(
      `"${primary.model.name}" has a ${primary.model.contextWindow.toLocaleString()}-token context window. For larger codebases, RAG or file chunking is essential.`
    );
  }
  const releaseDate = new Date(primary.model.releaseDate);
  const monthsOld = (Date.now() - releaseDate.getTime()) / (1e3 * 60 * 60 * 24 * 30);
  if (monthsOld > 12) {
    warnings.push(
      `"${primary.model.name}" was released ${Math.floor(monthsOld)} months ago. Newer models in the same family may offer better performance.`
    );
  }
  return warnings;
}
function recommend(inputs) {
  const candidates = [];
  const filtered = [];
  for (const model of MODELS) {
    const check = passesHardConstraints(model, inputs);
    if (check.passes) {
      candidates.push(model);
    } else {
      filtered.push({ model: model.name, reasons: check.reasons });
    }
  }
  if (candidates.length === 0) {
    return {
      primary: null,
      fallback: null,
      onDevice: null,
      costEstimate: { local: "N/A", cloud: "N/A" },
      latencyEstimate: { local: "N/A", cloud: "N/A" },
      ragRecommended: false,
      ragReason: "No models matched your constraints.",
      warnings: [
        "No models passed the hard constraint filters. Try relaxing memory, license, or deployment constraints.",
        ...filtered.map((f) => `${f.model}: ${f.reasons.join("; ")}`)
      ]
    };
  }
  const scored = candidates.map((m) => scoreModel(m, inputs));
  scored.sort((a, b) => b.finalScore - a.finalScore);
  const primaryScored = scored[0];
  const primaryDeployment = selectDeployment(primaryScored.model, inputs);
  const promptTemplate = selectPromptTemplate(inputs);
  let fallbackScored = scored.find(
    (s) => s.model.family !== primaryScored.model.family
  );
  if (!fallbackScored && scored.length > 1) {
    fallbackScored = scored[1];
  }
  const onDeviceScored = scored.find((s) => s.model.onDevice);
  const { ragRecommended, ragReason } = evaluateRAG(primaryScored.model, inputs);
  const formatScored = (s, deployment) => ({
    model: s.model,
    reason: buildReason(s, inputs),
    config: adjustConfig(s.model, inputs),
    deploymentOption: deployment || selectDeployment(s.model, inputs),
    scoreBreakdown: {
      finalScore: Math.round(s.finalScore * 1e3) / 1e3,
      dimensions: Object.fromEntries(
        Object.entries(s.dimensions).map(([key, dim]) => [
          key,
          {
            score: Math.round(dim.score * 1e3) / 1e3,
            weight: dim.weight,
            weighted: Math.round(dim.score * dim.weight * 1e3) / 1e3,
            details: dim.details
          }
        ])
      )
    }
  });
  const primary = {
    ...formatScored(primaryScored, primaryDeployment),
    promptTemplate
  };
  const fallback = fallbackScored ? formatScored(fallbackScored) : null;
  const onDevice = onDeviceScored ? {
    model: onDeviceScored.model,
    reason: buildReason(onDeviceScored, inputs),
    config: adjustConfig(onDeviceScored.model, inputs),
    scoreBreakdown: {
      finalScore: Math.round(onDeviceScored.finalScore * 1e3) / 1e3
    }
  } : null;
  if (onDevice && onDevice.model.id === primary.model.id) {
    const altOnDevice = scored.find(
      (s) => s.model.onDevice && s.model.id !== primary.model.id
    );
    if (altOnDevice) {
      onDevice.model = altOnDevice.model;
      onDevice.reason = buildReason(altOnDevice, inputs);
      onDevice.config = adjustConfig(altOnDevice.model, inputs);
      onDevice.scoreBreakdown = {
        finalScore: Math.round(altOnDevice.finalScore * 1e3) / 1e3
      };
    }
  }
  const warnings = generateWarnings(primaryScored, fallbackScored, onDeviceScored, inputs);
  return {
    primary,
    fallback,
    onDevice,
    costEstimate: estimateCosts(primaryScored.model),
    latencyEstimate: estimateLatency(primaryScored.model),
    ragRecommended,
    ragReason,
    warnings,
    _meta: {
      totalModels: MODELS.length,
      candidatesAfterFilter: candidates.length,
      filteredOut: filtered.length,
      filteredModels: filtered
    }
  };
}
function buildReason(scored, inputs) {
  const m = scored.model;
  const parts = [];
  const dims = Object.entries(scored.dimensions);
  dims.sort((a, b) => b[1].score * b[1].weight - a[1].score * a[1].weight);
  const topDim = dims[0];
  const dimLabels = {
    capabilityFit: "capability match",
    contextMatch: "context window fit",
    benchmarkScores: "benchmark performance",
    computeFootprint: "compute efficiency",
    ecosystemRichness: "tooling ecosystem",
    fineTuningSupport: "fine-tuning options"
  };
  parts.push(
    `${m.name} scores highest overall (${(scored.finalScore * 100).toFixed(1)}%), led by strong ${dimLabels[topDim[0]] || topDim[0]}`
  );
  const relevantStrengths = m.strengths.filter(
    (s) => inputs.useCases.some((uc) => USE_CASE_BOOSTS[uc]?.strengthMatch.includes(s))
  );
  if (relevantStrengths.length > 0) {
    parts.push(`Key strengths for your use cases: ${relevantStrengths.join(", ")}`);
  }
  if (m.contextWindow >= 64e3) {
    parts.push(`${(m.contextWindow / 1e3).toFixed(0)}K context window handles large codebases`);
  }
  if (m.ecosystem.length >= 4) {
    parts.push(`Broad tooling support (${m.ecosystem.join(", ")})`);
  }
  return parts.join(". ") + ".";
}
var PROMPT_TEMPLATES, WEIGHTS, MEMORY_TIERS, CONTEXT_THRESHOLDS, ROLE_BOOSTS, USE_CASE_BOOSTS;
var init_rules = __esm({
  "src/engine/rules.js"() {
    init_models();
    PROMPT_TEMPLATES = {
      codegen: {
        label: "Code Generation",
        template: `You are an expert {{ROLE}} developer working with {{LANGUAGES}}.
Generate clean, production-ready code following best practices for {{FRAMEWORKS}}.
Include proper error handling and types where applicable.

Task: {{TASK}}

Requirements:
- Follow {{FRAMEWORKS}} conventions and idioms
- Include inline comments for non-obvious logic
- Handle edge cases and errors gracefully
- Optimize for readability and maintainability`
      },
      debug: {
        label: "Debugging",
        template: `You are a senior {{ROLE}} developer debugging a {{RUNTIME}} application.
The codebase uses {{LANGUAGES}} with {{FRAMEWORKS}}.

Bug description: {{TASK}}

Approach:
1. Analyze the symptoms and identify likely root causes
2. Trace the execution path that leads to the bug
3. Propose a minimal fix with explanation
4. Suggest how to prevent similar bugs (tests, types, assertions)

Show the exact code changes needed.`
      },
      architecture: {
        label: "Architecture & Design",
        template: `You are a system architect designing a {{PLATFORM}} solution.
Technology stack: {{LANGUAGES}}, {{FRAMEWORKS}}, {{RUNTIME}} runtime.

Design request: {{TASK}}

Provide:
1. High-level architecture with component responsibilities
2. Data flow between components
3. Key interfaces and contracts
4. Trade-offs considered and decisions made
5. Scalability and extensibility notes

Use clear diagrams (ASCII/Mermaid) where helpful.`
      },
      "code-review": {
        label: "Code Review",
        template: `You are a principal engineer reviewing {{LANGUAGES}} code in a {{FRAMEWORKS}} project.
Focus areas: correctness, performance, security, readability, maintainability.

Code to review:
{{TASK}}

For each issue found, provide:
- Severity: critical / warning / suggestion / nitpick
- Location and description
- Recommended fix with code example
- Rationale (why it matters)

End with an overall assessment and top 3 priorities.`
      },
      docs: {
        label: "Documentation",
        template: `You are a technical writer documenting a {{ROLE}} project built with {{LANGUAGES}} and {{FRAMEWORKS}}.

Documentation request: {{TASK}}

Write clear, developer-friendly documentation that includes:
- Purpose and quick-start overview
- API reference with parameters, return types, and examples
- Common use cases and patterns
- Error handling and troubleshooting
- Configuration options

Target audience: intermediate {{ROLE}} developers.`
      },
      testing: {
        label: "Testing",
        template: `You are a QA engineer writing tests for a {{RUNTIME}} application using {{LANGUAGES}} and {{FRAMEWORKS}}.

Testing request: {{TASK}}

Write comprehensive tests that cover:
- Happy path / expected behavior
- Edge cases and boundary conditions
- Error scenarios and failure modes
- Integration points between components

Use the testing conventions standard for {{FRAMEWORKS}}.
Include descriptive test names that explain intent.`
      }
    };
    WEIGHTS = {
      capabilityFit: 3,
      contextMatch: 2,
      benchmarkScores: 2,
      computeFootprint: 1.5,
      ecosystemRichness: 1,
      fineTuningSupport: 0.5
    };
    MEMORY_TIERS = {
      "8GB": 8,
      "16GB": 16,
      "32GB": 32,
      "64GB": 64,
      unlimited: Infinity
    };
    CONTEXT_THRESHOLDS = {
      small: 8192,
      medium: 32768,
      large: 65536,
      huge: 128e3
    };
    ROLE_BOOSTS = {
      webdev: {
        strengths: ["codegen", "instruction-following", "multilingual"],
        description: "Boosted for web development (JS/TS focus, instruction-following)"
      },
      backend: {
        strengths: ["codegen", "reasoning", "multilingual", "architecture"],
        description: "Boosted for backend dev (multi-language, architecture reasoning)"
      },
      mobile: {
        strengths: ["on-device", "low-latency", "codegen"],
        description: "Boosted for mobile (small footprint, on-device capable)"
      },
      games: {
        strengths: ["reasoning", "codegen", "math"],
        description: "Boosted for game dev (performance reasoning, math, C++ patterns)"
      }
    };
    USE_CASE_BOOSTS = {
      codegen: { benchmarkField: "humaneval", strengthMatch: ["codegen", "fill-in-middle"] },
      debug: { benchmarkField: "swebench", strengthMatch: ["reasoning", "instruction-following"] },
      architecture: { benchmarkField: null, strengthMatch: ["architecture", "reasoning"] },
      "code-review": { benchmarkField: "aiderPolyglot", strengthMatch: ["reasoning", "instruction-following"] },
      docs: { benchmarkField: null, strengthMatch: ["instruction-following", "multilingual"] },
      testing: { benchmarkField: "humaneval", strengthMatch: ["instruction-following", "codegen"] }
    };
  }
});

// src/api/huggingface.js
async function fetchHuggingFaceLeaderboard(limit = 20) {
  if (cache.data) {
    return cache.data.slice(0, limit);
  }
  try {
    const url = new URL(HF_MODELS_API);
    url.searchParams.set("sort", "likes");
    url.searchParams.set("direction", "-1");
    url.searchParams.set("limit", String(Math.max(limit, 50)));
    url.searchParams.set("filter", "text-generation");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let response;
    try {
      response = await fetch(url.toString(), {
        signal: controller.signal,
        headers: { "Accept": "application/json" }
      });
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) {
      throw new Error(`HuggingFace API returned ${response.status}: ${response.statusText}`);
    }
    const raw = await response.json();
    if (!Array.isArray(raw)) {
      throw new Error("Unexpected response shape \u2014 expected an array of models");
    }
    const results = raw.map(normalizeModel).filter(Boolean);
    cache.data = results;
    cache.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
    return results.slice(0, limit);
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("[huggingface] Request timed out after", TIMEOUT_MS, "ms");
    } else {
      console.error("[huggingface] Fetch failed:", err.message);
    }
    return null;
  }
}
function normalizeModel(raw) {
  if (!raw || !raw.modelId && !raw.id) return null;
  return {
    modelId: raw.modelId || raw.id,
    averageScore: null,
    // Not available from /api/models
    scores: {
      arc: null,
      hellaswag: null,
      mmlu: null,
      truthfulqa: null,
      winogrande: null,
      gsm8k: null
    },
    likes: raw.likes ?? 0,
    downloads: raw.downloads ?? 0
  };
}
var cache, HF_MODELS_API, TIMEOUT_MS;
var init_huggingface = __esm({
  "src/api/huggingface.js"() {
    cache = { data: null, fetchedAt: null };
    HF_MODELS_API = "https://huggingface.co/api/models";
    TIMEOUT_MS = 1e4;
  }
});

// src/api/swebench.js
async function fetchSWEBenchLeaderboard(limit = 20) {
  if (cache2.data) {
    return cache2.data.slice(0, limit);
  }
  const liveData = await fetchLive();
  if (liveData && liveData.length > 0) {
    cache2.data = liveData;
    cache2.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
    return liveData.slice(0, limit);
  }
  const sorted = [...FALLBACK_RESULTS].sort((a, b) => b.resolvedRate - a.resolvedRate);
  cache2.data = sorted;
  cache2.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
  return sorted.slice(0, limit);
}
async function fetchLive() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS2);
    let response;
    try {
      response = await fetch(RESULTS_URL, {
        signal: controller.signal,
        headers: { "Accept": "application/json" }
      });
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) {
      throw new Error(`SWE-bench API returned ${response.status}`);
    }
    const raw = await response.json();
    return normalizeResults(raw);
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("[swebench] Request timed out after", TIMEOUT_MS2, "ms");
    } else {
      console.error("[swebench] Live fetch failed:", err.message, "\u2014 using fallback data");
    }
    return null;
  }
}
function normalizeResults(raw) {
  try {
    if (Array.isArray(raw)) {
      return raw.map((entry) => ({
        model: entry.model || entry.name || entry.model_name || "Unknown",
        resolvedRate: parseFloat(entry.resolved_rate ?? entry.resolve_rate ?? entry.resolved ?? 0),
        totalInstances: parseInt(entry.total_instances ?? entry.total ?? 500, 10),
        agent: entry.agent || entry.framework || "Unknown",
        dateSubmitted: entry.date || entry.date_submitted || null
      })).sort((a, b) => b.resolvedRate - a.resolvedRate);
    }
    if (typeof raw === "object" && raw !== null) {
      return Object.entries(raw).map(([key, value]) => ({
        model: value.model || key,
        resolvedRate: parseFloat(value.resolved_rate ?? value.resolve_rate ?? value.resolved ?? 0),
        totalInstances: parseInt(value.total_instances ?? value.total ?? 500, 10),
        agent: value.agent || value.framework || "Unknown",
        dateSubmitted: value.date || value.date_submitted || null
      })).sort((a, b) => b.resolvedRate - a.resolvedRate);
    }
    return null;
  } catch {
    return null;
  }
}
var TIMEOUT_MS2, RESULTS_URL, cache2, FALLBACK_RESULTS;
var init_swebench = __esm({
  "src/api/swebench.js"() {
    TIMEOUT_MS2 = 1e4;
    RESULTS_URL = "https://raw.githubusercontent.com/swe-bench/experiments/main/evaluation/verified/results/results.json";
    cache2 = { data: null, fetchedAt: null };
    FALLBACK_RESULTS = [
      { model: "Claude 3.5 Sonnet (2025-04-14)", resolvedRate: 62.3, totalInstances: 500, agent: "OpenHands CodeAct v2.1", dateSubmitted: "2025-04-18" },
      { model: "Claude 3.5 Sonnet (2024-10-22)", resolvedRate: 53, totalInstances: 500, agent: "OpenHands CodeAct v2.1", dateSubmitted: "2024-11-01" },
      { model: "GPT-4o (2024-08-06)", resolvedRate: 38.4, totalInstances: 500, agent: "Agentless", dateSubmitted: "2024-09-15" },
      { model: "DeepSeek-V3", resolvedRate: 42, totalInstances: 500, agent: "Agentless", dateSubmitted: "2025-01-10" },
      { model: "GPT-4o (2024-05-13)", resolvedRate: 33.2, totalInstances: 500, agent: "SWE-agent", dateSubmitted: "2024-06-01" },
      { model: "Claude 3 Opus", resolvedRate: 29, totalInstances: 500, agent: "SWE-agent", dateSubmitted: "2024-04-10" },
      { model: "Llama 3.1 405B", resolvedRate: 23, totalInstances: 500, agent: "SWE-agent", dateSubmitted: "2024-08-01" },
      { model: "Gemini 2.0 Flash", resolvedRate: 36.2, totalInstances: 500, agent: "Agentless", dateSubmitted: "2025-02-15" },
      { model: "Qwen2.5-72B-Instruct", resolvedRate: 27, totalInstances: 500, agent: "SWE-agent", dateSubmitted: "2024-12-01" },
      { model: "Mistral Large 2", resolvedRate: 22.4, totalInstances: 500, agent: "SWE-agent", dateSubmitted: "2024-09-20" },
      { model: "GPT-o1-preview", resolvedRate: 41.2, totalInstances: 500, agent: "Agentless", dateSubmitted: "2024-10-01" },
      { model: "GPT-o3-mini", resolvedRate: 48.6, totalInstances: 500, agent: "OpenHands CodeAct v2.1", dateSubmitted: "2025-03-01" },
      { model: "Gemini 2.5 Pro", resolvedRate: 63.8, totalInstances: 500, agent: "OpenHands CodeAct v2.1", dateSubmitted: "2025-04-01" },
      { model: "Claude 3.7 Sonnet", resolvedRate: 57, totalInstances: 500, agent: "OpenHands CodeAct v2.1", dateSubmitted: "2025-03-15" }
    ];
  }
});

// src/api/aider.js
async function fetchAiderLeaderboard(limit = 20) {
  if (cache3.data) {
    return cache3.data.slice(0, limit);
  }
  const liveData = await fetchLive2();
  if (liveData && liveData.length > 0) {
    cache3.data = liveData;
    cache3.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
    return liveData.slice(0, limit);
  }
  const sorted = [...FALLBACK_RESULTS2].sort((a, b) => b.passRate - a.passRate);
  cache3.data = sorted;
  cache3.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
  return sorted.slice(0, limit);
}
async function fetchLive2() {
  for (const url of AIDER_DATA_URLS) {
    try {
      const result = await fetchAndParseYaml(url);
      if (result && result.length > 0) return result;
    } catch {
    }
  }
  return null;
}
async function fetchAndParseYaml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS3);
  let response;
  try {
    response = await fetch(url, {
      signal: controller.signal,
      headers: { "Accept": "text/plain" }
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) {
    throw new Error(`Aider data returned ${response.status}`);
  }
  const text = await response.text();
  return parseSimpleYaml(text);
}
function parseSimpleYaml(text) {
  const entries = [];
  let current = null;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.match(/^-\s+\w/)) {
      if (current) entries.push(current);
      current = {};
      const kv = parseYamlKV(line.replace(/^-\s*/, ""));
      if (kv) current[kv.key] = kv.value;
    } else if (current && line.match(/^\s+\w/)) {
      const kv = parseYamlKV(line.trim());
      if (kv) current[kv.key] = kv.value;
    }
  }
  if (current) entries.push(current);
  if (entries.length === 0) return null;
  return entries.map((entry) => {
    const model = entry.model || entry.name || null;
    if (!model) return null;
    const passRate = parseFloat(
      entry.pass_rate_2 ?? entry.pass_rate ?? entry.percent_correct ?? entry.score ?? 0
    );
    return {
      model,
      passRate,
      editFormat: entry.edit_format || entry.editFormat || "unknown",
      percentCorrect: passRate
    };
  }).filter(Boolean).sort((a, b) => b.passRate - a.passRate);
}
function parseYamlKV(line) {
  const match = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)/);
  if (!match) return null;
  let value = match[2].trim();
  if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
    value = value.slice(1, -1);
  }
  const num = Number(value);
  if (!isNaN(num) && value !== "") {
    value = num;
  }
  return { key: match[1], value };
}
var TIMEOUT_MS3, AIDER_DATA_URLS, cache3, FALLBACK_RESULTS2;
var init_aider = __esm({
  "src/api/aider.js"() {
    TIMEOUT_MS3 = 1e4;
    AIDER_DATA_URLS = [
      "https://raw.githubusercontent.com/Aider-AI/aider/main/aider/website/_data/polyglot_leaderboard.yml",
      "https://raw.githubusercontent.com/Aider-AI/aider/main/aider/website/_data/leaderboard.yml",
      "https://raw.githubusercontent.com/Aider-AI/aider/main/aider/website/_data/edit_leaderboard.yml"
    ];
    cache3 = { data: null, fetchedAt: null };
    FALLBACK_RESULTS2 = [
      { model: "claude-3.5-sonnet-20241022", passRate: 73.7, editFormat: "diff", percentCorrect: 73.7 },
      { model: "claude-3.7-sonnet-20250219", passRate: 72.1, editFormat: "diff", percentCorrect: 72.1 },
      { model: "o3-mini", passRate: 65.9, editFormat: "diff", percentCorrect: 65.9 },
      { model: "gemini-2.5-pro-exp-03-25", passRate: 72.9, editFormat: "diff-fenced", percentCorrect: 72.9 },
      { model: "gpt-4o-2024-08-06", passRate: 56.4, editFormat: "diff", percentCorrect: 56.4 },
      { model: "deepseek-chat-v3-0324", passRate: 60.2, editFormat: "diff", percentCorrect: 60.2 },
      { model: "claude-3-opus-20240229", passRate: 52.5, editFormat: "diff", percentCorrect: 52.5 },
      { model: "gpt-4-turbo-2024-04-09", passRate: 50, editFormat: "diff", percentCorrect: 50 },
      { model: "gemini-2.0-flash", passRate: 50.8, editFormat: "diff-fenced", percentCorrect: 50.8 },
      { model: "llama-3.1-405b-instruct", passRate: 36.1, editFormat: "diff", percentCorrect: 36.1 },
      { model: "mistral-large-2407", passRate: 34.4, editFormat: "diff", percentCorrect: 34.4 },
      { model: "qwen2.5-72b-instruct", passRate: 34.1, editFormat: "diff", percentCorrect: 34.1 },
      { model: "deepseek-r1", passRate: 56.9, editFormat: "diff", percentCorrect: 56.9 },
      { model: "o1-preview", passRate: 53.8, editFormat: "whole", percentCorrect: 53.8 },
      { model: "gpt-4o-mini-2024-07-18", passRate: 38.2, editFormat: "whole", percentCorrect: 38.2 }
    ];
  }
});

// src/api/index.js
async function fetchAllLeaderboards() {
  const errors = [];
  const [hfResult, sweResult, aiderResult] = await Promise.allSettled([
    fetchHuggingFaceLeaderboard(),
    fetchSWEBenchLeaderboard(),
    fetchAiderLeaderboard()
  ]);
  const extract = (result, label) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    errors.push(`${label}: ${result.reason?.message || "Unknown error"}`);
    return null;
  };
  return {
    huggingface: extract(hfResult, "HuggingFace"),
    swebench: extract(sweResult, "SWE-bench"),
    aider: extract(aiderResult, "Aider"),
    fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
    errors
  };
}
function enrichModelWithLeaderboardData(model, leaderboards) {
  if (!model || !leaderboards) return model;
  const modelName = model.name || model.id || model.modelId || "";
  const enriched = { ...model, leaderboard: {} };
  if (leaderboards.huggingface) {
    const match = findBestMatch(modelName, leaderboards.huggingface, (entry) => entry.modelId);
    if (match) {
      enriched.leaderboard.huggingface = {
        modelId: match.modelId,
        likes: match.likes,
        downloads: match.downloads,
        averageScore: match.averageScore,
        scores: match.scores
      };
    }
  }
  if (leaderboards.swebench) {
    const match = findBestMatch(modelName, leaderboards.swebench, (entry) => entry.model);
    if (match) {
      enriched.leaderboard.swebench = {
        model: match.model,
        resolvedRate: match.resolvedRate,
        totalInstances: match.totalInstances,
        agent: match.agent
      };
    }
  }
  if (leaderboards.aider) {
    const match = findBestMatch(modelName, leaderboards.aider, (entry) => entry.model);
    if (match) {
      enriched.leaderboard.aider = {
        model: match.model,
        passRate: match.passRate,
        editFormat: match.editFormat
      };
    }
  }
  return enriched;
}
function findBestMatch(query, entries, getKey) {
  if (!query || !entries || entries.length === 0) return null;
  const normQuery = normalize(query);
  const queryTokens = tokenize(normQuery);
  let bestMatch = null;
  let bestScore = 0;
  for (const entry of entries) {
    const key = getKey(entry);
    if (!key) continue;
    const normKey = normalize(key);
    if (normQuery === normKey) return entry;
    if (normQuery.includes(normKey) || normKey.includes(normQuery)) {
      const score2 = 0.9;
      if (score2 > bestScore) {
        bestScore = score2;
        bestMatch = entry;
      }
      continue;
    }
    const keyTokens = tokenize(normKey);
    const intersection = queryTokens.filter((t) => keyTokens.includes(t));
    const union = /* @__PURE__ */ new Set([...queryTokens, ...keyTokens]);
    if (union.size === 0) continue;
    const score = intersection.length / union.size;
    if (score > bestScore && score >= 0.3) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  return bestMatch;
}
function normalize(name) {
  return name.toLowerCase().replace(/^[a-z0-9_-]+\//, "").replace(/[-_.]+/g, "-").replace(/-instruct$/, "").replace(/-chat$/, "").replace(/-hf$/, "").trim();
}
function tokenize(name) {
  return name.split(/[-_./\s]+/).filter((t) => t.length > 0);
}
var init_api = __esm({
  "src/api/index.js"() {
    init_huggingface();
    init_swebench();
    init_aider();
    init_huggingface();
    init_swebench();
    init_aider();
  }
});

// src/app.js
var app_exports = {};
__export(app_exports, {
  default: () => App
});
import React5, { useState as useState3, useEffect, useCallback as useCallback2 } from "react";
import { Box as Box5, Text as Text5, Newline as Newline2 } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function PatioHeader2({ compact = false }) {
  if (compact) {
    return /* @__PURE__ */ jsxs4(Box5, { marginBottom: 1, gap: 1, children: [
      /* @__PURE__ */ jsx4(Text5, { bold: true, color: THEME.colors.accent, children: "PATIO" }),
      /* @__PURE__ */ jsx4(Text5, { dimColor: true, children: "|" }),
      /* @__PURE__ */ jsx4(Text5, { color: THEME.colors.textSecondary, children: THEME.brand.tagline })
    ] });
  }
  return /* @__PURE__ */ jsx4(Box5, { flexDirection: "column", marginBottom: 1, children: /* @__PURE__ */ jsxs4(Box5, { gap: 1, children: [
    /* @__PURE__ */ jsx4(Text5, { bold: true, color: THEME.colors.accent, children: "PATIO" }),
    /* @__PURE__ */ jsxs4(Text5, { color: THEME.colors.textSecondary, children: [
      "\u2014 ",
      THEME.brand.tagline
    ] })
  ] }) });
}
function App() {
  const [stage, setStage] = useState3("welcome");
  const [answers, setAnswers] = useState3(null);
  const [recommendation, setRecommendation] = useState3(null);
  const [leaderboards, setLeaderboards] = useState3(null);
  const [sourceStatus, setSourceStatus] = useState3({
    huggingface: "pending",
    swebench: "pending",
    aider: "pending"
  });
  useEffect(() => {
    if (stage !== "welcome") return;
    const timer = setTimeout(() => setStage("wizard"), 1500);
    return () => clearTimeout(timer);
  }, [stage]);
  const onWizardComplete = useCallback2((wizardAnswers) => {
    setAnswers(wizardAnswers);
    setStage("loading");
  }, []);
  useEffect(() => {
    if (stage !== "loading" || !answers) return;
    let cancelled = false;
    async function run() {
      let leaderboardData = null;
      try {
        leaderboardData = await fetchAllLeaderboards({
          onSourceComplete: (source, status) => {
            if (!cancelled) {
              setSourceStatus((prev) => ({ ...prev, [source]: status }));
            }
          }
        });
      } catch {
      }
      if (cancelled) return;
      setLeaderboards(leaderboardData);
      let result;
      try {
        result = recommend(answers);
        if (leaderboardData && result) {
          result = enrichModelWithLeaderboardData(result, leaderboardData);
        }
      } catch (err) {
        result = {
          primary: {
            model: "Error",
            reason: `Engine error: ${err.message}`,
            config: {},
            deploymentOption: "\u2014",
            promptTemplate: null,
            score: 0,
            scoreBreakdown: {}
          },
          fallback: null,
          onDevice: null,
          costEstimate: null,
          latencyEstimate: null,
          ragRecommended: false,
          ragReason: null,
          warnings: [`Recommendation engine encountered an error: ${err.message}`]
        };
      }
      if (!cancelled) {
        setRecommendation(result);
        setStage("results");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [stage, answers]);
  if (stage === "welcome") {
    return /* @__PURE__ */ jsxs4(Box5, { flexDirection: "column", alignItems: "center", paddingY: 1, children: [
      /* @__PURE__ */ jsx4(Box5, { marginBottom: 1, children: /* @__PURE__ */ jsx4(Text5, { color: THEME.colors.accent, dimColor: true, children: THEME.logo }) }),
      /* @__PURE__ */ jsx4(Gradient, { name: "mind", children: /* @__PURE__ */ jsx4(BigText, { text: "PATIO", font: "chrome" }) }),
      /* @__PURE__ */ jsx4(Text5, { bold: true, color: THEME.colors.accent, children: THEME.brand.tagline }),
      /* @__PURE__ */ jsx4(Newline2, {}),
      /* @__PURE__ */ jsx4(Text5, { color: THEME.colors.textSecondary, children: THEME.brand.subtitle }),
      /* @__PURE__ */ jsx4(Box5, { marginTop: 1, children: /* @__PURE__ */ jsx4(Text5, { dimColor: true, children: "Starting wizard..." }) })
    ] });
  }
  if (stage === "wizard") {
    return /* @__PURE__ */ jsxs4(Box5, { flexDirection: "column", paddingX: 1, children: [
      /* @__PURE__ */ jsx4(PatioHeader2, {}),
      /* @__PURE__ */ jsx4(wizard_default, { onComplete: onWizardComplete })
    ] });
  }
  if (stage === "loading") {
    return /* @__PURE__ */ jsxs4(Box5, { flexDirection: "column", paddingX: 1, paddingY: 1, children: [
      /* @__PURE__ */ jsx4(PatioHeader2, {}),
      /* @__PURE__ */ jsx4(Loading, { sourceStatus })
    ] });
  }
  if (stage === "results") {
    return /* @__PURE__ */ jsx4(Box5, { flexDirection: "column", children: /* @__PURE__ */ jsx4(Results, { recommendation, leaderboards }) });
  }
  return null;
}
var init_app = __esm({
  "src/app.js"() {
    init_wizard();
    init_results();
    init_loading();
    init_rules();
    init_api();
    init_theme();
  }
});

// src/cli.js
import { render } from "ink";
import React6 from "react";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
var __dirname = dirname(fileURLToPath(import.meta.url));
function printHelp() {
  console.log(`
  AI Model Advisor \u2014 find the right open LLM for your stack

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
    const pkg = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));
    console.log(pkg.version);
  } catch {
    console.log("0.1.0");
  }
}
var args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}
if (args.includes("--version") || args.includes("-v")) {
  printVersion();
  process.exit(0);
}
var App2 = (await Promise.resolve().then(() => (init_app(), app_exports))).default;
var { waitUntilExit } = render(React6.createElement(App2));
await waitUntilExit();
