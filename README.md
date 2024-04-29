# A html+Js system to generate and display questions for users to answer

I want to give the user a series of problems.

Each problem is matching an image to the right word. You will choose an image. To generate the choices, first add the right choice, then add 3 other, different choices. Then randomize the list.  Then draw the problem for the user like this:


    <IMAGE HERE LARGE>
    ___________________________
    | word1 | word2 | word3 | word4 |
    ___________________________


   <score area>
    <results area>

Each wordN is a button the user can click. The words are randomized - there are 3 wrong ones, and one right one that matches the image.
But the user isn't allowed to know which is which.

The user will look at the image, then choose the word that they think matches.

There is a total score counter which keeps their total score. It should say something like "N right, M wrong"

#What happens after they make a choice

If they get it right: the output says "RIGHT". The button they clicked should turn green so they know the answer.
The "next" button should be activated so they can advance.

If they get it wrong: The output should say "wrong".  The actually correct emotion button should turn green.
The button they clicked should turn red.  The "next" button should be activated so they can advance.

If they click "next" we should send them to the next problem.

We should adjust the score as soon as they answer the q.

## Going to the next problem

They can keep going on answering more problems. Every time they hit next, a new problem will be generated for them, just like the first one.

There are arrows to go back/forth into the previously taken questions so they can review where they were wrong. But, when they go back, they cannot adjust anything about it anymore - the buttons don't work. That is just viewing history. Only the most recent, active question lets the user interact or do anything with it.
So, there should be a previous button available too, which is enabled when they have problems to go back to. When they're viewing the history of the past questions they answered, they cannot modify the answers.  They can just go back and forth.
If they return (using the "next" button) to the newest problem which they haven't solved yet, then they can answer that one and continue with newer problems, and that one becomes part of their history.

So, if they have ever completed any questions, the previous button shoudl always be visible and clickable. If they have completed the latest problem, adn are looking at their results, they can see the next button and click it. Or, if they are in the past reviewing previous questions, they can click the next button until they get to the latest "unsolved yet" problem. If they're on that problem, there is no "next" button since they are already at the end and have to try to answer that one, first.

There is a dropdown where the user chooses the SET of images they are using. Each set is stored in a different folder. The first set is called "emotions" and is in the "emotions" folder.  The list of sets is hardcoded into the js. The other set is called "feelings". If the user chooses another set in the dropdown, we switch and change to make problems based on THAT set of images instead.

Each set has its own set of emotion words. They are hardcoded in the list, like this:

The current list of SETs is: ["emotions": ["affectionate","contented","interested","irritated","joking"], "emotions-alpha", ["anger", "frustration", "pathos","fortitude","determination","hope","nostalgia","loneliness","hostility"] ]

For your questions: Generate 50 questions to start.  Users can go through them as much as they want. For storage, just store in a variable, you don't need to use localstorage or anything like that. For the style, just use the basic standard inline css style.

## Where are the images?

All the images are under /images/<SETNAME>/<emotion name>-<N>.png" I only have a certain number of images of each emotion - for some, I only have one image. For others, I may have 10. It's up to you to choose. I suggest you start with image 0 for each emotion, then count your way up. If you find an image is not there, then that means that emotion is done. But you should do the whole thing in random order.

You should generate an html page which allows this.  The html should link to a js file which implements the UI, logic, tracking etc. The html page should use inline css.

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


#PLAN

* Fix nav and code, simplify code, finalize UIish?
* Fix the scoring system, fixed seed, limit number of questions
* get VS working and generate comparators
* make UI also allow showing multiple input images
* Make SET dropdown have a default image


