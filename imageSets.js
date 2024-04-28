const imageSets = {
  "midjourney-man-british":{
    humanReadableName: "English Man 30yo in 1980 london (1915s)",
    prompt: "a {WORD} white man, 30 years old, in 1980 London, close up, clear, outdoor photograph, subject in center frame, 3/4 profile, subject looking at camera --ar 3:2 --seed 654987",
    active: true,
    emotions:"calm,flirtatious,curious,hostile,irritated,ashamed,aggressive,bored,confused".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 27 2024"
  },
  "midjourney-audrey-hepburn": {
    humanReadableName: "Audrey Hepburn",
    prompt: "Audrey Hepburn is {WORD} in a clear daytime color photo from 1960 looking at the camera. --ar 1:1 --seed 789789",
    active: true,
    emotions:"in love,happy,sad,fearful, angry, empathetic, trusting, grateful, surprised, guilty, proud, envious, disgusted, hopeful,exhausted,anxious,bored,condescending,pompous,flirtatious,coquettish".split(',').map(a=>a.trim()),
    source:"Midjourney v6",
    date:"April 27 2024"
  },
  
  "midjourney-woman-russian": {
    humanReadableName: "Russian Woman (1915s)",
    prompt: "a very {WORD} woman from Perm, Russia, 1915s style photo, close up, very sharp and clear color photo, looking at camera, centered --seed 654897 --ar 1:1",
    active: true,
    emotions:"affectionate,aggressive,angry,anxious,ashamed,awed,bored,calm,compassionate,confused,contented,curious,delighted,flirtatious,guilty,hateful,hopeful,horrified,hostile,humiliated,interested,irritated,jealous,joking".split(',').map(a=>a.trim()),
    //disappointed, hungry, sleepy, exhausted, anxious, bored, condescending, pompous, flirtatious, coquettish, lonely, motherly, determined, hopeless
    source:"Midjourney v6",
    date:"April 27 2024"
  }
};