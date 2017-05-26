var app = angular.module("mainApp.datacabang",["ngRoute","ngTable"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/datacabang', {
            templateUrl: '/datacabang',
			controller:"datacabang"
		})
})
app.factory("datacabangService",function($http){
    return{
        ambildatapbf:function($data){
                return $http.get("/api/v1/daftarpbf");
        },
        ambildataid:function($id){
                return $http.get("/api/v1/daftarpbf/"+$id);
        },
        simpandatacabang:function($data){
                return $http.post("/api/v1/datacabang",$data);
        },
        hapusdatars:function($id){
            return $http.delete("/api/v1/daftarrs/"+$id);
        },
        ubahdatars:function($data){
            return $http.put("/api/v1/daftarrs",$data);
        },
    }
})
app.controller("datacabang",function($scope,$http,$log,datacabangService,$timeout,NgTableParams,$filter){
 $scope.getdata = function(){
        $http.get('api/v1/datacabang').success(function (data) {
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
   $scope.ambilpbf = function(){
        var promise = datacabangService.ambildatapbf();
        promise.then(
            function(payload){       
                $scope.kodepbf = payload.data;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.gantikode= function(){
       $id = $scope.modelkode;
        var promise = datacabangService.ambildataid($id);
        promise.then(
            function(payload){       
                $scope.namapbf = payload.data.nama;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.ambilpbf();
   $scope.getdata();
   $scope.simpan = function (){
       $data = {
           nama:$scope.nama,
           alamat:$scope.alamat,
           notlp:$scope.notlp,
           kota:$scope.kota,
           provinsi:$scope.provinsi,
           kodepbf :$scope.modelkode,
           namapbf:$scope.namapbf,
           namacabang:$scope.namacabang,
           kode :'PBFCB-'+Math.floor((Math.random() * 100000) + 1),
       }
       var promise = datacabangService.simpandatacabang($data);
        promise.then(
            function(payload){       
                toastr.success('Data saved successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.edit = function(user){
       $scope.namapbf = user.namapbf;
       $scope.modelkode = user.idpbf;
       $scope.nama = user.nama;
       $scope.kota = user.kota;
       $scope.alamat = user.alamat;
       $scope.provinsi = user.provinsi;
       $scope.notlp = user.telp;
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