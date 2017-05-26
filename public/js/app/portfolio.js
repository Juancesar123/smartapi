var app = angular.module("mainApp.portofolio",["ngRoute","datatables","ngFileUpload"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/portfolio', {
            templateUrl: '/portfolio',
			controller:"portfolio"
		})
})
 app.factory('socket', ['$rootScope', function($rootScope) {
   var socket = io.connect();

   return {
     on: function(eventName, callback){
       socket.on(eventName, callback);
     },
     emit: function(eventName, data) {
       socket.emit(eventName, data);
     }
   };
 }]);

app.factory("portfolioservice",function($http){
    return{
        getdataprotfolio:function(){
            return $http.get("/api/v1/portfolio");
        },
        simpandataportfolio:function($data){
                return $http.post("/api/v1/portfolio",$data);
        },
        hapusdataportoflio:function($id){
            return $http.delete("/api/v1/portfolio/"+$id);
        },
        ubahdataportfolio:function($data){
            return $http.put("/api/v1/portfolio",$data);
        }
    }
})
app.controller("portfolio",function(socket,$log,$scope,$http,Upload,$timeout,DTOptionsBuilder,DTColumnBuilder,portfolioservice){
    //Ng-table Module used
    // var self = this;
    // var data = [{name: "Moroni", age: 50} /*,*/];
    //self.tableParams = new NgTableParams({}, { dataset: data});
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true);
    $scope.getdata = function(){
        var promise = portfolioservice.getdataprotfolio();
        promise.then(
            function(payload){
                $scope.portfolio = payload.data;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.getdata();
    $scope.submit = function(){
        var files = $scope.gambar;
        var namaproject = $scope.namaproject;
        var urlvideo = $scope.urlvideo;
        var deskripsi = $scope.deskripsi;
        var files = $scope.gambar;
        $data = {
                "namaproject":$scope.namaproject,
                "urlvideo":$scope.urlvideo,
                "deskripsi":$scope.deskripsi,
                "files":files
            }
            Upload.upload({
                url: '/api/v1/portfolio',
                headers : {
                    'Content-Type': 'multipart/form-data'
                },
                arrayKey: '',
                data: {files:files,namaproject:namaproject,urlvideo:urlvideo,deskripsi:deskripsi}
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
        
        //  var promise = portfolioservice.simpandataportfolio($data);
        //  promise.then(
        //     function(){
        //        alert("data sukses di simpan");
        //        $scope.getdata();
        //     },
        //     function(errorPayload){
        //         $log.error('failure loading data',errorPayload);
        //     }
        // )
    }
    $scope.hapus = function(item){
        $scope.id = item._id;
        $id = $scope.id;
        var promise = portfolioservice.hapusdataportoflio($id);
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
    $scope.ubah = function(item){
        $scope.namaproject = item.namaproject;
        $scope.deskripsi = item.deskripsiproject;
        $scope.urlvideo = item.videoproject;
        $scope.id = item._id;
    }
    $scope.actionubah = function(){
        var id = $scope.id;
        var namaproject = $scope.namaproject;
        var deskripsi = $scope.deskripsi;
        var urlvideo = $scope.urlvideo;
        $data = {
            "id": $scope.id,
            "namaproject":$scope.namaproject,
            "deskripsi":$scope.deskripsi,
            "urlvideo":$scope.urlvideo
        }
        var promise = portfolioservice.ubahdataportfolio($data);
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
})