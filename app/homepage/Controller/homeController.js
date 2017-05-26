module.exports= function(app){
    require('marko/express'); //enable res.marko 
    require('marko/node-require').install();
    var dashboard = require("../../../views/layout/dashboard.marko");
    var homepagedashboard = require("../../../views/homepage.marko");//use dashboard views    
    app.get("/",function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        dashboard.render({},res);
    })
    app.get("/homepagedashboard",function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        homepagedashboard.render({},res);
    })  
}