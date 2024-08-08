// Load questions from questions.js
const quizContainer = document.getElementById('quiz-container');

questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    let inputField = '';

    if (question.type === 'multiple-choice') {
        inputField = `
            <ul class="options">
                ${question.options.map((option, i) => `
                    <li>
                        <label>
                            <input type="radio" name="question${index}" value="${option}"> ${option}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;
    } else if (question.type === 'short-answer') {
        inputField = `
            <input type="text" name="question${index}" class="short-answer">
        `;
    } else if (question.type === 'paragraph') {
        inputField = `
            <textarea name="question${index}" class="paragraph-answer"></textarea>
        `;
    }

    questionElement.innerHTML = `
        <h3>${index + 1}. ${question.question}</h3>
        ${inputField}
    `;
    quizContainer.appendChild(questionElement);
});

function submitQuiz() {
    let score = 0;
    questions.forEach((question, index) => {
        if (question.type === 'multiple-choice') {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === question.answer) {
                score++;
            }
        } else if (question.type === 'short-answer' || question.type === 'paragraph') {
            const answer = document.querySelector(`[name="question${index}"]`).value.trim();
            if (answer.toLowerCase() === question.answer.toLowerCase()) {
                score++;
            }
        }
    });
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `You scored ${score} out of ${questions.length}`;
}
