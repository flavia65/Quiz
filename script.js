const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },

    {
        question: "What planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false},
            { text: "Jupiter", correct: false},
            { text: "Mars", correct: true},
            { text: "Venus", correct: false},
        ]
    },
    
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Heart", correct: false},
            { text: "Brain", correct: false},
            { text: "Skin", correct: true},
            { text: "Liver", correct: false},
        ]
    },
    
    {
        question: "What is the main gas found in the Earth's atmosphere?",
        answers: [
            { text: "Nitrogen", correct: true},
            { text: "Oxygen", correct: false},
            { text: "Carbon dioxide", correct: false},
            { text: "Helium", correct: false},
        ]
    },
    
    {
        question: "How many bones does an adult human body have?",
        answers: [
            { text: "190", correct: false},
            { text: "206", correct: true},
            { text: "210", correct: false},
            { text: "250", correct: false},
        ]
    },

    {
        question: "What is the smallest planet in the solar system?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: false},
            { text: "Pluto", correct: false},
            { text: "Mercury", correct: true},
        ]
    }
];

const questionElements = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElements.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none"
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
    
        button.disabled = true
    })

    nextButton.style.display = "block"
}

function showScore() {
    resetState()
    questionElements.innerHTML = `You score ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()
showQuestion()