#!/usr/bin/env node
/**
 * Ollama delegation helper.
 * Claude uses this to send execution-level tasks to the local llama3.2:3b worker.
 *
 * Usage:
 *   node delegate.js "Write a JS debounce function"
 *   node delegate.js --model qwen2.5-coder "Generate a CSS grid layout for a dashboard"
 *
 * Output: raw text from Ollama, printed to stdout.
 * Claude reviews and improves the output before using it.
 */

const http = require('http');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node delegate.js [--model <name>] "<task>"');
  process.exit(1);
}

// qwen2.5-coder is purpose-built for code tasks — better output for boilerplate/snippets
let model = 'qwen2.5-coder:1.5b';
let task = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--model' && args[i + 1]) {
    model = args[++i];
  } else {
    task = args[i];
  }
}

if (!task) {
  console.error('Error: task description required');
  process.exit(1);
}

const body = JSON.stringify({
  model,
  messages: [{ role: 'user', content: task }],
  stream: false,
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 11434,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  },
  (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        const content = parsed?.message?.content || parsed?.response || '';
        if (!content) {
          console.error('Empty response from Ollama');
          process.exit(1);
        }
        process.stdout.write(content + '\n');
      } catch {
        console.error('Failed to parse Ollama response:', data);
        process.exit(1);
      }
    });
  }
);

req.on('error', (e) => {
  if (e.code === 'ECONNREFUSED') {
    console.error('Ollama is not running. Start it with: ollama serve');
  } else {
    console.error('Ollama error:', e.message);
  }
  process.exit(1);
});

req.write(body);
req.end();
