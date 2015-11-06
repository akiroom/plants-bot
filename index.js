var Slack = require('slack-client');
var schedule = require("node-schedule");

// Slackで呼びかける相手
var gardener = '@akiroom';

// slack setting
var token = process.env['SLACK_TOKEN'];
var autoReconnect = true;
var autoMark = true;
var slack = new Slack(token, autoReconnect, autoMark);

// Slackに接続できた
slack.on('open', function() {
    console.log('open');

    // 毎週水曜10時10分に水を催促
    var rule = new schedule.RecurrenceRule();
    rule.day = 3;
    rule.hour = 10
    rule.minute = 10
    var job = schedule.scheduleJob(rule, function () {
        var channel = slack.getChannelGroupOrDMByName('plants');
        channel.send(gardener + " 水をくれ" );
    });
    
    // 毎週金曜18時32分には水の確認
    rule = new schedule.RecurrenceRule();
    rule.day = 5;
    rule.hour = 18
    rule.minute = 32
    job = schedule.scheduleJob(rule, function () {
        var channel = slack.getChannelGroupOrDMByName('plants');
        channel.send(gardener + " 今週水もらったっけ？" );
    });
});

// 何かが投稿された
slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);

    // メッセージ本文
    var text = message.text;
    var reg = new RegExp('^.*<@' + slack.self.id + '>.*$');
    if (reg.test(text)) {
        channel.send( "<@" + user.id + "> 呼んだ？" );
        setTimeout(function() {
            var meigen = [
                "桃栗三年柿八年",
                "アウグスティヌス曰く、「植物は人間から見られる事を求め、見られる事が救済なり。」",
                "シャフツベリ曰く、「植物は枯死して動物を養い、動物の肉体は分解して土地を肥やし、こうして再び植物を育てる。」",
                "パスカル曰く、「自然はそのすべての真理を、それぞれ自身の裡においた。われわれの技巧は、それらの一方を他方の裡に閉じこめようとする。だが、それは自然的ではない。」",
                "ヘルマン・ヘッセ曰く、「木は神聖なものである。木とはなし、木に耳を傾ける事を知るものは真理を知る。木は教養も処分も説かない。木は個々のことにとらわれず、生の根本法則を説く。」"
            ];
            channel.send(meigen[Math.floor(Math.random() * meigen.length)]);
        }, 3000);
    }
});

// エラーが起きた
slack.on('error', function(error) {
    console.error('Error: %s', error);
});

// ログイン処理
slack.login();
