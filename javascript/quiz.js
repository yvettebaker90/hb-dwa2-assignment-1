// Först hämtar jag alla quizfrågor från API:et
fetch('https://artificial-guru.github.io/quiz.json')
  .then(response => response.json()) // Sedan ändrar jag om svaret från API:et till JSON-format
  .then(quizData => {
    // Efter det hämtar jag quiz-elementet från DOM
    const quizElement = document.getElementById("quiz");

    // Fortsätter med att loopa igenom varje fråga i quizData
    quizData.forEach((questionData, index) => {
      // Sedan skapar jag en div för varje enskild fråga
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      // Här lägger jag till frågetexten
      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${questionData.question}`;
      questionDiv.appendChild(questionText);

      // Och här lägger jag till svarsalternativen som radioknappar
      questionData.incorrect_answers.forEach(incorrectAnswer => {
        const answerInput = document.createElement("input");
        answerInput.type = "radio";
        answerInput.name = `question-${index}`; // Använder frågeindex för att skapa unika namn för varje fråga
        answerInput.value = incorrectAnswer;
        questionDiv.appendChild(answerInput); // Lägger till radioknappen för felaktigt svar

        // Dags att skapa och lägga till en etikett för det felaktiga svaret
        const answerLabel = document.createElement("label");
        answerLabel.textContent = incorrectAnswer;
        answerLabel.appendChild(document.createElement("br")); // Lägger till en radbrytning för att skilja på alternativen
        questionDiv.appendChild(answerLabel); // Lägger till textetiketten för det felaktiga svaret
      });

      // Skapaar och lägger till radioknappen för det korrekta svaret
      const correctAnswerInput = document.createElement("input");
      correctAnswerInput.type = "radio";
      correctAnswerInput.name = `question-${index}`;
      correctAnswerInput.value = questionData.correct_answer;
      questionDiv.appendChild(correctAnswerInput);

      // Sedam skapar jag och lägger till etikett för det korrekta svaret
      const correctAnswerLabel = document.createElement("label");
      correctAnswerLabel.textContent = questionData.correct_answer;
      correctAnswerLabel.appendChild(document.createElement("br")); // Lägger till en radbrytning för att skilja på alternativen
      questionDiv.appendChild(correctAnswerLabel); // Lägger till textetiketten för det korrekta svaret

      // Tillslut lägger jag till frågan i quiz-elementet i DOM
      quizElement.appendChild(questionDiv);
    });
  });
