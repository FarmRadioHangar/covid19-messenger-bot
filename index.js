'use strict';
const BootBot = require('bootbot');
var request = require('request');
const en = require('./corona-en');
const am = require('./corona-am');
const fr = require('./corona-fr');
const env_vars = require('./env')

const bot = new BootBot(env_vars.bot_codes);

const get_user = function(userId) {

  console.log(env_vars.uri)
   return new Promise(function(resolve,reject) {
                  request({url: env_vars.uri+'/api/v1/covid19/chat_users?user_id=m-'+userId,json:true},
                   function(err,res,json) {
                    resolve(json);
                  })
 })
}

const update_user = function(id,language,country='') {
 return new Promise(function(resolve,reject) {
  request.patch(env_vars.uri+'/api/v1/covid19/chat_users/'+id,
         { json: {language:language,country:country } },
         function (error, response, body) {
          console.log(body)
          if (!error)
           resolve(true)
          else
           reject(false)
         })
 })
}

const create_user = function(userId,language,country='') {
 return new Promise(function(resolve,reject) {
        request.post(env_vars.uri+'/api/v1/covid19/chat_users',
               { json: { user_id: 'm-'+userId,language:language,country:country } },
               function (error, response, body) {
                console.log(body)
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
                console.log(body)
                if (!error)
                 resolve(true)
                else
                 reject(false)
               })
 })
}

const access = function(func,chat) {
 get_user(chat.userId).then(function(chat_user){
    if (chat_user.length == 0)
     en[func](chat)
    else {
     eval(chat_user[0].language)[func](chat)
    }
 })
}

const setLanguage = (convo,id) => {
   convo.ask('Send 1 for English *\n\nEnvoyer 2 pour le français *\n\n3 ይላኩ ለአማርኛ *',
     (payload, convo) => {
      const answer = payload.message.text;


      if (answer == '1') {
       update_language(id,'en').then(function(response){
        convo.say('Hi')
        en.intro(convo)
        convo.end()
       })
      }
      else if (answer == '2') {
       update_language(id,'fr').then(function(response){
        convo.say('Bonjour')
        fr.intro(convo,'fr')
        convo.end()
       })
      }
      else if (answer == '3') {
       update_language(id,'am').then(function(response){
        convo.say('ሰላም')
        am.intro(convo,'am')
        convo.end()
       })
      }
      else {
       setLanguage(convo,id)
      }
     },{typing:true})
}

const askCountry = (convo) => {
 convo.say('Country / Pays / አገርዎ')
 convo.ask('1. Ghana\n\n2. Tanzania\n\n3. ኢትዮጵያ\n\n4. Other/ሌላ',
  (payload,convo) => {
   const country_code = {'1':'gh','Ghana':'gh',
                         '2':'tz','Tanzania':'tz',
                         '3':'et','Ethiopia':'et','ኢትዮጵያ':'et',
                         'Other':'','ሌላ':'','4':''},
         lang_code = {'1':'en','2':'fr','3':'am'},
         country = payload.message.text;

    if (country_code[country]==undefined)
     askCountry()
    else
     create_user(convo.userId,lang_code[convo.get('lang')],country_code[country]).then(function(response){
       eval(lang_code[convo.get('lang')]).intro(convo)
       convo.end()
     })
 })
}


const newUser = (convo) => {
   convo.ask('Send 1 for English\n\nEnvoyer 2 pour le français\n\n3 ይላኩ ለአማርኛ',
     (payload, convo) => {
      const answer = payload.message.text;

      if (answer == '1' || answer =='2' || answer == '3') {
       convo.set('lang',answer)
       askCountry(convo)
      }
      else {
       newUser(convo)
      }
     },{typing:true})
}

bot.hear(['hello','hi','start','salut','au début','ሰላም','መጀመሪያ'], (payload, chat) => {
 // Send a text message followed by another text message that contains a typing indicator
 let user_check = get_user(chat.userId)

 user_check.then(function(chat_user) {
    if (chat_user.length == 0){
     chat.conversation((convo) => {
      convo.say('👋😷').then(() => {
       newUser(convo);
      })
     });
    }
    else{
    	 chat.say('👋😷').then(() => {
       console.log(payload.message.text)
       console.log(eval(chat_user[0].language).greetings.includes(payload.message.text))
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


bot.on('postback:GO_BACK', (payload, chat) => {
 access('go_back',chat)
})
// http://www.aaronsw.com/weblog/tdk
bot.hear('Tips & resources', (payload, chat) => {
 access('working_from_home',chat)
});

bot.on('postback:TIPS_AND_RESOURCES', (payload, chat) => {
 access('working_from_home',chat)
});

bot.hear('Send your question',(payload,chat) => {
	chat.conversation((convo) => {
  access('ask',convo)
	});
})

bot.on('postback:ASK',(payload,chat) => {
	chat.conversation((convo) => {
  access('ask',convo)
	});
})

bot.on('postback:LEARN', (payload, chat) => {
 access('learn_about_covid',chat)
});

bot.hear('COVID-19', (payload, chat) => {
 access('learn_about_covid',chat)
});

bot.on('postback:HOW_THE_VIRUS_IS_SPREAD', (payload, chat) => {
 access('how_the_virus_is_spread',chat)
})

bot.on('postback:SYMPTOMS_OF_INFECTION', (payload, chat) => {
 access('symptoms_of_infection',chat)
})

bot.on('postback:MYTHS_MISINFORMATION', (payload, chat) => {
 access('myths_misinformation',chat)
})

bot.on('postback:SAFETY_FOR_BROADCASTERS', (payload, chat) => {
 access('safety_for_broadcasters',chat)
})


bot.on('postback:BROADCASTER_RESOURCES', (payload, chat) => {
 access('broadcaster_resources',chat)
})

bot.on('postback:JOIN_ONLINE_GROUPS', (payload, chat) => {
 access('join_online_groups',chat)
})

bot.on('referral', (payload, chat) => {
 get_user(chat.userId).then(function(chat_user){
    let country_lang = payload.referral.ref.split('-')
    if (chat_user.length == 0)
     create_user(payload.recipient.id,country_lang[1],country_lang[0])
    else {
     update_user(chat_user[0].id,country_lang[1],country_lang[0])
    }
    chat.say(eval(country_lang[1]).greetings[0])
    eval(country_lang[1]).intro()
 })

})

bot.app.route('/test-server').get(function(req,res) {
 res.send('Server is running!')
 // bot.say('3412255648802984','TEST MESSAGE')
});


bot.start();
