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
    app.post('/api/v1/listobatrs',function(req,res){
        var listobatrsObject = new listobatrsModel();
        listobatrsObject.koders = req.body.koders;
        listobatrsObject.nama = req.body.nama;
        listobatrsObject.satuanbesar = req.body.satuanbesar;
        listobatrsObject.satuankecil = req.body.satuankecil;
        listobatrsObject.konversi = req.body.konversi;
        listobatrsObject.hargabesar = req.body.hargabesar;
        listobatrsObject.hargakecil = req.body.hargakecil;
        listobatrsObject.kodeobat = req.body.kodeobat;
        listobatrsObject.namars = req.body.namars;
        listobatrsObject.save(function(docs){
            res.end();
        })
    })
    app.put('/api/v1/listobatrs',function(req,res){
        listobatrsModel.update({
            _id:req.body.id
        },
        {
            $set:{
                koders:req.body.koders,
                nama:req.body.nama,
                satuanbesar:req.body.satuanbesar,
                satuankecil:req.body.satuankecil,
                konversi:req.body.konversi,
                hargabesar:req.body.hargabesar,
                hargakecil:req.body.hargakecil,
                namars:req.body.namars
        }},function(docs){
            res.end();
        })
    });
    app.delete('/api/v1/listobatrs/:id',function(req,res){
        listobatrsModel.update({
            _id:req.params.id
        },
        {
            $set:{
                koders:'',
                nama:'',
                satuanbesar:'',
                satuankecil:'',
                konversi:'',
                hargabesar:'',
                hargakecil:'',
                status:'',
                namars:''
        }},function(docs){
            res.end();
        })
    })
   
}