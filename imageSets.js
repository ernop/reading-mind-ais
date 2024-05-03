const imageSets = {
   "midjourney-anime": {
    humanReadableName: "Anime Waifu (midjourney)",
    prompt: "A {word} facial expression on an anime waifu, facing camera, facial portrait",
    active: true,
    emotions:"calm,flirtatious,curious,hostile,irritated,ashamed,aggressive,bored,confused,in love,happy,sad,fearful, angry, empathetic, trusting, grateful, surprised, guilty, proud, envious, disgusted, hopeful,exhausted,anxious,bored,condescending,pompous,flirtatious,coquettish".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 28 2024",
    daily_puzzle_size:20,
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
    daily_puzzle_size:1,
    numberOfAnswerButtons: 4
  },
"midjourney-man-british":{
    humanReadableName: "English Man 30yo in 1980 london (1915s)",
    prompt: "a {WORD} white man, 30 years old, in 1980 London, close up, clear, outdoor photograph, subject in center frame, 3/4 profile, subject looking at camera --ar 3:2 --seed 654987",
    active: true,
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
  "ideogram-taylor-swift-magic-off": {
    humanReadableName: "Taylor Swift (Ideogram.ai)",
    prompt: "Taylor Swift is {word} in a clear daytime color photo looking at the camera, close up of her face, 2010, portrait, realistic, photo",
    active: true,
    emotions:"angry, bored, disgusted, exasperated, flirtatious, grateful, happy, inlove, nostalgic, pitying".split(',').map(a=>a.trim()),

    //angry, empathetic, trusting, surprised, guilty, proud, envious, hopeful,exhausted,anxious,condescending,pompous,flirtatious,coquettish
    source:"Midjourney v6",
    date:"April 27 2024",
    daily_puzzle_size:20,
    numberOfAnswerButtons: 4,
  },
"dalle3-taylor-swift": {
    humanReadableName: "Taylor Swift (Dalle-3) (Full Portrait)",
    prompt: "A woman who looks like Taylor Swift is {word} in a clear daytime color photo looking at the camera, close up of her face, 2010, portrait, realistic, photo",
    active: true,
    emotions:"angry, bored, disgusted, exasperated, flirtatious, grateful, happy, inlove, nostalgic, pitying".split(',').map(a=>a.trim()),

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
    daily_puzzle_size:20,
    numberOfAnswerButtons: 8,
  },


};
