require('./controllers/comments.js')(app);
const Comment = require('../models/comment');

module.exports = (app) => {
// CREATE Comment
app.post('/posts/:postId/comments', (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
  
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      // REDIRECT TO THE ROOT
      .then(() => res.redirect('/'))
      .catch((err) => {
        console.log(err);
      });
  });
};