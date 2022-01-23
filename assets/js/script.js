// TIMER VARIABLES
// timeRemaining: sets the initial value
// timeRemainingValue: targets the <p id="timer"></p> portion of the <header>
var timeRemaining = 10;
var timeRemainingValue = document.querySelector("#timer");

// START ASSESSMENT BUTTON
// We must target the element id="start-assessment" in order to call the onclick and startAssessment functions
const startAssessmentBtn = document.getElementById("start-assessment");
var generateBtn = document.querySelector("#start-assessment");

// SEQUENCE 1 CONTENT <div>
// We must target the element id="sequence1-content" in order toggle display off
// when startAssessmentBtn has been pushed
const targetSeq1 = document.getElementById("sequence1-content");

// SEQUENCE 2 CONTENT <button>
var btnIdCounter = 0;
const targetButton1 = document.getElementById("btn1");
targetButton1.style.display = "none";

// QUESTION 1 / ANSWERS ARRAY
var questionAnswerOne = ['1.answer1', '1.answer2', '1.answer3', '1.answer4'];
var questionAnswerTwo = ['2.answer1', '2.answer2', '2.answer3', '2.answer4'];
var questionAnswerThree = ['3.answer1', '3.answer2', '3.answer3', '3.answer4'];
var questionAnswerFour = ['4.answer1', '4.answer2', '4.answer3', '4.answer4'];
var newButtons = [];

var page = [0, 0, 0, 0];


// When startAssessmentBtn is clicked: 
// - start timer countdown; countdown 1 second at a time
// - turn off sequence1-content
startAssessmentBtn.onclick = function() {
    timeRemainingValue.textContent = timeRemaining;
    var interval = setInterval(function() {
        timeRemaining = timeRemaining - 1;        
        timeRemainingValue.textContent = timeRemaining;
        if (timeRemaining === 0) {
            clearInterval(interval)
        }
    }, 1000);
    if (targetSeq1.style.display !== "none") {
        targetSeq1.style.display = "none";
        page[0] = 1;
        
    } else {
        targetSeq1.style.display = "flex";
        
    }
};



// Selecting startAssessmentBtn calls the startAssessment function which calls newPage function
function newPage() {
    // console.log("Question 1");
    var sequenceEl = document.querySelector("#sequence2-content");
    var newH1El = document.createElement("h1");
    newH1El.textContent = "Question 1";
    newH1El.className = "local-header";
    sequenceEl.appendChild(newH1El);
    
    for (var i = 0; i < 4; i++) {
        // newButtons[i] = document.createElement("li");
        newButtons[i] = document.createElement("button");
        newButtons[i].textContent = questionAnswerOne[i];
        newButtons[i].className = "btn";
        newButtons[i].setAttribute("btn-id", btnIdCounter);
        sequenceEl.appendChild(newButtons[i]);
        btnIdCounter++;
    };
    newButtons[1].onclick = function() {
        newPage2();
    };    

        
};

function newPage2() {
    console.log("Question 2");
}



// Start Assessment
function startAssessment() {
    //countdownTimer();
    newPage();
    

};

// Add even listener to Start Assessment button
generateBtn.addEventListener("click", startAssessment);
