import rawForecastExtensions from "@/data/forecast-extensions.json";
import type { ZodiacKey } from "@/lib/zodiac";
import { getTodayDateKey } from "@/lib/horoscope-data";

export type PeriodForecast = {
  headline: string;
  overview: string;
  focus: string;
  caution: string;
};

type ForecastExtensionsDataset = {
  weekly: {
    default: Record<ZodiacKey, PeriodForecast>;
    overrides?: Record<string, Partial<Record<ZodiacKey, Partial<PeriodForecast>>>>;
  };
  monthly: {
    default: Record<ZodiacKey, PeriodForecast>;
    overrides?: Record<string, Partial<Record<ZodiacKey, Partial<PeriodForecast>>>>;
  };
};

const forecastExtensions = rawForecastExtensions as ForecastExtensionsDataset;

function resolvePeriodForecast(
  period: ForecastExtensionsDataset["weekly"] | ForecastExtensionsDataset["monthly"],
  signKey: ZodiacKey,
  dateKey: string,
) {
  return {
    ...period.default[signKey],
    ...period.overrides?.[dateKey]?.[signKey],
  };
}

export function getForecastExtensions(signKey: ZodiacKey, dateKey = getTodayDateKey()) {
  return {
    weekly: resolvePeriodForecast(forecastExtensions.weekly, signKey, dateKey),
    monthly: resolvePeriodForecast(forecastExtensions.monthly, signKey, dateKey),
  };
}