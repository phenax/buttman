const controller= require('./controllers');

module.exports= (app)=> {

	/* /:: Home route */
	app.get('/', controller.HomeRoute);

	/* /webhook/:: Get route to verify */
	app.get('/webhook/', controller.VerificationWebHook);


	/* /webhook/:: Post route for recieving messages */
	app.post('/webhook/', controller.MessageWebHook);
};