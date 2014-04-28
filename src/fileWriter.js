var fs = require('fs');

function FileWriter(fileName) {
    this.filename = fileName;
}

FileWriter.prototype.write = function(data) {
    var filename = this.filename;
    fs.writeFile(filename, JSON.stringify(data), function(err) {
        if(err) {
            throw new Error(err);
        } else {
            console.log("JSON saved to " + filename);
        }
    });
};
module.exports = FileWriter;