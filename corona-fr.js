const fetch = require('./fetch');
const lang = 'fr'

exports.greetings = ['salut','Salut','Bonjour','bonjour','début','Début']
exports.intro = (chat) => {
 chat.say({
  text: 'TC’est le chatbot du COVID-19 pour les partenaires de radiodiffusion de RRI. Ici vous trouverez des infos et des ressources sur le coronavirus. On espère que ce service vous aidera  à planifier et préparer votre émission radiophonique.\
     \n\nQue recherchez-vous?',
  buttons: [
   { type: 'postback', title: '🦠 Infos clés-COVID-19', payload:'LEARN_ABOUT_COVID' },
   { type: 'postback', title: '🎙 Ressources radiophoniques', payload: 'GET_RADIO_RESOURCES' },
   { type: 'postback', title: '❓ Vérification des mythes', payload: 'FACT_CHECK_MYTHS' },
 ]},{typing:true})
}

exports.LEARN_ABOUT_COVID = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'Infos clés-COVID-19',
      image_url: 'https://farmradio.org/wp-content/uploads/2020/03/covid-19-respons-banner_blog-fr.jpg',
      buttons: [
    		  { type: 'postback', title: 'Infos clés sur COVID-19', payload: 'BASIC_FACTS' },
    		  { type: 'postback', title: 'Transmission du virus',payload:'HOW_THE_VIRUS_SPREADS'},
    		  { type: 'postback', title: 'Mesures préventives', payload: 'PREVENTIVE_MEASURES' }
    	 ]
    }
   ]
 });
}

exports.BASIC_FACTS = (chat) => {
 chat.say({text:"Ses symptômes courants sont la fièvre, la fatigue et la toux sèche. Ils sont généralement bénins et apparaissent progressivement. Certains ne présentent aucun symptôme et ne se sentent pas malades.",

 buttons: [
      { type: 'postback', title:"En savoir plus", payload: 'MORE_BASIC_FACTS'},
      { type: 'postback', title: 'Transmission du virus', payload:'HOW_THE_VIRUS_SPREADS'},
      { type: 'postback', title: 'Retourner', payload:'GO_BACK' }
    ]

  })
}

exports.MORE_BASIC_FACTS = (chat) => {
 chat.say({text:"Les personnes qui ont de la fièvre, qui toussent et respirent difficilement doivent demander une aide médicale. Beaucoup (environ 80 %) guérissent sans avoir reçu des soins particuliers. Près d’une personne sur six tombe gravement malade.",
 buttons: [
      { type: 'web_url', title:"Infos importantes", url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/important_info', webview_height_ratio:'TALL',messenger_extensions: true},
      { type: 'postback', title: 'Retourner', payload:'GO_BACK' }
    ]
  })
}

exports.HOW_THE_VIRUS_SPREADS = (chat) => {
 chat.say({text:"Les gens contractent la maladie auprès d’autres qui ont le virus. La maladie se propage par le biais de gouttelettes qui s’échappent lorsque les personnes infectées toussent, éternuent ou expirent. Ces gouttelettes peuvent être inhalées ou touchées par les personnes situées à proximité.",
 buttons: [
      { type: 'postback', title:"En savoir plus", payload: 'MORE_HOW_THE_VIRUS_SPREADS'},
      { type: 'postback', title:"Infos clés-COVID-19", payload: 'BASIC_FACTS'},
      { type: 'postback', title: 'Retourner', payload:'GO_BACK' }
    ]
  })
}

exports.MORE_HOW_THE_VIRUS_SPREADS = (chat) => {
 chat.say({text:"Lorsque les gens inhalent les gouttelettes ou touchent des objets ou des surfaces contaminés, puis se touchent les yeux, le nez ou la bouche, elles peuvent être infectées. C’est pourquoi il faut rester à plus d’un mètre d’une personne malade.",
  buttons:[
   {type:'postback',title:'Mesures préventives',payload:'PREVENTIVE_MEASURES'},
   {type:'postback',title:'Retourner',payload:'GO_BACK'}
  ]
 })
}

exports.PREVENTIVE_MEASURES = (chat) => {
 chat.say({text:"Laver régulièrement les mains. Maintenir une distanciation sociale / physique. Éviter de se toucher les yeux, le nez et la bouche. Pratiquer une bonne hygiène respiratoire. Si vous êtes fiévreux, toussez et respirez difficilement, demandez rapidement une aide médicale. Utiliser les moyens de salutation sécuritaires.",
  buttons:[
   {type: 'web_url', title:"En savoir plus", url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/more_preventive_measures', webview_height_ratio:'TALL',messenger_extensions: true},
   {type:'postback',title:'Infos clés-COVID-19',payload:'BASIC_FACTS'},
   {type:'postback',title:'Retourner',payload:'GO_BACK'}
  ]
 })
}

exports.GET_RADIO_RESOURCES = (chat) => {
 chat.say({
   cards: [
    {title: 'Broadcaster resources for COVID-19',
    image_url: 'https://farmradio.org/wp-content/uploads/2020/03/Precious-Naturinda-website.jpg',
     buttons: [
      { type: 'postback', title: 'Travailler en sécurité', payload: 'WORKING_SAFELY'},
      { type: 'web_url', title: 'Rester en bonne santé', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/protect_your_health' , webview_height_ratio:'TALL',messenger_extensions: true},
      { type: 'postback', title: 'Ressources radios', payload: 'GOOD_RADIO_RESOURCES' }
    ]},
   ],
   });
}

exports.WORKING_SAFELY = (chat) => {
 fetch.content('WORKING_SAFELY').then(function(response){
  chat.say({
   text:response[0]['content_'+lang],
   buttons: [
    {type: 'postback',title:"Désinfecter",payload:'SANITIZE_YOUR_EQUIPMENT'},
    {type: 'postback',title:'Retourner',payload:'GO_BACK'}
   ]
  })
 })
}

exports.SANITIZE_YOUR_EQUIPMENT = (chat) => {
 fetch.content('sanitize_your_equipment').then(function(response){
  chat.say({
   text:response[0]['content_'+lang],
   buttons: [
    { type: 'web_url', title: 'Rester en bonne santé', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/protect_your_health' , webview_height_ratio:'TALL',messenger_extensions: true},
    {type: 'postback',title:'Retourner',payload:'GO_BACK'}
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
    		  { type: 'postback', title: 'Émissions d’urgence', payload: 'EMERGENCY_PROGRAMS' },
    		  { type: 'postback', title: 'Ressources-RRI',payload:'FARM_RADIO_RESOURCES'},
    		  { type: 'postback', title: 'Infos-COVID-19', payload: 'COVID_INFORMATION' }
    	 ]
    }
   ]
 });
}

exports.EMERGENCY_PROGRAMS = (chat) => {
 chat.say({text:"Il importe d’adopter de bonnes pratiques de reportage pour permettre aux gens de rester calmes en période de crise et prendre les mesures appropriées pour y faire face. RRI a un guide pratique pour la radiodiffusion sur comment planifier et produire des émissions efficaces en temps de crise.\n\nhttp://scripts.farmradio.fm/fr/radio-resource-packs/ressources-sur-covid-19/planifier-et-produire-des-emissions-efficaces-en-temps-de-crise-covid-19/",
  buttons:[
   {type:'postback',title:'Ressources-RRI',payload:'FARM_RADIO_RESOURCES'},
   {type:'postback',title:'Retourner',payload:'GO_BACK'}
  ]
 })
}

exports.FARM_RADIO_RESOURCES = (chat) => {
 chat.say({text:"RRI partage plusieurs ressources d’information pour aider les radiodiffuseurs à produire de bonnes émissions sur le COVID-19.",
  buttons:[
   {type:'postback',title:'Nouvelles agricoles',payload:'FARMER_STORIES'},
   {type:'postback',title:'Textes radiophoniques',payload:'KEY_INFO_AND_RADIO_SCRIPTS'}
  ]
 })
}


exports.FARMER_STORIES = (chat) => {
 chat.say("Nouvelles agricoles de Barza infos : https://wire.farmradio.fm/fr/tag/urgences/")
}

exports.KEY_INFO_AND_RADIO_SCRIPTS = (chat) => {
 chat.say("Accéder aux ensembles de ressources:\nhttp://scripts.farmradio.fm/fr/radio-resource-packs/ressources-sur-covid-19/")
}

exports.COVID_INFORMATION = (chat) => {
 chat.say({text:"Infos-COVID-19",
  buttons:[
   {type:'postback',title:"Messages clés-RRI",payload:'FRI_KEY_MESSEGES'},
   {type:'postback',title:'Ressources-OMS',payload:'WHO_RESOURCES'}
  ]
 })
}

exports.FRI_KEY_MESSEGES = (chat) => {
 chat.say("Tous les messages clés de RRI:\n\nhttp://scripts.farmradio.fm/fr/radio-resource-packs/ressources-sur-covid-19/informations-de-base-sur-le-covid-19-pour-la-radiodiffusion/")
}

exports.WHO_RESOURCES = (chat) => {
 chat.say("Trouver les informations et les ressources de l’OMS ici:\n\nhttps://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019")
}

exports.FACT_CHECK_MYTHS = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'Vérification des mythes',
      image_url: 'https://wire.farmradio.fm/wp-content/uploads/2020/05/FAQs-COVID-graphic.png',
      buttons: [
        { type: 'web_url', title: 'Vérification des mythes', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/truth_behind_myths' , webview_height_ratio:'TALL',messenger_extensions: true},
    		  { type: 'postback', title: 'Plus sur les fausses nouvelles',payload:'FIGHT_FAKE_NEWS'},
    		  { type: 'postback', title: 'Récents mythe', payload: 'LATEST_COVID_MYTHS' }
    	 ]
    }
   ]
 });
}

exports.FIGHT_FAKE_NEWS = (chat) => {
 chat.say("Découvrez comment gérer les fausses nouvelles dans notre guide pratique pour la radiodiffusion. \n\nhttp://scripts.farmradio.fm/fr/radio-resource-packs/114-ensemble-des-ressources-pour-la-radio-agricole/guide-pratique-fausses-nouvelles-comment-les-reconnaitre-et-que-faire-pour-y-remedier/")
}

exports.LATEST_COVID_MYTHS = (chat) => {
 chat.say("Tous les récents mythes et les données de vérification sont accessibles sur le site web d’Africa Check:\n\nhttps://fr.africacheck.org/")
}

exports.GO_BACK = (chat) => {
 chat.say({
  text: '↩️',
		quickReplies: ["Début",'Infos clés-COVID-19','Ressources radiophoniques','Vérification des mythes','Langue']
	});
}
