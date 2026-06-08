const fs = require("fs");

module.exports.deleteTempFile = (path) => {
    try {
        fs.unlink(path, (err) => {
            if (err)
                return;
        });
    } catch (error) {
        console.log(error)
    }
}