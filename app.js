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
    this.numberCorrect = 0;
    this.questionsAnswered = 0;
    
    this.setQuestionsAnswered = function () {
        this.questionsAnswered++;
    };
    this.getQuestionsAnswered = function () {
        return this.questionsAnswered;
    };
    this.getQuestionTotal = function () {
        return this.questionsTotal;
    };

    this.qa = getQAs(questionNumbers, questionAndAnswers);

    this.getNextQuestion = function () {
        return this.qa.shift();
        this.setQuestionsAnswered();
    };

    this.addScore = function () {
        this.numberCorrect++;
    };

    this.getScore = function () {
        return this.numberCorrect;
    };
}

function writeQandA(qaObject) {
  var answers = qaObject.answers;
  var answersProcessed = Object.keys(answers).map(function(key){
    answer = '<p>' + key + ') ' + answers[key] + '</p>';
    return answer; });
  var qaHTML = '<p>' + qaObject.question + '</p>' + answersProcessed.join("\n");
  $(".question-section").html(qaHTML); // + "\n" + answers.join("\n"));
  //return answersProcessed;
}

function init() {
    
    var questionNumbers = getQuestionNumbers(5);
    var qAs = getQAs(questionNumbers, questionAndAnswers)
    var myQuiz = new makeQuiz(questionNumbers, qAs);
    return myQuiz;
    //var currentQA = myQuiz.getNextQuestion();
     //console.log(currentQA.question);
    //console.log(myQuiz.getNextQuestion());   
    // $(document).ready(function(){
        $(".question-section > span").html(currentQA.question);
    //});
};

function doQuiz() {

var quiz = init();


   $('button.start-button').one('click', function(event) {
    event.preventDefault();
    var qaObj = quiz.getNextQuestion();
    //addItem(state, $(event.currentTarget).find('input[name="shopping-list-entry"]').val());
    //renderList(state, $('ul.shopping-list'));
   writeQandA(qaObj);
   //console.log(quiz.answers)
  });


}


doQuiz();