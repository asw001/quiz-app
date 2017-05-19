var getQuestionNumbers = function(questionTotal) {
     var i = 0;
     var numbersSelected = [];

     while (i < questionTotal) {
         var questionNumber = Math.floor((Math.random() * 10) + 0);
         if (!numbersSelected.includes(questionNumber)) {
             numbersSelected.push(questionNumber);
             i++;
         }
     };
     return numbersSelected;
 };

 var getQAs = function(questionNumbers, questionAndAnswers) {
     var questionsAnswers = questionNumbers.map(function(num) {
         var questionAnswer = questionAndAnswers[num];
         questionAnswer["id"] = num;
         return questionAnswer;
     });
     return questionsAnswers;
 };

 function makeQuiz(questionNumbers, qAs) {
     this.questionsTotal = questionNumbers.length;
     this.qa = getQAs(questionNumbers, questionAndAnswers);
     this.correct = 0;
     this.asked = 0;
     this.setAsked = function() {
         this.asked++;
     };
     this.currentQuestion = {};

     this.setCurrentQA = function() {
         this.currentQuestion = this.qa.shift();
     };

     this.addScore = function() {
         this.correct++;
     };
 };

 function writeQandA(quiz) {
     quiz.setCurrentQA();
     var question = quiz.currentQuestion["question"];
     var answers = quiz.currentQuestion["answers"];
     var answersProcessed = Object.keys(answers).map(function(key) {
         answer = '<p>' + key + ') ' + answers[key] + '</p>';
         return answer;
     });
     var qaHTML = '<p>' + question + '</p>' + answersProcessed.join("\n");
     $(".question-section").html(qaHTML);
     $("#answer-form").find(':input:disabled').prop('disabled', false);
 };

 function formSelectAlert() {
     if ($("input:radio", this).is(':checked')) {} else {
         alert("Please select something!");
         return false;
     }
 };

 function resetForm() {
     $("#answer-form > div").attr('class', function(i, c) {
         return c.replace(/choice/g, '');
     });
 };

 function writeScore(quiz) {
     $("span.score").html(quiz.correct + " of " + quiz.questionsTotal + " correct");

 };

 function writeEnd() {
    var endText = "<p>Game Over!</p></p>Thanks for playing</p>";
     $(".question-section").addClass(".game-over");
     $(".question-section").html(endText);
 };

 function writeAnswer(selection, currentAnswer, quiz) {
     if (selection === currentAnswer) {
         $('input[name="aButton"]:checked').closest("div").addClass("choiceRight");
         quiz.addScore();
     } else {
         $('input[name="aButton"]:checked').closest("div").addClass("choiceWrong");
         $('#' + currentAnswer).closest("div").addClass("choiceRight");
     }
     writeScore(quiz);
 };

 function handleAnswer(quiz) {

     $("#answer-form").on("submit", function(event) {
         event.stopPropagation();
         event.preventDefault();

         if ($("input:radio", this).is(':checked')) {} else {
             alert("Please select something!");
             return false;
         }
         var selection = $('input[name="aButton"]:checked').attr("id");
         var currentAnswer = quiz.currentQuestion["answerKey"];
         writeAnswer(selection, currentAnswer, quiz);
         $("#answer-form").find(':input:not(:disabled)').prop('disabled', true);
     });
 };

 function handleQuestion(quiz) {

     $("div.control-button").on("click", "button.next-button", function() {
         event.stopPropagation();
         event.preventDefault();
         quiz.setAsked();

         if (quiz.asked > quiz.questionsTotal) {
             writeEnd();
         } else {
             writeQandA(quiz);
             //alert("No more questions. You can go now.");
         };
         resetForm();
     });
 };

 function init() {
     var questionNumbers = getQuestionNumbers(5);
     var qAs = getQAs(questionNumbers, questionAndAnswers)
     var myQuiz = new makeQuiz(questionNumbers, qAs);
     return myQuiz;
 };

 function handleGetNextQuestionAndAnswers(quiz) {
     handleQuestion(quiz);
     handleAnswer(quiz);
 };

 function doQuiz() {
     var quiz = init();
     handleGetNextQuestionAndAnswers(quiz);
 };

 doQuiz();