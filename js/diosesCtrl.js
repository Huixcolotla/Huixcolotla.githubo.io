var diosesOlimpicos = angular.module("diosesOlimpicos",[]);
//Controlador
diosesOlimpicos.controller("diosesCtrl",function diosesCtrl($scope, $http){
	$http.get("data.txt").success(function(data){
		$scope.dioses = data;
	});
});

