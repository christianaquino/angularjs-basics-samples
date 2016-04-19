var myApp = angular.module('SampleApp', []);

//Controllers
myApp.controller("KnockingController", ["$scope", function($scope) {
    $scope.whoKnocks = "I'm ";

    $scope.paulKnocks = function() {
    	$scope.whoKnocks = "Paul is";
    };

    $scope.johnKnocks = function() {
    	$scope.whoKnocks = "John is";
    };
}]);

//Directives
myApp.directive("myFirstDirective", function() {
	return {
		template: "My first directive!"
	}
});


//Filters
myApp.filter("NumberIsEven", function() {
	return function(number) {
		number = number === "" ? NaN : Number(number);
		var numStatus = null;

		if (isNaN(number)) {
			numStatus = "Not a Number";
		} else if (number % 2 === 0) {
			numStatus = "Even";
		} else {
			numStatus = "Odd";
		}

		return numStatus;
	}
});

//Services
myApp.factory('testFactory', function(){
    return {
        sayHello: function(text){
            return "Factory says \"Hello " + text + "\"";
        }
    }
});

myApp.service('testService', function(){
        this.sayHello = function(text){
        return "Service says \"Hello " + text + "\"";
    };
});

myApp.controller("HelloController", ["$scope", "testService", "testFactory", function HelloController($scope, testService, testFactory) {
		$scope.fromService = testService.sayHello("World");
		$scope.fromFactory = testFactory.sayHello("World");
}]);

//Promises
myApp.controller("PromisesController", ["$scope", "$q", "$timeout", function($scope, $q, $timeout) {
	var validateName = function validateName(name) {
			var promise = $q(function(resolve, reject) {
				$timeout(function() {
		        	if (name === "John") {
		        		resolve("I know him");
		      		} else {
		        		reject("I dont know him");
		      		}
				}, 1000);
		      });

			return promise;
		};

	validateName("Karen").then(function(successMessage) {
		$scope.promiseKaren = successMessage;
	}, function(reason) {
		$scope.promiseKaren = reason;
	});

	validateName("John").then(function(successMessage) {
		$scope.promiseJohn = successMessage;
	}, function(reason) {
		$scope.promiseJohn = reason;
	});

}]);

myApp.controller("HttpServiceController", ["$scope", "$http", function($scope, $http) {
	$scope.serviceResponse = null;

	$http({
	  method: 'GET',
	  url: 'http://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&page=1&api_key=579989834308dc1b0309510990ad9246'
	}).then(function successCallback(response) {
		$scope.serviceResponse = "Service response OK! There are " + response.data.results.length + " results";

	}, function errorCallback(response) {
		$scope.serviceResponse = "Service error! Status code " + response.status;
	});
}]);
