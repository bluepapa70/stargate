import rawHoroscopeData from "@/data/horoscopes.json";
import { zodiacSigns, type ZodiacKey } from "@/lib/zodiac";
import { getDailyOverride, hasDailyOverride, getAvailableDates } from "@/lib/daily-overrides";

export type Horoscope = {
  headline: string;
  overall: string;
  love: string;
  money: string;
  career: string;
  health: string;
  luckyColor: string;
  luckyNumber: string;
  luckyTime: string;
  actionTip: string;
  caution: string;
};

type HoroscopeDataset = {
  default: Record<ZodiacKey, Horoscope>;
};

export type HoroscopeSnapshot = {
  dateKey: string;
  hasOverrides: boolean;
  horoscopes: Record<ZodiacKey, Horoscope>;
};

const horoscopeData = rawHoroscopeData as HoroscopeDataset;

export function getTodayDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getHoroscopeSnapshot(dateKey = getTodayDateKey()): HoroscopeSnapshot {
  const dailyData = getDailyOverride(dateKey);
  const overrides = (dailyData.horoscopes ?? {}) as Partial<Record<ZodiacKey, Partial<Horoscope>>>;

  const horoscopes = zodiacSigns.reduce<Record<ZodiacKey, Horoscope>>((acc, sign) => {
    acc[sign.key] = { ...horoscopeData.default[sign.key], ...overrides[sign.key] };
    return acc;
  }, {} as Record<ZodiacKey, Horoscope>);

  return {
    dateKey,
    hasOverrides: hasDailyOverride(dateKey),
    horoscopes,
  };
}

export function getAvailableHoroscopeDates(): string[] {
  return getAvailableDates();
}

export function formatHoroscopeDate(dateKey: string): string {
  const [yearText, monthText, dayText] = dateKey.split("-");
  const date = new Date(Number(yearText), Number(monthText) - 1, Number(dayText));

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function isValidDateKey(dateKey: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateKey);
}
