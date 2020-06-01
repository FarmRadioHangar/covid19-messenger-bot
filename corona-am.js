const fetch = require('./fetch');
const lang = 'am'

exports.greetings = ['ሰላም','ጀምር','መጀመሪያ']
exports.intro = (chat) => {
 chat.say({
  text: 'ይህ የፌስ ቡክ ሜሴንጀር ቦት ከፋርም ራድዮ ኢንተርናሽናል ነው። \n \
  \nእዚህ ለራዲዮ ጋዜጠኞች የሚሆኑ ከኮሮና ቫይረስሽ(ኮቪድ-19) ጋር የሚገናኙ መረጃና ሰነዶች ያገኛሉ።\
  \nሬድዮ ፕሮግራም ሲያቅዱም ሆነ ሲያዘጋጁ ይጠቅሞታል ብለን ተስፋ እናደርጋለን።\
  \n\nምን ማድረግ ይፈልጋሉ?',
  buttons: [
   { type: 'postback', title: '🦠ስለኮቪድ-19 ለመማር', payload:'LEARN_ABOUT_COVID' },
   { type: 'postback', title: '🎙ሬድዮ ፕሮግራም ዝግጅት', payload: 'GET_RADIO_RESOURCES' },
   { type: 'postback', title: '❓የተዛቡ መረጃዎችን ማረጋገጥ', payload: 'FACT_CHECK_MYTHS' },
 ]},{typing:true})
}

exports.LEARN_ABOUT_COVID = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'ስለኮቪድ-19 ለመማር',
      image_url: 'https://farmradio.org/wp-content/uploads/2020/03/covid-19-response_blog.jpg',
      buttons: [
    		  { type: 'postback', title: 'መሰረታዊ እውነታዎች', payload: 'BASIC_FACTS' },
    		  { type: 'postback', title: 'ቫይረሱ እንዴት እንደሚሰራጭ',payload:'HOW_THE_VIRUS_SPREADS'},
    		  { type: 'postback', title: 'የመከላከያ እርምጃዎች', payload: 'PREVENTIVE_MEASURES' }
    	 ]
    }
   ]
 });
}

exports.BASIC_FACTS = (chat) => {
 chat.say({text:"በጣም የተለመዱት የኮቪድ-19 ምልክቶች ትኩሳት ድካምና ደረቅ ሳል ናቸው፡፡ አብዛኛውን ግዜ ምልክቶች ቀላልና ቀስ በቀስ የሚጀምሩ ናቸው፡፡ አንድንድ ሰዎች ምንም አይነት ምልክት የላቸውም ፣አይታመሙም::ትኩሳት፣ሳል እና የመተንፈስ ችግር ያላቸው ሰዎች ህክምና መሻት አለባቸው፡፡",

 buttons: [
      { type: 'postback', title:"ተጨማሪ ለማወቅ", payload: 'MORE_BASIC_FACTS'},
      { type: 'postback', title: 'ቫይረሱ እንዴት እንደሚሰራጭ', payload:'HOW_THE_VIRUS_SPREADS'},
      { type: 'postback', title: 'ለመመለስ', payload:'GO_BACK' }
    ]

  })
}

exports.MORE_BASIC_FACTS = (chat) => {
 chat.say({text:"አብዛኞቹ ሰዎች (ወደ 80%) ካለምንም የተለየ ህክምና ያገግማሉ፡፡ ከ6 ሰዎች አንዱ ከፍተኛ ህመም ያጋጥማቸዋል፡፡ ዕድሜያቸው የገፉ፣ እንደ ልብ ህመም ፣ስኳር እና የደም ግፊት ያሉ የጤና ዕክሎች ያሉባቸው ሰዎች ለከፋ ህመም  የመጋለጥ ከፍተኛ ዕድል አላቸው፡",
 buttons: [
      { type: 'web_url', title:"አስፈላጊ መረጃ", url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/important_info', webview_height_ratio:'TALL',messenger_extensions: true},
      { type: 'postback', title: 'ለመመለስ', payload:'GO_BACK' }
    ]
  })
}

exports.HOW_THE_VIRUS_SPREADS = (chat) => {
 chat.say({text:"ሰዎች በኮቪድ-19 የሚያዙት በቫይረሱ በተያዙ ሰዎች አማካይነት ነው፡፡በሽታው የሚሰራጨው በበሽታው የተያዙ ሰዎች ሲያስሉ ሲያስነጥሱ ወይም አየር ወደ ውጭ ሲያስወጡ በሚለቋቸው ቅንጣቶች ነው፡፡ እነዚህ ቅንጣቶች አቅራቢያ ያሉ ሰዎች አየር ወደ ውስጥ ሲስቡ ወደ ሰውነታቸው ሊገቡ ይችላሉ ወይ ደግሞ አቅራቢያ ባሉ ቁሶች ወይም ወለሎች ላይ ሊያርፉ ይችላሉ፡፡ ሌሎች ሰዎች በቫይረሱ የተበከሉ ቁሶችን ወይም ወለሎችን ከነኳቸዉ በቫይረሱ ሊያዙ ይችላሉ፡፡",
 buttons: [
      { type: 'postback', title:"ተጨማሪ መረጃ", payload: 'MORE_HOW_THE_VIRUS_SPREADS'},
      { type: 'postback', title:"መሰረታዊ እውነታዎች", payload: 'BASIC_FACTS'},
      { type: 'postback', title: 'ለመመለስ', payload:'GO_BACK' }
    ]
  })
}

exports.MORE_HOW_THE_VIRUS_SPREADS = (chat) => {
 chat.say({text:"ሰዎች ቅንጣቶችን ወደ ውስጥ ሲስቡ ወይም በቫይረሱ የተበከሉ ቁሶችን ወይም ወለሎችን ከነኩ በኋላ አይናቸዉን አፍንጫቸውን ወይም አፋቸውን ሲነኩ በቫይረሱ ሊያዙ ይችላሉ፡፡ ለዚህም ነው በቫይረሱ ከተያዘ ሰው ከ1 ሜትር በላይ መራቅ አስፈላጊ የሚሆነው፡፡ ብዙ ሀገራት ከኮቪድ-19 ቫይረስ በከፍተኛ ደረጃ ከመጠቃት ለመጠበቅ ሰዎች ከቤተሰቦቻቸው በስተቀር ከሌሎች ግለሰቦች ሁሉ ቢያንስ አንድ ሜትር መራቅ አለባቸው የሚል ርቀትን መጠበቂያ መመሪያዎችን ተግባራዊ ያደረጉት፡፡",
  buttons:[
   {type:'postback',title:'የመከላከያ እርምጃዎች',payload:'PREVENTIVE_MEASURES'},
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.PREVENTIVE_MEASURES = (chat) => {
 chat.say({text:"እጅዎን በተደጋጋሚ ይታጠቡ:: ማህበራዊ/አካላዊ ርቀትን ይጠብቁ፡፡ አይኖችዎን አፍንጫዎንና አፍዎን አይንኩ:: መልካም የአተነፋፈስ ሥርዓትን ይለማመዱ::ትኩሳት፣ ሳል እና የመተንፈስ ችግር ካጋጠመዎት አስቀድመው የህክምና አገልግሎት ያግኙ፡፡ ጥንቃቄ የተሞላባቸውን የሰላምታ አሰጣጥ መንገዶችን ይለማመዱ::",
  buttons:[
   {type: 'web_url', title:"ተጨማሪ ለማወቅ", url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/more_preventive_measures', webview_height_ratio:'TALL',messenger_extensions: true},
   {type:'postback',title:'መሰረታዊ እውነታዎች',payload:'BASIC_FACTS'},
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.GET_RADIO_RESOURCES = (chat) => {
 chat.say({
   cards: [
    {title: 'Broadcaster resources for COVID-19', subtitle:"ኮቪድ-19 መረጃ ለሬዲዮ አዘጋጆች",
    image_url: 'https://farmradio.org/wp-content/uploads/2020/03/Precious-Naturinda-website.jpg',
     buttons: [
      { type: 'postback', title: 'በጥንቃቄ ለመስራት', payload: 'WORKING_SAFELY'},
      { type: 'web_url', title: 'ጤናን ለመጠበቅ', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/protect_your_health' , webview_height_ratio:'TALL',messenger_extensions: true},
      { type: 'postback', title: 'ለራዲዮ የሚሆኑ ጥሩ መረጃዎች', payload: 'GOOD_RADIO_RESOURCES' }
    ]},
   ],
   });
}

exports.WORKING_SAFELY = (chat) => {
 fetch.content('WORKING_SAFELY').then(function(response){
  chat.say({
   text:response[0]['content_'+lang],
   buttons: [
    {type: 'postback',title:"መሳሪያዎችን ማጽዳት",payload:'SANITIZE_YOUR_EQUIPMENT'},
    {type: 'postback',title:'ለመመለስ',payload:'GO_BACK'}
   ]
  })
 })
}

exports.SANITIZE_YOUR_EQUIPMENT = (chat) => {
 fetch.content('sanitize_your_equipment').then(function(response){
  chat.say({
   text:response[0]['content_'+lang],
   buttons: [
    { type: 'web_url', title: 'ጤናን ለመጠበቅ', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/protect_your_health' , webview_height_ratio:'TALL',messenger_extensions: true},
    {type: 'postback',title:'ለመመለስ',payload:'GO_BACK'}
   ]
  })
 })
}

exports.GOOD_RADIO_RESOURCES = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'ለራዲዮ የሚሆኑ ጥሩ መረጃዎች',
      image_url: 'https://wire.farmradio.fm/wp-content/uploads/2018/01/broadcaster-resources-image.jpg',
      buttons: [
    		  { type: 'postback', title: 'በአስቸኳይ ጊዜ ማቀድ', payload: 'EMERGENCY_PROGRAMS' },
    		  { type: 'postback', title: 'የግብርና ራዲዮ መረጃዎች',payload:'FARM_RADIO_RESOURCES'},
    		  { type: 'postback', title: 'ኮቪድ-19 መረጃዎች', payload: 'COVID_INFORMATION' }
    	 ]
    }
   ]
 });
}

exports.EMERGENCY_PROGRAMS = (chat) => {
 chat.say({text:"በአስቸኳይ ጊዜ ወቅት ሰዎች በተረጋጋ ስሜት ውስጥ እንዲቆዩ ለማረጋገጥ ና ተገቢውን ምላሽ እንዲሰጡ ጥሩ የራዲዮ ፕሮግራም አቀራረቦች በጣም ጠቃሚ ናቸው፡፡ ውጤታማ የአስቸኳይ ጊዜ ፕሮግራምን ለማቀድና ለማዘጋጀት “Farm Radio International” የራዲዮ ፕሮገራም አቅራቢ መመመሪያ /Broadcaster how-to-guide/ አዘጋጅቶ ለኮረና ቫይረስ ወረርሽኝ እንዲስማማ አድርጓል፡፡\n\nhttp://scripts.farmradio.fm/radio-resource-packs/covid-19-resources/planning-producing-effective-emergency-programming-covid/",
  buttons:[
   {type:'postback',title:'የግብርና ራዲዮ መረጃዎች',payload:'FARM_RADIO_RESOURCES'},
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.FARM_RADIO_RESOURCES = (chat) => {
 chat.say({text:"“Farm Radio International” የራዲዮ ፕሮግራም አዘጋጆች ኮቪድ 19 ዙሪያ ና በገጠሩ ህዝብ ላይ ቀውሱ ያለውን ተፅኖ በተመለከተ ጥራት ያለው ፕሮግራም እንዲያዘጋጁ ለመርዳት የተለያዩ የመረጃ ምንጮችን እያዘጋጀ ነው::",
  buttons:[
   {type:'postback',title:'የአርሶ አደር እውነተኛ ታሪኮች',payload:'FARM_STORIES'},
   {type:'postback',title:'ቁልፍ መረጃዎችና የሬድዮ ስክሪፕቶች',payload:'KEY_INFO_AND_RADIO_SCRIPTS'}
  ]
 })
}


exports.FARMER_STORIES = (chat) => {
  chat.say({
  text:"Barza Wire የአርሶ አደር እውነተኛ ታሪኮች: https://wire.farmradio.fm/tag/emergencies/",
  buttons: [
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.KEY_INFO_AND_RADIO_SCRIPTS = (chat) => {
  chat.say({
  text:"ኮቪድ-19 መረጃዎች በስክሪፕት መልክ (ከፋርም ሬድዮ):\nhttp://scripts.farmradio.fm/radio-resource-packs/covid-19-resources/",
  buttons: [
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.COVID_INFORMATION = (chat) => {
 chat.say({text:"ኮቪድ-19 መረጃዎች",
  buttons:[
   {type:'postback',title:"ፋርም ሬድዮ ቁልፍ መልክቶች",payload:'FRI_KEY_MESSEGES'},
   {type:'postback',title:'የአለም ጤና ድርጅት መረጃዎች',payload:'WHO_RESOURCES'}
  ]
 })
}

exports.FRI_KEY_MESSEGES = (chat) => {
 chat.say({
  text:"ሁሉንም ቁልፍ መረጃዎች እዚ አድራሻ ላይ ይፈልጉ:\n\nhttp://scripts.farmradio.fm/radio-resource-packs/covid-19-resources/key-information-covid-19-broadcasters/",
  buttons: [
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.WHO_RESOURCES = (chat) => {
 chat.say({
  text:"ሁሉንም ቁልፍ መረጃዎች ከአለም ጤና ድርጅት፣ እዚ አድራሻ ላይ ይፈልጉ:\n\nhttps://www.who.int/emergencies/diseases/novel-coronavirus-2019",
  buttons: [
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.FACT_CHECK_MYTHS = (chat) => {
 chat.say({
  	cards: [
    {
     title: 'የተዛቡ መረጃዎችን ማረጋገጥ',
      image_url: 'https://wire.farmradio.fm/wp-content/uploads/2020/05/FAQs-COVID-graphic.png',
      buttons: [
        { type: 'web_url', title: 'እውነታ ለሀሰተኛ መረጃዎች', url: 'https://log.uliza.fm/api/v1/covid19/topic/'+lang+'/truth_behind_myths' , webview_height_ratio:'TALL',messenger_extensions: true},
    		  { type: 'postback', title: 'ሀሰተኛ ዜና እንዳይሰራጭ',payload:'FIGHT_FAKE_NEWS'},
    		  { type: 'postback', title: 'የኮቪድ-19 አሁናዊ የተዛቡ ሃሳቦች', payload: 'LATEST_COVID_MYTHS' }
    	 ]
    }
   ]
 });
}

exports.FIGHT_FAKE_NEWS = (chat) => {
 chat.say({
  text:"በኛ 'Broadcaster how-to guide'  ውስጥ ሀሰተኛ ዜናዎችን ና ሳይንሳዊ ያልሆኑ እምነቶች እውነተኛነትን እንዴት መለየት እንደሚችሉ ይማሩ፡፡ \n\nhttp://scripts.farmradio.fm/radio-resource-packs/farm-radio-resource-pack-114/bh2-fake-news-identify/",
  buttons: [
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.LATEST_COVID_MYTHS = (chat) => {
 chat.say({
  text:"'Africa Check' አሁናዊ በሳይንስ ያልተረጋገጡ እምነቶች ና የተሳሳቱ ግንዛቤዎችን ይከታተላል፡፡ ይህን አድራሻ ተከትለው መረጃ ያግኙ \n\nGet the latest information: https://africacheck.org/reports/live-guide-all-our-coronavirus-fact-checks-in-one-place/",
  buttons: [
   {type:'postback',title:'ለመመለስ',payload:'GO_BACK'}
  ]
 })
}

exports.GO_BACK = (chat) => {
 chat.say({
  text: '↩️',
		quickReplies: ["መጀመሪያ",'ስለኮቪድ-19 ለመማር','ሬድዮ ፕሮግራም ዝግጅት','የተዛቡ መረጃዎችን ማረጋገጥ','ቋንቋ']
	});
}
