var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var inGame = false;

$(document).on("keypress", function(event){
    if(!inGame && event.key) {
        inGame = true;
        // start level 0
        levelUpText();
        // 1st question
        nextSequence();
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    // check answer
    checkAnswer(userClickedPattern.length);
});

function nextSequence(){
    levelUpText();
    
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animateButton(randomChosenColor);
    playSound(randomChosenColor);
}

function levelUpText () {
    $("#level-title").text("Level " + level);
    level++;
}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animateButton(name){
    $("#" + name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    // delay 100ms and then remove class
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(length){

    console.log(gamePattern);
    console.log(userClickedPattern);
    
    if(gamePattern[length-1] != userClickedPattern[length-1]){

        // game over
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        // reset game
        startOver();
    }

    // next question after 1000ms
    setTimeout(function(){
        if (length == gamePattern.length && inGame){
            // reset array
            userClickedPattern = [];
            
            nextSequence();
        }
    }, 1000);
}

function startOver(){
    inGame = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}