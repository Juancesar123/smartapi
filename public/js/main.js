/*initialize module angularjs1 and inject eksternal modul in angular js 1
    split code menjadi modular gak hanya backend saja tp angularjs juga bisa di split modulenya dan di use 
*/
var app = angular.module("mainApp",[
        "mainApp.homepage",
        "mainApp.managementuser",
        "mainApp.daftarrs",
        "mainApp.daftarpbf",
        "mainApp.datacabang"
    ]);
app.controller("mainController",function($scope,$http,$location){
   $scope.getClass = function (path) {
  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
}
})