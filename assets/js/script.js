// question object containing array of title, choices, and answers
var questions = [
    {
        title: "Commonly used data types DO Not include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

// variables for document
var questionEl = document.querySelector("#question");
var questionIndex = 0;
var choicesListEl = document.querySelector("#choices-container");
var choicesEl = document.querySelector("#choices-list");
var resultEl = document.querySelector("#result");
var timerEl = document.querySelector("#time");
var time = 75;
var timeInterval;
var userInitials = document.getElementById("save-initials")
var scoreValue = document.getElementById("score");

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
    var questionTitle = document.createElement("h2")
    questionTitle.textContent = questions[questionIndex].title;
    questionEl.append(questionTitle);

    // list choices
    var choices = questions[questionIndex].choices;
    var choicesLength = choices.length;
    for (var i = 0; i < choices.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent = choices[i]
        choicesEl.append(listEl);
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
    }
    nextQuestion();
};

// function for getting next question
var nextQuestion = function() {
    questionIndex++;
    setTimeout(function() {
        resultEl.textContent = "";
    }, 2000);

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
    endPage.setAttribute("class", "");
};

var saveScore = function () {
    var userObj = {
        initials: userInitials.value,
        score: scoreValue.textContent
    }
    localStorage.setItem("user", JSON.stringify(userObj));
}

document.getElementById("start-btn").addEventListener("click", startQuiz);

choicesListEl.addEventListener("click", checkAnswer);

document.getElementById("submit-btn").addEventListener("click", saveScore);


