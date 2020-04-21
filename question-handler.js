var request = require('request');
const env_vars = require('./env');

exports.submit = function(convo){
 return new Promise(function(resolve,reject) {
  request.post(env_vars.uri+'/api/v1/covid19/questions',
         { json:{ user_id:'m-'+convo.userId,
           content:convo.get('question'),
           type:convo.get('type'),
           radio_station:convo.get('station'),
           full_name:convo.get('name') }},
         function (error, response, body) {
          console.log(body)
          if (!error)
           resolve(true)
          else
           reject(false)
         })
 })
}
