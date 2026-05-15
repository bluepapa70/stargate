# StarGate

생년월일을 입력하면 태양 별자리를 계산해 오늘의 운세를 보여주는 Next.js 기반 웹 서비스입니다.

## 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열면 확인할 수 있습니다.

## 주요 구조

- 화면: src/app/page.tsx
- 상세 결과 페이지: src/app/horoscope/[date]/[sign]/page.tsx
- 궁합 페이지: src/app/compatibility/[sign]/[match]/page.tsx
- 별자리 계산: src/lib/zodiac.ts
- 운세 데이터 로더: src/lib/horoscope-data.ts
- 날짜별 운세 데이터: src/data/horoscopes.json
- 주간·월간 데이터: src/data/forecast-extensions.json

## 공유 가능한 상세 URL

상세 결과는 날짜와 별자리 키를 포함한 URL로 분리됩니다.

예시:

```text
/horoscope/2026-05-15/aries
```

홈에서 생년월일을 입력하면 별자리를 계산한 뒤 이 상세 URL로 이동합니다. 각 상세 페이지는 별도 메타데이터를 생성하므로 공유나 검색 유입에 사용할 수 있습니다.

## 2차 기능

- 주간운과 월간운은 별자리 상세 페이지에 함께 노출됩니다.
- 추천 궁합은 별자리 상세 페이지 우측 영역에서 바로 탐색할 수 있습니다.
- 궁합 상세는 별도 URL로 분리되어 공유할 수 있습니다.
- 궁합 상세는 공유 버튼과 route-level OG 이미지까지 지원합니다.

예시:

```text
/compatibility/aries/leo
```

## 날짜별 운세 운영 방법

운세 문구는 코드에 하드코딩하지 않고 JSON 파일에서 읽습니다.

기본 구조는 아래와 같습니다.

```json
{
	"default": {
		"aries": {
			"headline": "기본 운세 문구"
		}
	},
	"overrides": {
		"2026-05-15": {
			"aries": {
				"headline": "특정 날짜에만 노출할 문구"
			}
		}
	}
}
```

운영 규칙은 단순합니다.

1. default는 날짜 지정이 없을 때 사용하는 기본 운세입니다.
2. overrides 아래에 YYYY-MM-DD 형식으로 날짜를 추가하면 그 날짜에만 해당 문구가 덮어쓰기됩니다.
3. 한 별자리의 일부 필드만 넣어도 됩니다. 나머지는 default 값을 그대로 사용합니다.

예를 들어 2026년 5월 16일 양자리 운세 headline만 바꾸고 싶다면 src/data/horoscopes.json 의 overrides 아래에 다음처럼 추가하면 됩니다.

```json
"2026-05-16": {
	"aries": {
		"headline": "새로운 기준이 흐름을 바꾸는 하루입니다."
	}
}
```

## 주간운·월간운 운영 방법

주간운과 월간운도 날짜별 오버라이드 구조로 운영합니다. 파일은 src/data/forecast-extensions.json 입니다.

구조는 아래와 같습니다.

```json
{
	"weekly": {
		"default": {
			"aries": {
				"headline": "기본 주간운"
			}
		},
		"overrides": {
			"2026-05-15": {
				"aries": {
					"headline": "특정 날짜 기준 주간운 문구"
				}
			}
		}
	},
	"monthly": {
		"default": {
			"aries": {
				"headline": "기본 월간운"
			}
		},
		"overrides": {
			"2026-05-15": {
				"aries": {
					"headline": "특정 날짜 기준 월간운 문구"
				}
			}
		}
	}
}
```

운영 규칙은 일간운과 같습니다.

1. default는 기본 문구입니다.
2. overrides 아래에 날짜를 추가하면 해당 날짜 기준 상세 페이지에서만 덮어씁니다.
3. 일부 필드만 넣어도 되고, 나머지는 default 값을 그대로 사용합니다.

## 검증 명령

```bash
npm run lint
npm run build
```
