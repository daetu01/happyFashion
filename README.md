# Aura

Aura는 사용자의 사진, 음악 취향, 관심사를 분석해서 공유 가능한 "Aura Score"와 성향(vibe) 프로필을 생성해주는 서비스입니다. Spotify Wrapped / Apple Music 느낌의 다크 글래스모피즘 UI로 만들었습니다.

이 저장소는 두 개의 프로젝트로 구성된 모노레포입니다.

```
vibeScan/
├── music/   Spring Boot 백엔드 (Java 21, Gradle)
└── web/     Vite + React 프론트엔드
```

## 주요 기능

- **Aura 플로우** — Landing → Upload(사진/음악 취향/관심사 입력) → 애니메이션 Analysis 화면 → Results(점수, 성향 타입, 스탯 분석, 비슷한 아티스트, 패션 매치, 컬러 팔레트) → Share(인스타그램/틱톡/X/디스코드용 공유 카드 다운로드). 점수/성향 자체는 사용자의 입력값을 시드로 한 PRNG로 프론트엔드에서 만들어내는 것이라, 아직 실제 AI 모델이 붙어있지는 않습니다.
- **계정** — 이메일/비밀번호 회원가입 및 로그인(JWT), 세션은 `localStorage`에 저장됩니다.
- **실제 음악 검색** — 검색 결과는 목업이 아니라 백엔드의 iTunes Search API 연동을 통해 받아옵니다.
- **좋아요 & 플레이리스트** — 곡 좋아요, 플레이리스트 생성/삭제, 곡 추가/제거를 모두 지원하며 Library 페이지에서 한눈에 볼 수 있습니다.
- **곡 상세보기** — Library나 플레이리스트에서 곡을 클릭하면 큰 앨범아트, 앨범/장르/발매일 정보, 30초 미리듣기, Apple Music으로 이동하는 링크가 있는 상세 모달이 열립니다.

## 기술 스택

**프론트엔드** (`web/`): Vite, React 19, TypeScript, Tailwind CSS v4, Framer Motion, React Router v7, lucide-react, html-to-image.

**백엔드** (`music/`): Spring Boot 4 (Java 21), Spring Security + JWT, Spring Data JPA + MySQL, Spring WebFlux (iTunes/Spotify 호출용).

## 시작하기

### 사전 준비물

- Java 21
- Node 18 이상
- Docker (MySQL 구동용) — 또는 로컬 MySQL

### 1. 데이터베이스

백엔드는 `localhost:3306`에 `music`이라는 이름의 데이터베이스가 떠 있어야 합니다 (계정 정보는 `music/src/main/resources/application.yaml` 참고). 가장 간단한 방법:

```bash
docker run -d --name mysql -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root1234 \
  -e MYSQL_DATABASE=music \
  mysql:8.2
```

### 2. 백엔드 환경 변수

`music/.env` 파일(.gitignore에 포함됨)을 만들고 아래 값을 채워주세요.

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
JWT_SECRET=...
```

### 3. 백엔드 실행

```bash
cd music
./gradlew bootRun
```

`http://localhost:8080`에서 실행됩니다.

### 4. 프론트엔드 실행

```bash
cd web
npm install
npm run dev
```

`http://localhost:5173`에서 실행됩니다. 개발 환경에서는 Vite가 `/api/*` 요청을 `http://localhost:8080`으로 프록시하므로(`web/vite.config.ts` 참고), 검색·로그인·좋아요·플레이리스트 기능을 쓰려면 백엔드가 함께 떠 있어야 합니다.

## API 개요

| Method | Path | 인증 | 설명 |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | — | 회원가입 |
| POST | `/api/auth/login` | — | 로그인, JWT 액세스 토큰 반환 |
| GET | `/api/users/me` | ✓ | 내 정보 조회 |
| GET | `/api/music/search?keyword=` | ✓ | 곡 검색 (iTunes Search API 프록시) |
| POST | `/api/music/likes` | ✓ | 곡 좋아요 |
| GET | `/api/music/likes` | ✓ | 좋아요한 곡 목록 |
| DELETE | `/api/music/likes/{likedMusicId}` | ✓ | 좋아요 취소 |
| GET | `/api/playlists` | ✓ | 내 플레이리스트 목록 |
| POST | `/api/playlists` | ✓ | 플레이리스트 생성 |
| GET | `/api/playlists/{id}` | ✓ | 플레이리스트 상세(곡 목록 포함) |
| POST | `/api/playlists/{id}/musics` | ✓ | 플레이리스트에 곡 추가 |
| DELETE | `/api/playlists/{id}/musics/{playlistMusicId}` | ✓ | 플레이리스트에서 곡 제거 |
| DELETE | `/api/playlists/{id}` | ✓ | 플레이리스트 삭제 |

`/api/music/search`는 Spring Security 설정상 `permitAll`로 등록되어 있지만, 컨트롤러 내부에서 인증된 사용자 정보를 그대로 사용하기 때문에 실제로는 로그인하지 않으면 403이 발생합니다. 프론트엔드도 이 엔드포인트를 로그인 필요 기능으로 취급하고 있습니다.

## 아직 프론트엔드에 연결되지 않은 기능

백엔드에는 무드 기반 추천 엔진(`GET /api/recommend`)과 검색 기록 엔드포인트(`GET`/`DELETE /api/music/search-histories`)가 이미 구현되어 있지만, 아직 화면에서는 호출하고 있지 않습니다.
