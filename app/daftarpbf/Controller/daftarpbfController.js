module.exports = function(app){
    var daftarpbfModel = require("../Model/daftarpbfModel.js");
    var daftarpbf = require("../../../views/daftarPBF.marko");
    app.get("/daftarpbf",function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        daftarpbf.render({},res);
    })
    app.get("/api/v1/daftarpbf",function(req,res){
        daftarpbfModel.find().exec().then(function(docs){
            res.json(docs);
        })
    })
    app.post("/api/v1/daftarpbf",function(req,res){
         var daftarpbfObject = new daftarpbfModel();
         daftarpbfObject.uid = req.body.kode;
        daftarpbfObject.nama = req.body.nama;
        daftarpbfObject.alamat = req.body.alamat;
        daftarpbfObject.kota = req.body.kota;
        daftarpbfObject.provinsi = req.body.provinsi;
        daftarpbfObject.nomortelpon = req.body.notlp;
        daftarpbfObject.save(function(docs){
            res.end()
        });
    })
    app.put("/api/v1/daftarpbf",function(req,res){
        daftarpbfModel.update({ _id: req.body.id }, { $set: { nama:req.body.nama,alamat:req.body.alamat,kota:req.body.kota,provinsi:req.body.provinsi,nomortelpon:req.body.notlp}},function(){
            res.end();
        })
    })
    app.delete("/api/v1/daftarpbf/:id",function(req,res){
        daftarpbfModel.update({ _id: req.params.id }, { $set: { nama:'',alamat:'',kota:'',provinsi:'',nomortelpon:''}},function(){
            res.end();req.body.notlp
        })
    })
    app.get('/api/v1/daftarpbf/:id',function(req,res){
        daftarpbfModel.findOne({uid:req.params.id}).exec().then(function(docs){
            res.json(docs);
        })
    })
}