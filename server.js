const express = require('express')
const app = express()

// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

//required
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Auth
const checkAuth = require('./middleware/checkAuth');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(cookieParser());
app.use(checkAuth);

// Set db
require('./data/reddit-db');

//posts controller
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth.js')(app);

const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})