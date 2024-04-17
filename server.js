// Initialize express
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/posts')(app);

// Set db
require('./data/reddit-db');

// Render the "home" layout for the main page and send the following msg
app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
  })

app.get('/posts/new', (req, res) => {
  res.render('posts-new');
})
// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})