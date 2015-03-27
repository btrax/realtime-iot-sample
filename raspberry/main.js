var publishKey = '<PubNub Publish Key>';
var subscribeKey = '<PubNub Subscribe Key>';

var channel = "smart-led";  // use same channel name
var ledPin = 14; // output pin

// setup GPIO
var OnOff = require('onoff');
var Gpio = OnOff.Gpio;
var led = new Gpio(ledPin, 'out');

// setup PubNub
var pubnub = require("pubnub")({
	ssl           : true,
	publish_key   : publishKey,
	subscribe_key : subscribeKey
});

// register subscribe
pubnub.subscribe({
	channel  : channel,
	callback : function(message) {
		console.log('>', message);

		if(message.action === 'on') {
        	// turn on
        	led.writeSync(1);
        } else {
        	// turn off
        	led.writeSync(0);
        }
    }
});