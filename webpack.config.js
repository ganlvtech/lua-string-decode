module.exports = {
    entry: './src/lua-string-decode.js',
    mode: 'production',
    output: {
        filename: 'lua-string-decode.bundle.js',
        library: 'LuaStringDecode'
    }
};