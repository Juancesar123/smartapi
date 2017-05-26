var app = angular.module("mainApp.ongoingproject",["ngRoute","datatables","ngFileUpload","checklist-model","firebase"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/ongoingproject', {
            templateUrl: 'ongoingproject',
			controller:"ongoingproject"
		})
 });
 app.factory("ongoingprojectService",function($http){
    return{
        getongoingproject:function(){
            return $http.get("/api/v1/ongoingproject");
        },
        ubahstatus:function($data){
            return $http.put("/api/v1/ongoingproject",$data);
        },
    }
})
 app.controller("ongoingproject",function($scope,$http,$log,ongoingprojectService,$timeout,Upload,DTOptionsBuilder,DTColumnBuilder,$firebaseArray){
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
    $scope.getdata = function(){
        var promise = ongoingprojectService.getongoingproject();
        promise.then(
            function(payload){
                $scope.ongoingproject = payload.data;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.getdata();
 })
