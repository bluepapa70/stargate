import rawForecastExtensions from "@/data/forecast-extensions.json";
import type { ZodiacKey } from "@/lib/zodiac";
import { getTodayDateKey } from "@/lib/horoscope-data";
import { getDailyOverride } from "@/lib/daily-overrides";

export type PeriodForecast = {
  headline: string;
  overview: string;
  focus: string;
  caution: string;
};

type ForecastDataset = {
  weekly: { default: Record<ZodiacKey, PeriodForecast> };
  monthly: { default: Record<ZodiacKey, PeriodForecast> };
};

const forecastData = rawForecastExtensions as ForecastDataset;

export function getForecastExtensions(signKey: ZodiacKey, dateKey = getTodayDateKey()) {
  const dailyData = getDailyOverride(dateKey);

  return {
    weekly: {
      ...forecastData.weekly.default[signKey],
      ...(dailyData.weekly?.[signKey] as Partial<PeriodForecast> | undefined),
    } as PeriodForecast,
    monthly: {
      ...forecastData.monthly.default[signKey],
      ...(dailyData.monthly?.[signKey] as Partial<PeriodForecast> | undefined),
    } as PeriodForecast,
  };
}
