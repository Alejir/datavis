var Twit = require('twit');
var fs = require('fs');

var twit = new Twit({
	consumer_key : 'xx',
	consumer_secret : 'xxx',
	access_token : 'xx',
	access_token_secret : 'xx'
});

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
var stream = twit.stream('statuses/filter', { locations: uk })
var log = fs.createWriteStream('Foottweets.log');

stream.on('tweet', processTweet);
function processTweet(tweet) {
	var regexp = /[Ff]ootball|[Ss]aturday/g;
	if (regexp.test(tweet.text)) {
		console.log(tweet.user ": " + tweet.text)
	}
}
