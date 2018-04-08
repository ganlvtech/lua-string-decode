const luaparse = require('luaparse');
const utf8 = require('utf8');
const LuaAstPrinter = require('./lua-ast-printer');

(function () {
    function escapeLuaString(value) {
        value = value.replace(/\\/g, '\\\\')
            .replace(/\x07/g, '\\a')
            .replace(/\x08/g, '\\b')
            .replace(/\f/g, '\\f')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\x0B/g, '\\v');
        if (value.indexOf('\'') < 0) {
            return '\'' + value + '\'';
        } else if (value.indexOf('"') < 0) {
            return '"' + value + '"';
        } else {
            return '\'' + value.replace(/'/g, '\\\'') + '\'';
        }
    }

    let original = luaparse.ast.literal;
    luaparse.ast.literal = function () {
        let node = original.apply(null, arguments);
        if (node.type === 'StringLiteral') {
            try {
                node.value = utf8.decode(node.value);
                node.raw = escapeLuaString(node.value);
            } catch (e) {
                console.log(node);
                console.log(e);
            }
        }
        return node;
    };
})();

function decode(code) {
    let ast = luaparse.parse(code, LuaAstPrinter.luaParseDefaultOptions);
    return LuaAstPrinter.formatAst(ast);
}

exports.decode = decode;