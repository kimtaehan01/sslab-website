# Data Check Results

## Issues Found
1. Members 페이지에 장준혁 교수님이 2번 표시됨 - 하드코딩된 기본 데이터와 DB 데이터가 동시에 표시
2. Publications 페이지 상단에 하드코딩된 기본 데이터 1건이 DB 데이터와 중복

## Action Required
- Members.tsx의 기본 하드코딩 데이터 제거 필요
- Publications.tsx의 기본 하드코딩 데이터 제거 필요
- DB에 데이터가 있으면 기본 데이터를 표시하지 않도록 로직 수정
