'use strict';
angular.module('LoginController', []).
controller('LoginCtrl', ['$scope', 'auth', '$location', '$routeParams', function($scope, auth, $location,$routeParams) {


    if ($location.path() === "/login"){
        auth.setUserName("");
        $scope.submitName = "Login";
    }else{
        $scope.submitName = "Register";
    }


    $scope.submit = function() {
        if ($location.path() === "/login") {
            var username = $("#inputEmail").val();
            var password = $("#inputPassword").val();
            if (auth.getCredentials(username, password)) {
                auth.setUserName(username);
                $location.url("/takequiz/1");
            } else {
                $("div[role='alert']").css('display', 'block');
            }
        }else{
            var username = $("#inputEmail").val();
            var password = $("#inputPassword").val();
            auth.setCredentials(username, password);
            $location.url("/login");
        }
    }

    $scope.changed = function(){
        $("div[role='alert']").css('display', 'none');
    }
}]);