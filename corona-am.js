const question_handler = require('./question-handler');

exports.greetings = ['hi','start','Start','hello','Hi','Hello']
exports.intro = (chat) => {
 chat.say({
  text: 'This is a messanger bot from Farm Radio International. \n \
  \nHere you can find information and resources for broadcasters on Coronavirus (COVID-19).\
  \n\nWhat do you want  do?',
  buttons: [
   { type: 'postback', title: '🦠 Learn about COVID-19', payload:'LEARN' },
   { type: 'postback', title: '🎙 Get tips and resources', payload: 'TIPS_AND_RESOURCES' },
   { type: 'postback', title: '❓ Ask question or Comment', payload: 'ASK' },
 ]},{typing:true})
}

exports.learn_about_covid = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'COVID-19 ',subtitle:"How the virus is spread & the precautions; Myths, misinformation & fake news; Symptoms of infection \n ",
      image_url: 'https://farmradio.org/wp-content/uploads/2020/03/covid-19-response_blog.jpg',
      buttons: [
    		  { type: 'postback', title: 'How the virus spread', payload: 'HOW_THE_VIRUS_IS_SPREAD' },
    		  { type: 'postback', title: 'Symptoms of infection',payload:'SYMPTOMS_OF_INFECTION'},
    		  { type: 'postback', title: 'Myths, misinformation & fake news', payload: 'MYTHS_MISINFORMATION' }
    	 ]
    }
   ]
 });
}

exports.working_from_home = (chat) => {
 chat.say({
   cards: [
    {title: 'Staying safe while still working', subtitle:"Tips and resources for radio broadcasters",
    image_url: 'https://farmradio.org/wp-content/uploads/2020/03/Precious-Naturinda-website.jpg',
     buttons: [
      { type: 'postback', title: 'Safety for broadcasters', payload: 'SAFETY_FOR_BROADCASTERS' },
      { type: 'postback', title: 'Broadcaster resources', payload:'BROADCASTER_RESOURCES' },
      { type: 'postback', title: 'Join online groups', payload: 'JOIN_ONLINE_GROUPS' }
    ]
   },
   ],
   });
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

exports.how_the_virus_is_spread = (chat) => {
 chat.say({text:"*🦠 How the virus is spread*\n\n People catch COVID-19 from others who have the virus. The disease is spread through small droplets produced when infected people cough, sneeze, or exhale ... ",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid19/topic/en/HOW_THE_VIRUS_IS_SPREAD',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
      { type: 'postback', title: 'Do you have a question?', payload:'ASK' },
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]

  })

}

exports.symptoms_of_infection = (chat) => {

 chat.say({text:"*🦠 Symptoms of infection*\n\nThe most common symptoms of COVID-19 are fever, tiredness, and dry cough ...",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid19/topic/en/SYMPTOMS_OF_INFECTION',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
      { type: 'postback', title: 'Do you have a question?', payload:'ASK' },
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]
 })
}


exports.myths_misinformation = (chat) => {
 chat.say({text:"*🦠  Myths, misinformation, and fake news*\n\n There is a lot of false information circulating about COVID-19.",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid19/topic/en/MYTHS_MISINFORMATION',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
      { type: 'postback', title: 'Do you have a question?', payload:'ASK' },
          { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]
 })
}

exports.safety_for_broadcasters = (chat) => {
 chat.say({text:"*🎙 Safety for radio broadcasters*\n\nIf you must conduct a face-to-face interview, respect physical distancing. Don't leave equipment lying around when you are on assignment ...",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid19/topic/en/SAFETY_FOR_BROADCASTERS',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
      { type: 'postback', title: 'Do you have a question?', payload:'ASK' },
          { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]

 })
}



exports.broadcaster_resources = (chat) => {
 chat.say({text:"*🎙 Broadcaster resources*\n\nLinks to broadcaster resources will be posted here soon. ",

 buttons: [
          { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]

 })
}


exports.join_online_groups = (chat) => {
 chat.say({text:"*🎙 Join online broadcaster groups*\n\nLinks to online groups will be share here soon. ",

 buttons: [
          { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]

 })
}

exports.go_back = (chat) => {
 chat.say({
  text: '↩️',
		quickReplies: ["Start",'COVID-19','Tips & resources','Send your question']
	});
}
