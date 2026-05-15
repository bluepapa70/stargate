import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HoroscopeDetail } from "@/components/horoscope-detail";
import { getBestCompatibilityMatches } from "@/lib/compatibility";
import { getForecastExtensions } from "@/lib/forecast-extensions";
import {
  formatHoroscopeDate,
  getAvailableHoroscopeDates,
  getHoroscopeSnapshot,
  getTodayDateKey,
  isValidDateKey,
} from "@/lib/horoscope-data";
import { getZodiacInfoByKey, zodiacSigns } from "@/lib/zodiac";

type PageProps = {
  params: Promise<{
    date: string;
    sign: string;
  }>;
};

function getPageData(dateKey: string, signKey: string) {
  if (!isValidDateKey(dateKey)) {
    return null;
  }

  const sign = getZodiacInfoByKey(signKey);

  if (!sign) {
    return null;
  }

  const snapshot = getHoroscopeSnapshot(dateKey);

  return {
    sign,
    horoscope: snapshot.horoscopes[sign.key],
    snapshot,
  };
}

export function generateStaticParams() {
  const dates = new Set([getTodayDateKey(), ...getAvailableHoroscopeDates()]);

  return [...dates].flatMap((date) =>
    zodiacSigns.map((sign) => ({
      date,
      sign: sign.key,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date, sign } = await params;
  const pageData = getPageData(date, sign);

  if (!pageData) {
    return {
      title: "운세를 찾을 수 없습니다 | StarGate",
    };
  }

  const formattedDate = formatHoroscopeDate(date);
  const title = `${pageData.sign.name} ${formattedDate} 운세 | StarGate`;
  const description = `${pageData.sign.name} ${formattedDate} 종합운, 연애운, 금전운, 일·학업운, 건강운과 행운 요소를 확인하세요.`;
  const path = `/horoscope/${date}/${pageData.sign.key}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HoroscopeDetailPage({ params }: PageProps) {
  const { date, sign } = await params;
  const pageData = getPageData(date, sign);

  if (!pageData) {
    notFound();
  }

  const formattedDate = formatHoroscopeDate(date);
  const forecastExtensions = getForecastExtensions(pageData.sign.key, date);
  const bestMatches = getBestCompatibilityMatches(pageData.sign.key);

  return (
    <HoroscopeDetail
      sign={pageData.sign}
      horoscope={pageData.horoscope}
      formattedDate={formattedDate}
      dateKey={date}
      discoverLinks={zodiacSigns.map((item) => ({
        key: item.key,
        name: item.name,
        href: `/horoscope/${date}/${item.key}`,
      }))}
      weeklyForecast={forecastExtensions.weekly}
      monthlyForecast={forecastExtensions.monthly}
      compatibilityLinks={bestMatches.map((item) => ({
        key: item.sign.key,
        name: item.sign.name,
        href: `/compatibility/${pageData.sign.key}/${item.sign.key}`,
        insight: item.insight,
      }))}
    />
  );
}