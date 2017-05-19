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
    this.currentQuestion = {};

    this.setCurrentQA = function () {
        this.currentQuestion = this.qa.shift();
        //this.setAnswered();
    };
    
    this.addScore = function () {
        this.correct++;
    };
};

function writeQandA(quiz) {
  quiz.setCurrentQA();  
  var question = quiz.currentQuestion["question"];  
  var answers = quiz.currentQuestion["answers"];
  var answersProcessed = Object.keys(answers).map(function(key){
    answer = '<p>' + key + ') ' + answers[key] + '</p>';
    return answer; });
  var qaHTML = '<p>' + question + '</p>' + answersProcessed.join("\n");
  $(".question-section").html(qaHTML); 
  $("#answer-form").find(':input:disabled').prop('disabled',false);

}

/*function handleAnswer(qaObj) {
  var answerKey = qaObj['answerKey'];

}*/

function handleAnswer(quiz) {

      $("#answer-form").on("submit", function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        if ($("input:radio", this).is(':checked')) {
           } else {
           alert("Please select something!");
           return false;}
         var buttonID = $('input[name="aButton"]:checked').attr("id");

         if (buttonID === quiz.currentQuestion["answerKey"]) {
          $('input[name="aButton"]:checked').closest("div").addClass("choiceRight");
        }
         else {
          $('input[name="aButton"]:checked').closest("div").addClass("choiceWrong");
         }
         $("#answer-form").find(':input:not(:disabled)').prop('disabled',true);
    }); 
};

function handleQuestion(quiz) {
    
    $("div.control-button").on("click", "button.next-button", function() {
        event.stopPropagation();
        event.preventDefault();
        quiz.setAnswered();  

        if (quiz.answered <= quiz.questionsTotal) {
        writeQandA(quiz);
        console.log("answered: " + quiz.answered); 
        }

        else {
        alert("No more questions. You can go now.");
        };

    }); };
   


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
//var qaObj = quiz.getQuestionAnswer();

/*$(document).ready( function(){

    writeQandA(qaObj);
});

 $("#answer-form").find(':input:not(:disabled)').prop('disabled',true)//disable forum until next question
 $("#answer-form").find(':input:disabled').prop('disabled',false)//disable forum until next question


$("#answer-form").on("submit", function(event) {
    event.stopPropagation();
    event.preventDefault();
    if ($("input:radio", this).is(':checked')) {
         //console.log("selected"); 
        } else {
        alert("Please select something!");
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

//console.log(quiz.getQuestionsAnswered());
//console.log(quiz.getQuestionTotal());
handleGetNextQuestionAndAnswers(quiz);


};

doQuiz();
