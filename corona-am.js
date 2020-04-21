const question = require('./question-handler');

exports.greetings = ['hi','start','Start','hello','Hi','Hello']
exports.intro = (chat) => {
 chat.say({
  text: 'This is a messanger bot from Farm Radio International. \n \
  \nYou can find information and resources for broadcasters on Coronavirus (COVID-19).\
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

const askName = (convo) => {
 convo.ask(`What's your full name?`, (payload, convo) => {
  const text = payload.message.text;
  convo.set('name', text);
   askStation(convo)
 });

};

const askStation = (convo) => {
 convo.ask('Which radio station do you work for?',(payload,convo) => {
   const text = payload.message.text
   convo.set('station', text);
   convo.say(`Got it!`).then(() => sendSummary(convo));
 })
}

const sendSummary = (convo) => {
 question.submit(convo).
 then(function(response) {
  convo.say({text:`Thank you, your message is recieved:
       - Name: ${convo.get('name')}
       - Radio station: ${convo.get('station')}
       - Question/Comment: ${convo.get('text')}`,
       buttons: [
            { type: 'postback', title: 'Go back', payload:'GO_BACK' }
          ]
      },{typing:true});

      convo.end();
 })
};

exports.ask = (convo) => {
 convo.ask(`*❓What is your question or comment concerning COVID-19 & communication ?* \n\nYou can either use text or audio inputs to submit. Your questions will reach experts and you will recieve a response via your messenger account as soon as possible.`, (payload, convo) => {
  let question = "None"
  if (payload.message.attachments) {
      question = payload.message.attachments[0].payload.url
      convo.set('type',payload.message.attachments[0].type)
  }
  else {
    question = payload.message.text;
    convo.set('type','text')
  }

  convo.set('question', question);
  convo.say(`Your question/comment is: ${question}`).then(() => askName(convo));
 });
};



exports.how_the_virus_is_spread = (chat) => {
 chat.say({text:"*🦠 How the virus is spread*\n\n People catch COVID-19 from others who have the virus. The disease is spread through small droplets produced when infected people cough, sneeze, or exhale ... ",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid/topic/am/HOW_THE_VIRUS_IS_SPREAD',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]

  })

}

exports.symptoms_of_infection = (chat) => {

 chat.say({text:"*🦠 Symptoms of infection*\n\nThe most common symptoms of COVID-19 are fever, tiredness, and dry cough ...",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid/topic/am/SYMPTOMS_OF_INFECTION',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]
 })
}


exports.myths_misinformation = (chat) => {
 chat.say({text:"*🦠  Myths, misinformation, and fake news*\n\n There is a lot of false information circulating about COVID-19.",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid/topic/am/MYTHS_MISINFORMATION',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
          { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]
 })
}

exports.safety_for_broadcasters = (chat) => {
 chat.say({text:"*🎙 Safety for radio broadcasters*\n\nIf you must conduct a face-to-face interview, respect physical distancing. Don't leave equipment lying around when you are on assignment ...",

 buttons: [
      { type: 'web_url', title:"Read more", url: 'https://log.uliza.fm/api/v1/covid/topic/am/SAFETY_FOR_BROADCASTERS',webview_height_ratio: "COMPACT",
          messenger_extensions: true},
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
