import { getZodiacInfoByKey, type ZodiacInfo, type ZodiacKey } from "@/lib/zodiac";

export type CompatibilityInsight = {
  score: number;
  label: string;
  summary: string;
  strengths: string;
  caution: string;
  advice: string;
};

const elementalHarmony: Record<string, number> = {
  "fire:fire": 14,
  "fire:air": 18,
  "air:fire": 18,
  "earth:earth": 14,
  "earth:water": 18,
  "water:earth": 18,
  "air:air": 14,
  "water:water": 14,
  "fire:water": -8,
  "water:fire": -8,
  "fire:earth": 6,
  "earth:fire": 6,
  "air:water": 6,
  "water:air": 6,
  "air:earth": -6,
  "earth:air": -6
};

const elementSummary: Record<string, string> = {
  fire: "즉흥성과 추진력이 빠르게 반응을 만듭니다.",
  earth: "안정감과 현실 감각이 관계를 오래 유지하게 합니다.",
  air: "대화와 관점 교환이 관계의 매력을 키웁니다.",
  water: "감정적 공감과 분위기 이해가 관계를 깊게 만듭니다."
};

const modalityAdvice: Record<string, string> = {
  cardinal: "주도권 다툼이 생기지 않게 역할을 먼저 나누는 편이 좋습니다.",
  fixed: "고집이 부딪히지 않도록 서로의 속도를 존중해야 합니다.",
  mutable: "흐름은 좋지만 방향이 자주 바뀌지 않게 기준을 잡아야 합니다."
};

function getLabel(score: number) {
  if (score >= 85) return "강한 궁합";
  if (score >= 72) return "좋은 궁합";
  if (score >= 58) return "균형 궁합";
  return "조율이 필요한 궁합";
}

export function getCompatibilityInsight(
  primarySign: ZodiacInfo,
  partnerSign: ZodiacInfo,
): CompatibilityInsight {
  let score = 58;

  if (primarySign.key === partnerSign.key) {
    score += 20;
  }

  score += elementalHarmony[`${primarySign.element}:${partnerSign.element}`] ?? 0;

  if (primarySign.modality === partnerSign.modality) {
    score += 4;
  }

  if (primarySign.element === partnerSign.element) {
    score += 6;
  }

  score = Math.max(42, Math.min(96, score));

  const label = getLabel(score);
  const summary = `${primarySign.name}와 ${partnerSign.name}는 ${label.toLowerCase()}입니다. ${elementSummary[primarySign.element]} ${elementSummary[partnerSign.element]}`;
  const strengths = `${primarySign.name}의 ${primarySign.summary}과 ${partnerSign.name}의 ${partnerSign.summary}이 맞물리면 서로를 빠르게 이해하고 밀어주는 관계가 되기 쉽습니다.`;
  const caution = `${modalityAdvice[primarySign.modality]} ${modalityAdvice[partnerSign.modality]}`;
  const advice = `관계를 편하게 만들고 싶다면 ${primarySign.name}는 자신의 리듬을 먼저 설명하고, ${partnerSign.name}는 기대하는 반응과 간격을 분명하게 전하는 편이 좋습니다.`;

  return {
    score,
    label,
    summary,
    strengths,
    caution,
    advice,
  };
}

export function getBestCompatibilityMatches(signKey: ZodiacKey) {
  const sign = getZodiacInfoByKey(signKey);

  if (!sign) {
    return [];
  }

  return ([
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces"
  ] as ZodiacKey[])
    .filter((key) => key !== signKey)
    .map((candidateKey) => {
      const candidate = getZodiacInfoByKey(candidateKey)!;
      return {
        sign: candidate,
        insight: getCompatibilityInsight(sign, candidate),
      };
    })
    .sort((left, right) => right.insight.score - left.insight.score)
    .slice(0, 3);
}