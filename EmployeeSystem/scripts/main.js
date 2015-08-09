/**
 * Created by shashaankkrishnatray on 26-06-2015.
 */

var empType = ['manager','developer'];
var employees = [
    {'name':'Manager#1','type':'manager'},
    {'name':'Developer#1','type':'developer'},
    {'name':'Developer#2','type':'developer'},
    {'name':'Manager#1','type':'manager'}
];

var app;

app = angular.module('myApp', []).
    controller('employeeTypeHandler', function ($scope) {
        $scope.url = "views/handler.html";
        $scope.curl = "";
        $scope.add = function () {
            $scope.curl = "add";
        };
        $scope.del = function () {
            $scope.curl = "del";
        };
    }).
    controller('addEmployeeType', function ($rootScope, $scope) {
        $scope.url = "views/addEmployeeType.html";
        $scope.employeeType = "";
        $scope.submit = function () {
            if (this.employeeType != "") {
                empType.push(this.employeeType);
            }
            this.employeeType = "";
        }
    }).
    controller('deleteEmployeeType', function ($rootScope, $scope) {
        $scope.url = "views/deleteEmployeeType.html";
        $scope.emps = empType;
        $scope.delEmp = "";
        $scope.submit = function () {
            for (var i = 0; i < empType.length; ++i) {
                if (empType[i] == this.delEmp) {
                    empType.splice(i, 1);
                    break;
                }
            }
        }
    }).

    controller('employeeListHandler', function ($rootScope, $scope) {
        $scope.url = "views/employeeList.html";
        $scope.emps = empType;
        $scope.empls = employees;
        $scope.counter = 3;
        $scope.name="";
        $scope.desg="";
        $scope.employeeType = "";
        $scope.focusEmp = "manager";
        $scope.getEmp = function (empType) {
            $scope.focusEmp = empType;
        };
        $scope.popEmp = function () {
            if($scope.counter>0){
                $scope.empls.pop();
                $scope.counter--;
            }
        };
        $scope.submit = function () {
                var temp = {
                    'name':this.name,
                    'designation':this.desg,
                    'type':this.employeeType
                };
            employees.push(temp);
            this.name="";
            this.desg="";
            this.employeeType = "";
        };
    });