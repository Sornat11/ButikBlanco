#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const IMAGES_DIR = path.join(HERE, 'images');
const OUT_FILE = path.join(IMAGES_DIR, 'images.json');

if (!fs.existsSync(IMAGES_DIR) || !fs.statSync(IMAGES_DIR).isDirectory()) {
  console.error('Brak folderu images/ w katalogu projektu.');
  process.exit(1);
}

const files = fs.readdirSync(IMAGES_DIR)
  .filter(name => {
    const lower = name.toLowerCase();
    if (name === 'images.json' || name === 'images_list.js') return false;
    return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp') || lower.endsWith('.gif');
  })
  .sort((a,b) => a.localeCompare(b, undefined, {numeric: true}));

const images = files.map(f => `images/${f}`);

fs.writeFileSync(OUT_FILE, JSON.stringify(images, null, 2), 'utf8');
console.log(`Zapisano ${images.length} wpisów do ${OUT_FILE}`);
