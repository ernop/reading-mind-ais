let currentSet = "midjourney-audrey-hepburn";
let currentQuestion = 0;
let numberRight = 0;
let numberWrong = 0;
let allQuestions = [];
let numberOfAnswerButtons = 4;
let answeredQuestions = [];

function loadAllQuestions() {
  const emotions = imageSets[currentSet].emotions;

  for (const emotion of emotions) {
    for (let imageNumber = 0; imageNumber < 4; imageNumber++) {
      const imagePath = `./images/${currentSet}/${emotion.replace(' ','')}${imageNumber}.png`;
      const choices = getRandomChoices(emotions, emotion);
      allQuestions.push({ imagePath, choices, answer: emotion });
    }
  }
  shuffleArray(allQuestions);
}

function getRandomChoices(emotions, correctEmotion) {
  const choices = [correctEmotion];
  while (choices.length < numberOfAnswerButtons) {
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
    questionNumberContainer.textContent = `Question ${currentQuestion + 1} of ${allQuestions.length}`;
    choicesContainer.innerHTML = "";
    scoreContainer.textContent = `Score: ${numberRight} / ${numberRight + numberWrong}`;
    updateButtonsState(prevButton, nextButton);
}

function updateButtonsState(prevButton, nextButton) {
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = currentQuestion >= answeredQuestions.length;
}

function updateQuestionImage(questionImage, imagePath) {
    const img = new Image();
    img.onload = function() {
        questionImage.src = imagePath;
    };
    img.onerror = function() {
        allQuestions.splice(currentQuestion, 1);
        if (currentQuestion >= allQuestions.length) {
            endGame();
        } else {
            displayQuestion();
        }
    };
    img.src = imagePath;
}

function displayQuestion() {
    if (allQuestions.length === 0) {
        loadAllQuestions();
    }

    const question = allQuestions[currentQuestion];
    updateUIComponents(question, document.getElementById("choices-container"), document.getElementById("question-number-container"), document.getElementById("score-container"), document.getElementById("prev-btn"), document.getElementById("next-btn"));
    updateQuestionImage(document.getElementById("question-image"), question.imagePath);

    question.choices.forEach((choice) => {
        const choiceButton = createChoiceButton(choice, question.answer);
        document.getElementById("choices-container").appendChild(choiceButton);
    });
}

function displayAnsweredQuestion() {
    const answeredQuestion = answeredQuestions[currentQuestion];
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
    numberRight++;
  } else {
    resultContainer.textContent = "Wrong!";
    selectedButton.style.backgroundColor = "red";
    selectedButton.style.color = "white";
    numberWrong++;
    Array.from(choiceButtons).forEach(button => {
      if (button.textContent === answer) {
        button.style.backgroundColor = "green";
      }
    });
  }

  answeredQuestions[currentQuestion] = {
    question: allQuestions[currentQuestion],
    userAnswer: selectedButton.textContent,
    correctAnswer: answer,
  };

  scoreContainer.textContent = `Score: ${numberRight} / ${numberRight + numberWrong}`;

  Array.from(choiceButtons).forEach(button => {
    button.disabled = true;
  });

  nextButton.disabled = false;
}

function goToNextQuestion() {
  const nextButton = document.getElementById("next-btn");

  // Check if there's another question to move to
  if (currentQuestion < allQuestions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    // Hide the next button if it's the last question
    console.log("X");
    nextButton.disabled = true;
  }
}

function goToPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    if (currentQuestion < answeredQuestions.length) {
      displayAnsweredQuestion();
    }
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
  currentSet = event.target.value;
  allQuestions = [];
  resetGame();
  updateExplanationText();
}

// Function to update the explanation text
function updateExplanationText() {
  const explanationText = document.getElementById("explanation-text");
  const selectedSet = imageSets[currentSet];

  displayExplanationText(explanationText, selectedSet);
}

function resetGame() {
  currentQuestion = 0;
  numberRight = 0;
  numberWrong = 0;
  answeredQuestions = [];

  displayQuestion();
}

function endGame() {
  const gameContainer = document.getElementById("game-container");
  const scoreContainer = document.getElementById("score-container");

  gameContainer.innerHTML = `<h2>You have done all the questions.</h2>     <p>Your final score: ${numberRight} / ${numberRight + numberWrong}</p>     <button onclick="resetGame()">Play Again</button>`;
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

  setDropdown.value = currentSet;
  updateExplanationText();

  // Event listeners
  setDropdown.addEventListener("change", changeSet);

  // Start the game
  displayQuestion();
}

// Function to show the explanation text
function showExplanation() {
  const explanationText = document.getElementById("explanation-text");
  const selectedSet = imageSets[currentSet];

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
