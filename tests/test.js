const fs = require('fs');
const path = require('path');
const LuaStringDecode = require('../src/lua-string-decode');

let inputFile = path.join(__dirname, 'test.lua');
let outputFile = path.join(__dirname, 'test_decoded.lua');

fs.readFile(inputFile, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    fs.writeFile(outputFile, LuaStringDecode.decode(data), {encoding: 'utf-8'}, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('The file was saved!');
    });
});
