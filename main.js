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