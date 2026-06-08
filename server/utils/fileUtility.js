const fs = require("fs");

module.exports.deleteTempFile = (path) => {

    fs.unlink(path, (err) => {
        if (err) {
            console.error("error:", err);
            return;
        }
        console.log("file deleted!");
    });
}