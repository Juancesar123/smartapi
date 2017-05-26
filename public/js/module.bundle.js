/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var app = angular.module("mainApp.homepage",["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/homepagedashboard', {
            templateUrl: '/homepagedashboard',
			controller:"homepagedashboard"
		})
})
app.controller("homepagedashboard",function($scope,$http){

})

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var app = angular.module("mainApp.portofolio",["ngRoute","datatables","ngFileUpload"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/portfolio', {
            templateUrl: '/portfolio',
			controller:"portfolio"
		})
})
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
app.controller("portfolio",function($log,$scope,$http,Upload,$timeout,DTOptionsBuilder,DTColumnBuilder,portfolioservice){
    //Ng-table Module used
    // var self = this;
    // var data = [{name: "Moroni", age: 50} /*,*/];
    //self.tableParams = new NgTableParams({}, { dataset: data});
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true)
        .withOption('autoWidth', false)
        .withOption('scrollX', true)
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var app = angular.module("mainApp.slider",["ngRoute","datatables","ngFileUpload","textAngular"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/slider', {
            templateUrl: 'slider',
			controller:"slider"
		}).otherwise({redirectTo:'/homepagedashboard'});
 });
 app.controller("slider",function($scope,$http){
     
 })

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(2);
__webpack_require__(4);
__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);