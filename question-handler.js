var request = require('request');
const env_vars = require('./env');

exports.submit = function(convo){
 return new Promise(function(resolve,reject) {
  request.post(env_vars.uri+'/api/v1/covid19/questions',
         { json:{ user_id:'m-'+convo.userId,
           content:convo.get('question'),
           type:convo.get('type'),
           radio_station:convo.get('station'),
           country:convo.get('country') }},
         function (error, response, body) {
          console.log(body)
          if (!error)
           resolve(true)
          else
           reject(false)
         })
 })
}

exports.get_user = function(userId) {
   return new Promise(function(resolve,reject) {
                  request({url: env_vars.uri+'/api/v1/covid19/chat_users?user_id=m-'+userId,json:true},
                   function(err,res,json) {
                    resolve(json);
                  })
 })
}

exports.confirm_question = (convo) => {
 convo.ask({
  text: '❓ Do you have a question or comment?',
  quickReplies: ["Yes","No"]
 },(payload, convo)=> {
  answer = payload.message.text

  if (answer == 'Yes')
   ask(convo)
  else {
   convo.say('Ok. No problem')
   convo.end()
  }
 })
};

const ask = (convo) => {
 convo.ask(`*❓What is your question or comment concerning COVID-19 & communication ?* \n\nYou can either use text or voice inputs to submit. Your questions will reach experts and you will recieve a response via your messenger account as soon as possible.`, (payload, convo) => {
   let question = "None"
   if (payload.message.attachments) {
       question = payload.message.attachments[0].payload.url
       convo.set('content',payload.message.attachments[0].type)
   }
   else {
     question = payload.message.text;
     convo.set('content',question)
   }

  question_handler.get_user(convo.userId).then(function(chat_user){
   convo.set('question', question);
   if (!chat_user[0].country)
    convo.say(`Your question/comment is: ${question}`).then(() => askCountry(convo));
   else {
    convo.set('country',chat_user[0].country)
    convo.set('station',chat_user[0].radio_station)
    sendSummary(convo)
   }
  })
 })
}

const askCountry = (convo) => {
 convo.ask({
  text: "Select the country you're from",
  quickReplies: ['Mali','Kenya','Burkina faso','Senegal',"Ethiopia",'Tanzania','Uganda','Ghana','Nigeria','Malawi','Other']
 },(payload, convo)=> {
  country_code = {'ethiopia':'et','tanzania':'tz','uganda':'ug','ghana':'gh',"mali":'ml','kenya':'ke','burkina':'bf','senegal':'sn','malawi':'mw','other':'other'}
  country_name = payload.message.text
  country_name = country_name.toLowerCase()
  country_name = country_name.split(' ')[0]
  convo.set('country',country_code[country_name])
  askStation(convo)
 })
}

const askStation = (convo) => {
 convo.ask('What is the name of the radio station you work for?',(payload,convo) => {
   const text = payload.message.text
   convo.set('station', text);
   convo.say(`Got it!`).then(() => sendSummary(convo));
 })
}

const sendSummary = (convo) => {
 question_handler.submit(convo).
 then(function(response) {
  convo.say({text:`Thank you, your message is recieved:
       - Question/Comment: ${convo.get('content')},
       - Radio station: ${convo.get('station')},
       - Country: ${convo.get('country')}`,
       buttons: [
            { type: 'postback', title: 'Go back', payload:'GO_BACK' }
          ]
      },{typing:true});

      convo.end();
 })
};
