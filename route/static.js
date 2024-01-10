const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { getAllFile } = require("../utils/utils");
dotenv.config();
const router = new Router();
const file_path = process.env.FILE_PATH;

router.get(/\/static*/, async (ctx) => {
  const fileName = path.basename(ctx.path);
  const fielNames = getAllFile(file_path).map((d) => d.name);
  if (fielNames.includes(fileName)) {
    return (ctx.body = fs.readFileSync(path.join(file_path, fileName)));
  } else {
    ctx.status = 404;
    return null;
  }
});
module.exports = router;
