var picked = false;
var enemyPicked = false;
var playerChoice;
var enemyChoice;
var choice;
var deleteHold;
var charArray = [Dash, Lumpy, Nubnub, Tamer]
var Dash = {
    name: "Dash",
    health: 120,
    attackPower: 8,
    counterAttack: 8,
    idNum: 0
}

var Lumpy = {
    name: "Lumpy",
    health: 100,
    attackPower: 25,
    counterAttack: 25,
    idNum: 1
}

var Nubnub = {
    name: "Nubnub",
    health: 100,
    attackPower: 5,
    counterAttack: 5,
    idNum: 2
}

var Tamer = {
    name: "Tamer",
    health: 150,
    attackPower: 20,
    counterAttack: 20,
    idNum: 3
}

var charArray = [Dash, Lumpy, Nubnub, Tamer]

for (var j = 0; j < charArray.length; j++) {
    updateStatus(charArray[j]);
}

//this updates the selected characters stats on the front end
function updateStatus(character) {
    $("#" + character.name + "Text").html(character.name + "<br> Health: " + character.health + "<br>Attack Power: " + character.attackPower)
}

function updateStatusEnemy(character) {
    $("#" + character.name + "Text").html(character.name + "<br> Health: " + character.health + "<br>Attack Power: " + character.counterAttack)
}

//function for assigning selected characters and moving them to appropriate area
function charPic(clicked) {
    if (!picked) {
        playerChoice = clicked;
        picked = true;
        charArray.splice(clicked, 1);
        $('#' + clicked.name).detach().appendTo("#playerArea");
        updateStatus(clicked);
    }

    else if (picked && !enemyPicked) {
        enemyChoice = clicked;
        enemyPicked = true;
        $("#enemyArea").html("");
        charArray.splice(clicked, 1);
        $('#' + clicked.name).detach().appendTo("#enemyArea");
    }
}

//battle mechanics
function battle(player, enemy) {
    player.health -= enemy.counterAttack;
    enemy.health -= player.attackPower;
    player.attackPower += 10;
    $("#battleText").html("You attacked " + enemy.name + " for " + player.attackPower + " damage. <br>" + enemy.name + " attacked you for " + enemy.counterAttack + " damage.")
    updateStatus(player);
    updateStatus(enemy);
    statusCheck();
}

//win/loss check 
function statusCheck() {

    if (enemyChoice.health <= 0 && playerChoice.health <= 0) {
        $("#" + playerChoice.name).detach();
        $("#" + enemyChoice.name).detach();
        $("#battleText").html("<h3>You Both Lost!</h3>")
        $("#attack").html('<button class="btn" onclick="window.location.reload()">Play Again</button>')
    }
    

    else if (enemyChoice.health <= 0 && charArray.length === 0) {
        $("#" + enemyChoice.name).detach();
        enemyChoice = ""
        $("#battleText").html("<h3>You Win!</h3>")
        $("#attack").html('<button class="btn" onclick="window.location.reload()">Play Again</button>')
    }
    
    else if (playerChoice.health <= 0) {
        console.log("Game Over")
        $("#" + playerChoice.name).detach();
        $("#PlayerAreaText").html("<h3>You Lost</h3>")
        $("#attack").html('<button class="btn" onclick="window.location.reload()">Play Again</button>')

    }
    
    else if (enemyChoice.health <= 0) {
        $("#battleText").html("You defeated " + enemyChoice.name + ". pick another enemy.")
        $("#" + enemyChoice.name).detach(); 
        enemyChoice = ""
        enemyPicked = false;
    }
}

//when you click a picture, it selects a character from the array
$(".card").on("click", function () {
    choice = eval($(this).attr("id"));
    charPic(choice);
    console.log(picked, enemyPicked);
    console.log(playerChoice, enemyChoice);
    // console.log(charArray);
})

$("#attack").on("click", function () {
    if (!enemyChoice) {
        $("#enemyArea").html("Pick an Enemy")
    }

    else {
    battle(playerChoice, enemyChoice);
    console.log(playerChoice, enemyChoice);
    }
})
