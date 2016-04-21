/* requires */
const app= require('express')();


/* Bodyparser for POST data */
app.use(require('body-parser').json());


/* All the routes */
require('./part/routes')(app);



/* Listening to port 'whatever's free' or 3000 */
app.listen(process.env.PORT || 3000);
