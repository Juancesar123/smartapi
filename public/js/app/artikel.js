var app = angular.module("mainApp.artikel",["ngRoute","datatables","ngFileUpload","textAngular"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/artikel', {
            templateUrl: 'artikel',
			controller:"artikel"
        })
})
app.factory("artikelservice",function($http){
    return{
        getdataartikel:function(){
            return $http.get("/api/v1/artikel");
        },
        simpandataartikel:function($data){
                return $http.post("/api/v1/artikel",$data);
        },
        hapusdataartikel:function($id){
            return $http.delete("/api/v1/artikel/"+$id);
        },
        ubahdataartikel:function($data){
            return $http.put("/api/v1/artikel",$data);
        },
        ubahstatusartikel:function($id){
            return $http.post("/api/v1/artikel/ubahstatus",$id);
        }
    }
});
app.controller("artikel",function($scope,$log,$http,textAngularManager,DTOptionsBuilder,DTColumnBuilder,artikelservice){
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
    $scope.getdata = function(){
        var promise = artikelservice.getdataartikel();
        promise.then(
            function(payload){
                $scope.artikel = payload.data;
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.getdata();
    $scope.submit = function(){
        $data = {
            "judulartikel":$scope.judulartikel,
            "deskripsisingkat":$scope.deskripsisingkat,
            "isiartikel":$scope.isiartikel,
        }
        var promise = artikelservice.simpandataartikel($data);
          promise.then(
            function(payload){
                alert("data sukses dikirim");
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.ubah = function(item){
        $scope.judulartikel = item.judulartikel;
        $scope.deskripsisingkat = item.deskripsisingkat;
        $scope.isiartikel = item.isiartikel;
        $scope.id = item._id;
    }
    $scope.actionubah = function(){
        $data = {
            "judulartikel":$scope.judulartikel,
            "deskripsisingkat":$scope.deskripsisingkat,
            "isiartikel":$scope.isiartikel,
            "id" : $scope.id
        }
         var promise = artikelservice.ubahdataartikel($data);
          promise.then(
            function(payload){
                alert("data sukses diubah");
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.user={
        unpublished:[]
    }
    $scope.ubahstatus = function(){
        $id = $scope.user;
        var promise = artikelservice.ubahstatusartikel($id);
         promise.then(
            function(payload){
                alert("data sukses diubah");
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
    $scope.hapus = function(item){
        $id = item._id;
         var promise = artikelservice.hapusdataartikel($id);
          promise.then(
            function(payload){
                alert("data sukses diubah");
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
    }
})