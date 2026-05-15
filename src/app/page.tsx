"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getHoroscopeSnapshot } from "@/lib/horoscope-data";
import { getZodiacSign, zodiacSigns } from "@/lib/zodiac";

const signSymbols = ["Ar", "Ta", "Ge", "Cn", "Le", "Vi", "Li", "Sc", "Sa", "Cp", "Aq", "Pi"];
const sampleBirthDates = [
  "1994-04-10",
  "1994-05-10",
  "1994-06-10",
  "1994-07-10",
  "1994-08-10",
  "1994-09-10",
  "1994-10-10",
  "1994-11-10",
  "1994-12-10",
  "1994-01-10",
  "1994-02-10",
  "1994-03-10",
];

const todaySnapshot = getHoroscopeSnapshot();

export default function Home() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");

  return (
    <main className="star-grid flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-line bg-panel px-6 py-6 shadow-[0_18px_60px_rgba(91,61,38,0.08)] backdrop-blur md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-accent-strong uppercase">
                StarGate Horoscope
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none text-deep sm:text-6xl">
                오늘의 별자리 운세
              </h1>
            </div>
            <div className="max-w-md rounded-[1.5rem] border border-line bg-white/65 px-5 py-4 text-sm leading-7 text-muted">
              오늘의 흐름과 행운 요소를 빠르게 확인하는 가벼운 운세 서비스입니다. 입력은 생년월일만 받고, 결과는 한 화면에서 바로 보여줍니다.
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <form
              className="rounded-[1.75rem] bg-deep px-6 py-6 text-white shadow-[0_16px_40px_rgba(34,27,22,0.24)]"
              onSubmit={(event) => {
                event.preventDefault();
                const sign = getZodiacSign(birthDate);

                if (!sign) {
                  return;
                }

                router.push(`/horoscope/${todaySnapshot.dateKey}/${sign.key}?birthDate=${birthDate}`);
              }}
            >
              <p className="text-sm tracking-[0.24em] text-[#f5d6bb] uppercase">Find My Sign</p>
              <h2 className="mt-3 font-display text-3xl text-[#fff5ea] sm:text-4xl">
                별자리를 계산하고 오늘의 운세를 확인하세요.
              </h2>
              <label className="mt-8 block text-sm font-medium text-[#f8e7d6]" htmlFor="birthDate">
                생년월일
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="min-h-14 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-base text-white outline-none transition focus:border-[#f2bf94] focus:bg-white/14"
                  required
                />
                <button
                  type="submit"
                  className="min-h-14 rounded-full bg-[#f2bf94] px-6 text-sm font-extrabold tracking-[0.18em] text-[#472512] uppercase transition hover:bg-[#f0c9a7]"
                >
                  오늘 운세 보기
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#dec8b4]">
                생년월일로 태양 별자리를 계산한 뒤, 공유 가능한 상세 URL로 이동합니다. 출생시간과 출생지는 받지 않아 진입 장벽을 낮춘 MVP 구성입니다.
              </p>
              <p className="mt-2 text-xs leading-6 text-[#cba98e]">
                운세 데이터 기준일: {todaySnapshot.dateKey}
                {todaySnapshot.hasOverrides ? " · 날짜별 오버라이드 적용 중" : " · 기본 템플릿 사용 중"}
              </p>
            </form>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
              {[
                { title: "오늘의 포인트", value: "종합운 + 연애운 + 금전운 + 일운" },
                { title: "행운 요소", value: "행운의 색, 숫자, 시간대" },
                { title: "재방문 유도", value: "12개 별자리 전체 탐색 카드" },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-line bg-panel-strong px-5 py-5 shadow-[0_12px_30px_rgba(90,61,39,0.06)]"
                >
                  <p className="text-sm font-semibold tracking-[0.18em] text-accent-strong uppercase">
                    {item.title}
                  </p>
                  <p className="mt-3 text-lg leading-8 text-deep">{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </header>

        <aside className="rounded-[2rem] border border-line bg-panel px-5 py-5 shadow-[0_18px_50px_rgba(90,61,39,0.06)] sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-accent-strong uppercase">
                Zodiac Guide
              </p>
              <h2 className="mt-2 font-display text-3xl text-deep">별자리 한눈에 보기</h2>
            </div>
            <p className="text-sm text-muted">12 Signs</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {zodiacSigns.map((sign, index) => (
              <Link
                key={sign.key}
                href={`/horoscope/${todaySnapshot.dateKey}/${sign.key}?birthDate=${sampleBirthDates[index]}`}
                className="flex items-center gap-4 rounded-[1.3rem] border border-line bg-white/70 px-4 py-4 text-left transition hover:-translate-y-0.5 hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft font-display text-lg text-accent-strong">
                  {signSymbols[index]}
                </div>
                <div>
                  <p className="font-semibold text-deep">{sign.name}</p>
                  <p className="text-sm text-muted">{sign.dateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
