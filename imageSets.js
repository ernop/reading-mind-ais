const imageSets = {
"midjourney-anime": {
    humanReadableName: "Anime Waifu (midjourney)",
    prompt: "A {word} facial expression on an anime waifu, facing camera, facial portrait",
    active: true,
    emotions:"calm,flirtatious,curious,hostile,irritated,ashamed,aggressive,bored,confused,in love,happy,sad,fearful, angry, empathetic, trusting, grateful, surprised, guilty, proud, envious, disgusted, hopeful,exhausted,anxious,bored,condescending,pompous,flirtatious,coquettish".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 28 2024",
    daily_puzzle_size:30,
    numberOfAnswerButtons: 4,
  },
"dalle3-dogs-rewrite":{
  humanReadableName: "Dogs of Dall-e 3",
    prompt: "A dog with WORD. The goal is to emphasize that specific exact emotion, so do not change that. You should describe and design this image, in detail with specifics on how it is illustrated, lighting, composition, style, era, as well as the objects, individuals, people, or anything else which might appear - you make the choice based on the text, and be specific. Include their orientation, light sources, directions and relationships, symbolisms, the way they are drawn, etc. Be extremely specific. Pick a situation which would naturally elicit the emotions we are portraying, to make the emotions expressed more natural.",
    active: true,
    emotions:"aggressive, aloof, anguished, ambitious, angry, anxious, ashamed, astonished, awed, bored, calm, cautious, condescending, confused, contented, curious, determined, diligent, disgusted, ecstatic, empathetic, encouraging, enlightened, envious, exhausted, exhilarated, fascinated, fearful, foolish, forgiving, flirtatious, frustrated, giddy, gloomy, grateful, greedy, grieving, guilty, happy, hopeful, horrified, hostile, humiliated, impatient, in love, indignant, inspired, intimidated, irritated, jealous, lonely, loyal, melancholic, mischievous, mournful, oblivious, overwhelmed, passionate, perplexed, pitiful, pompous, proud, regretful, relieved, remorseful, resentful, restless, reverent, sad, serene, skeptical, stressed, surprised, sympathetic, transcendent, triumphant, trusting, uneasy, vulnerable, wistful, yearning".split(',').map(a=>a.trim()),     //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    special_icon: "icon.png",
    source:"Dall-e 3",
    date:"May 2 2024",
    daily_puzzle_size:40,
    numberOfAnswerButtons: 4,
  },
"midjourney-woman-russian": {
    humanReadableName: "Russian Woman (1915s)",
    prompt: "a very {WORD} woman from Perm, Russia, 1915s style photo, close up, very sharp and clear color photo, looking at camera, centered --seed 654897 --ar 1:1",
    active: true,
    emotions:"affectionate,aggressive,angry,anxious,ashamed,awed,bored,calm,compassionate,confused,contented,curious,delighted,flirtatious,guilty,hateful,hopeful,horrified,hostile,humiliated,interested,irritated,jealous,joking".split(',').map(a=>a.trim()),
    //disappointed, hungry, sleepy, exhausted, anxious, bored, condescending, pompous, flirtatious, coquettish, lonely, motherly, determined, hopeless
    source:"Midjourney v6",
    date:"April 27 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4
  },
"midjourney-man-british":{
    humanReadableName: "English Man 30yo in 1980 london (1915s)",
    prompt: "a {WORD} white man, 30 years old, in 1980 London, close up, clear, outdoor photograph, subject in center frame, 3/4 profile, subject looking at camera --ar 3:2 --seed 654987",
    active: false,
    emotions:"calm,flirtatious,curious,hostile,irritated,ashamed,aggressive,bored,confused".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 27 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 3,
  },
  "midjourney-audrey-hepburn": {
    humanReadableName: "Audrey Hepburn (in Midjourney)",
    prompt: "Audrey Hepburn is {WORD} in a clear daytime color photo from 1960 looking at the camera. --ar 1:1 --seed 789789",
    active: true,
    emotions:"in love,happy,sad,fearful, angry, empathetic, trusting, grateful, surprised, guilty, proud, envious, disgusted, hopeful,exhausted,anxious,bored,condescending,pompous,flirtatious,coquettish".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 27 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },
 "dalle3-people-natural":{
  humanReadableName: "Dalle3 People, Natural style",
    prompt: "<Used various LLMs to generate situtaions for the emotions, then illustrated them with Dalle3, not using the default vivid style; these are 'natural'.>",
    active: true,
    emotions:"aggressive, aloof, anguished, ambitious, angry, anxious, ashamed, astonished, awed, bored, calm, cautious, condescending, confused, contented, curious, determined, diligent, disgusted, ecstatic, empathetic, encouraging, enlightened, envious, exhausted, exhilarated, fascinated, fearful, foolish, forgiving, flirtatious, frustrated, giddy, gloomy, grateful, greedy, grieving, guilty, happy, hopeful, horrified, hostile, humiliated, impatient, in love, indignant, inspired, intimidated, irritated, jealous, lonely, loyal, melancholic, mischievous, mournful, oblivious, overwhelmed, passionate, perplexed, pitiful, pompous, proud, regretful, relieved, remorseful, resentful, restless, reverent, sad, serene, skeptical, stressed, surprised, sympathetic, transcendent, triumphant, trusting, uneasy, vulnerable, wistful, yearning".split(',').map(a=>a.trim()),

    //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    source:"Dall-e 3",
    date:"May 3 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },
  "ideogram-taylor-swift-magic-off": {
    humanReadableName: "Taylor Swift (Ideogram.ai)",
    prompt: "Taylor Swift has {word} on her face in a clear daytime photo at the beach while swimming, close up face photo, looking at the camera, she is 21 years old in 2010",
    active: false,
    emotions:"an aggressive look, an aloof look, an anguished look, an ambitious look, an angry look, an anxious look, an ashamed look, an astonished look, an awed look, a bored look, a calm look, a cautious look, a condescending look, a confused look, a contented look, a curious look, a determined look, a diligent look, a disgusted look, an ecstatic look, an empathetic look, an encouraging look, an enlightened look, an envious look, an exhausted look, an exhilarated look, a fascinated look, a fearful look, a foolish look, a forgiving look, a flirtatious look, a frustrated look, a giddy look, a gloomy look, a grateful look, a greedy look, a grieving look, a guilty look, a happy look, a hopeful look, a horrified look, a hostile look, a humiliated look, an impatient look, an in-love look, an indignant look, an inspired look, an intimidated look, an irritated look, a jealous look, a lonely look, a loyal look, a melancholic look, a mischievous look, a mournful look, an oblivious look, an overwhelmed look, a passionate look, a perplexed look, a pitiful look, a pompous look, a proud look, a regretful look, a relieved look, a remorseful look, a resentful look, a restless look, a reverent look, a sad look, a serene look, a skeptical look, a stressed look, a surprised look, a sympathetic look, a transcendent look, a triumphant look, a trusting look, an uneasy look, a vulnerable look, a wistful look, a yearning look".split(',').map(a=>a.trim()),

    //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    source:"Midjourney v6",
    date:"April 27 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },
"ideogram-taylor-swift-magic-on": {
    humanReadableName: "Taylor Swift (Ideogram.ai) with rewrites",
    prompt: "Taylor Swift has {word} on her face in a clear daytime photo at the beach while swimming, close up face photo, looking at the camera, she is 21 years old in 2010",
    active: true,
    emotions:"aggressive, aloof, angry, arrogant, bored, disgusted, embarrassed, empathetic, exasperated, fearful, guilty, happy, hostile, incredulous, inlove, sad, sarcastic, silly, surprised".split(',').map(a=>a.trim()),

    //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    source:"Midjourney v6",
    date:"April 27 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },
"dalle3-taylor-swift-face": {
    humanReadableName: "Taylor Swift (Dalle-3) (Full Portrait)",
    prompt: "A woman who looks exactly like Taylor Swift is WORD in a clear daytime color photo looking at the camera, close up of her face, age 21, portrait, realistic, photo",
    active: true,
    emotions:"Anguished, Ashamed, Ecstatic, Empathetic, Exhausted, Exhilarated, Fearful, Forgiving, Grieving, Guilty, Happy, Horrified, Humiliated, In love, Indignant, Inspired, Jealous, Lonely, Melancholic, Sad".split(',').map(a=>a.trim()),

    //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    source:"Dalle-3",
    date:"April 29 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },
"dalle3-taylor-swift-eyes": {
    humanReadableName: "Taylor Swift (Dalle-3) (Eyes only)",
    prompt: "A woman who looks exactly like Taylor Swift is WORD in a clear daytime color photo looking at the camera, close up of her face, age 21, portrait, realistic, photo [eye location found via dlib]",
    active: true,
    emotions:"Anguished, Ashamed, Ecstatic, Empathetic, Exhausted, Exhilarated, Fearful, Forgiving, Grieving, Guilty, Happy, Horrified, Humiliated, In love, Indignant, Inspired, Jealous, Lonely, Melancholic, Sad".split(',').map(a=>a.trim()),

    //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    source:"Dalle-3",
    date:"April 29 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },

  "midjourney-anime-hard": {
    humanReadableName: "Anime Waifu (midjourney), 8 choices",
    prompt: "A {word} facial expression on an anime waifu, facing camera, facial portrait",
    active: true,
    emotions:"flirtatious,calm,curious,hostile,irritated,ashamed,aggressive,bored,confused,in love,happy,sad,fearful, angry, empathetic, trusting, grateful, surprised, guilty, proud, envious, disgusted, hopeful,exhausted,anxious,bored,condescending,pompous,flirtatious,coquettish".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 28 2024",
    daily_puzzle_size:30,
    numberOfAnswerButtons: 8,
  },
};
