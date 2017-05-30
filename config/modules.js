 module.exports = function(app,multer,md5) {
    require("../app/homepage/Controller/homeController")(app,multer);
    require("../app/managementuser/Controller/managementuserController")(app,multer);
    require("../app/daftarrs/Controller/daftarrsController")(app,multer);
    require("../app/daftarpbf/Controller/daftarpbfController")(app,multer);
    require("../app/datacabang/Controller/datacabangController")(app,multer);
    require("../app/listobatrs/Controller/listobatController")(app,multer);
    require("../app/listobatpbf/Controller/listobatpbfController")(app,multer);
}