//for the seeded random thing later tracked within gameState.

const modulus = 2**31 - 1; // Large prime number as modulus
const multiplier = 48271;  // Common choice for the multiplier
const increment = 0;       // Typically zero

let gameState = {
    currentSet: "",
    currentQuestion: 0,
    numberRight: 0,
    numberWrong: 0,
    allQuestions: [],
    answeredQuestions: [],
    numberOfAnswerButtons: 4,
    isExplanationVisible: false,
    seed:-1
};

// this should only contain stuff that's literally just done once.  most functions of the page actually relate to the specific SET we are doing, so don't do that kind of thing here.
async function initGame() {
    const setDropdown = document.getElementById("set-dropdown");
    setDropdown.innerHTML = '';

   Object.keys(imageSets).forEach(setName => {
        if (imageSets[setName].active) {
            const option = document.createElement("option");
            option.value = setName;
            option.textContent = imageSets[setName].humanReadableName;
            setDropdown.appendChild(option);
        }
    });

    // Automatically set and load the first active set
    setDropdown.selectedIndex = 0;
    await changeSet(setDropdown.value);

    setDropdown.addEventListener("change", function(event) {
        changeSet(event.target.value);
    });
}

// every set should be totally independent. so you can swap between sets and pick up where you left off and stuff like that.
//really, then, the way this is now, it reloads every time. but it would be cool if the page had more of a state so you could do 5 questions, then switch sets, then continue back again.
async function changeSet(set) {
    gameState.currentSet = set;
    gameState.allQuestions = [];
    gameState.answeredQuestions = [];
    gameState.currentQuestion = 0;
    gameState.numberRight = 0;
    gameState.numberWrong = 0;
    let seed = await setSeed();
    gameState.seed = seed;
    if (isNaN(gameState.seed)) {
        console.error("Invalid seed");
        return;
    }
    loadAllQuestions();
    displayQuestion(); // Display the first question of the new set
    setupButtonListeners();
}

function loadAllQuestions() {
    const questions = imageSets[gameState.currentSet].emotions;
    gameState.allQuestions = [];

    for (const question of questions) {
        for (let imageNumber = 0; imageNumber < imageSets[gameState.currentSet].daily_puzzle_size / questions .length; imageNumber++) {
            const imagePath = `./images/${gameState.currentSet}/${question.replace(' ', '')}${imageNumber}.png`;
            const choices = getRandomChoices(gameState, questions, question);
            gameState.allQuestions.push({ imagePath, choices, answer: question});
        }
    }
    shuffleArray(gameState, gameState.allQuestions);
}


//put a this-set-specific random replacement into gamestate so its not random every time.
async function setSeed() {
    const daysSince1970 = Math.floor(Date.now() / 86400000);
    return await stringToRandomNumber(daysSince1970 + gameState.currentSet);
}
async function stringToRandomNumber(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const seed = hashArray.reduce((sum, byte) => (sum * 256 + byte) % modulus, 0);
    return seed;
}

function getNextRandom(gameState){
  gameState.seed = (multiplier * gameState.seed + increment) % modulus;
  return gameState.seed / modulus;
}

function displayQuestion() {
    document.getElementById("result-container").innerHTML = ""; // Clear previous results

    if (gameState.allQuestions.length === 0) {
        loadAllQuestions();
    }

    const question = gameState.allQuestions[gameState.currentQuestion];
    updateUIComponents(question, document.getElementById("choices-container"), document.getElementById("question-number-container"), document.getElementById("score-container"), document.getElementById("prev-btn"), document.getElementById("next-btn"));
    updateQuestionImage(document.getElementById("question-image"), question.imagePath);

    question.choices.forEach((choice) => {
        const choiceButton = createChoiceButton(choice, question.answer);
        document.getElementById("choices-container").appendChild(choiceButton);
    });
}
function updateQuestionImage(questionImage, imagePath) {
    const img = new Image();
    img.onload = function () {
        questionImage.src = imagePath;
    };
    img.onerror = function () {
        gameState.allQuestions.splice(gameState.currentQuestion, 1);
        if (gameState.currentQuestion >= gameState.allQuestions.length) {
            endGame();
        } else {
            displayQuestion();
        }
    };
    img.src = imagePath;
}
function updateUIComponents(question, choicesContainer, questionNumberContainer, scoreContainer, prevButton, nextButton) {
    //we artificially pretend that there is a max number of questions, even if we have noticed that technically there are more available combos of emotions+0-3
    const totalQuestions = Math.min(gameState.allQuestions.length, imageSets[gameState.currentSet].daily_puzzle_size);
    questionNumberContainer.textContent = `Question ${gameState.currentQuestion + 1} of ${totalQuestions}`;
    choicesContainer.innerHTML = "";
    scoreContainer.textContent = `Score: ${gameState.numberRight} / ${gameState.numberRight + gameState.numberWrong}`;
    prevButton.disabled = gameState.currentQuestion === 0;
    //console.log("preButton disable state:",prevButton.disabled);
    nextButton.disabled = gameState.currentQuestion >= gameState.answeredQuestions.length;
    //console.log("nextButton disable state:",nextButton.disabled, gameState.currentQuestion, gameState.answeredQuestions);
}
function createChoiceButton(choice, answer) {
    const choiceButton = document.createElement("button");
    choiceButton.classList.add("choice-btn");
    choiceButton.textContent = choice;
    choiceButton.disabled = false;
    choiceButton.onclick = function () {
        checkAnswer(answer, choiceButton);
    };
    return choiceButton;
}
function checkAnswer(answer, selectedButton) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "";  // Clear previous results immediately upon answer check

    // Create the Next Problem button
    const nextProblemBtn = document.createElement("button");
    nextProblemBtn.textContent = "Next Problem";
    nextProblemBtn.classList.add("next-problem-btn");
    nextProblemBtn.onclick = function() {
        if (gameState.currentQuestion < gameState.allQuestions.length - 1) {
            gameState.currentQuestion++;
            displayQuestion();
        }
    };

    // Result logic; the pain is that you have to iterate to find the right answer too, when the user gets it wrong.
    const buttons = document.getElementsByClassName("choice-btn");
    Array.from(buttons).forEach(button => {
        if (button.textContent === answer) {
            button.classList.add("button-correct");  // Highlight correct answer
        } else {
            button.classList.remove("button-correct");
        }

        if (button === selectedButton) {
            if (button.textContent === answer) {
                resultContainer.textContent = "Correct! ";
                gameState.numberRight++;
            } else {
                resultContainer.textContent = "Wrong! ";
                button.classList.add("button-wrong");
                gameState.numberWrong++;
            }
        }
    });

    // Storing answered question details
    gameState.answeredQuestions[gameState.currentQuestion] = {
        question: gameState.allQuestions[gameState.currentQuestion],
        userAnswer: selectedButton.textContent,
        correctAnswer: answer
    };

    resultContainer.appendChild(nextProblemBtn);
    updateScore();
    disableChoiceButtons();
}
function displayAnsweredQuestion() {
  const answeredQuestion = gameState.answeredQuestions[gameState.currentQuestion];
  document.getElementById("result-container").innerHTML = ""; // Clear previous results

  updateUIComponents(answeredQuestion.question, document.getElementById("choices-container"), document.getElementById("question-number-container"), document.getElementById("score-container"), document.getElementById("prev-btn"), document.getElementById("next-btn"));
  updateQuestionImage(document.getElementById("question-image"), answeredQuestion.question.imagePath);

  answeredQuestion.question.choices.forEach((choice) => {
      const choiceButton = createAnsweredChoiceButton(choice, answeredQuestion.userAnswer, answeredQuestion.correctAnswer);
      document.getElementById("choices-container").appendChild(choiceButton);
  });

  // Displaying status directly in the result container based on previously saved answers
  if (answeredQuestion.userAnswer === answeredQuestion.correctAnswer) {
      document.getElementById("result-container").textContent = "Correct!";
  } else {
      document.getElementById("result-container").textContent = "Wrong!";
  }
}
function createAnsweredChoiceButton(choice, userAnswer, correctAnswer) {
    const choiceButton = document.createElement("button");
    choiceButton.classList.add("choice-btn");
    choiceButton.textContent = choice;
    choiceButton.disabled = true;

    if (choice === userAnswer) {
        choiceButton.classList.add(choice === correctAnswer ? "button-correct" : "button-wrong");
    }
    if (choice === correctAnswer && userAnswer !== correctAnswer) {
        choiceButton.classList.add("button-correct");
    }

    return choiceButton;
}
function goToNextQuestion() {
    if (gameState.currentQuestion < gameState.allQuestions.length - 1) {
        gameState.currentQuestion++;
        if (gameState.answeredQuestions[gameState.currentQuestion]) {
            displayAnsweredQuestion();  // Show the answer status if revisiting a question
        } else {
            displayQuestion();  // Display normally if it's the first time answering this question
        }
    }
}
function goToPreviousQuestion() {
    if (gameState.currentQuestion > 0) {
        gameState.currentQuestion--;
        displayAnsweredQuestion();
    }
}
function resetGame() {
    gameState.currentQuestion = 0;
    gameState.numberRight = 0;
    gameState.numberWrong = 0;
    gameState.answeredQuestions = [];
    gameState.allQuestions = [];
    displayQuestion();
}
function endGame() {
  const gameContainer = document.getElementById("game-container");
  const scoreContainer = document.getElementById("score-container");

  gameContainer.innerHTML = `<h2>You have done all the questions.</h2><p>Your final score: ${gameState.numberRight} / ${gameState.numberRight + gameState.numberWrong}</p><button onclick="resetGame()">Play Again</button>`;
  scoreContainer.textContent = "";
}
function toggleExplanation() {
    const explanationText = document.getElementById("explanation-text");
    if (gameState.isExplanationVisible) {
        explanationText.style.display = "none";
        gameState.isExplanationVisible = false;
    } else {
        const explanationText = document.getElementById("explanation-text");
        const selectedSet = imageSets[gameState.currentSet];

        displayExplanationText(explanationText, selectedSet);
        explanationText.style.display = "block";
        gameState.isExplanationVisible = true;
    }
}
// Function to display the explanation text
function displayExplanationText(explanationText, selectedSet) {
  explanationText.innerHTML = `<strong>SET:</strong> ${selectedSet.humanReadableName}<br>     <strong>Prompt:</strong> ${selectedSet.prompt}<br>     <strong>Emotions:</strong> ${selectedSet.emotions.join(", ")}<br>     <strong>Source:</strong> ${selectedSet.source}<br>     <strong>Date:</strong> ${selectedSet.date}`;
}
function updateScore() {
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.textContent = `Score: ${gameState.numberRight} / ${gameState.numberRight + gameState.numberWrong}`;
}
function disableChoiceButtons() {
    Array.from(document.getElementsByClassName("choice-btn")).forEach(button => {
        button.disabled = true;
    });
}
function shuffleArray(gameState, array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(getNextRandom(gameState) * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}
function getRandomChoices(gameState, questions, correctAnswer) {
    const choices = [correctAnswer];
    while (choices.length < gameState.numberOfAnswerButtons) {
      const xx = getNextRandom(gameState);
      const randomChoice = questions[Math.floor(xx * questions.length)];
      if (!choices.includes(randomChoice)) {
        choices.push(randomChoice);
      }
    }
    shuffleArray(gameState, choices);
    return choices;
}
function setupButtonListeners() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.onclick = goToPreviousQuestion;
    nextButton.onclick = goToNextQuestion;
}

window.onload = function() {
    initGame();
};
