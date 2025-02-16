document.addEventListener("DOMContentLoaded", function () {

    // Tableau contenant les questions, les choix de réponses et la bonne réponse
    const questions = [
        {
            question: "What is the official language of Morocco?",
            choices: ["Arabic", "French", "Spanish", "Tamazight"],
            correct: "Arabic"
        },
        {
            question: "What is the name of the Moroccan dish made with slow-cooked meat, vegetables, and dried fruits, often served in a clay pot?",
            choices: ["Harira", "Tagine", "Couscous", "Rfissa"],
            correct: "Tagine"
        },
        {
            question: "Which city is known as the 'Red City' due to its red sandstone buildings?",
            choices: ["Casablanca", "Fez", "Marrakech", "Rabat"],
            correct: "Marrakech"
        }
    ];

    // Sélection des conteneurs HTML
    const qcmContainer = document.getElementById("qcmContainer");
    const scoreContainer = document.getElementById("score");

    // Variables pour la gestion des questions et du score
    let questionIndex = 0;
    let score = 0;
    let countdown;

    // --------------------------------------------------
    // Fonction pour démarrer un timer de 10 secondes par question
    // --------------------------------------------------
    function startTimer(timerElement) {
        let timeLeft = 10;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        clearInterval(countdown); // Réinitialiser le timer s'il y en avait un
        
        countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                nextQuestion(); // Passe automatiquement à la question suivante quand le temps est écoulé
            }
        }, 1000);
    }

    // --------------------------------------------------
    // Fonction pour afficher une nouvelle question
    // --------------------------------------------------
    function showQuestion() {
        // Vérifier si toutes les questions ont été posées
        if (questionIndex >= questions.length) {
            showScore();
            return;
        }

        let currentQuestion = questions[questionIndex];

        // Création du bloc contenant la question
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question-block");

        // Ajout du texte de la question
        let questionText = document.createElement("p");
        questionText.textContent = currentQuestion.question;
        questionDiv.appendChild(questionText);

        // Création du conteneur pour les choix de réponse
        let choicesDiv = document.createElement("div");
        choicesDiv.classList.add("choices");

        // Ajout des options de réponse
        currentQuestion.choices.forEach(choice => {
            let label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="answer${questionIndex}" value="${choice}"> ${choice}`;
            choicesDiv.appendChild(label);
            choicesDiv.appendChild(document.createElement("br"));
        });
        questionDiv.appendChild(choicesDiv);

        // Ajout du timer
        let timerElement = document.createElement("p");
        timerElement.classList.add("timer");
        questionDiv.appendChild(timerElement);
        startTimer(timerElement); // Démarrer le timer pour la question courante

        // Ajout du bouton "Next"
        let nextBtn = document.createElement("button");
        nextBtn.textContent = "Next";
        nextBtn.classList.add("next-button");
        nextBtn.addEventListener("click", nextQuestion);
        questionDiv.appendChild(nextBtn);

        // Ajout du bloc question au conteneur principal
        qcmContainer.appendChild(questionDiv);

        // Faire défiler la page vers le bas pour afficher la nouvelle question
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

        // Appliquer un effet de flou sur la question précédente (si ce n'est pas la première question)
        if (questionIndex > 0) {
            let previousQuestion = document.querySelectorAll(".question-block")[questionIndex - 1];
            previousQuestion.classList.add("blurred");
        }
    }

    // --------------------------------------------------
    // Fonction pour passer à la question suivante
    // --------------------------------------------------
    function nextQuestion() {
        // Vérifier la réponse de l'utilisateur
        let selectedAnswer = document.querySelector(`input[name="answer${questionIndex}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === questions[questionIndex].correct) {
            score++; // Incrémenter le score si la réponse est correcte
        }

        // Supprimer le bouton "Next" après avoir répondu
        let currentQuestionBlock = document.querySelectorAll(".question-block")[questionIndex];
        let nextButton = currentQuestionBlock.querySelector(".next-button");
        if (nextButton) {
            nextButton.remove();
        }

        questionIndex++; // Passer à la question suivante
        clearInterval(countdown); // Réinitialiser le timer

        // Vérifier s'il reste des questions ou afficher le score final
        if (questionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    // --------------------------------------------------
    // Fonction pour afficher le score final
    // --------------------------------------------------
    function showScore() {
        clearInterval(countdown); // Arrêter tout timer en cours

        // Retirer le flou des questions pour mieux afficher les corrections
        let questionBlocks = document.querySelectorAll(".question-block");
        questionBlocks.forEach((block, index) => {
            block.classList.remove("blurred");

            let selectedAnswer = block.querySelector(`input[name="answer${index}"]:checked`);
            let correctAnswer = questions[index].correct;

            // Coloration des bonnes et mauvaises réponses
            block.querySelectorAll('input[type="radio"]').forEach(input => {
                let label = input.parentElement;
                if (input.value === correctAnswer) {
                    label.style.backgroundColor = "green";
                    label.style.color = "white";
                } else if (selectedAnswer && input.value === selectedAnswer.value) {
                    label.style.backgroundColor = "red";
                    label.style.color = "white";
                }
            });
        });

        // Affichage du score final
        scoreContainer.textContent = `${score}/${questions.length}`;
        let scoreText = document.createElement("p");
        scoreText.textContent = `Your final score is: ${score}/${questions.length}`;
        qcmContainer.appendChild(scoreText);

        // Revenir en haut de la page pour voir le score
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Lancement de la première question
    showQuestion();
});
