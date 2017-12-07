var Botkit = require('botkit');
var os = require('os');

//require .env
require('dotenv').config();

//new controller
var controller = Botkit.slackbot({
    //login slack
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scopes: ['bot'],
    redirectUri: 'http://localhost:8888/oauth',
    //set debug
    debug:true,

    //save data in json
    json_file_store: 'slackDataStore',
});

// set up a botkit app Webserver 
controller.startTicking();

controller.setupWebserver(process.env.port,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver);
  
    controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
      if (err) {
        res.status(500).send('ERROR: ' + err);
      } else {
        res.send('Success!');
      }
    });
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

//hear button
controller.hears('button', 'direct_message', function(bot, message) {
    //reply to user
    bot.reply(message, {
        //set button
        attachments:[{
            title: 'Do you want to interact with my buttons?',
            callback_id: '123',
            attachment_type: 'default',
            actions: [{
                "name":"yes",
                "text": "Yes",
                "value": "yes",
                "type": "button",
            },
            {
                "name":"no",
                "text": "No",
                "value": "no",
                "type": "button",
            }]
        }]
    });
});

//interactive with callback
controller.on('interactive_message_callback', function(bot, message) {
    //console.log(message);

    if(message.actions[0].name.match(/^yes/)){
        bot.reply(message,"Good ! d(`･∀･)b");
    }
    else if(message.actions[0].name.match(/^no/)){
        bot.reply(message,"What ?!! (☉д⊙) ");
    }

});