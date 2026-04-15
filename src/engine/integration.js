/**
 * Integration snippet generator — produces framework-specific code
 * showing how to call a recommended model via the OpenAI-compatible API
 * that both Ollama and vLLM expose.
 */

// ── Base URL resolution ─────────────────────────────────────────────

function resolveBaseUrl(model) {
  const eco = (model.ecosystem || []).map((s) => s.toLowerCase());
  return eco.includes("ollama")
    ? "http://localhost:11434/v1"
    : "http://localhost:8000/v1";
}

// ── Framework matching ──────────────────────────────────────────────

const FRAMEWORK_MAP = [
  { pattern: /^express$/i, key: "express" },
  { pattern: /^fastify$/i, key: "fastify" },
  { pattern: /^next\.?js$/i, key: "nextjs" },
  { pattern: /^remix$/i, key: "nextjs" },
  { pattern: /^fastapi$/i, key: "fastapi" },
  { pattern: /^starlette$/i, key: "fastapi" },
  { pattern: /^flask$/i, key: "flask" },
  { pattern: /^django$/i, key: "django" },
  { pattern: /^(gin|echo|fiber|chi)$/i, key: "gin" },
  { pattern: /^(axum|actix\s*web|rocket)$/i, key: "axum" },
];

function matchFramework(frameworks) {
  for (const fw of frameworks) {
    for (const entry of FRAMEWORK_MAP) {
      if (entry.pattern.test(fw)) return entry.key;
    }
  }
  return null;
}

// ── Template registry ───────────────────────────────────────────────
// Each template function receives (modelName, baseUrl) and returns
// { snippet, dependencies, note }.

const TEMPLATES = {
  // ── Node.js ───────────────────────────────────────────────────────

  "node-express": (modelName, baseUrl) => ({
    framework: "Express",
    snippet: `// Integration with ${modelName} via Express
const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("${baseUrl}/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "${modelName}",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: req.body.message },
        ],
      }),
    });
    if (!response.ok) throw new Error(\`Model returned \${response.status}\`);
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Model request failed" });
  }
});

app.listen(3000, () => console.log("Listening on :3000"));`,
    dependencies: ["express"],
    note: "Requires Node 18+ for native fetch support.",
  }),

  "node-fastify": (modelName, baseUrl) => ({
    framework: "Fastify",
    snippet: `// Integration with ${modelName} via Fastify
const fastify = require("fastify")({ logger: true });

fastify.post("/api/chat", async (request, reply) => {
  try {
    const response = await fetch("${baseUrl}/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "${modelName}",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: request.body.message },
        ],
      }),
    });
    if (!response.ok) throw new Error(\`Model returned \${response.status}\`);
    const data = await response.json();
    return { reply: data.choices[0].message.content };
  } catch (err) {
    request.log.error(err);
    reply.code(502).send({ error: "Model request failed" });
  }
});

fastify.listen({ port: 3000 });`,
    dependencies: ["fastify"],
    note: "Requires Node 18+ for native fetch support.",
  }),

  "node-nextjs": (modelName, baseUrl) => ({
    framework: "Next.js",
    snippet: `// Integration with ${modelName} — app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const response = await fetch("${baseUrl}/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "${modelName}",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });
    if (!response.ok) throw new Error(\`Model returned \${response.status}\`);
    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Model request failed" }, { status: 502 });
  }
}`,
    dependencies: ["next"],
    note: "Place in app/api/chat/route.ts for the App Router.",
  }),

  "node-standalone": (modelName, baseUrl) => ({
    framework: null,
    snippet: `// Standalone Node.js script using ${modelName}
async function chat(userMessage) {
  const response = await fetch("${baseUrl}/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "${modelName}",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
    }),
  });
  if (!response.ok) throw new Error(\`Model returned \${response.status}\`);
  const data = await response.json();
  return data.choices[0].message.content;
}

chat("Hello, how are you?")
  .then((reply) => console.log("Reply:", reply))
  .catch((err) => console.error("Error:", err));`,
    dependencies: [],
    note: "Requires Node 18+ for native fetch support.",
  }),

  // ── Python ────────────────────────────────────────────────────────

  "python-fastapi": (modelName, baseUrl) => ({
    framework: "FastAPI",
    snippet: `# Integration with ${modelName} via FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()
client = OpenAI(base_url="${baseUrl}", api_key="not-needed")

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(req: ChatRequest):
    try:
        completion = client.chat.completions.create(
            model="${modelName}",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": req.message},
            ],
        )
        return {"reply": completion.choices[0].message.content}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))`,
    dependencies: ["fastapi", "uvicorn", "openai"],
    note: 'Run with: uvicorn main:app --reload',
  }),

  "python-flask": (modelName, baseUrl) => ({
    framework: "Flask",
    snippet: `# Integration with ${modelName} via Flask
from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
client = OpenAI(base_url="${baseUrl}", api_key="not-needed")

@app.post("/api/chat")
def chat():
    try:
        body = request.get_json()
        completion = client.chat.completions.create(
            model="${modelName}",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": body["message"]},
            ],
        )
        return jsonify(reply=completion.choices[0].message.content)
    except Exception as exc:
        return jsonify(error=str(exc)), 502

if __name__ == "__main__":
    app.run(port=3000)`,
    dependencies: ["flask", "openai"],
    note: "Run with: python app.py",
  }),

  "python-standalone": (modelName, baseUrl) => ({
    framework: null,
    snippet: `# Standalone script using ${modelName}
from openai import OpenAI

client = OpenAI(base_url="${baseUrl}", api_key="not-needed")

def chat(user_message: str) -> str:
    try:
        completion = client.chat.completions.create(
            model="${modelName}",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ],
        )
        return completion.choices[0].message.content
    except Exception as exc:
        print(f"Error: {exc}")
        raise

if __name__ == "__main__":
    reply = chat("Hello, how are you?")
    print("Reply:", reply)`,
    dependencies: ["openai"],
    note: "Install with: pip install openai",
  }),

  // ── Go ────────────────────────────────────────────────────────────

  "go-gin": (modelName, baseUrl) => ({
    framework: "Gin",
    snippet: `// Integration with ${modelName} via Gin
package main

import (
\t"bytes"
\t"encoding/json"
\t"io"
\t"net/http"
\t"github.com/gin-gonic/gin"
)

func main() {
\tr := gin.Default()
\tr.POST("/api/chat", func(c *gin.Context) {
\t\tvar req struct{ Message string \`json:"message"\` }
\t\tif err := c.BindJSON(&req); err != nil {
\t\t\tc.JSON(400, gin.H{"error": "invalid request"})
\t\t\treturn
\t\t}
\t\tpayload, _ := json.Marshal(map[string]any{
\t\t\t"model": "${modelName}",
\t\t\t"messages": []map[string]string{
\t\t\t\t{"role": "system", "content": "You are a helpful assistant."},
\t\t\t\t{"role": "user", "content": req.Message},
\t\t\t},
\t\t})
\t\tresp, err := http.Post("${baseUrl}/chat/completions", "application/json", bytes.NewReader(payload))
\t\tif err != nil {
\t\t\tc.JSON(502, gin.H{"error": err.Error()})
\t\t\treturn
\t\t}
\t\tdefer resp.Body.Close()
\t\tbody, _ := io.ReadAll(resp.Body)
\t\tvar result struct{ Choices []struct{ Message struct{ Content string } } }
\t\tjson.Unmarshal(body, &result)
\t\tc.JSON(200, gin.H{"reply": result.Choices[0].Message.Content})
\t})
\tr.Run(":3000")
}`,
    dependencies: ["github.com/gin-gonic/gin"],
    note: "Run with: go run main.go",
  }),

  "go-standalone": (modelName, baseUrl) => ({
    framework: null,
    snippet: `// Standalone Go script using ${modelName}
package main

import (
\t"bytes"
\t"encoding/json"
\t"fmt"
\t"io"
\t"log"
\t"net/http"
)

func main() {
\tpayload, _ := json.Marshal(map[string]any{
\t\t"model": "${modelName}",
\t\t"messages": []map[string]string{
\t\t\t{"role": "system", "content": "You are a helpful assistant."},
\t\t\t{"role": "user", "content": "Hello, how are you?"},
\t\t},
\t})
\tresp, err := http.Post("${baseUrl}/chat/completions", "application/json", bytes.NewReader(payload))
\tif err != nil {
\t\tlog.Fatal(err)
\t}
\tdefer resp.Body.Close()
\tbody, _ := io.ReadAll(resp.Body)
\tvar result struct{ Choices []struct{ Message struct{ Content string } } }
\tif err := json.Unmarshal(body, &result); err != nil {
\t\tlog.Fatal(err)
\t}
\tfmt.Println("Reply:", result.Choices[0].Message.Content)
}`,
    dependencies: [],
    note: "Run with: go run main.go",
  }),

  // ── Rust ──────────────────────────────────────────────────────────

  "rust-axum": (modelName, baseUrl) => ({
    framework: "Axum",
    snippet: `// Integration with ${modelName} via Axum
use axum::{extract::Json, routing::post, Router};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Deserialize)]
struct ChatRequest { message: String }

#[derive(Serialize)]
struct ChatResponse { reply: String }

async fn chat(Json(req): Json<ChatRequest>) -> Result<Json<ChatResponse>, (axum::http::StatusCode, String)> {
    let client = reqwest::Client::new();
    let resp = client
        .post("${baseUrl}/chat/completions")
        .json(&json!({
            "model": "${modelName}",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": req.message}
            ]
        }))
        .send().await
        .map_err(|e| (axum::http::StatusCode::BAD_GATEWAY, e.to_string()))?;
    let data: serde_json::Value = resp.json().await
        .map_err(|e| (axum::http::StatusCode::BAD_GATEWAY, e.to_string()))?;
    let reply = data["choices"][0]["message"]["content"]
        .as_str().unwrap_or("").to_string();
    Ok(Json(ChatResponse { reply }))
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/api/chat", post(chat));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}`,
    dependencies: ["axum", "reqwest", "serde", "serde_json", "tokio"],
    note: "Add dependencies to Cargo.toml with appropriate features.",
  }),
};

// ── Dispatch logic ──────────────────────────────────────────────────

const RUNTIME_FRAMEWORK_KEY = {
  node: { express: "node-express", fastify: "node-fastify", nextjs: "node-nextjs" },
  python: { fastapi: "python-fastapi", flask: "python-flask", django: "python-standalone" },
  go: { gin: "go-gin" },
  rust: { axum: "rust-axum" },
};

const RUNTIME_STANDALONE = {
  node: "node-standalone",
  python: "python-standalone",
  go: "go-standalone",
  rust: "rust-axum",
};

// ── Public API ──────────────────────────────────────────────────────

function generateIntegrationSnippet(model, inputs) {
  if (!model || !inputs || !inputs.runtime) return null;

  const runtime = inputs.runtime.toLowerCase();
  const frameworks = inputs.frameworks || [];
  const baseUrl = resolveBaseUrl(model);
  const modelName = model.name || model.id;

  // Find the template key: try framework match first, then standalone
  const fwMatch = matchFramework(frameworks);
  const runtimeMap = RUNTIME_FRAMEWORK_KEY[runtime] || {};
  let templateKey = (fwMatch && runtimeMap[fwMatch]) || RUNTIME_STANDALONE[runtime];

  if (!templateKey || !TEMPLATES[templateKey]) return null;

  const result = TEMPLATES[templateKey](modelName, baseUrl);

  return {
    runtime,
    framework: result.framework || null,
    snippet: result.snippet,
    dependencies: result.dependencies,
    note: result.note,
  };
}

export { generateIntegrationSnippet };
