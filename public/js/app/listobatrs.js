var app = angular.module("mainApp.listobatrs",["ngRoute","ngTable",'checklist-model']);
app.config(function($routeProvider) {
  $routeProvider
        .when('/listobatrs', {
            templateUrl: 'listobatrs',
			controller:"listobatrs"
		})
 });
 app.factory("listobatrsService",function($http){
    return{
        simpandataobat:function($data){
                return $http.post("/api/v1/listobatrs",$data);
        },
        hapusdataobat:function($id){
            return $http.delete("/api/v1/listobatrs/"+$id);
        },
        ubahdataobat:function($data){
            return $http.put("/api/v1/listobatrs",$data);
        }
    }
})
app.controller("listobatrs",function($scope,$http,$log,listobatrsService,$timeout,NgTableParams,$filter){
    $scope.getdata = function(){
        $http.get('api/v1/listobatrs').success(function (data) {
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
           kode :'PBF-'+Math.floor((Math.random() * 100000) + 1),
           nama:$scope.nama,
           alamat:$scope.alamat,
           notlp:$scope.notlp,
           kota:$scope.kota,
           provinsi:$scope.provinsi
       }
       var promise = listobatrsService.simpandataobat($data);
        promise.then(
            function(payload){       
                toastr.success('Data PBF saved successfully', 'Success')
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
       var promise = listobatrsService.ubahdataobat($data);
        promise.then(
            function(payload){       
                toastr.success('Data PBF updated successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.hapus = function(user){
       $id = user._id;
       var promise = listobatrsService.hapusdataobat($id);
        promise.then(
            function(payload){       
                toastr.success('data PBF deleted successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
 })