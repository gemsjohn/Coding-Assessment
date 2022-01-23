// TIMER VARIABLES
// timeRemaining: sets the initial value
// timeRemainingValue: targets the <p id="timer"></p> portion of the <header>
var timeRemaining = 20;
var timeRemainingValue = document.querySelector("#timer");


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

// Links to attribute data-btn-id
var btnIdCounter = 0;


// QUESTION 1 / ANSWERS ARRAY
var questionAnswerOne = ['1.answer1', '1.answer2', '1.answer3', '1.answer4'];
var questionAnswerTwo = ['2.answer1', '2.answer2', '2.answer3', '2.answer4'];
var questionAnswerThree = ['3.answer1', '3.answer2', '3.answer3', '3.answer4'];
var questionAnswerFour = ['4.answer1', '4.answer2', '4.answer3', '4.answer4'];
var newButtons = [];

//var page = [0, 0, 0, 0];


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
            endPage();
        } else {
            console.log(timeRemaining);
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
                console.log("Correct answer for newPage1");
                newPage2();
            } else {
                if (time > 10) {
                    time = time - 10;
                    timeRemaining = time;
                } else if (time <= 10 && time > 0) {
                    //time = 0;
                    timeRemaining = 0;
                } 
                console.log("Incorrect answer for newPage1")
            }
        });
        
    };
};

function newPage2() {
    // FOR LOOP
    // - clears the newButtons array set during newPage1()
    for (var i = 0; i < newButtons.length; i++) {
        var buttonPrevious = document.querySelector(
            ".btn[data-btn-id='" + i + "']"
        );
        buttonPrevious.remove();
    };

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
                console.log("Correct answer for newPage2");
                newPage3();
            } else {
                timeRemaining = timeRemaining - 10;
                console.log("Incorrect answer for newPage2")
            }
        });
    };
};

function newPage3() {
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
                // newPage3();
                console.log("Correct answer for newPage3");
            } else {
                timeRemaining = timeRemaining - 10;
                console.log("Incorrect answer for newPage3")
            }
        });
    };
};

function endPage() {
    console.log("GAME OVER");
    // FOR LOOP
    // - clears the newButtons array set during newPage1()
    for (var i = 0; i < newButtons.length; i++) {
        var buttonPrevious = document.querySelector(
            ".btn[data-btn-id='" + i + "']"
        );
        buttonPrevious.remove();
    };

    newH1El.textContent = "GAME OVER";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);
}


// Start Assessment
function startAssessment() {
    newPage1(timeRemaining);

};

// Add even listener to Start Assessment button
generateBtn.addEventListener("click", startAssessment);
