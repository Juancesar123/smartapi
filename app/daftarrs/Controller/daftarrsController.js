module.exports = function(app){
    var daftarrsModel = require("../Model/daftarrsModel.js");
    var daftarrs = require("../../../views/daftarRS.marko");
    app.get("/daftarrs",function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        daftarrs.render({},res);
    })
    app.get("/api/v1/daftarrs",function(req,res){
        daftarrsModel.find().exec().then(function(docs){
            res.json(docs);
        })
    })
    app.post("/api/v1/daftarrs",function(req,res){
        var daftarrsObject = new daftarrsModel();
        daftarrsObject.uid = req.body.kode;
        daftarrsObject.nama = req.body.nama;
        daftarrsObject.alamat = req.body.alamat;
        daftarrsObject.kota = req.body.kota;
        daftarrsObject.provinsi = req.body.provinsi;
        daftarrsObject.nomortelpon = req.body.notlp;
        daftarrsObject.save(function(docs){
            res.end()
        });
    })
    app.put("/api/v1/daftarrs",function(req,res){
        daftarrsModel.update({ _id: req.body.id }, { $set: { nama:req.body.nama,alamat:req.body.alamat,kota:req.body.kota,provinsi:req.body.provinsi,nomortelpon:req.body.notlp}},function(){
            res.end();
        })
    })
    app.delete("/api/v1/daftarrs/:id",function(req,res){
         daftarrsModel.update({ _id: req.params.id }, { $set: { nama:'',alamat:'',kota:'',provinsi:'',nomortelpon:''}},function(){
            res.end();
        })
    })
     app.get('/api/v1/carikode/:id',function(req,res){
        daftarrsModel.findOne({uid:req.params.id}).exec().then(function(docs){
            res.json(docs);
        })
    })
}