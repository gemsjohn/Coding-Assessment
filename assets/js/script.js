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
        
    } else {
        targetSeq1.style.display = "flex";
    }
};

// Selecting startAssessmentBtn calls the startAssessment function which calls newPage function
function newPage() {
    var sequenceEl = document.querySelector("#sequence2-content");
    var newH1El = document.createElement("h1");
    var listEl = document.createElement("li");
    newH1El.textContent = "Question 1";
    newH1El.className = "local-header";
    listEl.textContent = "Answer 1";
    listEl.className = "test";
    sequenceEl.appendChild(newH1El);
    sequenceEl.appendChild(listEl); 
};



// Start Assessment
function startAssessment() {
    console.log("Start Assessment button pressed.")
    //countdownTimer();
    newPage();
    

};

// Add even listener to Start Assessment button
generateBtn.addEventListener("click", startAssessment);
