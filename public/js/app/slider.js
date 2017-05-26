var app = angular.module("mainApp.slider",["ngRoute","datatables","ngFileUpload","textAngular"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/slider', {
            templateUrl: 'slider',
			controller:"slider"
		}).otherwise({redirectTo:'/homepagedashboard'});
 });
 app.factory("sliderservice",function($http){
    return{
        getdataslider:function(){
            return $http.get("/api/v1/slider");
        },
        simpandataslider:function($data){
                return $http.post("/api/v1/slider",$data);
        },
        hapusdataslider:function($id){
            return $http.delete("/api/v1/slider/"+$id);
        },
        ubahdataslider:function($data){
            return $http.put("/api/v1/slider",$data);
        }
    }
});
 app.controller("slider",function($scope,$timeout,Upload,$http,sliderservice,$log,$http,DTOptionsBuilder,DTColumnBuilder){
     $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
    $scope.getdata = function(){
        var promise = sliderservice.getdataslider();
        promise.then(
            function(payload){
                $scope.slider = payload.data;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.getdata();
    $scope.submit = function(){
        var files = $scope.gambar;
        var alt = $scope.alt;
        $data = {
                "alt":$scope.alt,
                "files":files
            }
            Upload.upload({
                url: '/api/v1/slider',
                headers : {
                    'Content-Type': 'multipart/form-data'
                },
                arrayKey: '',
                data: {files:files,alt:alt}
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    $scope.getdata();
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
    }
    $scope.ubah = function(item){
        $scope.alt = item.alt;
        $scope.id = item._id;
    }
    $scope.actionubah = function(){
         var files = $scope.gambar;
         if (files && files.length) {
        $data = {
                "alt":$scope.alt,
                "files":files,
                "id":$scope.id
            }
            Upload.upload({
                url: '/api/v1/slider/ubah',
                headers : {
                    'Content-Type': 'multipart/form-data'
                },
                arrayKey: '',
                data: $data
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    $scope.getdata();
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }else{
             $data = {
                "alt":$scope.alt,
                "id":$scope.id
            }
            var promise = sliderservice.ubahdataslider($data);
            promise.then(
                function(payload){
                    alert("data sukses di ubah");
                    $scope.getdata();
                },
                function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )
        }
    }
    $scope.hapus = function(item){
        $id = item._id;
        var promise = sliderservice.hapusdataslider($id);
        promise.then(
            function(payload){
                alert("data sukses di hapus");
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
 })