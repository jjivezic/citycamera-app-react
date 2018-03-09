config     = require('./config/');
logger     = require('./lib/logger');
logger.checkLoggedFiles();

var express  = require('express'),
        cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoose   = require('mongoose'),
  path       = require('path'),
  http       = require('http'),
  directory  = require('serve-index'),
  scheduler  = require('./config/schedule/');

var router                   = require('./router'),
  routeValidatorMiddleware = require('./middleware/routeValidatorMiddleware'),
  logRequest               = require("./middleware/loggerMiddleware").logRequest,
  logErrors             = require("./middleware/loggerMiddleware").logErrors,
  errorHandlerMiddleware   = require("./middleware/errorHandlerMiddleware").errorHandlerMiddleware;

var app = express();

app
  .use(cors())
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logRequest);
app.use(routeValidatorMiddleware);
app.use(logRequest);


//connect to mongo db
mongoose.connect(config.mongodb.host + config.mongodb.db, {
  db: {
    safe: true
  }
}, function (err) {
  if (err) {
    logger.error("Mongoose - connection error: " + err);
    throw err;
  }
  logger.info("Mongoose - connection OK to: " + config.mongodb.host + config.mongodb.db);

  app.server = http.createServer(app);

  //load routes recursively from services folders
  router.load(app, function () {

    app.use(logErrors);
    app.use('/', express.static(__dirname + '/client/build'));
    app.use(errorHandlerMiddleware);

   if (process.env.NODE_ENV != 'prod') {
      app.use('/log', directory(path.join(__dirname, 'log')));
      app.use('/log', express.static(path.join(__dirname, 'log')));
      app.use('/doc', express.static(path.join(__dirname, 'doc')));
      app.use('/coverage', express.static(path.join(__dirname, 'coverage', 'lcov-report')));
   }

    app.set('port', process.env.port || 3000);

    app.server.listen(app.get("port"), function () {
      logger.info("Server running on port: ", app.get('port'));
      scheduler.start();
    });

  });
});

module.exports = app;
