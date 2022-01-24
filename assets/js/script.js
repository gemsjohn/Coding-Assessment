// TIMER VARIABLES
// timeRemaining: sets the initial value
// timeRemainingValue: targets the <p id="timer"></p> portion of the <header>
var timeRemaining = 20;
var timeRemainingValue = document.querySelector("#timer");
timeRemainingValue.textContent = timeRemaining;
var skipInterval = 0;

// START ASSESSMENT BUTTON
// We must target the element id="start-assessment" in order to call the onclick and startAssessment functions
const startAssessmentBtn = document.getElementById("start-assessment");
var generateBtn = document.querySelector("#start-assessment");
var newStartButton = document.getElementById("start-assessment");

// SEQUENCE 1 CONTENT <div>
// We must target the element id="sequence1-content" in order toggle display off
// when startAssessmentBtn has been pushed
const targetSeq1 = document.getElementById("sequence1-content");

// SEQUENCE 2 CONTENT <div>
// These two variables get reused with each newPage function, so they must be global
var sequenceEl = document.querySelector("#sequence2-content");
var newH1El = document.createElement("h1");

var theResult = document.querySelector("#result");
var newH3El = document.createElement("h3");

// Links to attribute data-btn-id
var btnIdCounter = 0;

// Score variable
var score = 0;
var submitCounter = 0;

var highScores = [];

var storage = {
    name: " ",
    value: 0
}

var submitAttempt = 0;

var round = 0;


var initialsBox = document.createElement("input");
var submit = document.createElement("button");
var startOver = document.createElement("button");
var initials = null;


// QUESTION 1 / ANSWERS ARRAY
var questionAnswerOne = ['1.answer1', '1.answer2', '1.answer3', 'Correct'];
var questionAnswerTwo = ['Correct', '2.answer2', '2.answer3', '2.answer4'];
var questionAnswerThree = ['3.answer1', '3.answer2', '3.answer3', 'Correct'];
var newButtons = [];

// When startAssessmentBtn is clicked: 
// - start timer countdown; countdown 1 second at a time
// - turn off sequence1-content
startAssessmentBtn.onclick = function() {
    timeRemainingValue.textContent = timeRemaining;
    var interval = setInterval(function() {
        timeRemaining = timeRemaining - 1;        
        timeRemainingValue.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(interval);
            timeRemaining = 0;
            timeRemainingValue.textContent = timeRemaining;
            if (skipInterval == 0){
                conclude();
            }
        }
    }, 1000);
    if (targetSeq1.style.display !== "none") {
        targetSeq1.style.display = "none";
    } else if (round < 1) {
        targetSeq1.style.display = "flex";
    }
};

// Selecting startAssessmentBtn calls the startAssessment function which calls newPage1 function
function newPage1(time) {
    if (round > 0) {
        sequenceEl.removeChild(newStartButton);
    }
    
    newH1El.textContent = "Question 1";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    // FOR LOOP
    // - applies unique IDs to each button
    // - addEventListener idenfies each button selected
    // - when the correct button is selected newPage2 function gets called
    for (var i = 0; i < 4; i++) {
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = questionAnswerOne[i];
        newButtons[i].className = "btn";
        newButtons[i].setAttribute("data-btn-id", btnIdCounter);
        sequenceEl.appendChild(newButtons[i]);
        btnIdCounter++;

        newButtons[i].addEventListener('click', function(event) {
            var element = event.target
            var userClicked = element.getAttribute('data-btn-id')
            

            // userClicked must be a choice between 0 and 3
            if (userClicked == 3) {
                if (timeRemaining > 0){
                    newPage2(time);
                } else {
                    conclude();
                }
            } else {
                theResult.textContent = "Incorrect";
                newH3El.className = "below-choices"
                theResult.appendChild(newH3El);
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                    timeRemainingValue.textContent = timeRemaining;
                } else if (time <= 10 && time >= 0) {
                    skipInterval = 1;
                    conclude();
                }
                
            }
            
        });
        
    };
    
};

function newPage2(time) {

    // FOR LOOP
    // - clears the newButtons array set during newPage1()
    for (var i = 0; i < newButtons.length; i++) {
        var buttonPrevious = document.querySelector(
            ".btn[data-btn-id='" + i + "']"
        );
        buttonPrevious.remove();
    };
    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);

    newH1El.textContent = "Question 2";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    for (var i = 0; i < 4; i++) {
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = questionAnswerTwo[i];
        newButtons[i].className = "btn";
        newButtons[i].setAttribute("data-btn-id", btnIdCounter);
        sequenceEl.appendChild(newButtons[i]);
        btnIdCounter++;

        newButtons[i].addEventListener('click', function(event) {
            var element = event.target
            var userClicked = element.getAttribute('data-btn-id')

            // userClicked must be a choice between 4 and 7
            if (userClicked == 4) {
                if (timeRemaining > 0){
                    for (var i = btnIdCounter - 4; i < btnIdCounter; i++) {
                        var buttonPrevious = document.querySelector(
                            ".btn[data-btn-id='" + i + "']"
                        );
                        buttonPrevious.remove();
                    };
                    newPage3(time);
                } else {
                    conclude();
                }
            } else {
                theResult.textContent = "Incorrect";
                newH3El.className = "below-choices"
                theResult.appendChild(newH3El);
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                    timeRemainingValue.textContent = timeRemaining;
                } else if (time <= 10 && time >= 0) {
                    skipInterval = 1;
                    conclude();
                } 
            }
        });
    };
};

function newPage3(time) {

    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);
    
    newH1El.textContent = "Question 3";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    for (var i = 0; i < 4; i++) {
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = questionAnswerThree[i];
        newButtons[i].className = "btn";
        newButtons[i].setAttribute("data-btn-id", btnIdCounter);
        sequenceEl.appendChild(newButtons[i]);
        btnIdCounter++;

        newButtons[i].addEventListener('click', function(event) {
            var element = event.target
            var userClicked = element.getAttribute('data-btn-id')

            // userClicked must be a choice between 8 and 11
            if (userClicked == 11) {
                skipInterval = 1;
                if (timeRemaining > 0){
                    score = timeRemaining;
                    conclude();

                } else {
                    conclude();
                }
            } else {
                skipInterval = 1;
                theResult.textContent = "Incorrect";
                newH3El.className = "below-choices"
                theResult.appendChild(newH3El);
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                    timeRemainingValue.textContent = timeRemaining;
                } else if (time <= 10 && time >= 0) {
                    conclude();

                } 
            }
        });
    };
};

function conclude() {
    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);
    timeRemaining = 0;
    timeRemainingValue.textContent = timeRemaining;
    for (var i = btnIdCounter - 4; i < btnIdCounter; i++) {
        var buttonPrevious = document.querySelector(
            ".btn[data-btn-id='" + i + "']"
        );
        buttonPrevious.remove();
    }
    
    newH1El.textContent = "Assessment Complete, " + "Your Score: " + score;
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);


    storeHighScores();

};

function storeHighScores() {
    submit.textContent = "SUBMIT";
    submit.className = "btn";
    submit.setAttribute("data-scores", submitCounter);
    sequenceEl.appendChild(initialsBox);
    sequenceEl.appendChild(submit);

    submit.addEventListener('click', function(event) {
        var element = event.target
        var userClicked = element.getAttribute('data-scores')
        if (userClicked == submitCounter) {
            submitCounter++;
            displayHighScores(); 
        }
    });
};

function displayHighScores() {
    sequenceEl.removeChild(initialsBox);
    sequenceEl.removeChild(submit);
    sequenceEl.removeChild(newH1El);
    storage.name = initials;
    storage.value = score;

    localStorage.setItem('storage', JSON.stringify(storage));
    var storageFromLS = JSON.parse(localStorage.getItem('storage'));
    highScores.push(storageFromLS);
    console.log(highScores);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    for (var i = 0; i < submitCounter; i++) {
        var addInitials = document.createElement("h3");
        addInitials.textContent = highScores[i].name + " " + highScores[i].value;
        addInitials.className = "local-header";
        sequenceEl.appendChild(addInitials);
    };
    
    startOver.textContent = "Restart Assessment";
    startOver.className = "btn";
    startOver.setAttribute("data-start-over", "new");
    sequenceEl.appendChild(startOver);
    startOver.addEventListener('click', function(event) {
        var element = event.target;
        var userClicked = element.getAttribute('data-start-over');
        if (userClicked == "new") {
            sequenceEl.removeChild(addInitials);
            sequenceEl.removeChild(startOver);
            
            timeRemaining = 20;
            timeRemainingValue.textContent = timeRemaining;
            btnIdCounter = 0;
            round++;
            var newStartButton = document.getElementById("start-assessment");
            sequenceEl.appendChild(newStartButton);
            
        };
    });  
    
    
};

// Start Assessment
function startAssessment() {
    newPage1(timeRemaining);
};

// Add even listener to Start Assessment button
generateBtn.addEventListener("click", startAssessment);

