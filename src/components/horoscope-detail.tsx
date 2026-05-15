import Link from "next/link";
import type { CompatibilityInsight } from "@/lib/compatibility";
import type { PeriodForecast } from "@/lib/forecast-extensions";
import type { Horoscope } from "@/lib/horoscope-data";
import type { ZodiacInfo, ZodiacKey } from "@/lib/zodiac";
import { HoroscopeShareButton } from "@/components/horoscope-share-button";

const constellationImages: Record<ZodiacKey, string> = {
  aries: "/constellations/Aries.png",
  taurus: "/constellations/Taurus.png",
  gemini: "/constellations/Gemini.png",
  cancer: "/constellations/Cancer.png",
  leo: "/constellations/Leo.png",
  virgo: "/constellations/Virgo.png",
  libra: "/constellations/Libra.png",
  scorpio: "/constellations/Scorpio.png",
  sagittarius: "/constellations/Sagittarius.png",
  capricorn: "/constellations/Capricorn.png",
  aquarius: "/constellations/Aquarius.png",
  pisces: "/constellations/Pisces.png",
};

type HoroscopeDetailProps = {
  sign: ZodiacInfo;
  horoscope: Horoscope;
  formattedDate: string;
  dateKey: string;
  discoverLinks: Array<{
    key: ZodiacKey;
    name: string;
    href: string;
  }>;
  weeklyForecast: PeriodForecast;
  monthlyForecast: PeriodForecast;
  compatibilityLinks: Array<{
    key: ZodiacKey;
    name: string;
    href: string;
    insight: CompatibilityInsight;
  }>;
};

export function HoroscopeDetail({
  sign,
  horoscope,
  formattedDate,
  dateKey,
  discoverLinks,
  weeklyForecast,
  monthlyForecast,
  compatibilityLinks,
}: HoroscopeDetailProps) {
  const pageTitle = `${sign.name} ${formattedDate} 운세`;

  return (
    <main className="star-grid flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="rounded-[2rem] border border-line bg-panel px-6 py-6 shadow-[0_18px_60px_rgba(80,20,180,0.18)] backdrop-blur md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="text-sm font-semibold tracking-[0.24em] text-accent-strong uppercase"
              >
                StarGate Horoscope
              </Link>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-accent-soft shadow-[0_12px_24px_rgba(120,60,200,0.2)]">
                  <img src={constellationImages[sign.key]} alt={sign.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">
                    {formattedDate}
                  </p>
                  <h1 className="mt-2 font-display text-5xl leading-none text-deep sm:text-6xl">
                    {sign.name} 상세 운세
                  </h1>
                </div>
              </div>
              <p className="mt-5 text-lg leading-8 text-muted">
                {sign.dateRange} · 데이터 기준 {dateKey}
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-[#0f0825] px-5 py-5 text-[#f7e6d6] shadow-[0_16px_36px_rgba(80,20,200,0.35)] lg:max-w-sm">
              <p className="text-xs tracking-[0.2em] text-[#f2bf94] uppercase">Today&apos;s Signal</p>
              <p className="mt-3 text-xl leading-8">{horoscope.headline}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <HoroscopeShareButton title={pageTitle} />
                <Link
                  href="/"
                  className="flex min-h-12 items-center justify-center rounded-full bg-[#f2bf94] px-5 text-sm font-extrabold tracking-[0.16em] text-[#472512] uppercase transition hover:bg-[#f0c9a7]"
                >
                  다시 입력하기
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-line bg-panel px-5 py-5 shadow-[0_20px_55px_rgba(80,20,180,0.18)] sm:px-6">
            <div className="rounded-[1.5rem] bg-white/[0.07] px-5 py-5">
              <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">종합운</p>
              <p className="mt-3 text-lg leading-8 text-deep">{horoscope.overall}</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "연애운", value: horoscope.love },
                { title: "금전운", value: horoscope.money },
                { title: "일·학업운", value: horoscope.career },
                { title: "건강운", value: horoscope.health },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-line bg-white/[0.07] px-4 py-4"
                >
                  <p className="text-sm font-semibold tracking-[0.16em] text-accent-strong uppercase">
                    {item.title}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-deep">{item.value}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.5rem] bg-white/[0.07] px-5 py-5">
                <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">행운 요소</p>
                <dl className="mt-4 space-y-3 text-deep">
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-sm text-muted">행운의 색</dt>
                    <dd className="font-semibold">{horoscope.luckyColor}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-sm text-muted">행운의 숫자</dt>
                    <dd className="font-semibold">{horoscope.luckyNumber}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-muted">행운의 시간</dt>
                    <dd className="font-semibold">{horoscope.luckyTime}</dd>
                  </div>
                </dl>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-[1.5rem] bg-[#0f0825] px-5 py-5 text-[#f8eadb]">
                  <p className="text-sm font-semibold tracking-[0.18em] text-[#f2bf94] uppercase">
                    추천 행동
                  </p>
                  <p className="mt-3 text-base leading-7">{horoscope.actionTip}</p>
                </article>
                <article className="rounded-[1.5rem] bg-white/[0.07] px-5 py-5">
                  <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">
                    주의할 점
                  </p>
                  <p className="mt-3 text-base leading-7 text-deep">{horoscope.caution}</p>
                </article>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {[
                { title: "주간운", value: weeklyForecast },
                { title: "월간운", value: monthlyForecast },
              ].map((item) => (
                <article key={item.title} className="rounded-[1.6rem] bg-white/[0.07] px-5 py-5">
                  <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">
                    {item.title}
                  </p>
                  <h3 className="mt-3 text-2xl leading-9 text-deep">{item.value.headline}</h3>
                  <p className="mt-3 text-base leading-8 text-deep">{item.value.overview}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] bg-white/[0.08] px-4 py-4">
                      <p className="text-xs font-semibold tracking-[0.16em] text-accent-strong uppercase">
                        집중 포인트
                      </p>
                      <p className="mt-2 text-sm leading-7 text-deep">{item.value.focus}</p>
                    </div>
                    <div className="rounded-[1.2rem] bg-white/[0.08] px-4 py-4">
                      <p className="text-xs font-semibold tracking-[0.16em] text-accent-strong uppercase">
                        주의 포인트
                      </p>
                      <p className="mt-2 text-sm leading-7 text-deep">{item.value.caution}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-line bg-panel px-5 py-5 shadow-[0_18px_50px_rgba(80,20,180,0.18)] sm:px-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">
              More Signs
            </p>
            <h2 className="mt-2 font-display text-3xl text-deep">다른 별자리 둘러보기</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {discoverLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`rounded-[1.3rem] border px-4 py-4 transition hover:-translate-y-0.5 hover:bg-white/[0.12] ${
                    item.key === sign.key
                      ? "border-accent bg-accent-soft shadow-[0_10px_24px_rgba(120,60,200,0.2)]"
                      : "border-line bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={constellationImages[item.key]} alt={item.name} className="h-8 w-8 rounded-full object-cover" />
                    <p className="font-semibold text-deep">{item.name}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">/{dateKey}/{item.key}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">
                Compatibility
              </p>
              <h2 className="mt-2 font-display text-3xl text-deep">추천 궁합</h2>
              <div className="mt-5 space-y-3">
                {compatibilityLinks.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block rounded-[1.3rem] border border-line bg-white/[0.07] px-4 py-4 transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-deep">{sign.name} × {item.name}</p>
                        <p className="mt-1 text-sm text-muted">{item.insight.label}</p>
                      </div>
                      <div className="rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent-strong">
                        {item.insight.score}점
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-deep">{item.insight.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-6 flex justify-center pb-2">
          <HoroscopeShareButton title={pageTitle} />
        </footer>
      </section>
    </main>
  );
}
