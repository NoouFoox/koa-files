const path = require("path");
const fs = require("fs");
const getAllFile = (url) =>
  fs
    .readdirSync(url)
    .flatMap((d) =>
      fs.lstatSync(path.join(url, d)).isFile()
        ? { name: d, stats: fs.statSync(path.join(url, d)) }
        : []
    );
module.exports = { getAllFile };
