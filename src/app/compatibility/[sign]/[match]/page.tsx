import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoroscopeShareButton } from "@/components/horoscope-share-button";
import { getCompatibilityInsight } from "@/lib/compatibility";
import { getTodayDateKey } from "@/lib/horoscope-data";
import { getZodiacInfoByKey, zodiacSigns } from "@/lib/zodiac";

type PageProps = {
  params: Promise<{
    sign: string;
    match: string;
  }>;
};

function getCompatibilityPageData(signKey: string, matchKey: string) {
  const sign = getZodiacInfoByKey(signKey);
  const match = getZodiacInfoByKey(matchKey);

  if (!sign || !match) {
    return null;
  }

  return {
    sign,
    match,
    insight: getCompatibilityInsight(sign, match),
  };
}

export function generateStaticParams() {
  return zodiacSigns.flatMap((sign) =>
    zodiacSigns
      .filter((match) => match.key !== sign.key)
      .map((match) => ({ sign: sign.key, match: match.key })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign, match } = await params;
  const pageData = getCompatibilityPageData(sign, match);

  if (!pageData) {
    return {
      title: "궁합을 찾을 수 없습니다 | StarGate",
    };
  }

  const title = `${pageData.sign.name} × ${pageData.match.name} 궁합 | StarGate`;
  const description = `${pageData.sign.name}와 ${pageData.match.name}의 궁합 점수, 강점, 주의 포인트를 확인하세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/compatibility/${pageData.sign.key}/${pageData.match.key}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CompatibilityPage({ params }: PageProps) {
  const { sign, match } = await params;
  const pageData = getCompatibilityPageData(sign, match);

  if (!pageData) {
    notFound();
  }

  const todayDateKey = getTodayDateKey();

  return (
    <main className="star-grid flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="rounded-[2rem] border border-line bg-panel px-6 py-6 shadow-[0_18px_60px_rgba(91,61,38,0.08)] backdrop-blur md:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-accent-strong uppercase">
            StarGate Compatibility
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">Compatibility Report</p>
              <h1 className="mt-3 font-display text-5xl leading-none text-deep sm:text-6xl">
                {pageData.sign.name} × {pageData.match.name}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">{pageData.insight.summary}</p>
            </div>
            <div className="rounded-[1.7rem] bg-deep px-5 py-5 text-[#f8eadb] shadow-[0_16px_36px_rgba(34,27,22,0.18)]">
              <p className="text-xs tracking-[0.2em] text-[#f2bf94] uppercase">궁합 점수</p>
              <div className="mt-4 flex items-end gap-3">
                <strong className="font-display text-6xl text-white">{pageData.insight.score}</strong>
                <span className="pb-2 text-lg">/ 100</span>
              </div>
              <p className="mt-3 text-lg leading-7">{pageData.insight.label}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <HoroscopeShareButton title={`${pageData.sign.name} × ${pageData.match.name} 궁합`} />
                <Link
                  href={`/horoscope/${todayDateKey}/${pageData.sign.key}`}
                  className="flex min-h-12 items-center justify-center rounded-full bg-[#f2bf94] px-5 text-sm font-extrabold tracking-[0.16em] text-[#472512] uppercase transition hover:bg-[#f0c9a7]"
                >
                  {pageData.sign.name} 운세 보기
                </Link>
                <Link
                  href={`/horoscope/${todayDateKey}/${pageData.match.key}`}
                  className="flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-bold tracking-[0.16em] text-[#f8eadb] uppercase transition hover:bg-white/10"
                >
                  {pageData.match.name} 운세 보기
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-line bg-panel px-5 py-5 shadow-[0_20px_55px_rgba(90,61,39,0.08)] sm:px-6">
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.5rem] bg-white/75 px-5 py-5">
                <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">강점</p>
                <p className="mt-3 text-base leading-8 text-deep">{pageData.insight.strengths}</p>
              </article>
              <article className="rounded-[1.5rem] bg-white/75 px-5 py-5">
                <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">주의 포인트</p>
                <p className="mt-3 text-base leading-8 text-deep">{pageData.insight.caution}</p>
              </article>
            </div>
            <article className="mt-4 rounded-[1.5rem] bg-[#fff6eb] px-5 py-5">
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">관계 조언</p>
              <p className="mt-3 text-base leading-8 text-deep">{pageData.insight.advice}</p>
            </article>
          </div>

          <aside className="rounded-[2rem] border border-line bg-panel px-5 py-5 shadow-[0_18px_50px_rgba(90,61,39,0.06)] sm:px-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">Explore More</p>
            <h2 className="mt-2 font-display text-3xl text-deep">다른 궁합 조합</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {zodiacSigns
                .filter((candidate) => candidate.key !== pageData.sign.key)
                .slice(0, 8)
                .map((candidate) => (
                  <Link
                    key={candidate.key}
                    href={`/compatibility/${pageData.sign.key}/${candidate.key}`}
                    className={`rounded-[1.3rem] border px-4 py-4 transition hover:-translate-y-0.5 hover:bg-white ${
                      candidate.key === pageData.match.key
                        ? "border-accent bg-[#fff1e4] shadow-[0_10px_24px_rgba(168,87,42,0.12)]"
                        : "border-line bg-white/70"
                    }`}
                  >
                    <p className="font-semibold text-deep">{pageData.sign.name} × {candidate.name}</p>
                    <p className="mt-1 text-sm text-muted">궁합 상세 보기</p>
                  </Link>
                ))}
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}