console.log()
// 透過 getUrlParam 取得 url 變數值, 分別為 bo1, bot2, rounds 與 speed
var bot1 = getUrlParam('bot1');
var bot2 = getUrlParam('bot2');
var rounds = getUrlParam('rounds');
var speed = getUrlParam('speed')
// 若未設定 bot1, 則設為 testbot
if(!bot1) {
    bot1 = 'testbot';
}   
// 若未設定 bot2, 則設為 testbot2
if(!bot2) {
    bot2 = 'testbot2';
}
// 若未設定 rounds, 則設為 10
if(!rounds) {
    rounds = 10;   
}

// 若未設 speed, 則設為 20
if(!speed) {
    speed = 20;   
}

rounds = parseInt(rounds);
var bot1File = (bot1.startsWith('/')?'':'bots/') + bot1 + '/main.js';
var bot2File = (bot2.startsWith('/')?'':'bots/') + bot2 + '/main.js';

duel = new Duel(bot1File, bot2File, rounds, speed);
duel.drawScans = getUrlParam('drawScans') != null;
duel.drawDebug = getUrlParam('drawDebug') != null;

duel.onFinished = function(bot1score,bot2score) {
    if(window != window.top) {
        top.battleFinished(bot1score, bot2score);
    }
    if(getUrlParam('redirecturl')) {
        var url = getUrlParam('redirecturl') + '?bot1='+bot1+'&bot2='+bot2+'&score1='+bot1score+'&score2='+bot2score;
        
        window.location.href = url;
    }
}

duel.start();