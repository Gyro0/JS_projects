document.addEventListener("DOMContentLoaded", () => {

    // Quiz configuration container
    const configForm = document.getElementById('configForm');
    const configContainer = document.getElementById('configContainer');
  
    // score and qcm container
    const scoreContainerEl = document.querySelector('.score_Container');
    const scoreSpan = document.getElementById('score');
    const qcmContainer = document.getElementById('qcmContainer');
  
    //variables that we ned 
    let questionIndex = 0;
    let score = 0;
    let countdown;
    let questions = [];
  
    // --------------------------------------------------
    // Quand on valide le formulaire -> on recupere l'API
    // --------------------------------------------------
    configForm.addEventListener('submit', async (event) => {
      event.preventDefault();
        //recuperer les details de la configuration
      const amount = document.getElementById('amount').value;
      const category = document.getElementById('category').value;
      const difficulty = document.getElementById('difficulty').value;
      const type = document.getElementById('type').value;
  
      // Construire l'URL
      let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
      if (category) apiUrl += `&category=${category}`;
      if (difficulty) apiUrl += `&difficulty=${difficulty}`;
      if (type) apiUrl += `&type=${type}`;
        
      //recuperation des informations
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.response_code === 0) {
          // on masque le conteneur du formulaire, on affiche score + quiz
          configContainer.style.display = 'none';
          scoreContainerEl.style.display = 'flex';
          qcmContainer.style.display = 'flex';

          //on initialize les variables
          questions = data.results;
          questionIndex = 0;
          score = 0;
          scoreSpan.textContent = score;
          qcmContainer.innerHTML = '';
            //afficher les question si on l'a recupere
          showQuestion();
        } else {
          alert('No questions found for these settings.');
        }
        //si 
      } catch (err) {
        console.error('API Error:', err);
        alert('An error occurred while fetching questions.');
      }
    });
  
    // --------------------------------------------------
    // Afficher la question courante
    // --------------------------------------------------
    function showQuestion() {
        //si l'index de la question est superieur au nombre des question on affiche le score
      if (questionIndex >= questions.length) {
        showScore();
        return;
      }
      
      const currentQuestion = questions[questionIndex];
  
      // on cree le bloc de question
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question-block');
  
      // titre de la question
      const questionText = document.createElement('p');
      questionText.textContent = decodeHTML(currentQuestion.question);
      questionDiv.appendChild(questionText);
  
      // Rassembler toutes les réponses (correct + incorrect)
      // et on les mélange
      const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      shuffleArray(allAnswers);
  
      // on cree un conteneur pour les choix
      const choicesDiv = document.createElement('div');
      choicesDiv.classList.add('choices');

      //on itere sur chaqu'un des choix et l'ajoute dans le div des Choix

      allAnswers.forEach(choice => {
        const decodedChoice = decodeHTML(choice);
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="radio" name="answer${questionIndex}" value="${decodedChoice}"> 
          ${decodedChoice}
        `;
        choicesDiv.appendChild(label);
        choicesDiv.appendChild(document.createElement('br'));
      });
      //on ajout les choix des question dans le div de la question 
      questionDiv.appendChild(choicesDiv);
  
      // tiemr 
      const timerElement = document.createElement('p');
      timerElement.classList.add('timer');
      questionDiv.appendChild(timerElement);
      startTimer(timerElement);
  
      // bouton Next
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.classList.add('next-button');
      nextBtn.addEventListener('click', nextQuestion);
      questionDiv.appendChild(nextBtn);
  
      // On ajoute ce bloc question dans le container
      qcmContainer.appendChild(questionDiv);
  
      // on scroll vers le bas pour afficher la question du qcm
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
  
      // blurrer la question précédente (si > 0)
      if (questionIndex > 0) {
        let previousQuestion = document.querySelectorAll('.question-block')[questionIndex - 1];
        previousQuestion.classList.add('blurred');
      }
    }
  
    // --------------------------------------------------
    //  function de timer
    // --------------------------------------------------
    function startTimer(timerElement) {
      let timeLeft = 10; //compteur de 10 seconds
      timerElement.textContent = `Time left: ${timeLeft}s`; //affichage du compteur
      clearInterval(countdown); //reset l interval 
  
      countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(countdown);
          nextQuestion(); // Passe à la question suivante
        }
      }, 1000); //chaque 1000ms le compteur se reduit -1 jusque atteind 0 et on affiche la question suivante
    }
  
    // --------------------------------------------------
    // Gérer le Next
    // --------------------------------------------------
    // tableau global pour stocker les réponses de l’utilisateur
    let userAnswers = [];

    function nextQuestion() {
    const currentQuestion = questions[questionIndex];
    const correctAnswer = decodeHTML(currentQuestion.correct_answer);

    // récupérer l'input sélectionné
    let selectedAnswer = document.querySelector(`input[name="answer${questionIndex}"]:checked`);

    // si l'utilisateur a coché quelque chose, on enregistre sa réponse, sinon ''
    userAnswers[questionIndex] = selectedAnswer ? selectedAnswer.value : '';

    // vérifier si c’est correct pour le score
    if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        score++;
        scoreSpan.textContent = score;
    }

    let currentQuestionBlock = document.querySelectorAll(".question-block")[questionIndex];
    let nextButton = currentQuestionBlock.querySelector(".next-button");
    if (nextButton) {
        nextButton.remove();
    };
    questionIndex++;
    clearInterval(countdown); //reset le timer 

    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
    }

  
    // --------------------------------------------------
    // affichate du score final
    // --------------------------------------------------
    function showScore() {
        clearInterval(countdown);
      
        // Retirer le flou des questions
        const questionBlocks = document.querySelectorAll('.question-block');
        questionBlocks.forEach((block, i) => {
          block.classList.remove('blurred');
      
          const currentQuestion = questions[i];
          const correctAnswer = decodeHTML(currentQuestion.correct_answer);
          const userAnswer = userAnswers[i];
      
          // pour chaque choix du block
          const labels = block.querySelectorAll('label');
          labels.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            if (!input) return;
      
            // si c’est la bonne réponse => vert
            if (input.value === correctAnswer) {
              label.style.backgroundColor = 'green';
              label.style.color = 'white';   // pour la lisibilité
            }
      
            // si l’utilisateur l’a sélectionnée mais que c’est faux => rouge
            if (input.value === userAnswer && userAnswer !== correctAnswer) {
              label.style.backgroundColor = 'red';
              label.style.color = 'white';
            }
          });
        });
        scoreSpan.textContent=`${score}/${questions.length}`; //affichage du score en haut de la page

        // Afficher un message final
        const scoreText = document.createElement('p');
        scoreText.textContent = `Your final score is: ${score}/${questions.length}`;
        scoreText.classList.add('final-score');
        qcmContainer.appendChild(scoreText);
      
        // Remonter la page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
  
    // --------------------------------------------------
    // helper functions 
    // --------------------------------------------------
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    function decodeHTML(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
  });
  