import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-panel/60 px-5 py-8 text-center text-sm text-muted backdrop-blur sm:px-8">
      <div className="mx-auto max-w-7xl space-y-3">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/about" className="transition hover:text-accent-strong">
            서비스 소개
          </Link>
          <Link href="/privacy" className="transition hover:text-accent-strong">
            개인정보처리방침
          </Link>
        </nav>
        <p className="text-xs text-muted/70">
          본 서비스는 오락·참고 목적의 별자리 운세 정보를 제공합니다. 실제 의사결정의 근거로 사용하지 마세요.
        </p>
        <p className="text-xs text-muted/60">© {year} StarGate. All rights reserved.</p>
      </div>
    </footer>
  );
}
