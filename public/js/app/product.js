var app = angular.module("mainApp.product",["ngRoute","datatables","ngFileUpload","textAngular"]);
app.config(function($routeProvider) {
  $routeProvider
        .when('/product', {
            templateUrl: 'product',
			controller:"product"
        })
})
app.factory("productservice",function($http){
    return{
        getdataproduct:function(){
            return $http.get("/api/v1/product");
        },
        simpandataproduct:function($data){
                return $http.post("/api/v1/product",$data);
        },
        hapusdataproduct:function($id){
            return $http.delete("/api/v1/product/"+$id);
        },
        ubahdataproduct:function($data){
            return $http.put("/api/v1/product",$data);
        }
    }
})

app.controller("product",function($scope,$http,productservice){

})
