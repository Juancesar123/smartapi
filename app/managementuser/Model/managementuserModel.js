var mongoose = require("mongoose");
module.exports =  mongoose.model('User', {
        username : {type : String, default: ''},
        uid : {type : String, default: ''},
        password : {type : String, default: ''},
        level : {type : String, default: ''},
        status : {type : String, default: 'active'},
        gambar : {type : String, default: 'img/noimage.jpg'},
        nama : {type : String, default: ''},
        created_at : {type : Date, default: Date.now()},
});