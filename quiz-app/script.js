let questions = [
    {
        "question": "Which planet is known as the Red Planet?",
        "answers": [
            { "text": "Venus", "correct": false },
            { "text": "Mars", "correct": true },
            { "text": "Jupiter", "correct": false },
            { "text": "Mercury", "correct": false }
        ]
    },
    {
        "question": "What is the capital city of Japan?",
        "answers": [
            { "text": "Seoul", "correct": false },
            { "text": "Beijing", "correct": false },
            { "text": "Tokyo", "correct": true },
            { "text": "Bangkok", "correct": false }
        ]
    },
    {
        "question": "Which gas do plants absorb during photosynthesis?",
        "answers": [
            { "text": "Oxygen", "correct": false },
            { "text": "Nitrogen", "correct": false },
            { "text": "Carbon Dioxide", "correct": true },
            { "text": "Hydrogen", "correct": false }
        ]
    },
    {
        "question": "Who wrote the famous play 'Romeo and Juliet'?",
        "answers": [
            { "text": "William Shakespeare", "correct": true },
            { "text": "Charles Dickens", "correct": false },
            { "text": "Mark Twain", "correct": false },
            { "text": "Jane Austen", "correct": false }
        ]
    },
    {
        "question": "Which is the smallest continent in the world?",
        "answers": [
            { "text": "Europe", "correct": false },
            { "text": "Australia", "correct": true },
            { "text": "Antarctica", "correct": false },
            { "text": "South America", "correct": false }
        ]
    },
    {
        "question": "What is the chemical symbol for water?",
        "answers": [
            { "text": "O2", "correct": false },
            { "text": "H2O", "correct": true },
            { "text": "CO2", "correct": false },
            { "text": "NaCl", "correct": false }
        ]
    }
];
const questionEl = document.querySelector(".question")
const answerContainer = document.querySelector("#answer-buttons")
const nextBtn = document.querySelector("#next-btn")
const highScore = document.querySelector(".high-score")
let currentQuestionIndex = 0
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();

}

function showQuestion() {
    resetState();
    if (localStorage.getItem("high-score") !== null) {
        highScore.innerHTML = localStorage.getItem("high-score");
    }
    let currentQuestion = questions[currentQuestionIndex]
    let questionNumber = currentQuestionIndex + 1;
    questionEl.innerHTML = `${questionNumber}. ${currentQuestion.question}`

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn");
        answerContainer.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })

}


function resetState() {
    nextBtn.style.display = "none"
    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild)
    }
}

function selectAnswer(e) {
    let selectedButton = e.target;
    console.log(e.target);
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect")
    }
    Array.from(answerContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = "true";
    })
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    if (localStorage.getItem("high-score") === null) {
        localStorage.setItem("high-score", score);
    } else if (localStorage.getItem("high-score") < score) {
        localStorage.setItem("high-score", score);
    }
    highScore.innerHTML = localStorage.getItem("high-score")
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}`
    nextBtn.style.display = "block"
    nextBtn.innerHTML = `Play Again`
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();