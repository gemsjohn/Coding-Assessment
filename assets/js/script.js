// TIMER VARIABLES
// timeRemaining: sets the initial value
// timeRemainingValue: targets the <p id="timer"></p> portion of the <header>
var timeRemaining = 50;
var timeRemainingValue = document.querySelector("#timer");
timeRemainingValue.textContent = timeRemaining;

// START ASSESSMENT BUTTON
// We must target the element id="start-assessment" in order to call the onclick and startAssessment functions
const startAssessmentBtn = document.getElementById("start-assessment");
var generateBtn = document.querySelector("#start-assessment");

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


// QUESTION 1 / ANSWERS ARRAY
var questionAnswerOne = ['1.answer1', '1.answer2', '1.answer3', 'Correct'];
var questionAnswerTwo = ['Correct', '2.answer2', '2.answer3', '2.answer4'];
var questionAnswerThree = ['3.answer1', '3.answer2', '3.answer3', 'Correct'];
var newButtons = [];

var page = [0, 0, 0];


// When startAssessmentBtn is clicked: 
// - start timer countdown; countdown 1 second at a time
// - turn off sequence1-content
startAssessmentBtn.onclick = function() {
    timeRemainingValue.textContent = timeRemaining;
    var interval = setInterval(function() {
        timeRemaining = timeRemaining - 1;        
        timeRemainingValue.textContent = timeRemaining;
        if (timeRemaining <= 0 || score == timeRemaining) {
            clearInterval(interval);
            timeRemaining = 0;
            timeRemainingValue.textContent = timeRemaining;

            endPage();
        }
    }, 1000);
    if (targetSeq1.style.display !== "none") {
        targetSeq1.style.display = "none";
        
    } else {
        targetSeq1.style.display = "flex";
        
    }
};

// Selecting startAssessmentBtn calls the startAssessment function which calls newPage1 function
function newPage1(time) {
    page = [1, 0, 0];

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
                    timeRemaining = 0;
                }
                
            } else {
                theResult.textContent = "Incorrect";
                newH3El.className = "below-choices"
                theResult.appendChild(newH3El);
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                } else if (time <= 10 && time > 0) {
                    timeRemaining = 0;
                } 
            }
        });
        
    };
};

function newPage2(time) {
    page = [0, 1, 0];
    
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
                    newPage3(time);
                } else {
                    timeRemaining = 0;
                }
            } else {
                theResult.textContent = "Incorrect";
                newH3El.className = "below-choices"
                theResult.appendChild(newH3El);
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                } else if (time <= 10 && time >= 0) {
                    timeRemaining = 0;
                    
                } 
            }
        });
    };
};

function newPage3(time) {
    page = [0, 0, 1];
    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);
    // FOR LOOP
    // - clears the newButtons array set during newPage2()
    // - currentBtnId variable is neccessary to target the correct id's
    for (var i = 0; i < newButtons.length; i++) {
        var currentBtnId = i + 4;
        var buttonPrevious = document.querySelector(
            ".btn[data-btn-id='" + currentBtnId + "']"
        );
        buttonPrevious.remove();
    };
    
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
                if (timeRemaining > 0){
                    score = timeRemaining;
                    timeRemaining = 0;
                } else {
                    timeRemaining = 0;
                }
            } else {
                theResult.textContent = "Incorrect";
                newH3El.className = "below-choices"
                theResult.appendChild(newH3El);
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                } else if (time <= 10 && time >= 0) {
                    timeRemaining = 0;
                } 
            }
        });
    };
};

function endPage() {
    timeRemaining = 0;

    theResult.textContent = " ";
    newH3El.className = "below-choices"
    theResult.appendChild(newH3El);

    // FOR LOOP
    // - clears the newButtons array set during newPage1()
    if (page[1, 0, 0]) {
        for (var i = 0; i < newButtons.length; i++) {
            var buttonPrevious = document.querySelector(
                ".btn[data-btn-id='" + i + "']"
            );
            buttonPrevious.remove();
        };
    } else if (page[0, 1, 0] || page[0, 0, 1]) {
        for (var i = 0; i < newButtons.length; i++) {
            var currentBtnId = i + 4;
            var buttonPrevious = document.querySelector(
                ".btn[data-btn-id='" + currentBtnId + "']"
            );
            buttonPrevious.remove();
        };
    } else{
        for (var i = 8; i < 12; i++) {
            var buttonPrevious = document.querySelector(
                ".btn[data-btn-id='" + i + "']"
            );
            buttonPrevious.remove();
        };
    }
    newH1El.textContent = "Assessment Complete, " + "Your Score: " + score;
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);
}

// Start Assessment
function startAssessment() {
    newPage1(timeRemaining);
};

// Add even listener to Start Assessment button
generateBtn.addEventListener("click", startAssessment);
