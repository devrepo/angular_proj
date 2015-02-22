angular.module('QuizController', ['ngSanitize']).
    controller('QuizCtrl', ['$scope', 'auth', '$location', 'quizData', '$routeParams', function($scope, auth, $location, quizData, $routeParams){

        $scope.currentIndex = parseInt($routeParams.qno) || 1;
        $scope.currentQuestion = {};
        var data = [];
        $scope.options = [];
        $scope.type = "";
        $scope.htmlStem = false;
        var userAnswer = 0;

        if(auth.getUserName().length){
            $scope.userName = auth.getUserName();
        }else{
            $location.url('/login');
        };

        $scope.$on('$viewContentLoaded', function() {
            quizData.getData().then(function(response){
                if (response && response.questions.length) {
                    data = response.questions;
                    $scope.currentQuestion = data[ $scope.currentIndex - 1 ];
                    $scope.options = $scope.currentQuestion.options;
                    $scope.htmlStem = $scope.currentQuestion.htmlStem;
                    $scope.type = $scope.currentQuestion.type;
                    console.log("options", $scope.options);
                    userAnswer = quizData.getUserAnswer($scope.currentIndex - 1);
                }
            });
        });

        //To set saved answers
        $scope.setChecked = function(option){
            if (userAnswer === option){
                return true;
            }
            return false;
        };

        //To set saved answers
        $scope.setAnswer = function(index){
            if (!userAnswer) userAnswer = [];
            return userAnswer[index];
        }

        //To get the option
        function getOptionIndex(option){
            var $index = 0;
            angular.forEach($scope.options, function(item, index){
                if (item === option){
                    $index = index;
                }
            });
            return $index;
        };

        //Send the user answer
        $scope.setUserAnswer = function(){
            var score = 0;
            if ($scope.currentQuestion.type == "mcq"){
                var option = getOptionIndex(userAnswer);
                if (parseInt($scope.currentQuestion.correctAnswer) === (option+1)){
                    score++;
                }
            }else{
                var len = userAnswer.length,
                    correctAnswers = $scope.currentQuestion.correctAnswer;
                var answersMatched = 0;
                for (var i= 0; i<len; i++){
                    var resultMatched = false;
                    var answer = correctAnswers[i];
                    for (var j= 0; j<answer.length; j++){
                        var correctAnswer = answer[j];
                        if (userAnswer[i].toLowerCase() === correctAnswer.toLowerCase()){
                            resultMatched = true;
                            break;
                        }
                    }
                    if (resultMatched) answersMatched++;
                }
                if (answersMatched == len){
                    score++;
                }
            }
            console.log("correctAnswer", $scope.currentQuestion.correctAnswer);
            quizData.setUserAnswer($scope.currentIndex - 1, userAnswer);
            quizData.setScore($scope.currentIndex - 1, score);
        }

        //Save the user Answer
        $scope.setUserAnswerMcq = function(option){
            userAnswer = option; //getOptionIndex(option);
        };

        //Save the user Answer
        $scope.setUserAnswerFib = function(index){
            var value = $("input")[index].value;
            console.log("value", value);
            if(!angular.isArray(userAnswer)){
                userAnswer = [];
            }
            userAnswer[index] = value;
        };


        $scope.nextQuestion = function(){
            $scope.setUserAnswer();
            if (data.length > $scope.currentIndex) {
                $location.url('/takequiz/' + ($scope.currentIndex + 1));
            }else{
                $location.url('/results');
            }
        };

    }]);
