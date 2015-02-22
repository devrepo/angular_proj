angular.module("ResultController",['ngSanitize']).
    controller("ResultCtrl", ['$scope', 'auth', 'quizData', '$location', function($scope, auth, quizData, $location){
        if(auth.getUserName().length){
            $scope.userName = auth.getUserName();
        }else{
            $location.url('/login');
        };
        $scope.totalScore = quizData.getTotalScore();
        $scope.questions = [];
        $scope.userAnswers = quizData.getAllUserAnswers();
        $scope.type = quizData.getAllScores();

        console.log("$scope.userAnswers.length", $scope.userAnswers.length);
        if ($scope.userAnswers.length == 0){
             $location.url('/takequiz/1');
        }

        $scope.$on('$viewContentLoaded', function() {
            quizData.getData().then(function(response) {
                if (response && response.questions.length) {
                    $scope.questions = response.questions;
                    console.log("scores", $scope.type);
                }
            });
        });

        $scope.getCorrectFibAnswer = function(index){
            var question = $scope.questions[index];
            var correctAnswer = [];
            angular.forEach(question.correctAnswer, function(item, index){
                correctAnswer.push(item[0]);
            });
            return correctAnswer.join(", ");
        };
    }])