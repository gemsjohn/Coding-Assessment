// TIMER VARIABLES
// timeRemaining: sets the initial value
// timeRemainingValue: targets the <p id="timer"></p> portion of the <header>
// .textContent ensures that the timeRemaing is present on the initial page
var timeRemaining = 20;
var timeRemainingValue = document.querySelector("#timer");
timeRemainingValue.textContent = timeRemaining;

// START ASSESSMENT BUTTON
// Must target the element id="start-assessment" in order to call the onclick and startAssessment functions
const startAssessmentBtn = document.getElementById("start-assessment");
var generateBtn = document.querySelector("#start-assessment");
var newStartButton = document.getElementById("start-assessment");

// SEQUENCE 1 CONTENT <div>
// Must target the element id="sequence1-content" in order toggle display off
// when startAssessmentBtn has been pushed
const targetSeq1 = document.getElementById("sequence1-content");

// SEQUENCE 2 CONTENT <div>
// These two variables get reused with each newPage function, so they must be global
var sequenceEl = document.querySelector("#sequence2-content");
var newH1El = document.createElement("h1");

// Handles incorrect answer notification below the answer choices
var theResult = document.querySelector("#result");
var newH3El = document.createElement("h3");

// Links to attribute data-btn-id.  This becomes essential as the user cycles through the assessment multiple times
var btnIdCounter = 0;

// score variable: records timeRemaining which sets the users score
// success variable: if the user answers everything correctly before the time runs out success will = 1
// submitCounter: counts the number of times the Submit button is selected
var score = 0;
var success = 0;
var submitCounter = 0;

// Eleements for the submit page
var initialsBox = document.createElement("input");
var submit = document.createElement("button");




// Answer array
var answers = [
    {0:'Red', 1:'Green', 2:'Blue', 3:'White'},
    {0:'Green', 1:'White', 2:'Red', 3:'Yellow'},
    {0:'Black', 1:'Blue', 2:'Green', 3:'Red'}
];

// Supplemental arrays
var newButtons = [];
var highScores = [];

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
            conclude();
        }
    }, 1000);
    if (targetSeq1.style.display !== "none") {
        targetSeq1.style.display = "none";
    } else {
        targetSeq1.style.display = "flex";
    }
};

function newPage1(time) {
    // Apply the new header
    newH1El.textContent = "What color is this text written in?";
    newH1El.style.color = "white";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    

    // FOR LOOP
    // - applies unique IDs to each button
    // - addEventListener idenfies each button selected
    // - when the correct button is selected move to the next page
    // - if it is incorrect reduce the time by 10 until the time reaches zero
    for (var i = 0; i < 4; i++) {
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = answers[0][i];
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
                    // Clears the newButtons array set during the previous page
                    for (var i = 0; i < newButtons.length; i++) {
                        var buttonPrevious = document.querySelector(
                            ".btn[data-btn-id='" + i + "']"
                        );
                        buttonPrevious.remove();
                    };
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
                    conclude();
                }
            }
        });
    };
};

function newPage2(time) {
    // Clear Inccorect result notifications as needed
    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);

    // Apply the new header
    newH1El.textContent = "What color is this text written in?";
    newH1El.style.color = "mediumseagreen";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    // FOR LOOP
    // - applies unique IDs to each button
    // - addEventListener idenfies each button selected
    // - when the correct button is selected move to the next page
    // - if it is incorrect reduce the time by 10 until the time reaches zero
    for (var i = 0; i < 4; i++) {
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = answers[1][i];
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
                    // Clears the newButtons array set during the previous page
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
                    conclude();
                } 
            }
        });
    };
};

function newPage3(time) {
    // Clear Inccorect result notifications as needed
    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);
    
    // Apply the new header
    newH1El.textContent = "What color is this text written in?";
    newH1El.style.color = "red";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    // FOR LOOP
    // - applies unique IDs to each button
    // - addEventListener idenfies each button selected
    // - when the correct button is selected move to the next page
    // - if it is incorrect reduce the time by 10 until the time reaches zero
    for (var i = 0; i < 4; i++) {
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = answers[2][i];
        newButtons[i].className = "btn";
        newButtons[i].setAttribute("data-btn-id", btnIdCounter);
        sequenceEl.appendChild(newButtons[i]);
        btnIdCounter++;

        newButtons[i].addEventListener('click', function(event) {
            var element = event.target
            var userClicked = element.getAttribute('data-btn-id')

            // userClicked must be a choice between 8 and 11
            if (userClicked == 11) {
                if (timeRemaining > 0){
                    score = timeRemaining;
                    success = 1;
                    conclude();
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
                    conclude();

                } 
            }
        });
    };
};

function conclude() {
    if (success === 0) {
        score = 0;
    }
    // Clear Inccorect result notifications as needed
    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);

    timeRemaining = 0;
    timeRemainingValue.textContent = timeRemaining;

    // Clears the newButtons array set during the previous page
    for (var i = btnIdCounter - 4; i < btnIdCounter; i++) {
        var buttonPrevious = document.querySelector(
            ".btn[data-btn-id='" + i + "']"
        );
        buttonPrevious.remove();
    }
    
    // Apply the new header
    newH1El.textContent = "Assessment Complete, " + "Your Score: " + score;
    newH1El.style.color = "white";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);

    storeHighScores();
};

function storeHighScores() {
    // Setup the submit page
    initialsBox.setAttribute("name", "user-name");
    sequenceEl.appendChild(initialsBox);
    submit.textContent = "SUBMIT";
    submit.className = "btn";
    submit.setAttribute("data-scores", submitCounter);
    sequenceEl.appendChild(submit);

    // When the Submit button is selected:
    // - confirm/force the user has entered a name, initials, or identifier within the input
    // - store the user input and score into the highScores array (even if it isn't a high score)
    // - remove the input box, submit button, and header
    submit.addEventListener('click', function(event) {
        var element = event.target
        var userClicked = element.getAttribute('data-scores')
        
        if (userClicked == submitCounter) {
            var userNameInput = document.querySelector("input[name='user-name']").value;
            if (userNameInput === "" || userNameInput === "") {
                alert("You need to add your name or initials.");
                return false;
            } else {
                var storage = {
                    name: " ",
                    value: 0
                };

                storage.name = userNameInput;
                storage.value = score;

                highScores.push(storage);
                localStorage.setItem('highScores', JSON.stringify(highScores));
                
                document.querySelector("input[name='user-name']").value = "";

                sequenceEl.removeChild(initialsBox);
                sequenceEl.removeChild(submit);
                sequenceEl.removeChild(newH1El);
            }
            submitCounter++;
            displayHighScores(); 
        }
    });
};

function displayHighScores() {
    // FOR LOOP
    // - determine the value for submit counter and loop that many times
    // - display the recorded scroes from previous assessment submissions
    var scoreList = [];
    for (var i = 0; i < submitCounter; i++) {
        console.log(highScores[i].name + "," + highScores[i].value);
        scoreList[i] = document.createElement("p");
        scoreList[i].setAttribute("name","score-list");
        scoreList[i].innerHTML = "Name: " + highScores[i].name + "," + " Score: " + highScores[i].value;
        sequenceEl.appendChild(scoreList[i]);
    };

    // Setup the Restart Assessment button and if it clicked remove everything and set the user up to restart the assessment
    var restartAssessment = document.createElement("button");
    restartAssessment.textContent = "Restart Assessment";
    restartAssessment.className = "btn";
    restartAssessment.setAttribute("name","start-over");
    sequenceEl.appendChild(restartAssessment);
    restartAssessment.addEventListener('click', function(event) {
        var element = event.target;
        var userClicked = element.getAttribute('name');
        if (userClicked == "start-over") {
            var restartAssessmentButton = document.querySelector("button[name='start-over']");

            for (var i = 0; i < submitCounter; i++) {
                sequenceEl.removeChild(scoreList[i]);
            }
            
            sequenceEl.removeChild(restartAssessmentButton);
            
            timeRemaining = 20;
            timeRemainingValue.textContent = timeRemaining;
            btnIdCounter = 0;
            targetSeq1.style.display = "flex";
            var newStartButton = document.querySelector("button[id='start-assessment']");
            targetSeq1.appendChild(newStartButton);
        };
    });  
};

// Start Assessment
function startAssessment() {
    success = 0;
    newPage1(timeRemaining);
};

// Add even listener to Start Assessment button
generateBtn.addEventListener("click", startAssessment);

