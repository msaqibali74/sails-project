

module.exports.http = {
  
  passportInit    : require('passport').initialize(),
  passportSession : require('passport').session(),
  middleware: {
   order: [
       'cookieParser',
       'session',
       'bodyParser',
       'compress',
       'poweredBy',
       'router',
       'www',
       'favicon',
     ],
    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};
