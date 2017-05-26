var app = angular.module("mainApp.daftarrs",["ngRoute","ngTable"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/daftarrs', {
            templateUrl: '/daftarrs',
			controller:"daftarrs"
		})
})
app.factory("daftarrsService",function($http){
    return{
        simpandatars:function($data){
                return $http.post("/api/v1/daftarrs",$data);
        },
        hapusdatars:function($id){
            return $http.delete("/api/v1/daftarrs/"+$id);
        },
        ubahdatars:function($data){
            return $http.put("/api/v1/daftarrs",$data);
        },
    }
})
app.controller("daftarrs",function($scope,$http,$log,daftarrsService,$timeout,NgTableParams,$filter){
 $scope.getdata = function(){
        $http.get('api/v1/daftarrs').success(function (data) {
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 4
                },
                {
                  total: data.length,
                  getData: function (params) {
                    var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
                    var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;
                    params.total(orderedData.length);
                   return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }
             });
        });
   }
   $scope.getdata();
   $scope.simpan = function (){
       $data = {
           nama:$scope.nama,
           alamat:$scope.alamat,
           notlp:$scope.notlp,
           kota:$scope.kota,
           provinsi:$scope.provinsi,
           kode :'RS-'+Math.floor((Math.random() * 100000) + 1),
       }
       var promise = daftarrsService.simpandatars($data);
        promise.then(
            function(payload){       
                toastr.success('User RS data saved successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.edit = function(user){
       $scope.nama = user.nama;
       $scope.kota = user.kota;
       $scope.alamat = user.alamat;
       $scope.provinsi = user.provinsi;
       $scope.notlp = user.nomortelpon;
       $scope.id = user._id;
   }
   $scope.actionedit = function(){
        $data = {
           nama:$scope.nama,
           alamat:$scope.alamat,
           notlp:$scope.notlp,
           kota:$scope.kota,
           provinsi:$scope.provinsi,
           id:$scope.id
       }
       var promise = daftarrsService.ubahdatars($data);
        promise.then(
            function(payload){       
                toastr.success('User RS data updated successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.hapus = function(user){
       $id = user._id;
       var promise = daftarrsService.hapusdatars($id);
        promise.then(
            function(payload){       
                toastr.success('User RS data deleted successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
})