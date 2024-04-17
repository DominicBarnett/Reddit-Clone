const express = require('express');
const app = express();
const port = 3000;

// Set up Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Required
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set db
require('./data/reddit-db');

// Posts Controller
require('./controllers/posts')(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;