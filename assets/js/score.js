var scoreList = document.getElementById("score-list");

var loadList = function() {
    // if list exists, get list; otherwise set list to empty
    var userList = JSON.parse(localStorage.getItem("user")) || [];
    for (i = 0; i < userList.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent = userList[i].initials + " - " + userList[i].score;
        scoreList.append(listEl);
    }
};

var clearScore = function() {
    localStorage.removeItem("user");
    location.reload(); 
};

document.getElementById("clear-btn").addEventListener("click", clearScore);

loadList();