/*
- room: 채팅방 이름
- msg = 메세지
- sender = 메세지 보낸 사람
- isGroupChat = 그룹 채팅 여부
- replier = 답장 오브젝트 ( 자동 답장을 할 때 쓰입니다 )
- imageDB와 packageName은 당장은 신경쓰지 않아도 괜찮습니다.*/

// 개인 채팅방ㅇㅇ

let allSee = new Array(1000).join(String.fromCharCode(847));

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    if (msg == '/기능') {
        replier.reply('Made by 영우\n\n📍 기능 ' + allSee + '\n\n👉🏽 안녕\n👉🏽 가위바위보\n👉🏽 날씨\n👉🏽 실시간 지하철 정보\n👉🏽 번역 기능');
    }

    if (msg == '/패치노트') {
        replier.reply('📍 패치노트 ' + allSee + '\n\n20201218 ver.1 \n\n👉🏽 기능, 패치노트')
    }

    if (msg.indexOf('안녕') == 0) {
        replier.reply('안녕하세요!' + sender +'님! 저는 영우봇입니다. :)\n 만나서 반가워요!')
    }

    // 번역
    if (msg.indexOf('/번역') == 0) {
        let a = msg.replace('/번역', '');
        let b = Api.papagoTranslate('ko', 'en', a);
        replier.reply(b);
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

