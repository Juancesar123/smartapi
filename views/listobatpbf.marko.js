// Compiled using marko@4.3.1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename);

function render(input, out) {
  var data = input;

  out.w("<section class=\"content-header\"><h1>List Obat PBF <small>List Obat PBF</small></h1><ol class=\"breadcrumb\"><li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li><li class=\"active\">List Obat PBF</li></ol></section><br><div class=\"box box-primary\"><div class=\"box-header\"><button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fa fa-plus\"></i> Tambah Data </button> </div><div class=\"box-body\"><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Tambah Data Obat</h4></div><div class=\"modal-body\"><div class=\"form-group\"><label>Nama</label><input type=\"text\" class=\"form-control\" ng-model=\"nama\"></div><div class=\"form-group\"><label>Kode PBF</label><select class=\"form-control\" ng-model=\"koders\" ng-change=\"carikode()\"><option ng-repeat=\"item in carikoders\" value=\"{{item.uid}}\">{{item.uid}}</option></select></div><div class=\"form-group\"><label>Nama PBF</label><input type=\"text\" class=\"form-control\" ng-model=\"namars\" disabled></div><div class=\"form-group\"><label>Satuan Besar</label><input type=\"text\" class=\"form-control\" ng-model=\"satuanbesar\"></div><div class=\"form-group\"><label>Satuan Kecil</label><input type=\"text\" class=\"form-control\" ng-model=\"satuankecil\"></div><div class=\"form-group\"><label>Konversi</label><input type=\"text\" class=\"form-control\" ng-model=\"konversi\"></div><div class=\"form-group\"><label>Harga Besar</label><input type=\"text\" class=\"form-control\" ng-model=\"hargabesar\"></div><div class=\"form-group\"><label>Harga Kecil</label><input type=\"text\" class=\"form-control\" ng-model=\"hargakecil\"></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"simpan()\"><i class=\"fa fa-send\"></i> Submit</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div>PBF</div></div></div><div id=\"myModal1\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Ubah Data Obat</h4></div><div class=\"modal-body\"><div class=\"form-group\"><label>Nama</label><input type=\"text\" class=\"form-control\" ng-model=\"nama\"></div><div class=\"form-group\"><label>Kode PBF</label><select class=\"form-control\" ng-model=\"koders\" ng-change=\"carikode()\"><option ng-repeat=\"item in carikoders\" value=\"{{item.uid}}\">{{item.uid}}</option></select></div><div class=\"form-group\"><label>Nama PBF</label><input type=\"text\" class=\"form-control\" ng-model=\"namars\" disabled></div><div class=\"form-group\"><label>Satuan Besar</label><input type=\"text\" class=\"form-control\" ng-model=\"satuanbesar\"></div><div class=\"form-group\"><label>Satuan Kecil</label><input type=\"text\" class=\"form-control\" ng-model=\"satuankecil\"></div><div class=\"form-group\"><label>Konversi</label><input type=\"text\" class=\"form-control\" ng-model=\"konversi\"></div><div class=\"form-group\"><label>Harga Besar</label><input type=\"text\" class=\"form-control\" ng-model=\"hargabesar\"></div><div class=\"form-group\"><label>Harga Kecil</label><input type=\"text\" class=\"form-control\" ng-model=\"hargakecil\"></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-success\" ng-click=\"actionedit()\"><i class=\"fa fa-send\"></i> Submit</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div><table ng-table=\"tableParams\" class=\"table table-striped\" show-filter=\"true\"><tr ng-repeat=\"user in $data\"><td width=\"30\" style=\"text-align: left\" header=\"'headerCheckbox.html'\"><input type=\"checkbox\" checklist-model=\"item.block\" checklist-value=\"user._id\"> {{user.roles}}</td><td title=\"'Kode Obat'\" filter=\"{ kodeobat: 'text'}\" sortable=\"'kodeobat'\">{{user.kodeobat}}</td><td title=\"'kode PBF'\" filter=\"{ kodepbf: 'text'}\" sortable=\"'kodepbf'\">{{user.kodepbf}}</td><td title=\"'Nama PBF'\" filter=\"{ namapbf: 'text'}\" sortable=\"'namapbf'\">{{user.namapbf}}</td><td title=\"'Nama'\" filter=\"{ nama: 'text'}\" sortable=\"'nama'\">{{user.nama}}</td><td title=\"'Satuan Besar'\" sortable=\"'satuanbesar'\" filter=\"{ satuanbesar: 'text'}\">{{user.satuanbesar}}</td><td title=\"'Satuan Kecil'\" sortable=\"'satuankecil'\" filter=\"{ satuankecil: 'text'}\">{{user.satuankecil}}</td><td title=\"'Konversi'\" sortable=\"'konversi'\" filter=\"{ konversi: 'text'}\">{{user.konversi}}</td><td title=\"'Harga Besar'\" sortable=\"'hargabesar'\" filter=\"{ hargabesar: 'text'}\">{{user.hargabesar}}</td><td title=\"'Harga Kecil'\" sortable=\"'hargakecil'\" filter=\"{ hargakecil: 'text'}\">{{user.hargakecil}}</td><td title=\"'Status'\" sortable=\"'status'\" filter=\"{ status: 'text'}\">{{user.status}}</td><td title=\"'Action'\"><button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#myModal1\" ng-click=\"edit(user)\"><i class=\"fa fa-edit\"></i> Edit</button> <button class=\"btn btn-danger\" ng-click=\"hapus(user)\"><i class=\"fa fa-trash\"></i> Hapus</button></td></tr></table></div></div><script type=\"text/ng-template\" id=\"headerCheckbox.html\">\n  <input type=\"checkbox\" ng-model=\"checkboxes.checked\" id=\"select_all\" name=\"filter-checkbox\" value=\"\" />\n</script>");
}

marko_template._ = render;

marko_template.meta = {};
