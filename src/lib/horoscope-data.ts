import rawHoroscopeData from "@/data/horoscopes.json";
import { zodiacSigns, type ZodiacKey } from "@/lib/zodiac";

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

type HoroscopeOverrides = Partial<Record<ZodiacKey, Partial<Horoscope>>>;

type HoroscopeDataset = {
  default: Record<ZodiacKey, Horoscope>;
  overrides?: Record<string, HoroscopeOverrides>;
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
  const overrides = horoscopeData.overrides?.[dateKey] ?? {};

  const horoscopes = zodiacSigns.reduce<Record<ZodiacKey, Horoscope>>((accumulator, sign) => {
    const baseHoroscope = horoscopeData.default[sign.key];
    accumulator[sign.key] = {
      ...baseHoroscope,
      ...overrides[sign.key],
    };

    return accumulator;
  }, {} as Record<ZodiacKey, Horoscope>);

  return {
    dateKey,
    hasOverrides: Object.keys(overrides).length > 0,
    horoscopes,
  };
}

export function getAvailableHoroscopeDates(): string[] {
  return Object.keys(horoscopeData.overrides ?? {}).sort();
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