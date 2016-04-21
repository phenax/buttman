const fs= require('fs');

const sendMsg= require('./messageSend');                           // Sends message via FB API
const botGenMsg= require('./botGen');                              // Generates Bot's reply

const deep_secret= require('./tokens').verify_key;                 // Verification key



/* `/webhook/`:: Post route for recieving messages */
const MessageWebHook= (req, res)=> {
	var event, sender, text;

	/* messaging_events:: All messaging events i.e. unread messages */
	const messaging_events= req.body.entry[0].messaging;

	/* For all messaging events, read message and generate output */
	for (var i= 0; i < messaging_events.length; i++) {

		event= req.body.entry[0].messaging[i];

		sender= event.sender.id;

		if (event.message && event.message.text) {

			text= event.message.text;

			/* botGenMsg:: Return bot's reply to the input  */
			/* sendMsg:: Send the reply to the FB API */
			sendMsg(sender, botGenMsg(text.substring(0, 200)));

		}
	}

	/* Everything is OK here */
	res.sendStatus(200);
};



/* `/webhook/`:: Get route to verify */
const VerificationWebHook= (req, res)=> {

	if (req.query['hub.verify_token'] === deep_secret)
		res.send(req.query['hub.challenge']);

	res.send('Error, wrong validation token');
};



/* `/`:: Home route */
const HomeRoute= (req,res)=> {

	var ip= req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

	console.log("Visitor : " + ip);

	res.send(fs.readFileSync(__dirname+'/html/index.html', 'utf-8'));
};


const BotTesting= (req,res)=> {
	var text= req.query.string;
	text= botGenMsg(text);
	res.send('{ "reply" : "'+text+'" }');
};


module.exports= {
	MessageWebHook,
	VerificationWebHook,
	HomeRoute,
	BotTesting
};