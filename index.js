var gamePattern = [];
var userClickedPattern = [];
var gameActive=false;
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userChosenColour;
var level = 0;


$(".btn").click(function () {
if(gameActive==true){
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour); 
  playSound(userChosenColour);
  checkAnswer(userChosenColour);
}
});

$(document).keypress(function (event) {
  if (event.key.toUpperCase() === "A" && gameActive ==false) {
    startGame();
  }
});

$(document).click(function (event) {
  if (gameActive ==false) {
    startGame();
  }
});

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
 
function checkAnswer(color) {
  if (gamePattern[userClickedPattern.length-1]===color){
    if(gamePattern.length===userClickedPattern.length){
    setTimeout(() => {
        nextSequence();
      }, 1000);
    }  
    }
    else{
    gameOver();
  }
}

function gameOver() {
  userClickedPattern = [];
  userChosenColour="";
  gamePattern = [];
  level = 0;
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 150);
  playSound("wrong");
  $("h1").text("Game Over, Press A to play again.");
    gameActive=false;
  
}

function startGame() {
    gameActive=true;
  nextSequence();
}

function updateLevelTitle(level) {
  $("h1").text("Level " + level);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  $("#" + name).css({ opacity: 0.2 });
  setTimeout(function () {
    $("#" + name)
      .removeClass("pressed")
      .css({ opacity: 1 });
  }, 150);
}

function nextSequence() {
  $(".btn").removeClass("disabled");
  level++;
  userClickedPattern = [];
  updateLevelTitle(level);
  color = Math.floor(Math.random() * 4) + 1;
  gamePattern.push(buttonColours[color - 1]);
  loadPattern();
}

function loadPattern() {
  inputEnabled = false;
  const delay = 1200;

  gamePattern.forEach((element, index) => {
    setTimeout(() => {
      animatePress(element);
      playSound(element);
    }, index * delay);
  });

  setTimeout(() => {
    inputEnabled = true; 
  }, gamePattern.length * delay + 100);
}
