var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('client-sessions');

var api = require('./routes/api');
var link = require('./routes/link');
var login = require('./routes/login');
var home = require('./routes/home');
var form = require('./routes/form');
var success = require('./routes/success');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// deal with CORS
app.use(cors());

// connect to mongodb and validate connection
mongoose.connect('mongodb://localhost/myApp'); // default to 27017
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// configure session
app.use(session({
        cookieName: 'session',
        secret: 'random_string_goes_here',
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
}));


app.use('/api', api);
app.use('/link', link);
app.use('/login', login);
app.use('/home', home);
app.use('/form', form);
app.use('/success', success);

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
