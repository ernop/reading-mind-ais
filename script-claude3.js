let gameState = {
    currentSet: "midjourney-audrey-hepburn",
    currentQuestion: 0,
    numberRight: 0,
    numberWrong: 0,
    allQuestions: [],
    answeredQuestions: [],
    numberOfAnswerButtons: 4
};

function loadAllQuestions() {
    const emotions = imageSets[gameState.currentSet].emotions;

    for (const emotion of emotions) {
        for (let imageNumber = 0; imageNumber < 4; imageNumber++) {
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
        const randomChoice = emotions[Math.floor(Math.random() * emotions.length)];
        if (!choices.includes(randomChoice)) {
            choices.push(randomChoice);
        }
    }
    shuffleArray(choices);
    return choices;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateUIComponents(question, choicesContainer, questionNumberContainer, scoreContainer, prevButton, nextButton) {
    questionNumberContainer.textContent = `Question ${gameState.currentQuestion + 1} of ${gameState.allQuestions.length}`;
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
    updateUIComponents(answeredQuestion.question, document.getElementById("choices-container"), document.getElementById("question-number-container"), document.getElementById("score-container"), document.getElementById("prev-btn"), document.getElementById("next-btn"));
    updateQuestionImage(document.getElementById("question-image"), answeredQuestion.question.imagePath);

    answeredQuestion.question.choices.forEach((choice) => {
        const choiceButton = createAnsweredChoiceButton(choice, answeredQuestion.userAnswer, answeredQuestion.correctAnswer);
        document.getElementById("choices-container").appendChild(choiceButton);
    });
}

function createChoiceButton(choice, answer) {
    const choiceButton = document.createElement("button");
    choiceButton.classList.add("choice-btn");
    choiceButton.textContent = choice;
    choiceButton.disabled = false;
    choiceButton.style.backgroundColor = "#f0f0f0";
    choiceButton.style.color = "black";
    choiceButton.onclick = function () {
        checkAnswer(answer, choiceButton);
    };
    return choiceButton;
}

function checkAnswer(answer, selectedButton) {
  const resultContainer = document.getElementById("result-container");
  const nextButton = document.getElementById("next-btn");
  const choiceButtons = document.getElementsByClassName("choice-btn");
  const scoreContainer = document.getElementById("score-container");

  if (selectedButton.textContent === answer) {
    resultContainer.textContent = "Correct!";
    selectedButton.style.backgroundColor = "green";
    gameState.numberRight++;
  } else {
    resultContainer.textContent = "Wrong!";
    selectedButton.style.backgroundColor = "red";
    selectedButton.style.color = "white";
    gameState.numberWrong++;
    Array.from(choiceButtons).forEach(button => {
      if (button.textContent === answer) {
        button.style.backgroundColor = "green";
      }
    });
  }

  gameState.answeredQuestions[gameState.currentQuestion] = {
    question: gameState.allQuestions[gameState.currentQuestion],
    userAnswer: selectedButton.textContent,
    correctAnswer: answer,
  };

  scoreContainer.textContent = `Score: ${gameState.numberRight} / ${gameState.numberRight + gameState.numberWrong}`;

  Array.from(choiceButtons).forEach(button => {
    button.disabled = true;
  });

  nextButton.disabled = false;
}

 function goToNextQuestion() {
    const nextButton = document.getElementById("next-btn");
    if (gameState.currentQuestion < gameState.allQuestions.length - 1) {
        gameState.currentQuestion++;
        displayQuestion();
    } else {
        nextButton.disabled = true;
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

function changeSet(event) {
  gameState.currentSet = event.target.value;
  gameState.allQuestions = [];
  resetGame();
  updateExplanationText();
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

let isExplanationVisible = false;

function initGame() {
  const questionMark = document.getElementById("question-mark");
  const setDropdown = document.getElementById("set-dropdown");

  document.getElementById("prev-btn").addEventListener("click", goToPreviousQuestion);
  document.getElementById("next-btn").addEventListener("click", goToNextQuestion);

  questionMark.addEventListener('click', () => {
    if (isExplanationVisible) {
      hideExplanation();
      isExplanationVisible = false;
    } else {
      showExplanation();
      isExplanationVisible = true;
    }
  });

  // Populate the dropdown options dynamically from the imageSets object
  for (const setName in imageSets) {
    const option = document.createElement("option");
    option.value = setName;
    option.textContent = imageSets[setName].humanReadableName;
    setDropdown.appendChild(option);
  }

  setDropdown.value = gameState.currentSet;
  updateExplanationText();

  // Event listeners
  setDropdown.addEventListener("change", gameState.changeSet);

  // Start the game
  displayQuestion();
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

// Start the game
initGame();
