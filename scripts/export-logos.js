#!/usr/bin/env node
/**
 * Export the 4 SciLoop logo variants as SVG files.
 * Logic mirrors sciloop-logo.html so exports stay in sync.
 * Run from repo root: node scripts/export-logos.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Same constants as sciloop-logo.html
const R = 18;
const CY = 43;
const GAP = 0;
const GAP_P = 5;
const SCIL_END = 107;
const CUT_ANG = Math.PI / 4;
const CUT_ANG_MARK = Math.PI / 6;
const GAP_ANG = 0.24;
const GAP_ANG_MARK = 0.42;

function circleGapDash(r, gapAng, cutAng = CUT_ANG) {
  const c = 2 * Math.PI * r;
  const gapLen = r * gapAng;
  const offset = r * (cutAng + gapAng / 2 - 2 * Math.PI);
  return { array: `${c - gapLen} ${gapLen}`, offset };
}

function staticWordmark(scale, isLight) {
  const r = R * scale;
  const cy = CY * scale;
  const scilEnd = SCIL_END * scale;
  const lcx = scilEnd + GAP * scale + r;
  const rcx = lcx + 2 * r;
  const px = rcx + r + GAP_P * scale;
  const fs = 76 * scale;
  const bl = 62 * scale;
  const sw = 4.2 * scale;
  const w = px + 46 * scale;
  const h = 80 * scale;

  const bId = isLight ? 'swbL' : 'swbD';
  const oId = isLight ? 'swoL' : 'swoD';
  const bStops = isLight
    ? '<stop offset="0%" stop-color="#0c4a96"/><stop offset="100%" stop-color="#1a6dd4"/>'
    : '<stop offset="0%" stop-color="#1464c0"/><stop offset="50%" stop-color="#2d8cf0"/><stop offset="100%" stop-color="#5aabff"/>';
  const oStops = isLight
    ? '<stop offset="0%" stop-color="#b85c10"/><stop offset="100%" stop-color="#d66d12"/>'
    : '<stop offset="0%" stop-color="#d66d12"/><stop offset="50%" stop-color="#ef8c30"/><stop offset="100%" stop-color="#f9b35c"/>';

  const gapR = circleGapDash(r, GAP_ANG);
  const dashAttr = `stroke-dasharray="${gapR.array}" stroke-dashoffset="${gapR.offset}" stroke-linecap="butt"`;

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${bId}" x1="0%" y1="0%" x2="100%" y2="100%">${bStops}</linearGradient>
      <linearGradient id="${oId}" x1="0%" y1="0%" x2="100%" y2="100%">${oStops}</linearGradient>
    </defs>
    <text x="0" y="${bl}" font-family="Outfit,sans-serif" font-weight="300" font-size="${fs}" fill="url(#${bId})">scil</text>
    <circle cx="${lcx}" cy="${cy}" r="${r}" fill="none" stroke="url(#${bId})" stroke-width="${sw}"/>
    <circle cx="${rcx}" cy="${cy}" r="${r}" fill="none" stroke="url(#${oId})" stroke-width="${sw}" ${dashAttr}/>
    <text x="${px}" y="${bl}" font-family="Outfit,sans-serif" font-weight="300" font-size="${fs}" fill="url(#${oId})">p</text>
  </svg>`;
}

function staticMark(size, isLight) {
  const r = size * 0.28;
  const cx1 = size * 0.38, cy1 = size * 0.62;
  const cx2 = size * 0.62, cy2 = size * 0.38;
  const sw = 5;
  const bId = isLight ? 'mBL' : 'mBD';
  const oId = isLight ? 'mOL' : 'mOD';
  const bStops = isLight
    ? '<stop offset="0%" stop-color="#0c4a96"/><stop offset="50%" stop-color="#1464c0"/><stop offset="100%" stop-color="#1a6dd4"/>'
    : '<stop offset="0%" stop-color="#1464c0"/><stop offset="50%" stop-color="#2d8cf0"/><stop offset="100%" stop-color="#5aabff"/>';
  const oStops = isLight
    ? '<stop offset="0%" stop-color="#b85c10"/><stop offset="50%" stop-color="#d66d12"/><stop offset="100%" stop-color="#ef8c30"/>'
    : '<stop offset="0%" stop-color="#d66d12"/><stop offset="50%" stop-color="#ef8c30"/><stop offset="100%" stop-color="#f9b35c"/>';

  const gapR = circleGapDash(r, GAP_ANG_MARK, CUT_ANG_MARK);
  const dashAttr = `stroke-dasharray="${gapR.array}" stroke-dashoffset="${gapR.offset}" stroke-linecap="butt"`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${bId}" x1="0%" y1="100%" x2="100%" y2="0%">${bStops}</linearGradient>
      <linearGradient id="${oId}" x1="0%" y1="100%" x2="100%" y2="0%">${oStops}</linearGradient>
    </defs>
    <circle cx="${cx1}" cy="${cy1}" r="${r}" fill="none" stroke="url(#${bId})" stroke-width="${sw}"/>
    <circle cx="${cx2}" cy="${cy2}" r="${r}" fill="none" stroke="url(#${oId})" stroke-width="${sw}" ${dashAttr}/>
  </svg>`;
}

const variants = [
  { name: 'wordmark-dark', svg: staticWordmark(0.68, false) },
  { name: 'wordmark-light', svg: staticWordmark(0.68, true) },
  { name: 'mark-dark', svg: staticMark(100, false) },
  { name: 'mark-light', svg: staticMark(100, true) },
];

variants.forEach(({ name, svg }) => {
  const file = path.join(ROOT, `${name}.svg`);
  fs.writeFileSync(file, svg.trim() + '\n', 'utf8');
  console.log('Written:', file);
});

console.log('Done. Exported 4 logo variants.');
