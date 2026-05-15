import { getTodayDateKey } from "@/lib/horoscope-data";
import { hasDailyOverride } from "@/lib/daily-overrides";
import HomeContent from "@/components/home-content";

export default function HomePage() {
  const dateKey = getTodayDateKey();
  const hasOverrides = hasDailyOverride(dateKey);

  return <HomeContent dateKey={dateKey} hasOverrides={hasOverrides} />;
}
