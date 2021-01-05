/*
- room: 채팅방 이름
- msg = 메세지
- sender = 메세지 보낸 사람
- isGroupChat = 그룹 채팅 여부
- replier = 답장 오브젝트 ( 자동 답장을 할 때 쓰입니다 )
- imageDB와 packageName은 당장은 신경쓰지 않아도 괜찮습니다.*/

// 개인 채팅방

let allSee = new Array(1000).join(String.fromCharCode(847));
let readCount = 0;

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    
    if (msg == '/기능') {
        replier.reply('Made by 영우\n\n📍 기능 ' + allSee + '\n\n👉🏽 인사\n👉🏽 가위바위보\n👉🏽 실시간 지하철 정보\n👉🏽 번역(영어, 일본어)\n👉🏽 현재상영/모든영화 평점순위 기능');
    }

    if (msg == '/명령어') {
        replier.reply('🤖 다음과 같이 입력하세요. 🤖' + allSee + '\n\n👉🏽 안녕 \n👉🏽 가위 / 바위 / 보 \n👉🏽 /모든영화\n👉🏽 /현재영화\n👉🏽 /한영 안녕하세요\n👉🏽 /영한 hello\n👉🏽 /한일\n👉🏽 /일한 こんにちは\n👉🏽 /지하철 수원');
    }

    if (msg == '/패치노트') {
        replier.reply('📍 패치노트 ' + allSee + '\n\n20201218 ver.1 \n\n👉🏽 기능, 패치노트추가 \n\n20201219 ver.1.1 \n\n👉🏽 가위바위보, 번역추가\n\n20201222 ver.1.2 \n\n👉🏽 네이버 실시간 모든 / 현재상영 영화 순위\n\n20201224 ver.1.3 \n\n👉🏽 실시간 지하철 API 연동 \n\n20210104 ver.2.1 \n\n👉🏽 채팅방 자동읽음 기능  ')
    }

    if (msg.indexOf('안녕') == 0) {
        replier.reply('안녕하세요!' + sender + '님! 저는 영우봇입니다. :)\n 만나서 반가워요!')
    }

    //  채팅 자동읽음
    if(msg){
        replier.markAsRead();
    }

    // 실시간 지하철 API
    if (msg.indexOf('/지하철') == 0) {
        try {
            let string = msg.substring(5);
            let apiKey = '486966706a6162633732727757474b';
            let subwayData = JSON.parse(Jsoup.connect('http://swopenapi.seoul.go.kr/api/subway/' + apiKey + '/json/realtimeStationArrival/0/5/' + encodeURI(string)).ignoreContentType(true).get().text());

            let datas = subwayData['realtimeArrivalList'];

            let array = []

            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];

                let time = data['recptnDt'].split('.')[0];
                let direct = data['trainLineNm'];
                let arrive1 = data['arvlMsg2'];
                let arrive2 = data['arvlMsg3'];

                let timeData = JSON.stringify(time)
                let directData = JSON.stringify(direct)
                let arriveData1 = JSON.stringify(arrive1)
                let arriveData2 = JSON.stringify(arrive2)


                let result = timeData.replace(/"([^"]+)":/g, '') + '기준\n' + string + '역 실시간 지하철 정보입니다. \n방향: ' + directData.replace(/"([^"]+)":/g, '') + '\n도착정보: ' + arriveData1.replace(/"([^"]+)":/g, '') + '\n현재위치: ' + arriveData2.replace(/"([^"]+)":/g, '') + '\n\n';
                array = array + result
            }
            replier.reply('📍' + string + '역 검색결과\n\n' + allSee + array);
        } catch (e) {
            replier.reply('🤖 정확한 역을 입력해주세요. 🤖');
        }
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

    // 메세지가 300개면 자동으로 읽음 처리
    // if (readCount == 300) {
    //     replier.reply('메세지를 자동으로 읽습니다.');
    //     readCount = 0;
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
            result = result + (i + 1) + "위: " + rank[i] + ' ' + star[i] + '\n\n';
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
    if (msg.indexOf('/한영') == 0) {
        let replace = msg.replace('/한영', '');
        let koToEn = Api.papagoTranslate('ko', 'en', replace);
        replier.reply(koToEn);
    }

    if (msg.indexOf('/영한') == 0) {
        let replace = msg.replace('/영한', '');
        let enToKo = Api.papagoTranslate('en', 'ko', replace);
        replier.reply(enToKo);
    }

    if (msg.indexOf('/한일') == 0) {
        let replace = msg.replace('/한일', '');
        let koToJa = Api.papagoTranslate('ko', 'ja', replace);
        replier.reply(koToJa);
    }

    if (msg.indexOf('/일한') == 0) {
        let replace = msg.replace('/일한', '');
        let koToJa = Api.papagoTranslate('ja', 'ko', replace);
        replier.reply(koToJa);
    }

    // 가위바위보
    if (msg == '가위' || msg == '바위' || msg == '보') {
        let RSP = ['가위', '바위', '보'];
        RSP_bot = RSP[Math.floor(Math.random() * 3)];
        replier.reply(RSP_bot);

        if (msg === RSP_bot) {
            replier.reply('비겼습니다.');
        } else if ((msg == '가위' && RSP_bot == '바위') || (msg == '보' && RSP_bot == '가위') || (msg == '바위' && RSP_bot == '보')) {
            replier.reply(sender + '님이 졌습니다.');
        } else {
            replier.reply(sender + '님이 이겼습니다.');
        }
    }
}

// 그룹 채팅방
// function response(room, msg, sender, isGroupChat, replier, imageDB) {
//     if (isGroupChat == true) {
//         if (msg == '안녕') {
//             replier.reply(room, '안녕하세요! 저는 영우봇입니다. :)');
//         }
//     }
// }

