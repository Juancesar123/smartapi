var app = angular.module("mainApp.listobatpbf",["ngRoute","ngTable",'checklist-model']);
app.config(function($routeProvider) {
  $routeProvider
        .when('/listobatpbf', {
            templateUrl: 'listobatpbf',
			controller:"listobatpbf"
		})
 });
 app.factory("listobatpbfService",function($http){
    return{
        simpandataobat:function($data){
                return $http.post("/api/v1/listobatpbf",$data);
        },
        ambildatars:function($data){
            return $http.get("/api/v1/daftarpbf",$data);
        },
        carikodeaja:function($id){
            return $http.get("/api/v1/daftarpbf/"+$id);
        },
        hapusdataobat:function($id){
            return $http.delete("/api/v1/listobatpbf/"+$id);
        },
        ubahdataobat:function($data){
            return $http.put("/api/v1/listobatpbf",$data);
        }
    }
})
app.controller("listobatpbf",function($scope,$http,$log,listobatpbfService,$timeout,NgTableParams,$filter){
    $scope.getdata = function(){
        $http.get('api/v1/listobatpbf').success(function (data) {
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
        var promise = listobatpbfService.ambildatars();
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
       var promise = listobatpbfService.carikodeaja($id);
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
           kodeobat :'OBPBF-'+Math.floor((Math.random() * 100000) + 1),
           kodepbf:$scope.koders,
           namapbf:$scope.namars,
           nama:$scope.nama,
           satuanbesar:$scope.satuanbesar,
           satuankecil:$scope.satuankecil,
           konversi:$scope.konversi,
           hargabesar:$scope.hargabesar,
           hargakecil:$scope.hargakecil
       }
       var promise = listobatpbfService.simpandataobat($data);
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
       var promise = listobatpbfService.ubahdataobat($data);
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
       var promise = listobatpbfService.hapusdataobat($id);
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