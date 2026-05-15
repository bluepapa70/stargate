#!/usr/bin/env node
/**
 * 새 날짜의 운세 override 파일을 생성합니다.
 *
 * 사용법:
 *   npm run new-day              → 오늘 날짜로 생성
 *   npm run new-day 2026-05-20  → 지정 날짜로 생성
 *
 * 생성 후 src/data/daily/YYYY-MM-DD.json 파일에서
 * 원하는 별자리만 남기고 나머지는 삭제하세요.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DAILY_DIR = path.join(__dirname, "../src/data/daily");

const dateArg = process.argv[2];
const dateKey = dateArg ?? new Date().toISOString().slice(0, 10);

if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
  console.error(`날짜 형식 오류: ${dateKey} (YYYY-MM-DD 형식으로 입력하세요)`);
  process.exit(1);
}

const filePath = path.join(DAILY_DIR, `${dateKey}.json`);

if (fs.existsSync(filePath)) {
  console.log(`이미 존재합니다: ${filePath}`);
  process.exit(0);
}

const signs = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

const signTemplate = { headline: "", actionTip: "", caution: "" };
const forecastTemplate = { headline: "", focus: "", caution: "" };

const template = {
  horoscopes: Object.fromEntries(signs.map((s) => [s, { ...signTemplate }])),
  weekly: Object.fromEntries(signs.map((s) => [s, { ...forecastTemplate }])),
  monthly: Object.fromEntries(signs.map((s) => [s, { ...forecastTemplate }])),
};

fs.mkdirSync(DAILY_DIR, { recursive: true });
fs.writeFileSync(filePath, JSON.stringify(template, null, 2) + "\n");

console.log(`생성 완료: ${filePath}`);
console.log('빈 문자열("")인 항목은 기본값을 사용합니다. 불필요한 별자리 블록은 삭제하세요.');
