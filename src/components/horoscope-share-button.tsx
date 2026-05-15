"use client";

import { useState } from "react";

type HoroscopeShareButtonProps = {
  title: string;
};

export function HoroscopeShareButton({ title }: HoroscopeShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title,
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);

    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={() => {
        void handleShare();
      }}
      className="min-h-12 rounded-full border border-white/20 px-5 text-sm font-bold tracking-[0.16em] text-[#f9e7d2] uppercase transition hover:bg-white/10"
    >
      {copied ? "링크 복사됨" : "상세 링크 공유"}
    </button>
  );
}