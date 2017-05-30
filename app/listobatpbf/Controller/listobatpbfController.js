module.exports = function(app){
    var listobatpbfModel = require("../Model/listobatpbfModel.js");
    var listobatpbf = require("../../../views/listobatpbf.marko");
    app.get("/listobatpbf",function(req,res){
        listobatpbf.render({},res);
    })
    app.get('/api/v1/listobatpbf',function(req,res){
        listobatpbfModel.find().exec().then(function(docs){
            res.json(docs);
        })
    })
    app.post('/api/v1/listobatpbf',function(req,res){
        var listobatpbfObject = new listobatpbfModel();
        listobatpbfObject.kodepbf = req.body.kodepbf;
        listobatpbfObject.nama = req.body.nama;
        listobatpbfObject.satuanbesar = req.body.satuanbesar;
        listobatpbfObject.satuankecil = req.body.satuankecil;
        listobatpbfObject.konversi = req.body.konversi;
        listobatpbfObject.hargabesar = req.body.hargabesar;
        listobatpbfObject.hargakecil = req.body.hargakecil;
        listobatpbfObject.kodeobat = req.body.kodeobat;
        listobatpbfObject.namapbf = req.body.namapbf;
        listobatpbfObject.save(function(docs){
            res.end();
        })
    })
    app.put('/api/v1/listobatpbf',function(req,res){
        listobatpbfModel.update({
            _id:req.body.id
        },
        {
            $set:{
                kodepbf:req.body.kodepbf,
                nama:req.body.nama,
                satuanbesar:req.body.satuanbesar,
                satuankecil:req.body.satuankecil,
                konversi:req.body.konversi,
                hargabesar:req.body.hargabesar,
                hargakecil:req.body.hargakecil,
                namapbf:req.body.namapbf
        }},function(docs){
            res.end();
        })
    });
    app.delete('/api/v1/listobatpbf/:id',function(req,res){
        listobatpbfModel.update({
            _id:req.params.id
        },
        {
            $set:{
                kodepbf:'',
                nama:'',
                satuanbesar:'',
                satuankecil:'',
                konversi:'',
                hargabesar:'',
                hargakecil:'',
                status:'',
                namapbf:''
        }},function(docs){
            res.end();
        })
    })
   
}