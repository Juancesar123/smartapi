// Compiled using marko@4.3.1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    head_template = marko_loadTemplate(require.resolve("../includes/head.marko")),
    header_template = marko_loadTemplate(require.resolve("../includes/header.marko")),
    sidemenu_template = marko_loadTemplate(require.resolve("../includes/sidemenu.marko")),
    footer_template = marko_loadTemplate(require.resolve("../includes/footer.marko")),
    script_template = marko_loadTemplate(require.resolve("../includes/script.marko")),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/taglibs/core/include-tag")),
    component_globals_tag = marko_loadTag(require("marko/components/taglib/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!DOCTYPE html><html ng-app=\"mainApp\"><head>");

  include_tag({
      _target: head_template
    }, out);

  out.w("</head><body class=\"hold-transition skin-blue sidebar-mini\">");

  component_globals_tag({}, out);

  out.w("<div class=\"wrapper\">");

  include_tag({
      _target: header_template
    }, out);

  include_tag({
      _target: sidemenu_template
    }, out);

  out.w("<div class=\"content-wrapper\"><section class=\"content\"><div ng-view></div></section></div>");

  include_tag({
      _target: footer_template
    }, out);

  out.w("</div>");

  include_tag({
      _target: script_template
    }, out);

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "../includes/head.marko",
      "../includes/header.marko",
      "../includes/sidemenu.marko",
      "../includes/footer.marko",
      "../includes/script.marko",
      "marko/taglibs/core/include-tag",
      "marko/components/taglib/component-globals-tag",
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
