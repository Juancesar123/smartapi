var app = angular.module("mainApp.timdashboard",["ngRoute","datatables","ngFileUpload","textAngular"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/timdashboard', {
            templateUrl: 'timdashboard',
			controller:"timdashboard"
        })
})
app.factory("timservice",function($http){
    return{
        getdatatim:function(){
            return $http.get("/api/v1/tim");
        },
        simpandatatim:function($data){
                return $http.post("/api/v1/tim",$data);
        },
        hapusdatatim:function($id){
            return $http.delete("/api/v1/tim/"+$id);
        },
        ubahdatatim:function($data){
            return $http.put("/api/v1/tim",$data);
        }
    }
});
//controller timdashboard
app.controller("timdashboard",function($timeout,$log,Upload,$http,$scope,timservice,DTOptionsBuilder,DTColumnBuilder){
     $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
        $scope.submit = function(){
        var nama = $scope.nama;
        var deskripsi = $scope.deskripsi;
        var skill = $scope.skill;
        var files = $scope.gambar;
        // $data = {
        //         "namaproject":$scope.namaproject,
        //         "urlvideo":$scope.urlvideo,
        //         "deskripsi":$scope.deskripsi,
        //         "files":files
        //     }
            Upload.upload({
                url: '/api/v1/tim',
                headers : {
                    'Content-Type': 'multipart/form-data'
                },
                arrayKey: '',
                data: {files:files,nama:nama,skill:skill,deskripsi:deskripsi}
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
        $scope.getdata = function(){
             var promise = timservice.getdatatim();
            promise.then(
                function(payload){
                    $scope.tim = payload.data;
                },
                function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )
        }
        $scope.getdata();
        $scope.ubah = function(item){
            $scope.nama = item.nama;
            $scope.skill = item.skill;
            $scope.deskripsi = item.deskripsi;
            $scope.id = item._id
        };
        $scope.actionubah = function(){
            var files = $scope.gambar;
             if (files && files.length) {
                var nama = $scope.nama;
                var deskripsi = $scope.deskripsi;
                var skill = $scope.skill;
                var files = $scope.gambar;
                var id = $scope.id;
                // $data = {
                //         "namaproject":$scope.namaproject,
                //         "urlvideo":$scope.urlvideo,
                //         "deskripsi":$scope.deskripsi,
                //         "files":files
                //     }
                Upload.upload({
                    url: '/api/v1/tim/gambar',
                    headers : {
                        'Content-Type': 'multipart/form-data'
                    },
                    arrayKey: '',
                    data: {files:files,nama:nama,skill:skill,deskripsi:deskripsi,id:id}
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
                    "nama":$scope.nama,
                    "skill":$scope.skill,
                    "deskripsi":$scope.deskripsi,
                    "id":$scope.id
                }
                var promise = timservice.ubahdatatim($data);
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
             var promise = timservice.hapusdatatim($id);
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