const sendMsg= require('./messageSend');                           // Send message via FB API
const botGenMsg= require('./botGen');                              // Generate Bot's reply

const deep_secret= require('./tokens').verify_key;                 // Verification key



/* /webhook/:: Post route for recieving messages */
const MessageWebHook= (req, res)=> {

	/* messaging_events:: All messaging events i.e. unread messages */
	const messaging_events= req.body.entry[0].messaging;

	/* For all messaging events, read message and generate output */
	for (const i= 0; i < messaging_events.length; i++) {

		const event= req.body.entry[0].messaging[i];

		const sender= event.sender.id;

		if (event.message && event.message.text) {

			const text= event.message.text;

			/* botGenMsg:: Return bot's reply to the input  */
			/* sendMsg:: Send the reply to the FB API */
			sendMsg(sender, botGenMsg(text.substring(0, 200)));

		}
	}

	/* Everything is OK here */
	res.sendStatus(200);
};



/* /webhook/:: Get route to verify */
const VerificationWebHook= (req, res)=> {

	if (req.query['hub.verify_token'] === deep_secret)
		res.send(req.query['hub.challenge']);

	res.send('Error, wrong validation token');
};



/* /:: Home route */
const HomeRoute= (req,res)=> {

	res.send("Hello World. Welcome to Buttman's buttcave.");
};

module.exports= {
	MessageWebHook,
	VerificationWebHook,
	HomeRoute
};