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
};

export const zodiacSigns: ZodiacInfo[] = [
  {
    key: "aries",
    name: "양자리",
    dateRange: "3월 21일 - 4월 19일",
    summary: "빠른 결단이 강점이 되는 날",
    element: "fire",
    modality: "cardinal",
  },
  {
    key: "taurus",
    name: "황소자리",
    dateRange: "4월 20일 - 5월 20일",
    summary: "작은 안정이 큰 만족으로 이어지는 날",
    element: "earth",
    modality: "fixed",
  },
  {
    key: "gemini",
    name: "쌍둥이자리",
    dateRange: "5월 21일 - 6월 20일",
    summary: "대화와 정보가 기회를 만드는 날",
    element: "air",
    modality: "mutable",
  },
  {
    key: "cancer",
    name: "게자리",
    dateRange: "6월 21일 - 7월 22일",
    summary: "감정의 균형이 운을 좌우하는 날",
    element: "water",
    modality: "cardinal",
  },
  {
    key: "leo",
    name: "사자자리",
    dateRange: "7월 23일 - 8월 22일",
    summary: "존재감이 자연스럽게 드러나는 날",
    element: "fire",
    modality: "fixed",
  },
  {
    key: "virgo",
    name: "처녀자리",
    dateRange: "8월 23일 - 9월 22일",
    summary: "정리와 조율이 성과를 높이는 날",
    element: "earth",
    modality: "mutable",
  },
  {
    key: "libra",
    name: "천칭자리",
    dateRange: "9월 23일 - 10월 22일",
    summary: "관계의 균형이 흐름을 바꾸는 날",
    element: "air",
    modality: "cardinal",
  },
  {
    key: "scorpio",
    name: "전갈자리",
    dateRange: "10월 23일 - 11월 21일",
    summary: "집중력이 깊이를 만드는 날",
    element: "water",
    modality: "fixed",
  },
  {
    key: "sagittarius",
    name: "사수자리",
    dateRange: "11월 22일 - 12월 21일",
    summary: "가볍게 움직일수록 길이 열리는 날",
    element: "fire",
    modality: "mutable",
  },
  {
    key: "capricorn",
    name: "염소자리",
    dateRange: "12월 22일 - 1월 19일",
    summary: "꾸준함이 신뢰로 돌아오는 날",
    element: "earth",
    modality: "cardinal",
  },
  {
    key: "aquarius",
    name: "물병자리",
    dateRange: "1월 20일 - 2월 18일",
    summary: "새로운 발상이 전환점을 만드는 날",
    element: "air",
    modality: "fixed",
  },
  {
    key: "pisces",
    name: "물고기자리",
    dateRange: "2월 19일 - 3월 20일",
    summary: "직감이 예상보다 정확하게 작동하는 날",
    element: "water",
    modality: "mutable",
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