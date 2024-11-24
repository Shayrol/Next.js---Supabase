![image](https://github.com/user-attachments/assets/01fa82b9-a6bd-4baf-a623-62b02db1737a)![image](https://github.com/user-attachments/assets/27e9cb2e-84b0-46c2-a486-132cdb5cd600)11/13 <br>
Next.js 에서 Supabase 사용하기 <br>
기존 파이어베이스보다 다루기 쉬운듯... <br>
로그인 / 로그아웃 <br>
게시물 등록 / 삭제 <br>
+ 로그인 한 유저만 등록 가능 <br>
로그인은 소셜 로그인을 통해 구현 - 현재 github만 구현함<br>

11/14 <br>
수정하기 추가 및 일정 게시물 개수만큼 불러오기 및 전체 게시물 개수 가져옴 <br>
검색 기능 외 모든 기능 구현은 했으나 말 그대로 기능만 구현 했음 성능 및 스타일 등 미흡함 <br>

1. 게시글 메인 페이지 구현하기 <br>
2. 검색, 페이지네이션 구현하기
3. 게시글 상세페이지 구현하기
4. 사용자 게시글 구분해 수정 삭제 버튼 표시하기
5. 이미지, 댓글, 대댓글 기능 구현하기 - 이미지 저장 생각하기
6. 추가 소셜 로그인 및 독자적 회원가입을 통해 로그인 페이지 및 회원가입 페이지 구현하기

이전 중고마켓 페이지를 만들었지만 이번 supabase를 통해 커뮤니티 사이트 만들어 보기

11/16 <br>
게시글 메인 페이지에서 게시글 목록 구현 완료 <br>
-- 커뮤니티의 자유, 유머, 질문 등등 분류 예정 <br>
-- 이미지 저장 및 커뮤니티 채널(유머, 자유 등) 구현하기 <br>
-- pagination 구현하기

1. pagination 구현
2. 게시글 상세페이지 구현
3. 로그인 및 페이지 구현

11/17 <br>
게시글 태그별 조회 추가 (table 추가) <br>
HTML 태그 요소 table, tr, td 에서 ul, li, section, div 등의 요소로 대체함 / 이유는 tr에 이미지 등록에 대한 에러가 있어 td로 감싸줬으나 계속 에러 발생... <br>

1. csr 구성하기 (page 이동 및 검색) ==> 태그는 클릭으로 해당 요청 함수 호출함 (이 후 캐싱 생각하기)
2. 태그 탭 / 페이지네이션 / 검색 구현
3. 검색에 대한 table 구성 하기
4. 로그인 구현
5. 상세페이지, 등록, 수정, 삭제 구현
6. 추천, 조회수, 댓글, 대댓글 구현

11/18 <br>
pagination 추가 + 해당 태그 별 게시물 총 개수 불러옴 <br>
queryString의 page, tag를 통해 해당 값으로 SSR 요청 <br>
pagination은 CSR 요청으로 router.push의 shallow: true 를 통해 url만 수정을 하고 <br>
useEffect를 통해 의존성 배열의 router.query의 tag, page 변경이 되면 실행하도록 했음 <br>


1. 로그인을 구현을 했지만 SSR을 통해 유저 정보를 관리를 하기 위해 _app.tsx 컴포넌트에 getServerSidePage를 통해 요청을 하고 Layout에 props로 넘겨준다. 또는 상태관리를 통해 정보를 전역으로 저장을 한다.
2. 로그인 페이지, 회원가입 페이지(회원가입 보류), 소셜로그인 카카오, 깃허브, 구글 등 추가하기 - 로그인 관리는 Layout의 Heaber로
3. 사이트 탭 - 게시물의 태그 구성인 "전체", "자유", "유머", "질문"으로 구성되어있는데 스타일 입히기

<br>
이후 해야할 것<br>
1. 게시물 검색 기능 like={%"text"%} 이걸로 단어 검색 할 수 있다함
2. 게시글 등록 시 작성자가 user_id로 출력이 되는데 로그인 시 데이터를 해당 table에 저장을하고 user_id가 있는 table과 참조하도록 해서 user 정보를 불러오도록 하기
3. 등록, 수정, 삭제 구현 및 페이지 만들기 (인증된 유저만 가능하게)

11/20 <br>
로그인 버튼 클릭 시 모달로 아이디 비번 입력 및 로그인 버튼 / 회원가입 버튼 구현 <br>
또한 소셜 로그인 카카오 / 구글 / 깃허브 생성 - (기능 구현 X)<br>
게시글 사이트 탭 생성 / 전체, 자유, 유머, 질문<br>

## 중간 결과
![testBoards](https://github.com/user-attachments/assets/10c0dea9-1328-4779-bdd8-374bada7eced) <br>
↑ 게시글 페이지 <br>
![testBoards-login](https://github.com/user-attachments/assets/39448643-62c8-4b53-9fe4-199399795ff2) <br>
↑ 로그인 모달 화면<br>

1. 소셜 로그인 구현 - 개인 회원가입 및 로그인은 X
2. 로그인 시 유저 정보 띄우기 - 헤더
3. 게시물 작성자 user_id 가 아닌 닉네임 표시 - 유저 테이블 추가해서 게시글 테이블과 연동하기
4. 최신, 인기(추천 수) 및 검색 구현
5. 등록, 수정, 삭제 구현


11/21 <br>
깃허브 로그인 구현했으며, users table을 추가해 로그인 시 email, name, created_at 등 저장할 수 있게 했으며<br>
해당 users table를 게시물 데이터가 있는 page table를 참조 할 수 있게 연결 했음 <br>
이로써 작성자 표시 가능 table 구현하는데 5시간... <br>

## 11/21 마무리 결과
![testBoards2](https://github.com/user-attachments/assets/c8505e95-4034-49ac-b5e4-421d7abbf131) <br>

문제해결 <br>
게시물 등록 후 시간 표시를 초 단위 부터 시작을 해 새로고침을 하면 서버와 클라의 값이 달라 에러가 발생함.. 하이드레이션 과정에서 문제 생김 <br>
<div>{시간계산함수(el.created_at)}</div> 이런식으로 구현을 했음 <br>
문제가 생긴 이후 <div>{el.created_at}</div> 이렇게 해주고 <br>
fetchQuery 함수에 return 하기전 미리 UTC 시간 로컬 시간 기준으로 변경해서 return 해서 해결함.


문제점? <br>
1. 서버 데이터 캐싱을 하지 않아 매번 data 요청이 일어남 -- 현재 page 데이터와 count 데이터로 2개의 data 요청이 계속 일어남
2. 요청 query 함수가 정갈 하지 않음.. -- 목적이 난잡하다? 게시물 가져오는 데이터 요청에 count, tag, page 등 많이 요청을 해결 및 반환을 하고 있음


이후 해야할 것<br>
1. 등록, 수정, 삭제 구현 - 급함
2. 소셜 로그인 카카오, 구글 구현 - 급함
3. 헤더 로그인 시 정보창 및 로그인 버튼 및 로그아웃 버튼 스타일 - 급함
4. 게시물 상세 페이지 - 급함
5. 게시물 댓글, 대댓글 - table 구현 머리 아픔..
6. 최신, 인기, 검색 구현 - 게시물 목록 id로 표시되어 있는데 인기(추천) 순으로 변경 예정 - 안 급함
7. 유저 닉네임 변경 및 프로필 사진 변경 구현 - 스토리지 생성하고 또 테이블 참조하는거 빼고는 쉬움 - 안 급함


11/22 <br>
소셜 로그인 시 #해시가 붙는 현상이 있었음 <br>
하루종일 해매다 Docs를 보고 다시 해본 결과 해결함 <br>
이유는 import { createClient } from "@supabase/supabase-js"; 으로 DB 연동으로 data 가져오거나 소셜 로그인을 진행 했는데 이는 <br>
CSR에서 인증이 필요없는 데이터를 가져오는 경우에서만 사용됨 즉 소셜 로그인은 되지만 #인 생긴 이유인 듯 함 <br>
그래서 "@supabase/ssr"을 설치를 해서 createBrowserClient를 사용을 해야 함 <br>
처음 사용했던 createClient와 동일하게 사용하면 됨 csr, ssr 요청이 되며 일반적인 데이터 요청에 사용 됨 <br>
로그인 후 유저 데이터, 유저가 등록한 게시물, 댓글, 로그인이 필요한 페이지 등의 데이터는 import { createServerClient, serializeCookieHeader } from "@supabase/ssr"; 을 사용해서 <br>
server-props.ts (Docs) 참고 - 이는 SSR 요청에서만 이루어짐

11/24 <br>
소셜 로그인 #(해시) 붙는 현상 해결 및 로그인 페이지 + 로그인 전용 페이지 구현(간략하게 접속만 구현함 / ssr로 유저 정보 확인 후 로그인 유저가 아니면 /login 페이지로 리다이렉트 함) <br>
반응형 디자인 구현함 / 헤더의 햄버거 버튼 및 유저 정보 클릭시 사이드 탭 등 구현 <br>

# 11/24 마무리 결과
![testBoards-login2](https://github.com/user-attachments/assets/bf520e59-d0e4-4a89-9e21-2351d494ae76) <br>
↑ 모바일 환경 로그인 페이지 <br>
![testBoards3](https://github.com/user-attachments/assets/7d720a35-01d3-42f7-b758-ce7f5692aa64) <br>
↑ 웹 메인 페이지 <br>
![testBoards4](https://github.com/user-attachments/assets/dee58b73-0958-4987-ba5a-55356cd48096) <br>
↑ 테블릿 메인 페이지 <br>
![testBoards5](https://github.com/user-attachments/assets/e73aadf1-db65-44d2-83e3-a596d07d45ec) <br>
↑ 모바일 메인 페이지 <br>

이후 해야할 것 <br>
1. 등록, 수정, 삭제 구현 - 급함
2. 로그인 후 유저 상태 정보 사이드 탭 구현 - 버튼만 구현하면 됨(로그아웃, 내정보 페이지, 등등)
3. 모바일 반응형 Nav 리스트 햄버거 버튼 기능 구현 - 모바일 환경 메뉴 탭 생성하기
4. 게시물 상세 페이지 - 급함
5. 게시물 댓글, 대댓글 - table 구현 머리 아픔..
6. 최신, 인기, 검색 구현 - 게시물 목록 id로 표시되어 있는데 인기(추천) 순으로 변경 예정 - 안 급함
7. 유저 닉네임 변경 및 프로필 사진 변경 구현 - 스토리지 생성하고 또 테이블 참조하는거 빼고는 쉬움 - 안 급함




