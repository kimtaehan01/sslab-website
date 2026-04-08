# DB 데이터 삽입 SQL

Railway **Database → Data** 탭의 쿼리 박스에 아래 SQL을 붙여넣고 실행하세요.  
테이블별로 나눠서 실행하는 것을 권장합니다.

---

## 1. users

```sql
INSERT INTO users (id, openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn) VALUES
(1, '4TXCaXKnNJXyFyyciYrCc5', '태한 김', 'radcard123@gmail.com', 'google', 'admin', '2026-03-04 07:13:49', '2026-04-08 05:52:19', '2026-04-08 05:52:19');
```

---

## 2. members

```sql
-- 교수
INSERT INTO members (id, name, nameEn, category, role, email, research, imageUrl, homepage, currentPosition, graduationYear, sortOrder, createdAt, updatedAt) VALUES
(30001, '장준혁', 'Junhyuk Jang', 'professor', '조교수 / 지도교수', 'jhjang@hnu.kr', '실시간 운영체제, 클라우드/엣지 컴퓨팅, 시스템 보안, 임베디드/IoT 시스템', NULL, NULL, NULL, NULL, 1, '2026-03-04 08:20:19', '2026-03-04 08:20:19');

-- 대학원생
INSERT INTO members (id, name, nameEn, category, role, email, research, imageUrl, homepage, currentPosition, graduationYear, sortOrder, createdAt, updatedAt) VALUES
(2, '김태한', 'Taehan Kim', 'graduate', '석사과정', 'radcard123@gmail.com', NULL, NULL, NULL, NULL, NULL, 0, '2026-03-04 07:29:42', '2026-03-04 07:29:42'),
(3, '신대현', 'Daehyeon Shin', 'graduate', '석사과정', 'daehyeonsin8@gmail.com', NULL, NULL, NULL, NULL, NULL, 0, '2026-03-04 07:30:27', '2026-03-04 07:31:55'),
(4, '박주찬', 'Juchan Park', 'graduate', '석사과정', 'sleepclock78@gmail.com', NULL, NULL, NULL, NULL, NULL, 0, '2026-03-04 07:31:13', '2026-03-04 07:32:20');

-- 학부연구생
INSERT INTO members (id, name, nameEn, category, role, email, research, imageUrl, homepage, currentPosition, graduationYear, sortOrder, createdAt, updatedAt) VALUES
(60001, '김권혁', 'Gwonhyeok Kim', 'undergraduate', '학부 4학년', 'wafer8182@gmail.com', NULL, NULL, NULL, NULL, NULL, 0, '2026-03-05 05:10:22', '2026-03-05 05:10:22');
```

---

## 3. researchAreas

```sql
INSERT INTO researchAreas (id, title, titleEn, description, topics, icon, imageUrl, sortOrder, createdAt, updatedAt) VALUES
(1, '실시간 운영체제', 'Real-Time Operating Systems', 'RTEMS, Linux 등 실시간 운영체제의 스케줄링 기법, SMP 지원, 빌드 자동화 프레임워크 등을 연구합니다. 특히 SPARC 아키텍처 기반 RTEMS 환경에서의 커스텀 스케줄러 개발과 성능 분석에 주력하고 있습니다.', 'RTEMS 스케줄링,SMP 멀티코어 지원,빌드 자동화 프레임워크,CFS 태스크 우선순위 제어,QoS 기반 스케줄링', 'Terminal', NULL, 1, '2026-03-04 08:19:24', '2026-03-04 08:19:24'),
(2, '클라우드 및 엣지 컴퓨팅', 'Cloud & Edge Computing', '클라우드 환경에서의 가상 머신 스케줄링, 엣지 서버 자원 관리, UAV-엣지 클라우드 오프로딩 등을 연구합니다. 에너지 효율적인 컴퓨테이션 오프로딩과 클라이언트 측 캐싱 기법을 통한 비용 절감 방안을 탐구합니다.', '가상 CPU 스케줄링,엣지 서버 스케줄링,UAV 컴퓨테이션 오프로딩,클라이언트 측 캐싱,라이브 마이그레이션', 'Cloud', NULL, 2, '2026-03-04 08:19:24', '2026-03-04 08:19:24'),
(3, '시스템 보안', 'System Security', '소프트웨어 저작권 보호를 위한 워터마킹 기법, 바이너리 구조 분석, 사이버보안 교육 환경 구축 등 시스템 수준의 보안 기술을 연구합니다. 위성 통신망 가상 환경을 활용한 사이버보안 교육 플랫폼 개발에도 참여하고 있습니다.', '소프트웨어 워터마킹,바이너리 구조 분석,사이버보안 교육,위성 통신망 보안,안드로이드 보안', 'Shield', NULL, 3, '2026-03-04 08:19:24', '2026-03-04 08:19:24'),
(4, '임베디드 및 IoT 시스템', 'Embedded & IoT Systems', 'BMC(Baseboard Management Controller) 하이브리드 부팅, 지능형 IoT 컴포넌트 자동 생성, 플래시 파일 시스템 최적화 등 임베디드 환경의 시스템 소프트웨어를 연구합니다. 디지털 소외계층을 위한 IoT 접근성 향상 연구도 수행합니다.', 'BMC 하이브리드 부팅,IoT 컴포넌트 자동 생성,플래시 파일 시스템,경량 TCP/IP 스택,드론 복구 시스템', 'Cpu', NULL, 4, '2026-03-04 08:19:24', '2026-03-04 08:19:24');
```

---

## 4. publications

```sql
-- 2025년 논문
INSERT INTO publications (id, title, authors, venue, year, category, doi, link, abstract, sortOrder, createdAt, updatedAt) VALUES
(1, 'RTEMS 커스텀 스케줄러를 위한 빌드 자동화 프레임워크', '김태한, 박성민, 허금숙, 장준혁', '한국정보처리학회', 2025, 'journal', '10.3745/TKIPS.2025.14.12.1091', 'https://tkips.kips.or.kr/digital-library/105436', 'RTEMS(Real-Time Executive for Multiprocessor Systems)는 사용자 정의 스케줄러 통합을 지원하는 유연한 커널 구조를 제공한다. 그러나 6.1 버전부터 Waf 빌드 시스템으로 전환되면서 통합 과정이 복잡해지고, 다수의 설정 파일을 수동으로 편집해야 하는 문제로 빌드 오류가 빈번하게 발생하였다. 이를 해결하기 위해 본 연구는 RTEMS Custom Scheduler Framework를 제안한다. 본 프레임워크는 코드 템플릿 생성, 설정 파일 등록, 커널 빌드 실행을 자동화하여 기존 4∼5단계의 절차를 GUI 기반 단일 단계로 단축한다. 그 결과, priority, simple, EDF 스케줄러 통합에서 성공하였으며, 실시간 커널 확장 개발의 효율성, 안정성, 편의성이 향상되었음을 입증하였다.', 0, '2026-03-04 07:47:12', '2026-03-04 07:48:45'),
(30002, 'RTEMS SMP 지원 현황 및 스케줄링 기법 분석', '장준혁 외', '스마트미디어저널', 2025, 'journal', NULL, NULL, NULL, 2, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30003, 'SMP 기반 RTEMS 운영체제 환경에서의 스케줄링 성능 분석', '장준혁 외', '정보처리학회논문지', 2025, 'journal', NULL, NULL, NULL, 3, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30004, 'RTEMS 운영체제를 위한 개발 자동화 프레임워크 설계 및 구현', '장준혁 외', '스마트미디어저널', 2025, 'journal', NULL, NULL, NULL, 4, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30005, '백엔드 서비스 기반 시스템의 비용 절감을 위한 클라이언트 측 캐싱 기법 설계 및 구현', '장준혁 외', '스마트미디어저널', 2025, 'journal', NULL, NULL, NULL, 5, '2026-03-04 08:19:43', '2026-03-04 08:19:43');

-- 2025년 저서
INSERT INTO publications (id, title, authors, venue, year, category, doi, link, abstract, sortOrder, createdAt, updatedAt) VALUES
(30022, 'SPARC 환경 실시간 운영체제 RTEMS 실습', '장준혁', '예림디자인', 2025, 'other', NULL, NULL, NULL, 22, '2026-03-04 08:20:08', '2026-03-04 08:20:08');

-- 2024년 저서
INSERT INTO publications (id, title, authors, venue, year, category, doi, link, abstract, sortOrder, createdAt, updatedAt) VALUES
(30023, 'JAVA로 배우는 자료구조 - 알고리즘 공부를 위한 실전적 자료구조', '장준혁', '홍릉', 2024, 'other', NULL, NULL, NULL, 23, '2026-03-04 08:20:08', '2026-03-04 08:20:08'),
(30024, 'PYTHON으로 배우는 자료구조', '장준혁', '홍릉', 2024, 'other', NULL, NULL, NULL, 24, '2026-03-04 08:20:08', '2026-03-04 08:20:08');

-- 2023년 논문
INSERT INTO publications (id, title, authors, venue, year, category, doi, link, abstract, sortOrder, createdAt, updatedAt) VALUES
(30006, 'Hybrid booting with incremental hibernation for the baseboard management controllers', 'Junhyuk Jang et al.', 'Journal of Supercomputing (SCIE)', 2023, 'journal', NULL, NULL, NULL, 6, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30007, 'A Dynamic Checkpoint Interval Decision Algorithm for Live Migration-Based Drone-Recovery System', 'Junhyuk Jang et al.', 'Drones (SCIE)', 2023, 'journal', NULL, NULL, NULL, 7, '2026-03-04 08:19:43', '2026-03-04 08:19:43');

-- 2022년 이전 논문
INSERT INTO publications (id, title, authors, venue, year, category, doi, link, abstract, sortOrder, createdAt, updatedAt) VALUES
(30008, 'Intelligent IoT Component Auto-Generation Framework', 'Junhyuk Jang et al.', 'IEEE Access (SCIE)', 2022, 'journal', NULL, NULL, NULL, 8, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30009, 'Flash File System Optimization for Embedded Systems', 'Junhyuk Jang et al.', 'Journal of Systems and Software (SCIE)', 2022, 'journal', NULL, NULL, NULL, 9, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30010, 'Lightweight TCP/IP Stack for IoT Devices', 'Junhyuk Jang et al.', 'Embedded Systems Letters (SCIE)', 2021, 'journal', NULL, NULL, NULL, 10, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30011, 'Cybersecurity Education Platform using Satellite Network Virtualization', 'Junhyuk Jang et al.', 'Computers & Security (SCIE)', 2021, 'journal', NULL, NULL, NULL, 11, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30012, 'Software Watermarking Techniques for Copyright Protection', 'Junhyuk Jang et al.', 'ACM Transactions on Software Engineering and Methodology (SCIE)', 2020, 'journal', NULL, NULL, NULL, 12, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30013, 'Binary Structure Analysis for Vulnerability Detection', 'Junhyuk Jang et al.', 'IEEE Transactions on Software Engineering (SCIE)', 2020, 'journal', NULL, NULL, NULL, 13, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30014, 'Virtual Machine Scheduling in Cloud Environments', 'Junhyuk Jang et al.', 'Journal of Cloud Computing (SCIE)', 2019, 'journal', NULL, NULL, NULL, 14, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30015, 'Edge Server Resource Management for IoT Applications', 'Junhyuk Jang et al.', 'Future Generation Computer Systems (SCIE)', 2019, 'journal', NULL, NULL, NULL, 15, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30016, 'UAV-Edge Cloud Offloading Strategy', 'Junhyuk Jang et al.', 'IEEE Internet of Things Journal (SCIE)', 2018, 'journal', NULL, NULL, NULL, 16, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30017, 'Real-Time Scheduling Algorithms for RTEMS', 'Junhyuk Jang et al.', 'ACM Transactions on Embedded Computing Systems (SCIE)', 2018, 'journal', NULL, NULL, NULL, 17, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30018, 'Energy-Efficient Computation Offloading', 'Junhyuk Jang et al.', 'IEEE Transactions on Mobile Computing (SCIE)', 2017, 'journal', NULL, NULL, NULL, 18, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30019, 'Client-Side Caching for Backend Services', 'Junhyuk Jang et al.', 'IEEE Transactions on Parallel and Distributed Systems (SCIE)', 2017, 'journal', NULL, NULL, NULL, 19, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30020, 'IoT Accessibility for Digital Divide Reduction', 'Junhyuk Jang et al.', 'ACM Transactions on Computing for Social Good', 2016, 'journal', NULL, NULL, NULL, 20, '2026-03-04 08:19:43', '2026-03-04 08:19:43'),
(30021, 'Compiler Optimization Techniques for Embedded Systems', 'Junhyuk Jang et al.', 'Software: Practice and Experience (SCIE)', 2016, 'journal', NULL, NULL, NULL, 21, '2026-03-04 08:19:43', '2026-03-04 08:19:43');
```
