#!/usr/bin/env node

/**
 * Bug & Code Quality Auditor Script for 3D Orbital Portfolio
 * Usage: node scripts/bug-checker.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SEARCH_DIRS = ['app', 'components', 'lib'];

console.log('\x1b[36m%s\x1b[0m', '🔍 Starting 3D Portfolio Bug & Code Quality Audit...\n');

let totalErrors = 0;
let totalWarnings = 0;

function logIssue(severity, file, line, message) {
  const color = severity === 'ERROR' ? '\x1b[31m' : '\x1b[33m';
  console.log(`${color}[${severity}]\x1b[0m ${path.relative(ROOT_DIR, file)}${line ? `:${line}` : ''} - ${message}`);
  if (severity === 'ERROR') totalErrors++;
  else totalWarnings++;
}

// 1. Audit Data Integrity in lib/nodes.ts
function auditNodesData() {
  const nodesPath = path.join(ROOT_DIR, 'lib', 'nodes.ts');
  if (!fs.existsSync(nodesPath)) {
    logIssue('ERROR', nodesPath, 0, 'lib/nodes.ts data file is missing!');
    return;
  }

  const content = fs.readFileSync(nodesPath, 'utf8');

  // Verify orbital node structure rules
  const requiredFields = ['id', 'label', 'type', 'description', 'tech', 'orbitRadius', 'orbitSpeed', 'orbitOffset', 'inclination', 'geometry'];
  requiredFields.forEach((field) => {
    if (!content.includes(`${field}:`)) {
      logIssue('WARNING', nodesPath, 0, `Property '${field}' might be missing from some nodes in lib/nodes.ts.`);
    }
  });

  console.log('\x1b[32m%s\x1b[0m', '✓ Nodes data schema checked.');
}

// 2. Audit Client Directive & Hook Usage in Components
function auditHooksAndDirectives(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      auditHooksAndDirectives(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      const usesClientHooks = /use(State|Effect|Ref|Memo|Callback|Context|Reducer|SceneStore)\b/.test(content);
      const hasUseClient = content.includes('"use client"') || content.includes("'use client'");

      // Check missing "use client"
      if (usesClientHooks && !hasUseClient && !fullPath.includes(path.join('lib', 'nodes.ts'))) {
        logIssue('ERROR', fullPath, 1, 'Uses React/Zustand hooks but missing "use client" directive at top of file.');
      }

      // Check event listener cleanup
      lines.forEach((line, index) => {
        if (line.includes('addEventListener') && !content.includes('removeEventListener')) {
          logIssue('WARNING', fullPath, index + 1, 'Added event listener with addEventListener but missing removeEventListener cleanup.');
        }

        // Check for hardcoded external HTTP fonts that might break offline
        if (line.includes('font="http') || line.includes("font='http")) {
          logIssue('WARNING', fullPath, index + 1, 'Hardcoded external HTTP/HTTPS font URL in 3D Text component may cause network failure.');
        }

        // Check for CanvasTexture missing needsUpdate = true
        if (line.includes('new THREE.CanvasTexture') && !content.includes('needsUpdate')) {
          logIssue('WARNING', fullPath, index + 1, 'CanvasTexture instantiated without setting needsUpdate = true.');
        }
      });
    }
  }
}

// Run Checks
auditNodesData();
SEARCH_DIRS.forEach((dir) => {
  const fullDir = path.join(ROOT_DIR, dir);
  if (fs.existsSync(fullDir)) {
    auditHooksAndDirectives(fullDir);
  }
});

console.log('\n----------------------------------------');
if (totalErrors === 0 && totalWarnings === 0) {
  console.log('\x1b[32m%s\x1b[0m', '🎉 No bugs or code quality issues found! Workspace is clean.');
} else {
  console.log(`\x1b[36mAudit Complete:\x1b[0m ${totalErrors} Errors, ${totalWarnings} Warnings found.\n`);
}
