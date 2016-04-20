/* Request library */
const request= require('request');

const FB_API_URL= 'https://graph.facebook.com/v2.6/me/messages';  // API URL
const access_token= require('./tokens').access_token;             // Access token

const sendTextMessage= (sender, text)=> {

	/* Request data */
	const data= {
		url: FB_API_URL,
		qs: { access_token },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: { text },
		}
	};

	/* Callback function for the request */
	const callback= (error, response, body)=> {
		if (error)
			console.log('Error sending message: ', error);
		else if (response.body.error)
			console.log('Error: ', response.body.error);
	};


	/* Request made to the FB API */
	request(data, callback);
};

module.exports= sendTextMessage;