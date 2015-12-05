var express = require('express');
var router = express.Router();

var Question = require('../services/question');
var Session = require('../services/session');
var data = require('../data/people_it');

var session = new Session();
var question = new Question(data, session);
var telegram = require('../helpers/telegram.js');

router.post('/', function(req, res, next) {

    var telegramUpdate = req.body;
    console.log(req.body)
    // Message must start with '/weather'
    var telegramMessage = telegramUpdate.message.text;
    // Get the chat id and message id to reply to
    var chatId = telegramUpdate.message.chat.id;
    var reply_to_message_id = telegramUpdate.message.message_id;
    var from_id = telegramUpdate.message.from.id;
    var replyMessage = '';
    if (telegramMessage.lastIndexOf('/start', 0) === 0) {
    	session.start(from_id);
	    question.new(from_id, function (err, data) {
	    	if (err) {
	    		replyMessage = 'Error while getting new question';
	    	} else {

	    	}
		}); 
    } else if (telegramMessage.lastIndexOf('/end', 0) === 0) {
    	session.stop(from_id);
    	replyMessage = 'End command called';
    } else if (telegramMessage.lastIndexOf('/new', 0) === 0) {
    	question.new(from_id, function (err, data) {
	    	if (err) {
	    		replyMessage = 'Error while getting new question';
	    	} else {
	    		replyMessage = data.name + ',' + data.desc + '\nAlive or dead?';
	    	}
		});
    } else if (telegramMessage.lastIndexOf('/dead', 0) === 0) {
    	question.answer(false, from_id, function (err, data) {
			if (err) {
	    		replyMessage = 'Error while answering';
	    	} else {
				replyMessage = data.feedback ? "Good!" : "No, that's wrong!";
				replyMessage += "\nAnother one? Send \\new";
	    	}
		});
   	} else if (telegramMessage.lastIndexOf('/alive', 0) === 0) {
   		question.answer(true, from_id, function (err, data) {
			if (err) {
	    		replyMessage = 'Error while answering';
	    	} else {
				replyMessage = data.feedback ? "Good!" : "No, that's wrong!";
				replyMessage += "\nAnother one? Send \\new";
	    	}
		});
    } else {
    	replyMessage = 'Unknown command';
    }

	telegram.sendMessage(chatId, replyMessage, reply_to_message_id);
    // Send response to Telegram, always OK
    res.statusCode = 200;
    res.end();
});

module.exports = router;
