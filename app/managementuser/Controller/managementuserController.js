module.exports = function(app){
    var bodyParser     = require('body-parser');
    var multer         = require('multer');
    var md5 = require('md5');
    function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.session.nama)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
}
    app.use(bodyParser.json()); 
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 
    require('marko/express'); //enable res.marko 
    require('marko/node-require').install();
   
    //mongoose.connect('mongodb://localhost/rajadev');
      var markoExpress = require('marko/express');
    app.use(markoExpress());
    var managementuserModel = require("../Model/managementuserModel.js");//import portfolio model
    var managementuserrs = require("../../../views/managementuserrs.marko");
    var managementuserpbf = require("../../../views/userpbf.marko");
     var managementuseradministrator = require("../../../views/useradministrator.marko");
    app.get('/userrs',function(req,res){
         res.setHeader('Content-Type', 'text/html; charset=utf-8');
        managementuserrs.render({},res);
    });
    app.get('/api/v1/userrs',function(req,res){
        managementuserModel.find({level:"rumah sakit"}).exec().then(function(docs){
            res.json(docs);
        })
    })
    app.post('/api/v1/userrs',function(req,res){
       var managementuserObject = new managementuserModel();
       managementuserObject.uid = req.body.kode;
       managementuserObject.nama = req.body.nama;
       managementuserObject.username = req.body.username;
       managementuserObject.password = md5(req.body.password);
       managementuserObject.level = req.body.level;
       managementuserObject.save(function(err,docs){
            res.json(docs);
       })
    })
    app.delete('/api/v1/userrs/:id',function(req,res){
         managementuserModel.update({ _id: req.params.id }, { $set: { nama:'',username:'',status:''}},function(){
            res.end();
        })
    })
    app.put('/api/v1/userrs',function(req,res){
        managementuserModel.update({ _id: req.body.id }, { $set: { nama:req.body.nama,username:req.body.username,level:req.body.level,password:md5(req.body.password),status:'active'}},function(){
            res.end();
        })
    })
    app.put('/api/v1/userrs/status',function(req,res){
        for(var i = 0; i <  req.body.block.length;i++ ){
                managementuserModel.update({ _id: req.body.block[i] }, { $set: { status:"blocked"}},function(){
                res.end();
            })
        } 
    })
    app.get('/userpbf',function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        managementuserpbf.render({},res);
    })
     app.get('/useradministrator',function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        managementuseradministrator.render({},res);
    })
    app.get('/api/v1/userpbf',function(req,res){
        managementuserModel.find({level:'pbf'}).exec().then(function(docs){
            res.json(docs);
        })
    })
    app.post('/api/v1/userpbf',function(req,res){
        var managementuserObject = new managementuserModel();
        managementuserObject.uid = req.body.kode;
       managementuserObject.nama = req.body.nama;
       managementuserObject.username = req.body.username;
       managementuserObject.password = md5(req.body.password);
       managementuserObject.level = req.body.level;
       managementuserObject.save(function(err,docs){
            res.json(docs);
       })
    })
    app.put('/api/v1/userpbf',function(req,res){
         managementuserModel.update({ _id: req.body.id }, { $set: { nama:req.body.nama,username:req.body.username,level:req.body.level,password:md5(req.body.password),status:'active'}},function(){
            res.end();
        })
    })
    app.delete('/api/v1/userpbf/:id',function(req,res){
       managementuserModel.update({ _id: req.params.id }, { $set: { nama:'',username:'',status:''}},function(){
            res.end();
        })
    })
     app.put('/api/v1/userpbf/status',function(req,res){
        for(var i = 0; i <  req.body.block.length;i++ ){
                managementuserModel.update({ _id: req.body.block[i] }, { $set: { status:"blocked"}},function(){
                res.end();
            })
        } 
    })
    app.get('/api/v1/useradministrator',function(req,res){
        managementuserModel.find({level:'administrator'}).exec().then(function(docs){
            res.json(docs);
        })
    })
    app.post('/api/v1/useradministrator',function(req,res){
        var managementuserObject = new managementuserModel();
        managementuserObject.uid = req.body.kode;
       managementuserObject.nama = req.body.nama;
       managementuserObject.username = req.body.username;
       managementuserObject.password = md5(req.body.password);
       managementuserObject.level = req.body.level;
       managementuserObject.save(function(err,docs){
            res.json(docs);
       })
    })
    app.put('/api/v1/useradministrator',function(req,res){
         managementuserModel.update({ _id: req.body.id }, { $set: { nama:req.body.nama,username:req.body.username,level:req.body.level,password:md5(req.body.password),status:'active'}},function(){
            res.end();
        })
    })
    app.delete('/api/v1/useradministrator/:id',function(req,res){
        managementuserModel.update({_id:req.params.id}, { $set: { nama:'',username:'',status:'',password:''}},function(err,docs){
           res.end();
       })
    })
     app.put('/api/v1/useradministrator/status',function(req,res){
        for(var i = 0; i <  req.body.block.length;i++ ){
                managementuserModel.update({ _id: req.body.block[i] }, { $set: { status:"blocked"}},function(){
                res.end();
            })
        } 
    })
}