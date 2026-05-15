import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개 | StarGate",
  description: "StarGate는 생년월일로 별자리를 계산하고 오늘의 운세를 알려드리는 서비스입니다.",
};

export default function AboutPage() {
  return (
    <main className="star-grid flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8">
        <div className="rounded-[2rem] border border-line bg-panel px-6 py-8 shadow-[0_18px_60px_rgba(80,20,180,0.18)] backdrop-blur sm:px-10 sm:py-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent-strong"
          >
            ← 홈으로
          </Link>

          <h1 className="font-display text-3xl text-deep sm:text-4xl">서비스 소개</h1>

          <div className="mt-8 space-y-8 text-sm leading-7 text-foreground/90">
            <section>
              <h2 className="mb-3 font-display text-xl text-deep">StarGate란?</h2>
              <p>
                StarGate는 생년월일을 입력하면 태양 별자리를 계산하고 오늘의 운세를 제공하는
                별자리 운세 서비스입니다. 종합운, 연애운, 금전운, 일·학업운, 건강운을 비롯해
                주간·월간 운세와 별자리 궁합 정보를 확인할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">별자리 운세의 역사</h2>
              <p>
                별자리 운세(점성술)는 기원전 3900년경 수메르 문명에서 시작되었습니다.
                바빌로니아 칼데아인들이 태양의 길인 황도(黃道)를 12구역으로 나누면서
                오늘날 우리가 아는 12개 별자리 체계가 형성되었습니다.
              </p>
              <p className="mt-3">
                태어난 순간 태양이 위치한 별자리를 태양 별자리(Sun Sign)라고 하며,
                개인의 기본 성격과 삶의 방향성을 나타낸다고 알려져 있습니다.
                StarGate는 이 태양 별자리를 기반으로 일간·주간·월간 운세를 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">제공 기능</h2>
              <ul className="list-inside list-disc space-y-2 text-muted">
                <li>
                  <span className="text-foreground/90">오늘의 운세:</span> 종합, 연애, 금전, 일·학업,
                  건강 운세
                </li>
                <li>
                  <span className="text-foreground/90">행운 요소:</span> 행운의 색, 숫자, 시간대
                </li>
                <li>
                  <span className="text-foreground/90">주간·월간 운세:</span> 중기적 흐름과 조언
                </li>
                <li>
                  <span className="text-foreground/90">별자리 궁합:</span> 12개 별자리 간 궁합 점수 및 조언
                </li>
                <li>
                  <span className="text-foreground/90">12궁 탐색:</span> 모든 별자리 운세 비교
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">이용 안내</h2>
              <p>
                본 서비스는 오락 및 참고 목적의 별자리 운세 정보를 제공합니다.
                운세 내용은 실제 미래를 예측하거나 보장하지 않으며, 중요한 의사결정의
                근거로 사용하지 않기를 권장합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">문의</h2>
              <p>서비스 관련 문의는 아래 이메일로 연락주시기 바랍니다.</p>
              <p className="mt-2">
                이메일:{" "}
                <a
                  href="mailto:bluepapa@gmail.com"
                  className="text-accent-strong underline underline-offset-2"
                >
                  bluepapa@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
