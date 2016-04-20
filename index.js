/* requires */
const express= require('express');
const bodyParser= require('body-parser');

const app= express();


/* Bodyparser for POST data */
app.use(bodyParser.json());


/* All the routes */
require('part/routes')(app);


/* Listening to port 'whatever's free' or 3000 */
app.listen(process.env.PORT || 3000);
