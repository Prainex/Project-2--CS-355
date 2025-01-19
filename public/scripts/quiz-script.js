
let questions = [
    {
        "question": "A flashing red traffic light signifies that a driver should do what?",
        "A": "stop",
        "B": "speed up",
        "C": "proceed with caution",
        "D": "honk the horn",
        "answer": "A"
    },
    {
        "question": "A knish is traditionally stuffed with what filling?",
        "A": "potato",
        "B": "creamed corn",
        "C": "lemon custard",
        "D": "raspberry jelly",
        "answer": "A"
    },
    {
        "question": "What is the capital of US?",
        "A": "Ontario",
        "B": "New York",
        "C": "Tokyo",
        "D": "Washington",
        "answer": "D"
    }
];

let actual_answers = [];
questions.forEach((item) => {
    actual_answers.push(item.answer);
});

let user_response = [];
let correct_response = [];

const questionElement = document.querySelector('.container > h1');
const options = document.querySelectorAll('.option input');  // Query input elements for options
const nextButton = document.getElementById('next-button');
const headerQuestion = document.querySelector('.header > h1');
const timerElement = document.querySelector('.timer');

let currentQuestionIndex = 0;
let timeLeft = 10;
let timerInterval;

function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
}

function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "0";
            nextQuestion();
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

function recordResponse() {
    let selectedOption = null;

    // Check if any radio button is selected
    options.forEach((option) => {
        if (option.checked) {
            selectedOption = option.value; // Capture the selected option's value (A, B, C, D)
        }
    });

    if (selectedOption === null) {
        user_response.push("no answer");  // If no option is selected
    } else {
        user_response.push(selectedOption);  // Store the selected answer
    }
}

function loadQuestion() {
    let question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    headerQuestion.textContent = `Question ${currentQuestionIndex + 1}`;

    // Set the text for each option
    options[0].nextElementSibling.textContent = question.A;
    options[1].nextElementSibling.textContent = question.B;
    options[2].nextElementSibling.textContent = question.C;
    options[3].nextElementSibling.textContent = question.D;

    // Reset radio buttons (deselect any previously selected options)
    options.forEach((option) => {
        option.checked = false;
    });

    startTimer();
}

function nextQuestion() {
    recordResponse(); // Record the user's response before moving to the next question

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        clearInterval(timerInterval);
        
        console.log("User responses:", user_response);
        console.log("Actual answers:", actual_answers);

        alert("You have reached the end of the quiz!");
    }
}

nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(timerInterval);
    nextQuestion();
});

loadQuestion();
