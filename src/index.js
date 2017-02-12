'use strict';
/**
 * @index.js
 * Main lambda function for A Haunted House Alexa skill
 *
 * (c) Jon Perkowski, 2017
 */

var Alexa = require('alexa-sdk');
var APP_ID ='amzn1.ask.skill.1ea652a8-3d87-4aaa-866f-27eab8dda645'; // TODO replace with your app ID (OPTIONAL).
var story = require('./story');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        readStory(this);
    },
    'ReadStoryIntent': function () {
        readStory(this);
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = languageStrings['en-US']['translation']['HELP_MESSAGE'];
        this.attributes['repromptSpeech'] = languageStrings['en-US']['translation']['HELP_REPROMT'];
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', languageStrings['en-US']['translation']['STOP_MESSAGE']);
    }
};

function readStory(object){
	var cardTitle = languageStrings['en-US']['translation']['DISPLAY_CARD_TITLE'];
	object.attributes['speechOutput'] = languageStrings['en-US']['translation']['WELCOME_MESSAGE'];
	// If the user either does not reply to the welcome message or says something that is not
	// understood, they will be prompted again with this text.
	object.attributes['repromptSpeech'] = languageStrings['en-US']['translation']['WELCOME_REPROMT'];
	object.emit(':tellWithCard', object.attributes['speechOutput'], object.attributes['repromptSpeech'], cardTitle, object.attributes['speechOutput']);
}

var languageStrings = {
    "en-US": {
        "translation": {
            "SKILL_NAME" : "A Haunted House",
			"DISPLAY_CARD_TITLE" : "A Haunted House by Virginia Woolf",
            "WELCOME_MESSAGE": story.STORY,
            "WELCOME_REPROMT": "For instructions on what you can say, please say help me.",
            "HELP_MESSAGE": "I can read the short story A Haunted House by Virginia Woolf",
            "HELP_REPROMT": "I can read the short story A Haunted House by Virginia Woolf",
            "STOP_MESSAGE": "Goodbye!"
        }
    }
};