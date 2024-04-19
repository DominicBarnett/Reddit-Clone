const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {

    app.get('/', (req, res) => {
        Post.find({}).lean()
          .then((posts) => res.render('posts-index', { posts }))
          .catch((err) => {
            console.log(err.message);
          })
      });
  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save(() => res.redirect('/'));
  });
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  });

//   LOOK UP THE POST
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).lean().populate('comments')
        .then((post) => res.render('posts-show', { post }))
        .catch((err) => {
    console.log(err.message);
  });
    });
// SUBREDDIT
app.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err);
      });
  });
  // CREATE Comment
app.post('/posts/:postId/comments', (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
  
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(() => Post.findById(req.params.postId))
      .then((post) => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(() => res.redirect('/'))
      .catch((err) => {
        console.log(err);
      });
  });
};

