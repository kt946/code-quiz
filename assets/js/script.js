// refer to questions.js for list of questions

// variables for document
var questionEl = document.querySelector("#question");
var questionIndex = 0;
var choicesEl = document.querySelector("#choices-list");
var resultEl = document.querySelector("#result");
var timerEl = document.querySelector("#time");
var time = 75;
var timeInterval;
var scoreValue = document.querySelector("#score");

// timer countdown function
var updateTime = function() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
};

// function for displaying question title and choices
var presentQuestion = function() {
    // clear previous questions and choices
    questionEl.innerHTML = "";
    choicesEl.innerHTML = "";
    
    // present question title
    var questionTitle = document.createElement("h2");
    questionTitle.textContent = questions[questionIndex].question;
    questionEl.appendChild(questionTitle);

    // list choices
    var choices = questions[questionIndex].choices;
    for (var i = 0; i < choices.length; i++) {
        var listEl = document.createElement("li");
        listEl.setAttribute("class", "button");
        listEl.textContent = choices[i];
        choicesEl.appendChild(listEl);
    }
};

// function for checking answer
var checkAnswer = function(event) {
    if (event.target.matches("li")) {
        var userAnswer = event.target.textContent;
        if (userAnswer === questions[questionIndex].answer) {
            resultEl.textContent = "Correct!";
        }
        else {
            resultEl.textContent = "Wrong!";
            time -= 10;
            timerEl.textContent = time;
        }
        // show result for question
        resultEl.removeAttribute("class", "hidden");
         // remove result for previous question
        setTimeout(function() {
            resultEl.setAttribute("class", "hidden")
        }, 1000);
    }
    nextQuestion();
};

// function for getting next question
var nextQuestion = function() {
    questionIndex++;
    // if all questions are answered
    if (questionIndex === questions.length) {
        endQuiz();
    }
    else {
        presentQuestion();
    }
};

// function for starting the quiz
var startQuiz = function() {
    // hide start page
    var startPageEl = document.getElementById("start-page");
    startPageEl.setAttribute("class", "hidden");

    // start timer
    timerEl.textContent = time;
    timeInterval = setInterval(updateTime, 1000);
    presentQuestion();
};

// function for ending quiz and displaying score
var endQuiz = function() {
    // stop timer
    clearInterval(timeInterval);
    if (time <= 0) {
        time = 0;
        timerEl.textContent = time;
    }

    // clear page if timer runs out
    questionEl.innerHTML = "";
    choicesEl.innerHTML = "";

    // reveal final score page
    var endPage = document.getElementById("end-page");
    scoreValue.textContent = time;
    endPage.removeAttribute("class", "hidden");
};

// function to save initials and score to local storage
var saveScore = function () {
    var userInput = document.getElementById("save-initials").value.trim();

    // validate user input
    if (userInput !== "") {
        // if list exists, get list; otherwise set list empty
        var userList = JSON.parse(localStorage.getItem("user")) || [];
        // object to hold initials and score
        var userObj = {
            initials: userInput,
            score: scoreValue.textContent
        };
        // add to list and save to local storage
        userList.push(userObj);
        localStorage.setItem("user", JSON.stringify(userList));
        window.location = "score.html";
    }
};

document.getElementById("start-btn").addEventListener("click", startQuiz);

choicesEl.addEventListener("click", checkAnswer);

document.getElementById("submit-btn").addEventListener("click", saveScore);


