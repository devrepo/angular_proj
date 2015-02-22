angular.module("QuizDataService", ['ngCookies']).
    factory("quizData", ['$q','$http', function($q, $http){

        var _data = [],
            _quizData = {},
            _score = [],
            _getData = function(){
                var defer = $q.defer();
                $http.get("data/quiz.json").success(function(response){
                    _quizData = response.questions;
                    defer.resolve(response);
                })
                return defer.promise;
            },
            _setUserAnswer=function(index, value){
                _data[index] = value;
                console.log("UserAnswer", value);
            },
            _getUserAnswer = function(index){
                return _data[index];
            },
            _getAllUserAnswers = function(){
                return _data;
            },
            _setScore = function(index, score){
                _score.push(score);
                console.log("score", score);
            },
            _getScore = function(index){
                return _score[index];
            },
            _getAllScores = function(){
                return _score;
            },
            _getTotalScore = function(){
                var _totalScore = 0;
                angular.forEach(_score, function(item){
                    _totalScore += item;
                })
                var percent = _totalScore / _score.length * 100;
                return percent;
            },
            _deleteAllAnswers = function(){
                _data = [];
                _score = [];
            };

        return{
            getData : _getData,
            setUserAnswer: _setUserAnswer,
            getUserAnswer: _getUserAnswer,
            getAllUserAnswers : _getAllUserAnswers,
            getScore : _getScore,
            setScore : _setScore,
            getAllScores: _getAllScores,
            getTotalScore : _getTotalScore,
            deleteAllAnswers:_deleteAllAnswers
        }
    }]);