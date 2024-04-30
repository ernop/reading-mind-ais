let gameState = {
    currentSet: "",
    currentQuestion: 0,
    numberRight: 0,
    numberWrong: 0,
    allQuestions: [],
    answeredQuestions: [],
    numberOfAnswerButtons: 4,
    isExplanationVisible: false};

function loadAllQuestions() {
    const emotions = imageSets[gameState.currentSet].emotions;
    gameState.allQuestions = [];

    for (const emotion of emotions) {
        for (let imageNumber = 0; imageNumber < imageSets[gameState.currentSet].daily_puzzle_size / emotions.length; imageNumber++) {
            const imagePath = `./images/${gameState.currentSet}/${emotion.replace(' ', '')}${imageNumber}.png`;
            const choices = getRandomChoices(emotions, emotion);
            gameState.allQuestions.push({ imagePath, choices, answer: emotion });
        }
    }
    shuffleArray(gameState.allQuestions);
}

function getRandomChoices(emotions, correctEmotion) {
    const choices = [correctEmotion];
    while (choices.length < gameState.numberOfAnswerButtons) {
      const xx = getNextRandom();
      const randomChoice = emotions[Math.floor(xx * emotions.length)];
      if (!choices.includes(randomChoice)) {
        choices.push(randomChoice);
      }
    }
    shuffleArray(choices);
    return choices;
}

function shuffleArray(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(getNextRandom() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

function updateUIComponents(question, choicesContainer, questionNumberContainer, scoreContainer, prevButton, nextButton) {
    const totalQuestions = Math.min(gameState.allQuestions.length, imageSets[gameState.currentSet].daily_puzzle_size);
    questionNumberContainer.textContent = `Question ${gameState.currentQuestion + 1} of ${totalQuestions}`;
    choicesContainer.innerHTML = "";
    scoreContainer.textContent = `Score: ${gameState.numberRight} / ${gameState.numberRight + gameState.numberWrong}`;
    updateButtonsState(prevButton, nextButton);
}

function updateButtonsState(prevButton, nextButton) {
    prevButton.disabled = gameState.currentQuestion === 0;
    nextButton.disabled = gameState.currentQuestion >= gameState.answeredQuestions.length;
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
    choiceButton.disabled = true;  // Ensure the button can't be clicked again in review mode

    // Highlight the choice appropriately based on correctness
    if (choice === userAnswer) {
        choiceButton.classList.add(choice === correctAnswer ? "button-correct" : "button-wrong");
    }
    if (choice === correctAnswer && userAnswer !== correctAnswer) {
        choiceButton.classList.add("button-correct");
    }

    return choiceButton;
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


function updateScore() {
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.textContent = `Score: ${gameState.numberRight} / ${gameState.numberRight + gameState.numberWrong}`;
}

function disableChoiceButtons() {
    Array.from(document.getElementsByClassName("choice-btn")).forEach(button => {
        button.disabled = true;
    });
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

function createAnsweredChoiceButton(choice, userAnswer, correctAnswer) {
    const choiceButton = document.createElement("button");
    choiceButton.classList.add("choice-btn");
    choiceButton.textContent = choice;
    choiceButton.disabled = true;

    if (choice === userAnswer) {
        choiceButton.style.backgroundColor = choice === correctAnswer ? "green" : "red";
        choiceButton.style.color = "white";
    } else if (choice === correctAnswer) {
        choiceButton.style.backgroundColor = "green";
        choiceButton.style.color = "white";
    }

    return choiceButton;
}

// Function to update the explanation text
function updateExplanationText() {
  const explanationText = document.getElementById("explanation-text");
  const selectedSet = imageSets[gameState.currentSet];

  displayExplanationText(explanationText, selectedSet);
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
        showExplanation();
        gameState.isExplanationVisible = true;
    }
}

function initGame() {
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
    changeSet(setDropdown.value);

    setDropdown.addEventListener("change", function(event) {
        changeSet(event.target.value);
    });
}

function handleSetChange(event) {
    gameState.currentSet = event.target.value;
    setSeed();
    changeSet();
}


//put a this-set-specific random replacement into gamestate so its not random every time.
function setSeed() {
  //~ const daysSince1970 = Math.floor(Date.now() / 86400000);
  //~ const seed=daysSince1970+gameState.currentSet
  //~ let tmp = new SeededRandom(seed);
  //~ debugger;
  //~ gameState.guy = new SeededRandom(seed);
}

const modulus = 2**31 - 1; // Large prime number as modulus
const multiplier = 48271;  // Common choice for the multiplier
const increment = 0;       // Typically zero

let seed=100;

function getNextRandom(){
  seed = (multiplier * seed + increment) % modulus;
  return seed / modulus;
}

function changeSet(set) {
    gameState.currentSet = set;
    gameState.allQuestions = [];
    gameState.answeredQuestions = [];
    gameState.currentQuestion = 0;
    gameState.numberRight = 0;
    gameState.numberWrong = 0;

    setSeed();

    loadAllQuestions();
    displayQuestion(); // Display the first question of the new set
}

// Function to show the explanation text
function showExplanation() {
  const explanationText = document.getElementById("explanation-text");
  const selectedSet = imageSets[gameState.currentSet];

  displayExplanationText(explanationText, selectedSet);
  explanationText.style.display = "block";
}

// Function to display the explanation text
function displayExplanationText(explanationText, selectedSet) {
  explanationText.innerHTML = `<strong>SET:</strong> ${selectedSet.humanReadableName}<br>     <strong>Prompt:</strong> ${selectedSet.prompt}<br>     <strong>Emotions:</strong> ${selectedSet.emotions.join(", ")}<br>     <strong>Source:</strong> ${selectedSet.source}<br>     <strong>Date:</strong> ${selectedSet.date}`;
}

// Function to hide the explanation text
function hideExplanation() {
  const explanationText = document.getElementById("explanation-text");
  explanationText.innerHTML = "";
  explanationText.style.display = "none";
}


window.onload = function() {
    initGame();
};
