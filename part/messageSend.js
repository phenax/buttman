/* Request library */
const request= require('request');

/* FB_API_URL:: The api url for sending messages */
const FB_API_URL= 'https://graph.facebook.com/v2.6/me/messages';

/* access_token:: Access token used for authentication */
const access_token= require('./tokens').access_token;


/* Function to send a reply */
module.exports= (sender, text)=> {

	/* data:: The request data to the FB API */
	const data= {
		url: FB_API_URL,
		qs: { access_token },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: { text },
		}
	};

	/* callback:: The callback function to the API request */
	const callback= (error, response, body)=> {
		console.log("API CALLBACK");

		if (error)
			console.log('Error sending message: ', error);
		else if (response.body.error)
			console.log('Error: ', response.body.error);
	};

	/* Request made to the FB API */
	request(data, callback);
};