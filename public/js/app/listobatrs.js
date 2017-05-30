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
        ambildatars:function($data){
            return $http.get("/api/v1/daftarrs",$data);
        },
        carikodeaja:function($id){
            return $http.get("/api/v1/carikode/"+$id);
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
   $scope.getdatars = function(){
        var promise = listobatrsService.ambildatars();
        promise.then(
            function(payload){       
               $scope.carikoders = payload.data;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.carikode = function(){
        $id = $scope.koders;
       var promise = listobatrsService.carikodeaja($id);
        promise.then(
            function(payload){       
               $scope.namars = payload.data.nama;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.getdatars();
   $scope.getdata();
    $scope.simpan = function (){
       $data = {
           kodeobat :'OBRS-'+Math.floor((Math.random() * 100000) + 1),
           koders:$scope.koders,
           namars:$scope.namars,
           nama:$scope.nama,
           satuanbesar:$scope.satuanbesar,
           satuankecil:$scope.satuankecil,
           konversi:$scope.konversi,
           hargabesar:$scope.hargabesar,
           hargakecil:$scope.hargakecil
       }
       var promise = listobatrsService.simpandataobat($data);
        promise.then(
            function(payload){       
                toastr.success('Data Obat saved successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.edit = function(user){
       $scope.nama = user.nama;
       $scope.koders = user.koders;
       $scope.namars = user.namars;
       $scope.satuankecil = user.satuankecil;
       $scope.satuanbesar = user.satuanbesar;
       $scope.hargabesar = user.hargabesar;
       $scope.hargakecil = user.hargakecil;
       $scope.konversi = user.konversi;
       $scope.id = user._id;
   }
   $scope.actionedit = function(){
        $data = {
           kodeobat :'OBRS-'+Math.floor((Math.random() * 100000) + 1),
           koders:$scope.koders,
           namars:$scope.namars,
           nama:$scope.nama,
           satuanbesar:$scope.satuanbesar,
           satuankecil:$scope.satuankecil,
           konversi:$scope.konversi,
           hargabesar:$scope.hargabesar,
           hargakecil:$scope.hargakecil,
           id:$scope.id
       }
       var promise = listobatrsService.ubahdataobat($data);
        promise.then(
            function(payload){       
                toastr.success('Data Obat updated successfully', 'Success')
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