'use strict';
const BootBot = require('bootbot-multipage');
var request = require('request');
const en = require('./corona-en');
const am = require('./corona-am');
const fr = require('./corona-fr');
const env_vars = require('./env')
const get_user = require('./question-handler').get_user;

const bot = new BootBot(env_vars.bot_codes);



var get_started = (payload, chat) => {
 chat.getUserProfile().then((user) => {
  chat.conversation((convo) => {
   convo.say('👋😷').then(() => {
    newUser(convo,user);
   })
  });
 })
}

bot.setGreetingText(
 [
   {
     "locale":"default",
     "text":"This is the FRI Broadcaster COVID-19 messenger bot.\
      \n\nHere you can find information and resources for broadcasters on coronavirus (COVID-19).\
      \nWe hope this is useful for planning and preparing your radio program."
   },
   {
     "locale":"fr_FR",
     "text":"This is the FRI Broadcaster COVID-19 messenger bot.\
      \n\nHere you can find information and resources for broadcasters on coronavirus (COVID-19).\
      \nWe hope this is useful for planning and preparing your radio program."
   },
   {
     "locale":"fr_CA",
     "text":"This is the FRI Broadcaster COVID-19 messenger bot.\
      \n\nHere you can find information and resources for broadcasters on coronavirus (COVID-19).\
      \nWe hope this is useful for planning and preparing your radio program."
   }
 ]
)

bot.setGetStartedButton(get_started)


const update_user = function(id,language,country='') {
 return new Promise(function(resolve,reject) {
  request.patch(env_vars.uri+'/api/v1/covid19/chat_users/'+id,
         { json: {language:language,country:country } },
         function (error, response, body) {
          if (!error)
           resolve(true)
          else
           reject(false)
         })
 })
}

const create_user = function(userId,language,full_name) {
 return new Promise(function(resolve,reject) {
        request.post(env_vars.uri+'/api/v1/covid19/chat_users',
               { json: { user_id: 'm-'+userId,language:language,full_name:full_name } },
               function (error, response, body) {
                if (!error)
                 resolve(true)
                else
                 reject(false)
               })
 })
}

const update_language = function(id,language) {
 return new Promise(function(resolve,reject) {
        request.patch(env_vars.uri+'/api/v1/covid19/chat_users/'+id,
               { json: {language:language } },
               function (error, response, body) {
                if (!error)
                 resolve(true)
                else
                 reject(false)
               })
 })
}


const setLanguage = (convo,id) => {
 convo.ask({
  text: 'Language | Langue',
  quickReplies: ["English",'Français']
 },(payload, convo)=> {
  const answer = payload.message.text;

  if (answer == 'አማርኛ') {
     update_language(id,'am').then(function(response){
      am.intro(convo)
      convo.end()
     })
  }
  else if (answer == 'English') {
    update_language(id,'en').then(function(response){
     en.intro(convo)
     convo.end()
    })
  }
  else if (answer == 'Français'){
   update_language(id,'fr').then(function(response){
    fr.intro(convo)
    convo.end()
   })
  }
  else
   setLanguage(convo)

 })
}

const newUser = (convo,user) => {
 convo.ask({
  text: 'Language | Langue | ቋንቋ',
  quickReplies: ["English",'Français','አማርኛ']
 },(payload, convo)=> {
  const answer = payload.message.text;

  if (answer == 'አማርኛ') {
   convo.set('lang','am')
   convo.say(`ታዲያስ ${user.first_name}`)
  }
  else if (answer == 'English') {
   convo.set('lang','en')
   convo.say(`Hello ${user.first_name}`)
  }
  else if (answer == 'Français'){
   convo.set('lang','fr')
   convo.say(`Salut ${user.first_name}`)
  }
  else
   newUser(convo)

  create_user(convo.userId,convo.get('lang'),`${user.first_name} ${user.last_name}`).then(function(response){
    eval(convo.get('lang')).intro(convo)
    convo.end()
  })

 });
}

const access = function(payload,chat,func=null) {
 get_user(chat.userId).then(function(chat_user){
    // console.log(eval(chat_user[0].language))
    if (chat_user.length == 0)
     get_started(payload,chat)
    else if(func)
     eval(chat_user[0].language)[func](chat)
    else {
     eval(chat_user[0].language)[payload.postback.payload](chat)
    }
 })
}

bot.hear(['hello','hi','start','salut','début','ሰላም','መጀመሪያ'], (payload, chat) => {
 // Send a text message followed by another text message that contains a typing indicator
 let user_check = get_user(chat.userId)

 user_check.then(function(chat_user) {
    if (chat_user.length == 0){
     get_started(payload,chat)
    }
    else{
    	 chat.say('👋😷').then(() => {
       if (eval(chat_user[0].language).greetings.includes(payload.message.text))
        eval(chat_user[0].language).intro(chat)
       else {
        chat.conversation((convo) => {
          setLanguage(convo,chat_user[0].id);
        });
       }
      })
    }
 })
});

bot.on('postback', (payload, chat) => {
 access(payload,chat)
});

// -- the routes after this line are not used
bot.hear('Learn about COVID-19', (payload, chat) => {
 access(payload,chat,'LEARN_ABOUT_COVID')
});

bot.hear('Get radio resources', (payload, chat) => {
 access(payload,chat,'GET_RADIO_RESOURCES')
});

bot.hear('Fact-check myths', (payload, chat) => {
 access(payload,chat,'FACT_CHECK_MYTHS')
});

bot.hear(['Language','Langue','ቋንቋ'], (payload, chat) => {
 let user_check = get_user(chat.userId)
 user_check.then(function(chat_user) {
    if (chat_user.length == 0){
     get_started(payload,chat)
    }
    else{
     chat.conversation((convo) => {
       setLanguage(convo,chat_user[0].id);
     });
    }
 })
});


// bot.on('postback:ASK',(payload,chat) => {
// 	chat.conversation((convo) => {
//   access('confirm_question',payload,convo)
// 	});
// })

bot.hear('COVID-19', (payload, chat) => {
 access(payload,chat,'learn_about_covid')
});


// bot.on('referral', (payload, chat) => {
//  get_user(chat.userId).then(function(chat_user){
//     let country_lang = payload.referral.ref.split('-')
//     if (chat_user.length == 0)
//      create_user(payload.recipient.id,country_lang[1],country_lang[0])
//     else {
//      update_user(chat_user[0].id,country_lang[1],country_lang[0])
//     }
//     chat.say(eval(country_lang[1]).greetings[0])
//     eval(country_lang[1]).intro()
//  })
//
// })

bot.app.route('/test-server').get(function(req,res) {
 res.send('Server is running!')
 // bot.say('3412255648802984','TEST MESSAGE')
});


bot.start(env_vars.port);
