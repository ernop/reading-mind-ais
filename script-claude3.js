let currentSet = "midjourney-audrey-hepburn";
let currentQuestion = 0;
let numberRight = 0;
let numberWrong = 0;
let allQuestions = [];
let numberOfAnswerButtons = 4;
let answeredQuestions = [];

// Function to load all existing images and create an array of questions
function loadAllQuestions() {
  const emotions = imageSets[currentSet].emotions;

  for (const emotion of emotions) {
    for (let imageNumber = 0; imageNumber < 10; imageNumber++) {
      const imagePath = `./images/${currentSet}/${emotion}${imageNumber}.png`;
      const choices = getRandomChoices(emotions, emotion);
      allQuestions.push({ imagePath, choices, answer: emotion });
    }
  }
  shuffleArray(allQuestions);
}

// Function to get random choices for the question
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

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display the question on the HTML page
function displayQuestion() {
  const questionImage = document.getElementById("question-image");
  const choicesContainer = document.getElementById("choices-container");
  const scoreContainer = document.getElementById("score-container");
  const questionNumberContainer = document.getElementById("question-number-container");
  const navPrevButton = document.getElementById("prev-btn");
  const navNextButton = document.getElementById("next-nav-btn");

  questionNumberContainer.textContent = `Question ${currentQuestion + 1} of ${allQuestions.length}`;
  choicesContainer.innerHTML = "";

  if (allQuestions.length === 0) {
    loadAllQuestions();
  }

  if (currentQuestion >= allQuestions.length) {
    endGame();
    return;
  }

  const question = allQuestions[currentQuestion];
  const img = new Image();

  navPrevButton.disabled = currentQuestion === 0;
  navNextButton.disabled = currentQuestion === answeredQuestions.length;

  img.onload = function () {
    questionImage.src = question.imagePath;

    // Create answer buttons dynamically
    question.choices.forEach((choice) => {
      const choiceButton = createChoiceButton(choice, question.answer);
      choicesContainer.appendChild(choiceButton);
    });

    scoreContainer.textContent = `Score: ${numberRight} / ${numberRight + numberWrong}`;
  };

  img.onerror = function () {
    allQuestions.splice(currentQuestion, 1);
    if (currentQuestion >= allQuestions.length) {
      endGame();
    } else {
      displayQuestion();
    }
  };

  img.src = question.imagePath;
}

// Function to create a choice button
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

// Function to check the user's answer and provide feedback
function checkAnswer(answer, selectedButton) {
  const resultContainer = document.getElementById("result-container");
  const nextButton = document.getElementById("next-btn");
  const choiceButtons = document.getElementsByClassName("choice-btn");
  const scoreContainer = document.getElementById("score-container");
  const questionNumberContainer = document.getElementById("question-number-container");

  questionNumberContainer.textContent = `Question ${currentQuestion + 1} of ${allQuestions.length}`;

  if (selectedButton.textContent === answer) {
    resultContainer.textContent = "Correct!";
    selectedButton.style.backgroundColor = "green";
    numberRight++;
  } else {
    resultContainer.textContent = "Wrong!";
    selectedButton.style.backgroundColor = "red";
    selectedButton.style.color = "white";
    numberWrong++;
    Array.from(choiceButtons).forEach((button) => {
      if (button.textContent === answer) {
        button.style.backgroundColor = "green";
        button.style.color = "white";
      }
    });
  }

  answeredQuestions[currentQuestion] = {
    question: allQuestions[currentQuestion],
    userAnswer: selectedButton.textContent,
    correctAnswer: answer,
  };

  scoreContainer.textContent = `Score: ${numberRight} / ${numberRight + numberWrong}`;

  Array.from(choiceButtons).forEach((button) => {
    button.disabled = true;
  });

  nextButton.style.display = "block";
  currentQuestion++;
  if (currentQuestion === allQuestions.length) {
    const navNextButton = document.getElementById("next-nav-btn");
    navNextButton.disabled = false;
  }
}

// Function to navigate to the previous question
function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    if (currentQuestion < answeredQuestions.length) {
      displayAnsweredQuestion();
    } else {
      const resultContainer = document.getElementById("result-container");
      resultContainer.textContent = "";
      displayQuestion();
    }
  }
}

// Function to navigate to the next answered question
function nextAnsweredQuestion() {
  if (currentQuestion < answeredQuestions.length - 1) {
    currentQuestion++;
    displayAnsweredQuestion();
  } else {
    const resultContainer = document.getElementById("result-container");
    const navNextButton = document.getElementById("next-nav-btn");
    resultContainer.textContent = "";
    navNextButton.disabled = false; // Enable the "Next" button
    displayQuestion();
  }
}

// Function to display an answered question
function displayAnsweredQuestion() {
  const questionImage = document.getElementById("question-image");
  const choicesContainer = document.getElementById("choices-container");
  const scoreContainer = document.getElementById("score-container");
  const resultContainer = document.getElementById("result-container");
  const nextButton = document.getElementById("next-btn");
  const navPrevButton = document.getElementById("prev-btn");
  const navNextButton = document.getElementById("next-nav-btn");
  const questionNumberContainer = document.getElementById("question-number-container");

  if (currentQuestion < answeredQuestions.length) {
    const answeredQuestion = answeredQuestions[currentQuestion];

    questionNumberContainer.textContent = `Question ${currentQuestion + 1} of ${answeredQuestions.length}`;
    questionImage.src = answeredQuestion.question.imagePath;

    choicesContainer.innerHTML = "";
    answeredQuestion.question.choices.forEach((choice) => {
      const choiceButton = createAnsweredChoiceButton(
        choice,
        answeredQuestion.userAnswer,
        answeredQuestion.correctAnswer
      );
      choicesContainer.appendChild(choiceButton);
    });

    scoreContainer.textContent = `Score: ${numberRight} / ${numberRight + numberWrong}`;
    resultContainer.textContent =
      answeredQuestion.userAnswer === answeredQuestion.correctAnswer ? "Correct!" : "Wrong!";
    nextButton.style.display = "none";

    navPrevButton.disabled = currentQuestion === 0;
    navNextButton.disabled = currentQuestion === answeredQuestions.length - 1 && currentQuestion === allQuestions.length - 1;
  } else {
    displayQuestion();
  }
}

// Function to create an answered choice button
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

// Function to handle the "next" button click
function nextQuestion() {
  const nextButton = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const navNextButton = document.getElementById("next-nav-btn");

  nextButton.style.display = "none";
  resultContainer.textContent = "";

  if (currentQuestion < allQuestions.length) {
    displayQuestion();

    if (currentQuestion === allQuestions.length - 1) {
      navNextButton.disabled = true;
    }
  } else {
    endGame();
  }
}

// Function to handle the dropdown selection
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

// Function to reset the game
function resetGame() {
  currentQuestion = 0;
  numberRight = 0;
  numberWrong = 0;
  answeredQuestions = [];

  displayQuestion();
}

// Function to end the game and display the final score
function endGame() {
  const gameContainer = document.getElementById("game-container");
  const scoreContainer = document.getElementById("score-container");

  gameContainer.innerHTML = `<h2>You have done all the questions.</h2>     <p>Your final score: ${numberRight} / ${numberRight + numberWrong}</p>     <button onclick="resetGame()">Play Again</button>`;
  scoreContainer.textContent = "";
}

// Function to initialize the game
function initGame() {
  const questionMark = document.getElementById("question-mark");
  const setDropdown = document.getElementById("set-dropdown");

  document.getElementById("prev-btn").addEventListener("click", previousQuestion);
  document.getElementById("next-nav-btn").addEventListener("click", nextAnsweredQuestion);

  questionMark.addEventListener("mouseover", showExplanation);
  questionMark.addEventListener("mouseout", hideExplanation);

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
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
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