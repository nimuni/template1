var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var app = express();

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
const SEOUL_TIMEZONE = "Asia/Seoul";

// cors 설정ㅇ
const cors = require('cors');
app.use(cors());

// view engine setup - pug
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// logger
const rfs = require('rotating-file-stream');
function logFilename() {
  return `${dayjs().tz(SEOUL_TIMEZONE).format("YYYYMMDD")}.log`;
}
const accessLogStream = rfs.createStream(logFilename, {
  interval: '1d',
  path: path.resolve(__dirname, 'logs'),
});
morgan.token('user', (req, res) => {
  return req.user ? req.user.id : "Guest"
  // return _.get(req, 'req.user.id') || 'Guest';
})
morgan.token('ip', (req, res) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress
})
morgan.token('date', (req, res) => {
  return dayjs().tz(SEOUL_TIMEZONE).format();
})
morgan.format('customFormat', '[:date][:method][:status][:response-time ms][url=:url][:ip][:user]');
app.use(morgan('customFormat', {
  stream: accessLogStream
}));
app.use(morgan('customFormat'));
// logger end

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// indexPage data 이후는 vuejs에서 build한 파일 사용함 - 빌드된 결과물 경로
// var indexRouter = require('./routes/index');
// app.use('/', indexRouter); // 주석한 대상 파일 제거가능
/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './public', 'index.html')); 
});

// api data
var apiRouter = require('./routes/api/index');
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
