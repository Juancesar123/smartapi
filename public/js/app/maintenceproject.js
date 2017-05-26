var app = angular.module("mainApp.maintenceproject",["ngRoute","datatables","ngFileUpload","textAngular","checklist-model"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/maintenceproject', {
            templateUrl: 'maintenceproject',
			controller:"maintenceproject"
		})
 });
  app.factory("maintenceprojectService",function($http){
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
app.controller("maintenceproject",function($scope,$http,$log,maintenceprojectService,$timeout,Upload,DTOptionsBuilder,DTColumnBuilder){
 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
})