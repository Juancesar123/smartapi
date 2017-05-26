var mongoose = require("mongoose");
module.exports =  mongoose.model('DaftarRS', {
        uid : {type : String, default: ''},
        nama : {type : String, default: ''},
        alamat : {type : String, default: ''},
        nomortelpon : {type : String, default: ''},
        kota : {type : String, default: ''},
        provinsi : {type : String, default: ''},
        created_at : {type : Date, default: Date.now()},
});