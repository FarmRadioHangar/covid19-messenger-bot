var request = require('request');

exports.content = function(title) {
   return new Promise(function(resolve,reject) {
         request({url: 'https://log.uliza.fm/api/v1/covid19/contents?title='+title,
                  json:true},
          function(err,res,json) {
           resolve(json);
         })
 })
}
