var express = require('express');
var router = express.Router();

var Question = require('../services/question');
var Session = require('../services/session');
var data = require('../data/people_it');

var session = new Session();
var question = new Question(data, session);

router.post('/', function(req, res, next) {

    var telegramUpdate = req.body;
    console.log(req.body)
    // Message must start with '/weather'
    var telegramMessage = telegramUpdate.message.text;
    // Get the chat id and message id to reply to
    var chatId = telegramUpdate.message.chat.id;
    var reply_to_message_id = telegramUpdate.message.message_id;
    var replyMessage = '';
    if (telegramMessage.lastIndexOf('/start', 0) === 0) {
    	replyMessage = 'Start command called';        
    } else if (telegramMessage.lastIndexOf('/end', 0) === 0) {
    	replyMessage = 'End command called';
    } else if (telegramMessage.lastIndexOf('/new', 0) === 0) {
    	replyMessage = 'New command called';
    } else if (telegramMessage.lastIndexOf('/dead', 0) === 0) {
    	replyMessage = 'Dead command called';
   	} else if (telegramMessage.lastIndexOf('/start', 0) === 0) {
   		replyMessage = 'Alive command called';
    } else {
    	replyMessage = 'Unknown command';
    }

	telegram.sendMessage(chatId, replyMessage, reply_to_message_id);
    // Send response to Telegram, always OK
    res.statusCode = 200;
    res.end();
});

module.exports = router;
