var loadList = function() {
    // if list exists, get list; otherwise set list to empty
    var userList = JSON.parse(localStorage.getItem("user")) || [];

    // sort users based on highest score
    userList.sort(function (a , b){
        return b.score - a.score
    });

    // load list of scores
    for (i = 0; i < userList.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent = userList[i].initials + " - " + userList[i].score;
        document.getElementById("score-list").appendChild(listEl);
    }
};

// clear high scores and reload page
var clearScore = function() {
    localStorage.removeItem("user");
    location.reload(); 
};

document.getElementById("clear-btn").addEventListener("click", clearScore);

loadList();