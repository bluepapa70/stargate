import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | StarGate",
  description: "StarGate의 개인정보처리방침입니다. 수집하는 정보, 이용 목적, 광고 쿠키 사용에 대해 안내합니다.",
};

export default function PrivacyPage() {
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

          <h1 className="font-display text-3xl text-deep sm:text-4xl">개인정보처리방침</h1>
          <p className="mt-3 text-sm text-muted">최종 업데이트: 2025년 5월 15일</p>

          <div className="mt-8 space-y-8 text-sm leading-7 text-foreground/90">
            <section>
              <h2 className="mb-3 font-display text-xl text-deep">1. 개요</h2>
              <p>
                StarGate(이하 &ldquo;서비스&rdquo;)는 생년월일을 기반으로 별자리 운세를 제공하는 웹
                서비스입니다. 본 개인정보처리방침은 서비스 이용 과정에서 수집되는 정보와 그 활용
                방법에 대해 안내합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">2. 수집하는 정보</h2>
              <p>서비스는 다음 정보를 수집할 수 있습니다.</p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-muted">
                <li>
                  <span className="text-foreground/90">입력 정보:</span> 생년월일(별자리 계산 목적으로만 사용,
                  서버에 저장되지 않음)
                </li>
                <li>
                  <span className="text-foreground/90">자동 수집 정보:</span> IP 주소, 브라우저 종류, 방문
                  페이지, 방문 시간 등 표준 서버 로그 정보
                </li>
                <li>
                  <span className="text-foreground/90">쿠키 및 유사 기술:</span> 서비스 개선 및 광고 제공을
                  위한 쿠키
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">3. 쿠키 사용</h2>
              <p>
                서비스는 쿠키를 사용합니다. 쿠키는 브라우저에 저장되는 작은 텍스트 파일로,
                서비스 이용 편의 향상 및 광고 최적화에 활용됩니다.
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-muted">
                <li>브라우저 설정에서 쿠키를 거부하거나 삭제할 수 있습니다.</li>
                <li>쿠키를 비활성화하면 일부 기능이 제한될 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">4. 광고 서비스 (Google AdSense)</h2>
              <p>
                서비스는 Google AdSense를 통해 광고를 게재합니다. Google 및 제3자 광고 제공업체는
                쿠키를 사용하여 이용자의 이전 방문 정보를 기반으로 관심사 기반 광고를 제공합니다.
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-muted">
                <li>
                  Google의 광고 쿠키(DoubleClick 쿠키 포함) 사용을 통해 맞춤형 광고가 표시될 수
                  있습니다.
                </li>
                <li>
                  맞춤형 광고를 원하지 않는 경우{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-strong underline underline-offset-2"
                  >
                    Google 광고 설정
                  </a>
                  에서 옵트아웃할 수 있습니다.
                </li>
                <li>
                  또는{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-strong underline underline-offset-2"
                  >
                    www.aboutads.info
                  </a>
                  에서 제3자 쿠키 사용을 비활성화할 수 있습니다.
                </li>
                <li>
                  Google의 개인정보 보호정책은{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-strong underline underline-offset-2"
                  >
                    policies.google.com/privacy
                  </a>
                  에서 확인하실 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">5. 정보 이용 목적</h2>
              <ul className="list-inside list-disc space-y-2 text-muted">
                <li>서비스 제공 및 운영</li>
                <li>서비스 품질 개선 및 사용자 경험 향상</li>
                <li>통계 분석 및 서비스 오류 파악</li>
                <li>맞춤형 광고 제공</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">6. 제3자 정보 제공</h2>
              <p>
                서비스는 법령에 의한 경우를 제외하고, 이용자의 사전 동의 없이 개인정보를 제3자에게
                제공하지 않습니다. 단, Google AdSense 등 광고 네트워크 운영에 필요한 경우 해당
                파트너에게 집계된 통계 데이터가 전달될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">7. 정보 보관 및 보안</h2>
              <p>
                서비스는 생년월일 등 직접 입력 정보를 서버에 저장하지 않습니다. 모든 별자리 계산은
                브라우저 내에서 처리됩니다. 서버 로그는 서비스 운영 목적으로 일정 기간 보관 후
                삭제됩니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">8. 미성년자 보호</h2>
              <p>
                서비스는 만 14세 미만 아동을 대상으로 의도적으로 개인정보를 수집하지 않습니다.
                만 14세 미만 이용자의 보호자는 자녀의 정보 제공 여부를 확인하고 관련 문의를
                아래 연락처로 보내주시기 바랍니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">9. 방침 변경</h2>
              <p>
                본 개인정보처리방침은 관련 법령 또는 서비스 정책 변경에 따라 수정될 수 있습니다.
                변경 시 본 페이지에 새로운 방침을 게시하며, 중요한 변경사항은 서비스 내 공지를
                통해 안내합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-deep">10. 문의</h2>
              <p>개인정보 관련 문의사항은 아래 이메일로 연락주시기 바랍니다.</p>
              <p className="mt-2">
                이메일:{" "}
                <a
                  href="mailto:bluepapa70@gmail.com"
                  className="text-accent-strong underline underline-offset-2"
                >
                  bluepapa70@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
