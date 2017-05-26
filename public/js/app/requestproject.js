var app = angular.module("mainApp.requestproject",["ngRoute","datatables","ngFileUpload","textAngular","checklist-model"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/requestproject', {
            templateUrl: 'requestedproject',
			controller:"requestproject"
		})
 });
  app.factory("requestprojectService",function($http){
    return{
        getdatauser:function(){
            return $http.get("/api/v1/user");
        },
        simpandatauser:function($data){
                return $http.post("/api/v1/user",$data);
        },
        hapusdatauser:function($id){
            return $http.delete("/api/v1/user/"+$id);
        },
        ubahdatauser:function($data){
            return $http.put("/api/v1/user",$data);
        },
        ubastatususer:function($data){
             return $http.put("/api/v1/user/status",$data);
        }
    }
})
app.controller("requestproject",function($scope,$http,$log,requestprojectService,$timeout,Upload,DTOptionsBuilder,DTColumnBuilder){
 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
})