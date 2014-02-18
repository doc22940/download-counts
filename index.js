var Hapi = require('hapi');

// load config
var Config = require('./config')

// load controllers
var downloads = require('./controllers/downloads')

// Create the server
var server = Hapi.createServer('0.0.0.0', 8000);
server.pack.require('./node_modules/hapi-mysql', Config.db, function(err) {
  if (err) {
    console.error(err);
    throw err;
  }
});

// Add the routes
server.route({
  method: 'GET',
  path: '/downloads/point/{period}/{package?}',
  handler: downloads.point
});
server.route({
  method: 'GET',
  path: '/downloads/range/from/{start}/to/{end}/{package?}',
  handler: downloads.point
});

// Start the server
server.start();