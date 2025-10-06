document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain",
            ],
            answer: "William Shakespeare",
        },
    ];

    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const nextBtn = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const score = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-btn');

    const totScore = questions.length;
    let gotScore = 0;
    let ind = 0;
    let isTrue;
    startBtn.addEventListener('click', () => {
        ind = 0;
        nextQuestion();
    })


    nextBtn.addEventListener('click', () => {
        if (isTrue) {
            gotScore += 1;
        }
        ind++;
        nextQuestion();
    })
    function nextQuestion() {
        startBtn.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        if (ind < questions.length) {
            questionText.innerHTML = '';
            choicesList.innerHTML = '';
            if (questions.length) {
                questionText.innerHTML = questions[ind].question;
                questions[ind].choices.forEach(choice => {
                    const li = document.createElement('li');
                    li.innerHTML = choice;
                    li.addEventListener('click', () => selectAnswer(li, choice));
                    choicesList.appendChild(li);
                });
            }
        }
        else {
            showResult();
        }

    }
    function renderList() {
        const listItem = document.getElementById('choices-list').childNodes;
        listItem.forEach((item) => {
            item.classList.remove('answered');
        })

    }
    function selectAnswer(li, choice) {
        const correctAnswer = questions[ind].answer;
        if (correctAnswer === choice) {
            isTrue = true;
        }
        else {
            isTrue = false;
        }
        renderList();
        li.classList.add('answered');
        nextBtn.classList.remove('hidden');
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        nextBtn.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        score.innerHTML = `${gotScore}/${totScore}`;
    }
    restartBtn.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        gotScore = 0;
        ind = 0;
        nextQuestion();
    })
})