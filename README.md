# A html+Js system to generate and display questions for users to answer

I want to give the user a series of problems.

Each problem is matching an image to the right word. You will choose an image. To generate the choices, first add the right choice, then add 3 other, different choices. Then randomize the list.  Then draw the problem for the user like this:


    <IMAGE HERE LARGE>
    ________________
    |       |       |       <score area>
    | word1 | word2 |
    |       |       |
    _________________
    |       |       |
    | word3 | word4 |
    |       |       |
    _________________

    <results area>
    
Each wordN is a button the user can click. The words are randomized - there are 3 wrong ones, and one right one that matches the image. But the user isn't allowed to know which is which.

The user will look at the image, then choose the word that they think matches. 

There is a total score counter which keeps their total score. It should say something like "N right, M wrong"
 
#What happens after they make a choice

If they get it right: the output says "RIGHT". The button they clicked should turn green. The "next" button should appear.

If they get it wrong: The output should say "wrong".  The actually correct button should turn green. The button they clicked should turn red.  The "next" button should appear.

If they click "next" we should send them to the next problem.
 
We should adjust the score as soon as they answer the q.

When they click their answer: the "next" button shows up, which if they click, gives the next problem to them.  

## Going to the next problem

They can keep going on answering more problems. Every time they hit next, a new problem will be generated for them, just like the first one.

There are arrows to go back/forth into the previously taken images so they can review where they were wrong. But, when they go back, they cannot adjust anything about it anymore - the buttons don't work. That is just viewing history. Only the most recent, active question lets the user interact or do anything with it.

There is a dropdown where the user chooses the SET of images they are using. Each set is stored in a different folder. The first set is called "emotions" and is in the "emotions" folder.  The list of sets is hardcoded into the js. The other set is called "feelings". If the user chooses another set in the dropdown, we switch and change to make problems based on THAT set of images instead.

Each set has its own set of emotion words. They are hardcoded in the list, like this:

The current list of SETs is: ["emotions": ["affectionate","contented","interested","irritated","joking"], "emotions-alpha", ["anger", "frustration", "pathos","fortitude","determination","hope","nostalgia","loneliness","hostility"] ]

For your questions: Generate 50 questions to start.  Users can go through them as much as they want. For storage, just store in a variable, you don't need to use localstorage or anything like that. For the style, just use the basic standard inline css style.

## Where are the images?

All the images are under /images/<SETNAME>/<emotion name>-<N>.png" I only have a certain number of images of each emotion - for some, I only have one image. For others, I may have 10. It's up to you to choose. I suggest you start with image 0 for each emotion, then count your way up. If you find an image is not there, then that means that emotion is done. But you should do the whole thing in random order.

You should generate an html page which allows this.  The html should link to a js file which implements the UI, logic, tracking etc. The html page should use inline css.

Here are some useful methods to include, using this pattern - remember you have to check each image existing status too.
    function loadImagesForSet(set) {
        set.forEach(set.emotions => {
            emotionImages[emotion] = [];
            let i = 0;
            while (true) {
                const imagePath = `./images/set-name/${emotion}-${i}.png`;
                if (checkImageExists(imagePath)) {
                    emotionImages[emotion].push(imagePath);
                    i++;
                } else {
                    break;
                }
            }
        });
    }


First, just sketch out an overview of how you will do it briefly, and confirm with me that everything is okay, also including any questions you might have. Make sure not to create infinite loops.

# Future improvements:

 . have multiple modes, like what era, what AI image generator, what sex, what age, same seed or not
 . difficulty modes - how many choices, how obscure emotions?  Also, vary the number of buttons (2 => easy, 20 => hard).
 . memory mode - you see the image first, ponder it, then when you're ready (or after a timeout) you click "answer now" and see the choices then (and don't see the image anymore)
 . track peoples answers, or have daily/standard set seed challenges so people can compare their scores at least per day
 . use this to revalidate the real "reading the mind in the eyes" test which, while awesome, is super weird (images are really dark, girls have tons of makeup, matches of sex of person to choices given are unclear, seems likely to just have been eyeballed rather than to have actually validated the legitimacy of the associations/drawings"
 . this is also useful for the purpose of testing AI image generation software - that is, what emotions are well-labelled, which aren't?
 . it's insane that we only ever see the eye clip - how about, after you answer, you get to SEE THE WHOLE FACE?
 . these are AI generated - but can we test on real life videos that aren't staged? how about *clips from movies* to validate both if acting is actually accurate?  i.e. there are major open questions: is acting "real" in the sense of what percent of actors can actually produce fully real eye motion? How about AI gen, how good is this? 
 . reverse mode - show you an emotion, you pick the image which represents it.
 
 
 const imageSets = {
  //a very {WORD} woman from Perm, Russia, 1915s style photo, close up, very sharp and clear color photo, looking at camera, centered --seed 654897
  "midjourney-woman-russian": [
    "affectionate",
    "hopeful",
    "hateful",
    "aggressive",
    "hostile",
    "angry",
    "anxious",
    "awed",
    "bored",
    "calm",
    "delighted",
    "flirtatious",
    "contented",
    "interested",
    "irritated",
    "joking",
    "curious",
    "confused",
    "contented",
    "ashamed",
    "jealous",
    "horrified",
    "guilty",
    "compassionate",
    "humiliated"
  ],
  "midjourney-man-european": [
    "affectionate",
    "hopeful",
    "hateful",
    "aggressive",
    "hostile",
    "angry",
    "anxious",
    "awed",
    "bored",
    "calm",
    "delighted",
    "flirtatious",
    "contented",
    "interested",
    "irritated",
    "joking",
    "curious",
    "confused",
    "contented",
    "ashamed",
    "jealous",
    "horrified"
  ]
};