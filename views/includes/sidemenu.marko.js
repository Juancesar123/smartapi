// Compiled using marko@4.3.1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/components/taglib/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<html><head></head><body>");

  component_globals_tag({}, out);

  out.w("<aside class=\"main-sidebar\" ng-controller=\"mainController\"><section class=\"sidebar\"><div class=\"user-panel\"><div class=\"pull-left image\"><img src=\"dist/img/user2-160x160.jpg\" class=\"img-circle\" alt=\"User Image\"></div><div class=\"pull-left info\"><p>Alexander Pierce</p><a href=\"#\"><i class=\"fa fa-circle text-success\"></i> Online</a></div></div><form action=\"#\" method=\"get\" class=\"sidebar-form\"><div class=\"input-group\"><input type=\"text\" name=\"q\" class=\"form-control\" placeholder=\"Search...\"><span class=\"input-group-btn\"><button type=\"submit\" name=\"search\" id=\"search-btn\" class=\"btn btn-flat\"><i class=\"fa fa-search\"></i></button></span></div></form><ul class=\"sidebar-menu\"><li class=\"header\">MAIN NAVIGATION</li><li class=\"treeview\"><a href=\"\"><i class=\"fa fa-users\"></i> <span>User Management</span><span class=\"pull-right-container\"><i class=\"fa fa-angle-left pull-right\"></i></span></a><ul class=\"treeview-menu\"><li ng-class=\"getClass('/userrs')\"><a href=\"#/userrs\"><i class=\"fa fa-circle-o\"></i> User RS</a></li><li ng-class=\"getClass('/userpbf')\"><a href=\"#/userpbf\"><i class=\"fa fa-circle-o\"></i>User PBF</a></li><li ng-class=\"getClass('/useradministrator')\"><a href=\"#/useradministrator\"><i class=\"fa fa-circle-o\"></i>User Administrator</a></li></ul></li><li ng-class=\"getClass('/daftarrs')\"><a href=\"#/daftarrs\"><i class=\"fa fa-hospital-o\"></i><span>Daftar RS</span></a></li><li ng-class=\"getClass('/daftarpbf')\"><a href=\"#/daftarpbf\"><i class=\"fa fa-medkit\"></i> <span>Daftar PBF</span></a></li><li ng-class=\"getClass('/datacabang')\"><a href=\"#/datacabang\"><i class=\"fa fa-th\"></i> <span>Daftar cabang</span></a></li><li class=\"treeview\"><a href=\"\"><i class=\"fa fa-pie-chart\"></i><span>Barang</span><span class=\"pull-right-container\"><i class=\"fa fa-angle-left pull-right\"></i></span></a><ul class=\"treeview-menu\"><li ng-class=\"getClass('/listobat')\"><a href=\"pages/charts/chartjs.html\"><i class=\"fa fa-circle-o\"></i> List Obat</a></li><li ng-class=\"getClass('/mapingobat')\"><a href=\"pages/charts/morris.html\"><i class=\"fa fa-circle-o\"></i> Maping Obat</a></li></ul></li><li ng-class=\"getClass('/beranda')\"><a href=\"pages/widgets.html\"><i class=\"fa fa-th\"></i> <span>Purchese Order</span></a></li></ul></section></aside>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/components/taglib/component-globals-tag",
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
