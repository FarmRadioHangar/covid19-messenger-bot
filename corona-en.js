const fetch = require('./fetch');
const lang = 'en'

exports.greetings = ['hi','start','Start','hello','Hi','Hello']
exports.intro = (chat) => {
 chat.say({
  text: 'This is the FRI Broadcaster COVID-19 messenger bot. \n \
  \nHere you can find information and resources for broadcasters on coronavirus (COVID-19).\
  \nWe hope this is useful for planning and preparing your radio program.\
  \n\nWhat do you want  do?',
  buttons: [
   { type: 'postback', title: '🦠 Learn about COVID-19', payload:'LEARN_ABOUT_COVID' },
   { type: 'postback', title: '🎙 Get radio resources', payload: 'GET_RADIO_RESOURCES' },
   { type: 'postback', title: '❓ Fact-check myths', payload: 'FACT_CHECK_MYTHS' },
 ]},{typing:true})
}

exports.LEARN_ABOUT_COVID = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'Learn about COVID-19',
      image_url: 'https://farmradio.org/wp-content/uploads/2020/03/covid-19-response_blog.jpg',
      buttons: [
    		  { type: 'postback', title: 'Basic facts', payload: 'BASIC_FACTS' },
    		  { type: 'postback', title: 'How the virus spreads',payload:'HOW_THE_VIRUS_SPREADS'},
    		  { type: 'postback', title: 'Preventive measures', payload: 'PREVENTIVE_MEASURES' }
    	 ]
    }
   ]
 });
}

exports.BASIC_FACTS = (chat) => {
 chat.say({text:"The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Symptoms are usually mild and begin gradually. Some infected people have no symptoms and don't feel ill. People with fever, cough, and difficulty breathing should seek medical attention.",

 buttons: [
      { type: 'postback', title:"Learn more", payload: 'MORE_BASIC_FACTS'},
      { type: 'postback', title: 'How the virus spreads', payload:'HOW_THE_VIRUS_SPREADS'},
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]

  })
}

exports.MORE_BASIC_FACTS = (chat) => {
 chat.say({text:"Most people (about 80%) recover without special treatment. About 1 in 6 people become seriously ill. Older people and people with health issues such as heart problems, diabetes, and high blood pressure are more likely to become seriously ill.",
 buttons: [
      { type: 'web_url', title:"Important info", url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/important_info', webview_height_ratio:'TALL',messenger_extensions: true},
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]
  })
}

exports.HOW_THE_VIRUS_SPREADS = (chat) => {
 chat.say({text:"People catch COVID-19 from others who have the virus. The disease is spread through small droplets produced when infected people cough, sneeze, or exhale. These droplets can be inhaled by people nearby or land on nearby objects and surfaces. If touched by other people, they can be infected. ",
 buttons: [
      { type: 'postback', title:"More info", payload: 'MORE_HOW_THE_VIRUS_SPREADS'},
      { type: 'postback', title:"Basic facts", payload: 'BASIC_FACTS'},
      { type: 'postback', title: 'Go back', payload:'GO_BACK' }
    ]
  })
}

exports.MORE_HOW_THE_VIRUS_SPREADS = (chat) => {
 chat.say({text:"When people inhale droplets or touch contaminated objects or surfaces, then touch their eyes, nose, or mouth, they can be infected. This is why it is important to stay more than 1 metre away from a person who is sick.",
  buttons:[
   {type:'postback',title:'Preventive measures',payload:'PREVENTIVE_MEASURES'},
   {type:'postback',title:'Go back',payload:'GO_BACK'}
  ]
 })
}

exports.PREVENTIVE_MEASURES = (chat) => {
 chat.say({text:"Wash your hands frequently. Maintain social / physical distancing. Avoid touching your eyes, nose, and mouth. Practice good respiratory hygiene. If you have fever, a cough, and difficulty breathing, seek medical care early. Practice safe greetings.",
  buttons:[
   {type: 'web_url', title:"Learn more", url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/more_preventive_measures', webview_height_ratio:'TALL',messenger_extensions: true},
   {type:'postback',title:'Basic facts',payload:'BASIC_FACTS'},
   {type:'postback',title:'Go back',payload:'GO_BACK'}
  ]
 })
}

exports.GET_RADIO_RESOURCES = (chat) => {
 chat.say({
   cards: [
    {title: 'Broadcaster resources for COVID-19', subtitle:"Staying safe while still working",
    image_url: 'https://farmradio.org/wp-content/uploads/2020/03/Precious-Naturinda-website.jpg',
     buttons: [
      { type: 'postback', title: 'Working safely', payload: 'WORKING_SAFELY'},
      { type: 'web_url', title: 'Protect your health', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/protect_your_health' , webview_height_ratio:'TALL',messenger_extensions: true},
      { type: 'postback', title: 'Good radio resources', payload: 'GOOD_RADIO_RESOURCES' }
    ]},
   ],
   });
}

exports.WORKING_SAFELY = (chat) => {
 fetch.content('WORKING_SAFELY').then(function(response){
  chat.say({
   text:response[0]['content_'+lang],
   buttons: [
    {type: 'postback',title:"Sanitize your equipment",payload:'SANITIZE_YOUR_EQUIPMENT'},
    {type: 'postback',title:'Go back',payload:'GO_BACK'}
   ]
  })
 })
}

exports.SANITIZE_YOUR_EQUIPMENT = (chat) => {
 fetch.content('sanitize_your_equipment').then(function(response){
  chat.say({
   text:response[0]['content_'+lang],
   buttons: [
    { type: 'web_url', title: 'Protect your health', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/protect_your_health' , webview_height_ratio:'TALL',messenger_extensions: true},
    {type: 'postback',title:'Go back',payload:'GO_BACK'}
   ]
  })
 })
}

exports.GOOD_RADIO_RESOURCES = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'Good radio resources',
      image_url: 'https://wire.farmradio.fm/wp-content/uploads/2018/01/broadcaster-resources-image.jpg',
      buttons: [
    		  { type: 'postback', title: 'Emergency programs', payload: 'EMERGENCY_PROGRAMS' },
    		  { type: 'postback', title: 'Farm Radio resources',payload:'FARM_RADIO_RESOURCES'},
    		  { type: 'postback', title: 'COVID-19 information', payload: 'COVID_INFORMATION' }
    	 ]
    }
   ]
 });
}

exports.EMERGENCY_PROGRAMS = (chat) => {
 chat.say({text:"Good reporting practices are also important to ensure that people stay calm in a time of emergency and take appropriate action to respond. Farm Radio International has produced a Broadcaster how-to guide on planning and producing effective emergency response programming, and adapted it for the coronavirus pandemic.\n\nhttp://scripts.farmradio.fm/radio-resource-packs/covid-19-resources/planning-producing-effective-emergency-programming-covid/",
  buttons:[
   {type:'postback',title:'Farm Radio resources',payload:'FARM_RADIO_RESOURCES'},
   {type:'postback',title:'Go back',payload:'GO_BACK'}
  ]
 })
}

exports.FARM_RADIO_RESOURCES = (chat) => {
 chat.say({text:"Farm Radio International is producing a variety of information resources to help broadcasters produce good quality radio programming around COVID-19 and the impact of this crisis on rural populations.",
  buttons:[
   {type:'postback',title:'Farmer stories',payload:'FARMER_STORIES'},
   {type:'postback',title:'Key info & radio scripts',payload:'KEY_INFO_AND_RADIO_SCRIPTS'}
  ]
 })
}


exports.FARMER_STORIES = (chat) => {
 chat.say("Barza Wire Farmer stories: https://wire.farmradio.fm/tag/emergencies/")
}

exports.KEY_INFO_AND_RADIO_SCRIPTS = (chat) => {
 chat.say("Access Farm Radio’s resources on COVID-19:\nhttp://scripts.farmradio.fm/radio-resource-packs/covid-19-resources/")
}

exports.COVID_INFORMATION = (chat) => {
 chat.say({text:"COVID-19 information",
  buttons:[
   {type:'postback',title:"FRI's key messages",payload:'FRI_KEY_MESSEGES'},
   {type:'postback',title:'WHO resources',payload:'WHO_RESOURCES'}
  ]
 })
}

exports.FRI_KEY_MESSEGES = (chat) => {
 chat.say("Find all these key messages on COVID-19:\n\nhttp://scripts.farmradio.fm/radio-resource-packs/covid-19-resources/key-information-covid-19-broadcasters/")
}

exports.WHO_RESOURCES = (chat) => {
 chat.say("Find all the information and resources from the World Health Organization here:\n\nhttps://www.who.int/emergencies/diseases/novel-coronavirus-2019")
}

exports.FACT_CHECK_MYTHS = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'Fact-check myths',
      image_url: 'https://wire.farmradio.fm/wp-content/uploads/2020/05/FAQs-COVID-graphic.png',
      buttons: [
        { type: 'web_url', title: 'Truth behind myths', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/truth_behind_myths' , webview_height_ratio:'TALL',messenger_extensions: true},
    		  { type: 'postback', title: 'Fight fake news',payload:'FIGHT_FAKE_NEWS'},
    		  { type: 'postback', title: 'Latest COVID myths', payload: 'LATEST_COVID_MYTHS' }
    	 ]
    }
   ]
 });
}

exports.FIGHT_FAKE_NEWS = (chat) => {
 chat.say("Learn how to spot fake news and fact-check myths in our Broadcaster how-to guide.\n\nhttp://scripts.farmradio.fm/radio-resource-packs/farm-radio-resource-pack-114/bh2-fake-news-identify/")
}

exports.LATEST_COVID_MYTHS = (chat) => {
 chat.say("Africa Check is keeping tabs on the latest myths and misconceptions. \n\nGet the latest information: https://africacheck.org/reports/live-guide-all-our-coronavirus-fact-checks-in-one-place/")
}

exports.GO_BACK = (chat) => {
 chat.say({
  text: '↩️',
		quickReplies: ["Start",'Learn about COVID-19','Get radio resources','Fact-check myths','Language']
	});
}
