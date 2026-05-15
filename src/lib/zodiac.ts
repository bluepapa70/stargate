export type ZodiacKey =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type ZodiacInfo = {
  key: ZodiacKey;
  name: string;
  dateRange: string;
  summary: string;
  element: "fire" | "earth" | "air" | "water";
  modality: "cardinal" | "fixed" | "mutable";
  birthstone: string;
  birthstoneMeaning: string[];
  birthstoneImage: string;
};

export const zodiacSigns: ZodiacInfo[] = [
  {
    key: "aries",
    name: "양자리",
    dateRange: "3월 21일 - 4월 19일",
    summary: "빠른 결단이 강점이 되는 날",
    element: "fire",
    modality: "cardinal",
    birthstone: "다이아몬드",
    birthstoneMeaning: ["용기", "강한 의지", "승리와 자신감"],
    birthstoneImage: "/birthstones/diamond.jpg",
  },
  {
    key: "taurus",
    name: "황소자리",
    dateRange: "4월 20일 - 5월 20일",
    summary: "작은 안정이 큰 만족으로 이어지는 날",
    element: "earth",
    modality: "fixed",
    birthstone: "에메랄드",
    birthstoneMeaning: ["사랑", "풍요", "안정감"],
    birthstoneImage: "/birthstones/emerald.jpg",
  },
  {
    key: "gemini",
    name: "쌍둥이자리",
    dateRange: "5월 21일 - 6월 20일",
    summary: "대화와 정보가 기회를 만드는 날",
    element: "air",
    modality: "mutable",
    birthstone: "진주 · 알렉산드라이트",
    birthstoneMeaning: ["지혜", "변화", "소통"],
    birthstoneImage: "/birthstones/pearl.jpg",
  },
  {
    key: "cancer",
    name: "게자리",
    dateRange: "6월 21일 - 7월 22일",
    summary: "감정의 균형이 운을 좌우하는 날",
    element: "water",
    modality: "cardinal",
    birthstone: "루비",
    birthstoneMeaning: ["사랑", "보호", "열정"],
    birthstoneImage: "/birthstones/ruby.jpg",
  },
  {
    key: "leo",
    name: "사자자리",
    dateRange: "7월 23일 - 8월 22일",
    summary: "존재감이 자연스럽게 드러나는 날",
    element: "fire",
    modality: "fixed",
    birthstone: "페리도트",
    birthstoneMeaning: ["태양의 힘", "긍정", "성공"],
    birthstoneImage: "/birthstones/peridot.jpg",
  },
  {
    key: "virgo",
    name: "처녀자리",
    dateRange: "8월 23일 - 9월 22일",
    summary: "정리와 조율이 성과를 높이는 날",
    element: "earth",
    modality: "mutable",
    birthstone: "사파이어",
    birthstoneMeaning: ["지혜", "진실", "차분함"],
    birthstoneImage: "/birthstones/sapphire.jpg",
  },
  {
    key: "libra",
    name: "천칭자리",
    dateRange: "9월 23일 - 10월 22일",
    summary: "관계의 균형이 흐름을 바꾸는 날",
    element: "air",
    modality: "cardinal",
    birthstone: "오팔",
    birthstoneMeaning: ["조화", "예술성", "매력"],
    birthstoneImage: "/birthstones/opal.jpg",
  },
  {
    key: "scorpio",
    name: "전갈자리",
    dateRange: "10월 23일 - 11월 21일",
    summary: "집중력이 깊이를 만드는 날",
    element: "water",
    modality: "fixed",
    birthstone: "토파즈",
    birthstoneMeaning: ["집중력", "열정", "강한 직관"],
    birthstoneImage: "/birthstones/topaz.jpg",
  },
  {
    key: "sagittarius",
    name: "사수자리",
    dateRange: "11월 22일 - 12월 21일",
    summary: "가볍게 움직일수록 길이 열리는 날",
    element: "fire",
    modality: "mutable",
    birthstone: "터키석",
    birthstoneMeaning: ["여행", "자유", "행운"],
    birthstoneImage: "/birthstones/turquoise.jpg",
  },
  {
    key: "capricorn",
    name: "염소자리",
    dateRange: "12월 22일 - 1월 19일",
    summary: "꾸준함이 신뢰로 돌아오는 날",
    element: "earth",
    modality: "cardinal",
    birthstone: "가넷",
    birthstoneMeaning: ["인내", "성공", "충성심"],
    birthstoneImage: "/birthstones/garnet.jpg",
  },
  {
    key: "aquarius",
    name: "물병자리",
    dateRange: "1월 20일 - 2월 18일",
    summary: "새로운 발상이 전환점을 만드는 날",
    element: "air",
    modality: "fixed",
    birthstone: "자수정",
    birthstoneMeaning: ["영감", "창의성", "정신적 안정"],
    birthstoneImage: "/birthstones/amethyst.jpg",
  },
  {
    key: "pisces",
    name: "물고기자리",
    dateRange: "2월 19일 - 3월 20일",
    summary: "직감이 예상보다 정확하게 작동하는 날",
    element: "water",
    modality: "mutable",
    birthstone: "아쿠아마린",
    birthstoneMeaning: ["평온", "치유", "순수함"],
    birthstoneImage: "/birthstones/aquamarine.jpg",
  },
];

export function getZodiacInfoByKey(key: string): ZodiacInfo | null {
  return zodiacSigns.find((sign) => sign.key === key) ?? null;
}

export function getZodiacSign(birthDate: string): ZodiacInfo | null {
  if (!birthDate) {
    return null;
  }

  const [yearText, monthText, dayText] = birthDate.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (!year || !month || !day) {
    return null;
  }

  const mmdd = month * 100 + day;

  if (mmdd >= 321 && mmdd <= 419) return zodiacSigns[0];
  if (mmdd >= 420 && mmdd <= 520) return zodiacSigns[1];
  if (mmdd >= 521 && mmdd <= 620) return zodiacSigns[2];
  if (mmdd >= 621 && mmdd <= 722) return zodiacSigns[3];
  if (mmdd >= 723 && mmdd <= 822) return zodiacSigns[4];
  if (mmdd >= 823 && mmdd <= 922) return zodiacSigns[5];
  if (mmdd >= 923 && mmdd <= 1022) return zodiacSigns[6];
  if (mmdd >= 1023 && mmdd <= 1121) return zodiacSigns[7];
  if (mmdd >= 1122 && mmdd <= 1221) return zodiacSigns[8];
  if (mmdd >= 1222 || mmdd <= 119) return zodiacSigns[9];
  if (mmdd >= 120 && mmdd <= 218) return zodiacSigns[10];
  if (mmdd >= 219 && mmdd <= 320) return zodiacSigns[11];

  return null;
}