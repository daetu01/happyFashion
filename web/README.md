# Aura — 프론트엔드

Aura의 Vite + React + TypeScript 프론트엔드입니다. 전체 프로젝트 개요, 백엔드 설정, API 레퍼런스는 [저장소 루트 README](../README.md)를 참고하세요.

## 스크립트

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 실행 (http://localhost:5173), /api는 localhost:8080으로 프록시됨
npm run build    # 타입 체크(tsc -b) 후 프로덕션 빌드
npm run preview  # 프로덕션 빌드 로컬 미리보기
npm run lint     # ESLint 실행
```

개발 서버는 `/api/*` 요청을 Spring Boot 백엔드(`http://localhost:8080`)로 프록시합니다(`vite.config.ts` 참고). 검색·로그인·좋아요·플레이리스트 기능을 사용하려면 백엔드가 함께 실행 중이어야 합니다.
