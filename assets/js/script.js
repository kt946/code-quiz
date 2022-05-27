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

var timerEl = document.querySelector("#time");
var time = 10;
var timeInterval;
var updateTime = function() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        time = 0;
        clearInterval(timeInterval);
    }
};

var startQuiz = function() {
    var startPage = document.getElementById("start-page");
    startPage.setAttribute("class", "hide");
    timerEl.textContent = time;
    timeInterval = setInterval(updateTime, 1000);
};

document.getElementById("start-btn").addEventListener("click", startQuiz);
