var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('client-sessions');

var board = require('./routes/board');
var boards = require('./routes/boards');
var login = require('./routes/login');
var boardAPI = require('./routes/board_api'); // api
var app = express();

// get rid of warning about using promises
mongoose.Promise = global.Promise;

// connect to mongodb and validate connection
mongoose.connect('mongodb://localhost/prello'); // default to 27017
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// deal with CORS
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure session
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use('/api', boardAPI); // api
app.use('/login', login);
app.use('/board', board); // board page
app.use('/boards', boards); // boards page

// catch 404 and forward to error handler
app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
});

// error handler
app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
});

module.exports = app;
