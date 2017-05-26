/*
    module yang di inject di angular js module ini bisa eksternal atau buatan sendiri 
    ngFileUpload
*/
var app = angular.module("mainApp.managementuser",["ngRoute","ngTable",'checklist-model']);
app.config(function($routeProvider) {
  $routeProvider
        .when('/userrs', {
            templateUrl: 'userrs',
			controller:"userrs"
		}) .when('/userpbf', {
            templateUrl: 'userpbf',
			controller:"userpbf"
		}).when('/useradministrator', {
            templateUrl: 'useradministrator',
			controller:"useradministrator"
		})
 });
 app.factory("managementuserService",function($http){
    return{
        getdatauser:function(){
            return $http.get("/api/v1/user");
        },
        simpandatauserrs:function($data){
                return $http.post("/api/v1/userrs",$data);
        },
        hapusdatauser:function($id){
            return $http.delete("/api/v1/userrs/"+$id);
        },
        ubahdatauser:function($data){
            return $http.put("/api/v1/userrs",$data);
        },
        ubastatususer:function($id){
             return $http.put("/api/v1/userrs/status",$id);
        },
        getdatauserpbf:function(){
            return $http.get("/api/v1/userpbf");
        },
        simpandatauserpbf:function($data){
                return $http.post("/api/v1/userpbf",$data);
        },
        hapusdatauserpbf:function($id){
            return $http.delete("/api/v1/userpbf/"+$id);
        },
        ubahdatauserpbf:function($data){
            return $http.put("/api/v1/userpbf",$data);
        },
        ubastatususerpbf:function($id){
             return $http.put("/api/v1/userpbf/status",$id);
        },
        getdatauseradministrator:function(){
            return $http.get("/api/v1/useradministrator");
        },
        simpandatauseradministrator:function($data){
                return $http.post("/api/v1/useradministrator",$data);
        },
        hapusdatauseradministrator:function($id){
            return $http.delete("/api/v1/useradministrator/"+$id);
        },
        ubahdatauseradministrator:function($data){
            return $http.put("/api/v1/useradministrator",$data);
        },
        ubastatususeradministrator:function($id){
             return $http.put("/api/v1/useradministrator/status",$id);
        },
    }
})
 app.controller("userrs",function($scope,$http,$log,managementuserService,$timeout,NgTableParams,$filter){
    $scope.getdata = function(){
        $http.get('api/v1/userrs').success(function (data) {
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
   $scope.simpan = function(){
       $data = {
           kode :'RS-'+Math.floor((Math.random() * 100000) + 1),
           username:$scope.email,
           password:$scope.password,
           level :"rumah sakit",
           nama : $scope.nama
       }
       var promise = managementuserService.simpandatauserrs($data);
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
   $scope.hapus = function(user){
       swal({   
            title: "Are you sure?",  
            text: "You will not be able to recover this user data!",  
            type: "warning",  
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, 
        function(){   
             $id = user._id;
            var promise = managementuserService.hapusdatauser($id);
            promise.then(
                function(payload){ 
                    swal('Deleted!','data user deleted successfully','success');
                    toastr.success('User RS data deleted successfully', 'Success') ;     
                    $scope.getdata();
                },
                function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )
        });
       
   }
   $scope.edit = function(user){
       $scope.email = user.username;
       $scope.nama = user.nama;
       $scope.level = user.level;
       $scope.id = user._id;
   }
   $scope.actionedit = function(){
       $data = {
           nama:$scope.nama,
           username:$scope.email,
           level:'rumah sakit',
           password:$scope.password,
           id:$scope.id
       }
        var promise = managementuserService.ubahdatauser($data);
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
    $scope.item = {
        block: []
    };
    $scope.blokuser = function(){
        swal({
            title: "Are you sure?",   
            text: "you will blocked users!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, Blocked it!",   
            closeOnConfirm: false 
        }, function(){
             $id = $scope.item;
         var promise = managementuserService.ubastatususer($id);
        promise.then(
            function(payload){ 
                swal('Deleted!','data user Blocked successfully','success');
                  toastr.success('User RS data Blocked successfully', 'Success')      
                $scope.getdata();
            },
            function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )  
        });
    }
 })

 app.controller("userpbf",function($scope,$http,$log,managementuserService,$timeout,NgTableParams,$filter){
     $scope.getdata = function(){
        $http.get('api/v1/userpbf').success(function (data) {
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
   $scope.simpan = function(){
       $data = {
           kode :'PBF-'+Math.floor((Math.random() * 100000) + 1),
           username:$scope.email,
           password:$scope.password,
           level :'pbf',
           nama : $scope.nama
       }
       var promise = managementuserService.simpandatauserpbf($data);
        promise.then(
            function(payload){       
                toastr.success('User PBF data saved successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.hapus = function(user){
       swal({   
            title: "Are you sure?",  
            text: "You will not be able to recover this user data!",  
            type: "warning",  
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, 
        function(){   
             $id = user._id;
            var promise = managementuserService.hapusdatauserpbf($id);
            promise.then(
                function(payload){ 
                    swal('Deleted!','data user deleted successfully','success');
                    toastr.success('User PBF data deleted successfully', 'Success') 
                    $scope.getdata();
                },
                function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )
        });
       
   }
   $scope.edit = function(user){
       $scope.email = user.username;
       $scope.nama = user.nama;
       $scope.level = user.level;
       $scope.id = user._id;
   }
   $scope.actionedit = function(){
       $data = {
           nama:$scope.nama,
           username:$scope.email,
           level:'pbf',
           id:$scope.id,
           password:$scope.password
       }
        var promise = managementuserService.ubahdatauserpbf($data);
        promise.then(
            function(payload){   
                 toastr.success('User PBF data updated successfully', 'Success')    
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
    $scope.item = {
        block: []
    };
    $scope.blokuser = function(){
        swal({
            title: "Are you sure?",   
            text: "you will blocked users!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, Blocked it!",   
            closeOnConfirm: false 
        }, function(){
             $id = $scope.item;
         var promise = managementuserService.ubastatususerpbf($id);
        promise.then(
            function(payload){
                swal('Deleted!','data user blocked successfully','success');
                  toastr.success('User PBF data blocked successfully', 'Success')     
                $scope.getdata();
            },
            function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )  
        });
    }
})
app.controller("useradministrator",function($scope,$http,$log,managementuserService,$timeout,NgTableParams,$filter){
     $scope.getdata = function(){
        $http.get('api/v1/useradministrator').success(function (data) {
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
   $scope.simpan = function(){
       $data = {
           kode :'adm-'+Math.floor((Math.random() * 100000) + 1),
           username:$scope.email,
           password:$scope.password,
           level :'administrator',
           nama : $scope.nama
       }
       var promise = managementuserService.simpandatauseradministrator($data);
        promise.then(
            function(payload){       
                toastr.success('User administrator data saved successfully', 'Success')
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
   $scope.hapus = function(user){
       swal({   
            title: "Are you sure?",  
            text: "You will not be able to recover this user data!",  
            type: "warning",  
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, 
        function(){   
             $id = user._id;
            var promise = managementuserService.hapusdatauseradministrator($id);
            promise.then(
                function(payload){ 
                    swal('Deleted!','data deleted successfully','success');
                     toastr.success('User administrator data deleted successfully', 'Success')      
                    $scope.getdata();
                },
                function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )
        });
       
   }
   $scope.edit = function(user){
       $scope.email = user.username;
       $scope.nama = user.nama;
       $scope.level = user.level;
       $scope.id = user._id;
   }
   $scope.actionedit = function(){
       $data = {
           nama:$scope.nama,
           username:$scope.email,
           level:'administrator',
           id:$scope.id,
           password:$scope.password
       }
        var promise = managementuserService.ubahdatauseradministrator($data);
        promise.then(
            function(payload){   
                  toastr.success('User administrator data updated successfully', 'Success')  
                $scope.getdata();
            },
            function(errorPayload){
                $log.error('failure loading data',errorPayload);
            }
        )
   }
    $scope.item = {
        block: []
    };
    $scope.blokuser = function(){
        swal({
            title: "Are you sure?",   
            text: "you will blocked users!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, Blocked it!",   
            closeOnConfirm: false 
        }, function(){
             $id = $scope.item;
         var promise = managementuserService.ubastatususeradministrator($id);
        promise.then(
            function(payload){ 
                swal('Deleted!','data user blocked successfully','success');
                 toastr.success('User administrator data blocked successfully', 'Success')      
                $scope.getdata();
            },
            function(errorPayload){
                    $log.error('failure loading data',errorPayload);
                }
            )  
        });
    }
})