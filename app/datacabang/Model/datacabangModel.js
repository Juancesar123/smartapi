var mongoose = require("mongoose");
module.exports =  mongoose.model('Datacabang', {
        idpbf : {type : String, default: ''},
        idcabang : {type : String, default: ''},
        nama : {type : String, default: ''},
        namapbf : {type : String, default: ''},
        alamat : {type : String, default: ''},
        telp : {type : String, default: ''},
        kota : {type : String, default: ''},
        provinsi : {type : String, default: ''},
        status : {type : String, default: 'active'},
        created_at : {type : Date, default: Date.now()},
});