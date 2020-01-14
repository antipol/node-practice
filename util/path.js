const path = require("path");

//following constructs a path to the parent directory
module.exports = path.dirname(process.mainModule.filename);
