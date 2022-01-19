# YW_bot
 메세지 봇과 안드로이드를 이용한 사이드 프로젝트
 
### ❏ Preview
 
![](https://images.velog.io/images/abcd8637/post/58e7ec21-f3b9-4de9-88a4-941d15c4d934/%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE%E1%84%87%E1%85%A9%E1%86%BA.gif)
 
### ❏ 작동 원리
- 엔진: `Rhino JavaScript`
- 수신: `NotificationListenerService` → 알람 `parsing` →  `wearOS(App)` → `메세지 봇` 
- 송신: `WearableExtender` → `wearOS(App)` → `카카오톡`
- 운영체제: `Android`
- 프로그램: `VS_Code`

### ❏ 작동 기능
- 기본API: <a href='https://kkotbot-docs.kro.kr/'>KakaoTalk bot Docs</a>

### ❏ 작동 기능
- 가위바위보
- 번역기능(<a href='https://developers.naver.com/docs/papago/README.md'>PAPAGO translate API</a>)
- 네이버 실시간 영화순위(<a href='https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=pnt&date=20220118'>모든영화</a>, <a href='https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cur&date=20220118'>현재 상영중인 영화</a>)
- 실시간 지하철 현황 (<a href='https://data.seoul.go.kr/dataList/OA-15799/A/1/datasetView.do'>서울시 열린데이터 광장 - 지하철 실시간 도착정보 API</a>)
- 실시간 따릉이 현황(예정)
- 동네별 미세먼지 농도(예정)
- 오늘 날씨(예정)
