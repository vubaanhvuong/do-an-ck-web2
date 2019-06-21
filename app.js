var express = require('express');
var session = require('express-session');
var db = require('./models/db');
var Users = require('./models/Users');

var app = express();
var PORT = process.env.PORT || 3000;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/static", express.static(__dirname + "/public/"));

// Set session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Check login user
app.use(function (req, res, next) {
  res.locals.currentUser = null;
  var {
    Email
  } = req.session;
  if (!Email) {
    next();
  } else {
    Users.findOne({
      where: {
        emai:Email
      }
    }).then(function (user) {
      if (!user) {
        req.session.destroy();
        next();
      } else {
        res.locals.currentUser = user;
        next();
      }
    }).catch(next);
  }
});

// Router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var informationRouter = require('./routes/information');

// Controller
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/information', informationRouter);

// Update soon
app.use('/search',function(req, res) {
  res.render('error', {message: "Comming soon."})
});
app.use('/page',function(req, res) {
  res.render('error', {message: "Comming soon."})
});
app.use('/catagories',function(req, res) {
  res.render('error', {message: "Comming soon."})
});
app.use('/single-post',function(req, res) {
  res.render('error', {message: "Comming soon."})
});
app.use('/about',function(req, res) {
  res.render('error', {message: "Comming soon."})
});
app.use('/contact',function(req, res) {
  res.render('error', {message: "Comming soon."})
});

//Connect database
db.sync().then(function () {
  app.listen(PORT);
  console.log(`Server is running PORT: ${PORT}`);
}).catch(function (err) {
  console.log(err);
  process.exit(1);
});

module.exports = app;