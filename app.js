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

function makeQuiz (questionNumbers, qAs) {
    this.questionsTotal = questionNumbers.length;
    this.qa = getQAs(questionNumbers, questionAndAnswers);

    this.correct = 0;
    this.answered = 0;
    
    this.setAnswered = function () {
        this.answered++;
    };
    this.getQuestionsAnswered = function () {
        return this.answered;
    };
    this.getQuestionTotal = function () {
        return this.questionsTotal;
    };

    this.getQuestionAnswer = function () {
          return this.qa.shift();
          this.setAnswered();
    };
    this.currentQuestion = this.getQuestionAnswer();

    this.addScore = function () {
        this.correct++;
    };

    this.getScore = function () {
        return this.numberCorrect;
    };
}

function writeQandA(qaObj) {
  var question = qaObj["question"];  
  var answers = qaObj["answers"];
  var answersProcessed = Object.keys(answers).map(function(key){
    answer = '<p>' + key + ') ' + answers[key] + '</p>';
    return answer; });
  var qaHTML = '<p>' + question + '</p>' + answersProcessed.join("\n");
  $(".question-section").html(qaHTML); // + "\n" + answers.join("\n"));
  //return answersProcessed;
}

function handleAnswer(qaObj) {
  var answerKey = qaObj['answerKey'];

}

/*function quizHandleQandA(quiz) {
    var qaObj = quiz.getQuestionAnswer();
    writeQandA(qaObj);
    handleAnswer(qaObj);
} */

function init() {
    var questionNumbers = getQuestionNumbers(5);
    var qAs = getQAs(questionNumbers, questionAndAnswers)
    var myQuiz = new makeQuiz(questionNumbers, qAs);
    return myQuiz;
};

function doQuiz() {

var quiz = init();
var qaObj = quiz.getQuestionAnswer();

$(document).ready( function(){

    writeQandA(qaObj);
});

$(".answer-form").on('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();
    if ($('input:radio', this).is(':checked')) {
         //console.log("selected"); 
        } else {
        alert('Please select something!');
        return false;}
    //var buttonName = $(event.currentTarget.closest('li')).attr(itemDataAttr);
    var buttonID = $('input[name="aButton"]:checked').attr("id");
    console.log(buttonID);

    });

  /* $('button.next-button').on('click', function(event) {
    event.preventDefault();
    //addItem(state, $(event.currentTarget).find('input[name="shopping-list-entry"]').val());
    //renderList(state, $('ul.shopping-list'));
   writeQandA(quiz);
   //console.log(quiz.answers)
  });*/
}


doQuiz();