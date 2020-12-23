/*
- room: 채팅방 이름
- msg = 메세지
- sender = 메세지 보낸 사람
- isGroupChat = 그룹 채팅 여부
- replier = 답장 오브젝트 ( 자동 답장을 할 때 쓰입니다 )
- imageDB와 packageName은 당장은 신경쓰지 않아도 괜찮습니다.*/

// 개인 채팅방

let allSee = new Array(1000).join(String.fromCharCode(847));

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    if (msg == '/기능') {
        replier.reply('Made by 영우\n\n📍 기능 ' + allSee + '\n\n👉🏽 인사\n👉🏽 가위바위보\n👉🏽 날씨\n👉🏽 실시간 지하철 정보\n👉🏽 번역(koToEn, enToKo) 기능');
    }

    if (msg == '/명령어') {
        replier.reply('다음과 같이 입력하면 영우봇이 대답을 해줍니다.\n\n' + allSee + '\n\n👉🏽 안녕 \n👉🏽 가위 / 바위 / 보 \n👉🏽 /모든영화\n👉🏽 /현재영화\n👉🏽 /영어 hello\n👉🏽 /영어 안녕');
    }

    if (msg == '/패치노트') {
        replier.reply('📍 패치노트 ' + allSee + '\n\n20201218 ver.1 \n\n👉🏽 기능, 패치노트추가 \n\n20201219 ver.1.1 \n\n👉🏽 가위바위보, 번역추가\n\n20201222 ver.1.2 \n\n👉🏽 네이버 실시간 모든 / 현재상영 영화 순위')
    }

    if (msg.indexOf('안녕') == 0) {
        replier.reply('안녕하세요!' + sender + '님! 저는 영우봇입니다. :)\n 만나서 반가워요!')
    }

    // 실시간 지하철 API
    if (msg.indexOf('/지하철') == 0) {
        let string = msg.substring(3);
        let apiKey = '486966706a6162633732727757474b';
        let subwayData = Utils.getWebText('http://swopenapi.seoul.go.kr/api/subway/' + apiKey + '/json/realtimeStationArrival/0/10/' + encodeURI(string));
        let json = subwayData.replace(/(<([^>]+)>)/ig, '');
        replier.reply(subwayData)

        // [ string역 실시간 도착정보 ]
        // recptnDt: "2020-12-23 17:45:39.0"
        // trainLineNm: "청량리행 - 세류방면"
        // subwayHeading: 오른쪽
        // 도착정보(arvlMsg2): 병점 진입
        // 현재위치(arvlMsg3): 병점 

    }


    // // 실시간검색어(실시간 순위가 `parsing` 되지 않아 미완성)
    // if (msg.indexOf('/실검') == 0) {

    //     let data = Utils.getWebText('https://datalab.naver.com/keyword/realtimeList.naver?where=main');
    //     let twenTy = Utils.parse('https://datalab.naver.com/keyword/realtimeList.naver?age=20s&where=main');
    //     replier.reply(twnTy);

    //     // 날짜, 시간 알려주는 기능
    //     let ymdTimeSplit = data.split('data-time="')[1].split('"')[0];
    //     let ymdSplit = ymdTimeSplit.split('T')[0];
    //     let timeSplit = ymdTimeSplit.split('T')[1];
    //     let ymdTime = ymdSplit + ' ' + timeSplit + ' 기준 네이버 실시간검색어 입니다.';
    //     replier.reply(ymdTime);
    // }

    // 네이버 모든영화 평점순위
    if (msg.indexOf('/모든영화') == 0) {
        let parsing = org.jsoup.Jsoup.connect('https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=pnt&date').get();
        let ymds = datas.select('p.r_date') + '';
        let ymd = ymds.replace(/(<([^>]+)>)/ig, '');

        let data = parsing.select('#old_content > table > tbody > tr')

        let ranks = data.select('td.title > div > a') + '';
        ranks = ranks.replace(/(<([^>]+)>)/ig, '');
        let rank = ranks.split('\n');

        let stars = data.select('td.point') + '';
        stars = stars.replace(/<[^>]+>/g, '');
        let star = stars.split('\n');

        let result = '';
        for (let i = 0; i < 10; i++) {
            result = result + (i + 1) + "위: " + rank[i] + ' ' + star[i] + '\n';
        }

        replier.reply('[ 📍 ' + ymd + '기준 모든영화 평점순위(네이버) ] \n\n' + result.trim());
    }

    // 네이버 현재 상영영화 평점순위
    if (msg.indexOf('/현재상영영화') == 0) {
        let parsing = org.jsoup.Jsoup.connect('https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=cur&date').get();
        let ymds = datas.select('p.r_date') + '';
        let ymd = ymds.replace(/(<([^>]+)>)/ig, '');

        let data = parsing.select('#old_content > table > tbody > tr')

        let ranks = data.select('td.title > div > a') + '';
        ranks = ranks.replace(/(<([^>]+)>)/ig, '');
        let rank = ranks.split('\n');

        let stars = data.select('td.point') + '';
        stars = stars.replace(/<[^>]+>/g, '');
        let star = stars.split('\n');

        let result = '';
        for (let i = 0; i < 10; i++) {
            result = result + (i + 1) + "위: " + rank[i] + ' ' + star[i] + '\n';
        }

        replier.reply('[ 📍 ' + ymd + '기준 현재상영영화 평점순위(네이버) ] \n\n' + result.trim());
    }

    // 번역
    if (msg.indexOf('/영어') == 0) {
        let replace = msg.replace('/영어', '');
        let koToEn = Api.papagoTranslate('ko', 'en', replace);
        replier.reply(koToEn);
    }

    if (msg.indexOf('/한글') == 0) {
        let replace = msg.replace('/한글', '');
        let enToKo = Api.papagoTranslate('en', 'ko', replace);
        replier.reply(enToKo);
    }


    // 가위바위보
    if (msg == '가위' || msg == '바위' || msg == '보') {
        let RSP = ['가위', '바위', '보'];
        RSP_bot = RSP[Math.floor(Math.random() * 3)];
        replier.reply(RSP_bot);

        if (msg === RSP_bot) {
            replier.reply('비겼습니다.');
        } else if (msg == '가위' && RSP_bot == '바위', msg == '보' && RSP_bot == '가위', msg == '바위' && RSP_bot == '보') {
            replier.reply(sender + '님이 졌습니다.');
        } else {
            replier.reply(sender + '님이 이겼습니다.');
        }
    }
}

// 그룹 채팅방
function response(room, msg, sender, isGroupChat, replier, imageDB) {
    if (isGroupChat == true) {
        if (msg == '안녕') {
            replier.reply(room, '안녕하세요! 저는 영우봇입니다. :)');
        }
    }
}

