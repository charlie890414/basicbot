var Botkit = require('botkit');
var os = require('os');

//require .env
require('dotenv').config();

//new controller
var controller = Botkit.slackbot({
    debug:true,
    //save data in json
    json_file_store: 'slackDataStore',
});

//slack RTM (Real Time Messaging)
var slackBot = controller.spawn({
        token:process.env.SLACK_BOT_TOKEN
}).startRTM();

//hear hello
controller.hears('hello', 'direct_message,direct_mention', function(bot,message) {  
    //reply to user
    bot.reply(message,"Hello, I am the bot ^_^");
});