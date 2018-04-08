'use strict';
const comments_1 = require('../node_modules/lua-fmt/dist/src/comments');
const printer_1 = require('../node_modules/lua-fmt/dist/src/printer');
const docPrinter_1 = require('../node_modules/lua-fmt/dist/src/docPrinter');
const options_1 = require('../node_modules/lua-fmt/dist/src/options');

exports.luaParseDefaultOptions = {
    locations: true,
    ranges: true
};

function formatAst(ast, userOptions) {
    const options = Object.assign({}, options_1.defaultOptions, userOptions);
    comments_1.injectShebang(ast, options);
    comments_1.attachComments(ast, options);
    const doc = printer_1.buildDocFromAst(ast, options);
    return docPrinter_1.printDocToString(doc, options);
}

exports.formatAst = formatAst;
