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
    this.numberQuestions = questionNumbers.length;
    this.numberCorrect = 0;
    this.getQuestionTotal = function () {
        return this.numberQuestions;
    };

    this.qa = getQAs(questionNumbers, questionAndAnswers);

    this.getNextQuestion = function () {
        return this.qa.shift();
        this.numberQuestions--;
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
    answer = '<p>' + key + ' ' + answers[key] + '</p>';
    return answer; });
  var qaHTML = '<p>' + qaObject.question + '</p>' + answersProcessed.join("\n");
  $(".question-section").html(qaHTML); // + "\n" + answers.join("\n"));
  //return answersProcessed;
}

function doQuiz() {
    
    var questionCSS = ".question-section";
    var questionNumbers = getQuestionNumbers(5);
    var qAs = getQAs(questionNumbers, questionAndAnswers)
    var myQuiz = new makeQuiz(questionNumbers, qAs);
    
    var currentQA = myQuiz.getNextQuestion();
     //console.log(currentQA.question);
    //console.log(myQuiz.getNextQuestion());   
     $(document).ready(function(){
        $(".question-section > span").html(currentQA.question);
    });
};

doQuiz();