

let currentSet = "midjourney-audrey-hepburn";
let currentQuestion = 0;
let numberRight = 0;
let numberWrong = 0;
let totalQuestions = 500;
let allQuestions = [];
let numberOfAnswerButtons=4;
let answeredQuestions = [];

// Function to load all existing images and create an array of questions
function loadAllQuestions() {
  const emotions = imageSets[currentSet].emotions;

  for (const emotion of emotions) {
    for (let imageNumber = 0; imageNumber < 10; imageNumber++) {
      const imagePath = `./images/${currentSet}/${emotion}${imageNumber}.png`;
      const choices = [emotion];
      while (choices.length < numberOfAnswerButtons) {
        const randomChoice = emotions[Math.floor(Math.random() * emotions.length)];
        if (!choices.includes(randomChoice)) {
          choices.push(randomChoice);
        }
      }
      shuffleArray(choices);
      allQuestions.push({ imagePath, choices, answer: emotion });
    }
  }
  shuffleArray(allQuestions);
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
  questionNumberContainer.textContent = `Question ${currentQuestion + 1} of ${allQuestions.length}`;
  
  // Clear previous answer buttons
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
  
  const navPrevButton = document.getElementById("prev-btn");
  const navNextButton = document.getElementById("next-nav-btn");

  if (currentQuestion === 0) {
    navPrevButton.disabled = true;
  } else {
    navPrevButton.disabled = false;
  }

  if (currentQuestion === answeredQuestions.length) {
    navNextButton.disabled = true;
  } else {
    navNextButton.disabled = false;
  }
  
  img.onload = function() {
    questionImage.src = question.imagePath;

    // Create answer buttons dynamically
    for (let i = 0; i < numberOfAnswerButtons; i++) {
      const choiceButton = document.createElement("button");
      choiceButton.classList.add("choice-btn");
      choiceButton.textContent = question.choices[i];
      choiceButton.disabled = false;
      choiceButton.style.backgroundColor = "#f0f0f0";
      choiceButton.style.color = "black";
      choiceButton.onclick = function() {
        checkAnswer(question.answer, choiceButton);
      };
      choicesContainer.appendChild(choiceButton);
    }

    scoreContainer.textContent = `Score: ${numberRight} / ${numberRight+numberWrong}`;
  };
  img.onerror = function() {
    allQuestions.splice(currentQuestion, 1);
    if (currentQuestion >= allQuestions.length) {
      endGame();
    } else {
      displayQuestion();
    }
  };
  img.src = question.imagePath;
  console.log(question.imagePath);
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
    for (let i = 0; i < choiceButtons.length; i++) {
      if (choiceButtons[i].textContent === answer) {
        choiceButtons[i].style.backgroundColor = "green";
        choiceButtons[i].style.color = "white";
        break;
      }
    }
  }
  
  answeredQuestions[currentQuestion] = {
    question: allQuestions[currentQuestion],
    userAnswer: selectedButton.textContent,
    correctAnswer: answer,
  };

  // Update the score display
  scoreContainer.textContent = `Score: ${numberRight} / ${numberRight+numberWrong}`;

  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].disabled = true;
  }

  nextButton.style.display = "block";
  currentQuestion++;
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    if (currentQuestion < answeredQuestions.length) {
      displayAnsweredQuestion();
    } else {
      const resultContainer = document.getElementById("result-container");
      resultContainer.textContent = ""; // Clear the result text
      displayQuestion();
    }
  }
}
function nextAnsweredQuestion() {
  if (currentQuestion < answeredQuestions.length - 1) {
    currentQuestion++;
    displayAnsweredQuestion();
  } else if (currentQuestion === answeredQuestions.length - 1) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.textContent = ""; // Clear the result text
    currentQuestion++;
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

  console.log("Current question in displayAnsweredQuestion:", currentQuestion);
  console.log("Answered questions length in displayAnsweredQuestion:", answeredQuestions.length);

  if (currentQuestion < answeredQuestions.length) {
    const answeredQuestion = answeredQuestions[currentQuestion];
    const questionIndex = allQuestions.findIndex(
      (question) => question.imagePath === answeredQuestion.question.imagePath
    );

    const questionNumberContainer = document.getElementById("question-number-container");
    questionNumberContainer.textContent = `Question ${currentQuestion + 1} of ${answeredQuestions.length}`;
    questionImage.src = answeredQuestion.question.imagePath;

    choicesContainer.innerHTML = "";
    for (let i = 0; i < numberOfAnswerButtons; i++) {
      const choiceButton = document.createElement("button");
      choiceButton.classList.add("choice-btn");
      choiceButton.textContent = answeredQuestion.question.choices[i];
      choiceButton.disabled = true;

      if (choiceButton.textContent === answeredQuestion.userAnswer) {
        choiceButton.style.backgroundColor =
          answeredQuestion.userAnswer === answeredQuestion.correctAnswer ? "green" : "red";
        choiceButton.style.color = "white";
      } else if (choiceButton.textContent === answeredQuestion.correctAnswer) {
        choiceButton.style.backgroundColor = "green";
        choiceButton.style.color = "white";
      }

      choicesContainer.appendChild(choiceButton);
    }

    scoreContainer.textContent = `Score: ${numberRight} / ${numberRight + numberWrong}`;
    resultContainer.textContent =
      answeredQuestion.userAnswer === answeredQuestion.correctAnswer ? "Correct!" : "Wrong!";
    nextButton.style.display = "none";

    // Enable/disable navigation buttons
    if (currentQuestion === 0) {
      navPrevButton.disabled = true;
    } else {
      navPrevButton.disabled = false;
    }

    if (currentQuestion === answeredQuestions.length - 1) {
      navNextButton.disabled = false;
    } else {
      navNextButton.disabled = false;
    }
  } else {
    console.log("Current question is not within answered questions range");
    displayQuestion();
  }
}



// Function to handle the "next" button click
function nextQuestion() {
  const nextButton = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");

  nextButton.style.display = "none";
  resultContainer.textContent = "";

  if (currentQuestion < totalQuestions) {
    displayQuestion();
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

function updateExplanationText() {
  const explanationText = document.getElementById("explanation-text");
  const selectedSet = imageSets[currentSet];

  explanationText.innerHTML = `
    <strong>SET:</strong> ${selectedSet.humanReadableName}<br>
    <strong>Prompt:</strong> ${selectedSet.prompt}<br>
    <strong>Emotions:</strong> ${selectedSet.emotions.join(", ")}<br>
    <strong>Source:</strong> ${selectedSet.source}<br>
    <strong>Date:</strong> ${selectedSet.date}
  `;
}


// Function to reset the game
function resetGame() {
  const setDropdown = document.getElementById("set-dropdown");

  currentQuestion = 0;
  numberRight = 0;
  numberWrong = 0;

  // Set the selected option based on the current set
  setDropdown.value = currentSet;

  displayQuestion();
}

// Function to end the game and display the final score
function endGame() {
  const gameContainer = document.getElementById("game-container");
  const scoreContainer = document.getElementById("score-container");

  gameContainer.innerHTML = `
    <h2>You have done all the questions.</h2>
    <p>Your final score: ${numberRight} / ${numberRight+numberWrong}</p>
    <button onclick="resetGame()">Play Again</button>
  `;
  scoreContainer.textContent = "";
}

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

function showExplanation() {
  const explanationText = document.getElementById("explanation-text");
  const selectedSet = imageSets[currentSet];

  explanationText.innerHTML = `
    <strong>SET:</strong> ${selectedSet.humanReadableName}<br>
    <strong>Prompt:</strong> ${selectedSet.prompt}<br>
    <strong>Emotions:</strong> ${selectedSet.emotions.join(", ")}<br>
    <strong>Source:</strong> ${selectedSet.source}<br>
    <strong>Date:</strong> ${selectedSet.date}
  `;

    explanationText.style.display="block";
}

function hideExplanation() {
  const explanationText = document.getElementById("explanation-text");
  explanationText.innerHTML = "";
  explanationText.style.display="none";
}


// Start the game
initGame();