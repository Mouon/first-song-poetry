# 첫소절

Next.js App Router + TypeScript. 이름을 입력하면 노래를 추천하고 가사, 커버, 편지를 보여줍니다.

## 실행

Node.js 20.9 이상에서 `pnpm install`, `pnpm dev`를 실행하세요. 포트는 3000입니다. 프로덕션은 `pnpm build` 후 `pnpm start`입니다.

## 노래 추가

`src/data/songs.json` 배열에 새 객체를 추가하면 추천 목록, 목차, 곡 페이지에 자동 반영됩니다. 별도의 화면 수정은 필요 없습니다.

- `id`: 고유하고 영구적인 영문 slug. 공유 주소에 사용하므로 기존 값은 바꾸지 않습니다.
- `number`: 목차 번호
- `title`, `artist`, `album`, `year`: 곡 정보
- `lyric`: 대표 가사. 직접 인용한 가사 대신 소개 메시지를 쓰는 경우 `lyricKind`를 `"message"`로 설정하면 메시지임을 표시합니다. `extraLyric`는 선택 필드입니다.
- `cover`: 정사각형 고해상도 커버 URL
- `source`: 공식 곡 또는 앨범 정보 URL
- `theme`: 짧은 소개
- `letter`: `{ "text": "{이름}님의 앞으로의 날들을 응원해요.", "emphasis": false }` 형태의 문단 배열
- `melonId`, `floId`: 선택 필드. 있으면 해당 곡으로 연결하고 없으면 아티스트와 제목으로 검색합니다.

타입은 `src/lib/songs.ts`, 음악 서비스 연결은 `src/lib/music-links.ts`에서 관리합니다. 아티스트명과 전체 곡 수는 데이터에서 읽습니다. 추천 버튼을 누를 때마다 무작위로 곡을 고릅니다. 브라우저 세션 저장소에 직전 곡 ID만 보관하여 두 곡 이상이면 연속 중복을 피합니다. 이름은 추천 결과에 영향을 주지 않으며 기존 공유 URL은 그대로 유지됩니다.

이름은 URL fragment에만 들어가 서버로 전송되지 않습니다. 공유 시 이름이 포함됩니다. 모바일 앱 실행은 OS와 앱 설치 상태에 따라 달라지므로 실제 iOS/Android 검증이 필요합니다. 실패 시 웹 링크를 제공합니다.

커버 출처는 각 곡의 source 필드에 기록했습니다. 가사와 편지는 제공된 원문을 사용합니다. 폰트 라이선스는 public/fonts/OFL.txt에 있습니다.
