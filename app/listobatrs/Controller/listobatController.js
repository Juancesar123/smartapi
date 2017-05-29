module.exports = function(app){
    var listobatrsModel = require("../Model/listobatrsModel.js");
    var listobatrs = require("../../../views/listobatrs.marko");
    app.get("/listobatrs",function(req,res){
        listobatrs.render({},res);
    })
    app.get('/api/v1/listobatrs',function(req,res){
        listobatrsModel.find().exec().then(function(docs){
            res.json(docs);
        })
    })
}