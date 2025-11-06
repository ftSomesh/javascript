let questions = [
    {
        "question": "Which is largest animal in the world?",
        "answers": [
            {
                "text": "Shark",
                "correct": false
            },
            {
                "text": "Blue Whale",
                "correct": true
            },
            {
                "text": "Elephant",
                "correct": false
            },
            {
                "text": "Giraffe",
                "correct": false
            }
        ]
    },
    {
        "question": "What is the name of the daughter of pratap?",
        "answers": [
            {
                "text": "sijal",
                "correct": false
            },
            {
                "text": "kajal",
                "correct": true
            },
            {
                "text": "tuin",
                "correct": false
            },
            {
                "text": "titli",
                "correct": false
            }
        ]
    },
    {
        "question": "What is the name of the daughter of kathi?",
        "answers": [
            {
                "text": "tuin",
                "correct": true
            },
            {
                "text": "kajal",
                "correct": false
            },
            {
                "text": "titli",
                "correct": false
            },
            {
                "text": "jali",
                "correct": false
            }
        ]
    },
    {
        "question": "Where is maa basundhari temple located?",
        "answers": [
            {
                "text": "sankhapur",
                "correct": true
            },
            {
                "text": "khalagaon",
                "correct": false
            },
            {
                "text": "baragounia",
                "correct": false
            },
            {
                "text": "khalagaon",
                "correct": false
            }
        ]
    },
    {
        "question": "Which is largest animal in the world?",
        "answers": [
            {
                "text": "Shark",
                "correct": false
            },
            {
                "text": "Blue Whale",
                "correct": true
            },
            {
                "text": "Elephant",
                "correct": false
            },
            {
                "text": "Giraffe",
                "correct": false
            }
        ]
    },
    {
        "question": "Who is my bestfriend?",
        "answers": [
            {
                "text": "samir",
                "correct": true
            },
            {
                "text": "siba",
                "correct": false
            },
            {
                "text": "kajal",
                "correct": false
            },
            {
                "text": "raja",
                "correct": false
            }
        ]
    }
]

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