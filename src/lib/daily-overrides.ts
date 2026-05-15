import fs from "fs";
import path from "path";

const DAILY_DIR = path.join(process.cwd(), "src/data/daily");

type SignFields = Record<string, string | undefined>;
type SignOverrides = Record<string, SignFields>;

export type DailyData = {
  horoscopes?: SignOverrides;
  weekly?: SignOverrides;
  monthly?: SignOverrides;
};

function stripEmpty(obj: SignOverrides): SignOverrides {
  return Object.fromEntries(
    Object.entries(obj).map(([sign, fields]) => [
      sign,
      Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== "")),
    ]),
  );
}

export function getDailyOverride(dateKey: string): DailyData {
  try {
    const content = fs.readFileSync(path.join(DAILY_DIR, `${dateKey}.json`), "utf-8");
    const raw = JSON.parse(content) as DailyData;
    return {
      horoscopes: raw.horoscopes ? stripEmpty(raw.horoscopes) : undefined,
      weekly: raw.weekly ? stripEmpty(raw.weekly) : undefined,
      monthly: raw.monthly ? stripEmpty(raw.monthly) : undefined,
    };
  } catch {
    return {};
  }
}

export function hasDailyOverride(dateKey: string): boolean {
  const data = getDailyOverride(dateKey);
  return (
    Object.keys(data.horoscopes ?? {}).length > 0 ||
    Object.keys(data.weekly ?? {}).length > 0 ||
    Object.keys(data.monthly ?? {}).length > 0
  );
}

export function getAvailableDates(): string[] {
  try {
    return fs
      .readdirSync(DAILY_DIR)
      .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
      .map((f) => f.slice(0, 10))
      .sort();
  } catch {
    return [];
  }
}
