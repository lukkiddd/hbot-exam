var FeedParser = require('feedparser'),
		request = require('request'),
		moment = require('moment'),
		cheerio = require('cheerio');

var BLOGNONE_FEED_URL = "https://www.blognone.com/atom.xml";

var req = request(BLOGNONE_FEED_URL),
		feedparser = new FeedParser();

req.on('response', function (res) {
  var stream = this; 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});

feedparser.on('readable', function () {
  var stream = this;
  var item;

  while (item = stream.read()) {
		console.log("========= \n\n");
		$ = cheerio.load(item.description);
		console.log("Title:" + item.title);
		console.log($.text());
		console.log(moment(item.pubdate).fromNow());
		console.log(item.author);
		console.log(item.link);
  }
});