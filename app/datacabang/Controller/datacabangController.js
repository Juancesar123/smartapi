module.exports = function(app){
    var datacabangModel = require("../Model/datacabangModel.js");
    var datacabang = require("../../../views/datacabang.marko");
    app.get('/datacabang',function(req,res){
        datacabang.render({},res);
    })
    app.get('/api/v1/datacabang',function(req,res){
       datacabangModel.find().exec().then(function(docs){
           res.json(docs);
       })
    })
    app.post('/api/v1/datacabang',function(req,res){
        var datacabangObject = new datacabangModel();
        datacabangObject.idpbf = req.body.kodepbf;
        datacabangObject.idcabang = req.body.kode;
        datacabangObject.nama = req.body.nama;
        datacabangObject.alamat = req.body.alamat;
        datacabangObject.telp = req.body.notlp;
        datacabangObject.kota = req.body.kota;
        datacabangObject.namapbf = req.body.namapbf;
        datacabangObject.provinsi = req.body.provinsi;
        datacabangObject.save(function(docs){
            res.end()
        })
    })
    app.put('/api/v1/datacabang',function(req,res){
        datacabangModel.update({_id:req.body.id},{$set:{idpbf:req.body.kodepbf,alamat:req.body.alamat,kota:req.body.kota,provinsi:req.body.provinsi,notlp:req.body.notlp,status:'active'}},function(docs){
            res.json(docs);
        })
    })
    app.delete('/api/v1/datacabang/:id',function(req,res){
        datacabangModel.update({_id:req.params.id},{$set:{idpbf:'',alamat:'',kota:'',provinsi:'',notlp:'',status:''}},function(docs){
            res.json(docs);
        })
    })
    
}