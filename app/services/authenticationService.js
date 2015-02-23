angular.module("authenticationService", ['ngCookies']).
    factory("auth", ['$cookies', function($cookies){

        var _userName = "",
            _credentials = [],
            _getCredentials = function(userName, password){
                if (_credentials && _credentials.length == 0){
                    _credentials = angular.fromJson($cookies.quiz_credentials);
                }
                var valid = false;
                for (var index in _credentials){
                    var credential = _credentials[index];
                    if (credential.userName.toLowerCase() === userName && credential.password === password){
                        valid = true;
                        break;
                    }
                }
                return valid;
            },
            _setCredentials = function(userName, password){
                var credential = {userName:userName, password:password};
                if (!_credentials) _credentials = [];
                _credentials.push(credential);
                $cookies.quiz_credentials = angular.toJson(_credentials);
            },
            _getUserName = function(){
                if (!_userName) {
                    _userName = $cookies.quiz_user_name;
                }
                return _userName;
            },
            _setUserName = function(userName){
                _userName = userName;
                $cookies.quiz_user_name = userName;
            };

        return {
            getUserName:_getUserName,
            setUserName:_setUserName,
            getCredentials:_getCredentials,
            setCredentials:_setCredentials
        };
    }])
