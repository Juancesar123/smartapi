var mongoose = require("mongoose");
module.exports =  mongoose.model('ListObatRS', {
        kodeobat : {type : String, default: ''},
        koders : {type : String, default: ''},
        nama : {type : String, default: ''},
        satuanbesar : {type : String, default: ''},
        satuankecil : {type : String, default: ''},
        konversi : {type : String, default: ''},
        hargabesar : {type : String, default: ''},
        hargakecil : {type : String, default: ''},
        namars:{type: String,default:''},
        status : {type : String, default: 'active'},
        created_at : {type : Date, default: Date.now()},
});