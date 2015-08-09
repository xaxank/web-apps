/**
 * Created by shashaankkrishnatray on 26-06-2015.
 */
var myApp = angular.module('myApp', ['ngRoute']);

var db;

if(localStorage.getItem('data'))
    db = localStorage.getItem('data');
else
    db = [];

myApp.config(function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'templates/home.html',
            controller: function($scope,$rootScope){
                $scope.stuff = db;
                $scope.Undo = function () {
                   if($rootScope.action == 'add'){
                       db.pop();
                   }
                    else if($rootScope.action == 'del'){
                        db.push($rootScope.tempItem);
                   }
                    localStorage.setItem('data',db);
                    $rootScope.action= "";
                };
                $scope.del = function (item) {

                    $rootScope.tempItem = db.splice(item,1)[0];
                    console.log($rootScope.tempItem);
                    localStorage.setItem('data',db);
                    $rootScope.action = 'del';
                }
            }
        }).
        when('/requestForm', {
            templateUrl: 'templates/requestForm.html',
            controller: function($scope,$rootScope,$location){
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.vehicleReg = "";
                $scope.mobNumber = "";
                $scope.address = "";
                $scope.pickUpDate = "";
                $scope.returnDate = "";
                $scope.save = function () {

                    var newItem = {
                        'firstname': this.firstName,
                        'lastname': this.lastName,
                        'vehiclereg': this.vehicleReg,
                        'mobnumber': this.mobNumber,
                        'address': this.address,
                        'pickupdate': this.pickUpDate,
                        'returndate' : this.returnDate
                    };

                    db.push(newItem);
                    $rootScope.action = 'add';
                    $location.path('/home');
                    localStorage.setItem('data',db);
                };
            }
        }).
        when('/requestView/:id', {
            templateUrl: 'templates/requestView.html',
            controller: function($scope, $routeParams){
                $scope.searchNum = $routeParams.id;
                $scope.vehicles = db;
            }
        }).
        otherwise({
            redirectTo: '/home'
        });
});
