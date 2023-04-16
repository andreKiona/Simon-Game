
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/*Detecting the keyboard key when it has been pressed and this happens for the first time*/
$(document).keypress(function() {

    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


/*Creating the answer check function*/
function checkAnswer(currentLevel) {


    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
       
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
    }
}


/*This function generate the random number from 0-3 and selects the random color when button click happen*/
function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(500).fadeIn(100);
    playSound(randomChosenColour);
}

/*This function selects the music according to the click button from the mouse*/
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//Creating the animation effect
function animatePress(currentColour) {
    // Add the provided color class to the pressed button
    $("#" + currentColour).addClass("pressed");

    // Remove the color class from the button after 100ms delay
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    
    level = 0;
    gamePattern = [];
    started = false;
}
