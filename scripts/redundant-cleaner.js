#!/usr/bin/env node

/**
 * Redundant Data & Orphan File Auditor Script for 3D Portfolio
 * Usage: node scripts/redundant-cleaner.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SEARCH_DIRS = ['app', 'components', 'lib'];

console.log('\x1b[35m%s\x1b[0m', '🧹 Starting Redundant Data & Orphan File Audit...\n');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.css')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const allProjectFiles = [];
SEARCH_DIRS.forEach((dir) => {
  const fullPath = path.join(ROOT_DIR, dir);
  if (fs.existsSync(fullPath)) {
    getAllFiles(fullPath, allProjectFiles);
  }
});

// Read contents of all files
const fileContents = allProjectFiles.map((file) => ({
  file,
  content: fs.readFileSync(file, 'utf8')
}));

let redundantCount = 0;

// 1. Audit Unused / Orphan Components
console.log('\x1b[33m%s\x1b[0m', '--- 1. Orphan Component Check ---');
allProjectFiles.forEach((file) => {
  const basename = path.basename(file, path.extname(file));
  
  // Skip entrypoints & core wrappers
  if (['page', 'layout', 'ClientWrapper', 'nodes', 'globals', 'SceneStateProvider'].includes(basename)) {
    return;
  }

  // Count how many other files import or reference this component
  const references = fileContents.filter((item) => {
    if (item.file === file) return false;
    return (
      item.content.includes(`/${basename}`) ||
      item.content.includes(`'./${basename}'`) ||
      item.content.includes(`"${basename}"`) ||
      item.content.includes(`<${basename}`)
    );
  });

  if (references.length === 0) {
    console.log(`\x1b[31m[ORPHAN]\x1b[0m ${path.relative(ROOT_DIR, file)} is not imported or used anywhere.`);
    redundantCount++;
  }
});

// 2. Audit Duplicate Node IDs in lib/nodes.ts
console.log('\n\x1b[33m%s\x1b[0m', '--- 2. Node Data Duplication Check ---');
const nodesFile = path.join(ROOT_DIR, 'lib', 'nodes.ts');
if (fs.existsSync(nodesFile)) {
  const content = fs.readFileSync(nodesFile, 'utf8');
  const idMatches = content.match(/id:\s*["']([^"']+)["']/g) || [];
  const ids = idMatches.map((m) => m.replace(/id:\s*["']([^"']+)["']/, '$1'));

  const seen = new Set();
  const duplicates = new Set();
  ids.forEach((id) => {
    if (seen.has(id)) duplicates.add(id);
    else seen.add(id);
  });

  if (duplicates.size > 0) {
    console.log(`\x1b[31m[DUPLICATE DATA]\x1b[0m Duplicate node IDs found in lib/nodes.ts: ${Array.from(duplicates).join(', ')}`);
    redundantCount++;
  } else {
    console.log('\x1b[32m✓ No duplicate node IDs found in lib/nodes.ts.\x1b[0m');
  }
}

console.log('\n----------------------------------------');
if (redundantCount === 0) {
  console.log('\x1b[32m%s\x1b[0m', '🎉 No redundant files or duplicate data found! Codebase is lean.');
} else {
  console.log(`\x1b[35mAudit Summary:\x1b[0m ${redundantCount} redundant items identified.`);
}
