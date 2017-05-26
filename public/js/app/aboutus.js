var app = angular.module("mainApp.aboutus",["ngRoute","datatables","ngFileUpload","textAngular","checklist-model"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/aboutdashboard', {
            templateUrl: 'aboutdashboard',
			controller:"aboutdashboard"
		})
 });
  app.factory("aboutdashboardService",function($http){
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
app.controller("aboutdashboard",function($scope,$http,$log,aboutdashboardService,$timeout,Upload,DTOptionsBuilder,DTColumnBuilder){
 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
})