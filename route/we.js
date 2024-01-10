const dotenv = require("dotenv");
const { getAllFile } = require("../utils/utils");
const Router = require("koa-router");
const router = new Router({ prefix: "/we" });
const path = require("path");
const fs = require("fs");
const { koaBody } = require("koa-body");
dotenv.config();
const file_path = process.env.FILE_PATH;
router.get("/", async (ctx) => {
  ctx.body = {
    data: getAllFile(file_path),
  };
});
router.post(
  "/upload",
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.env.FILE_PATH,
      keepExtensions: true,
      onFileBegin: (name, file) => {
        const nanoName = Date.now().toString(36) + file.originalFilename;
        file.newFilename = nanoName;
        file.filepath = path.join(process.env.FILE_PATH, nanoName);
      },
    },
  }),
  async (ctx) => {
    ctx.response.body = "done";
  }
);
router.delete("/:fname", async (ctx) => {
  const { fname } = ctx.params;
  const { pwd } = ctx.request.body;
  if ((pwd || "").toString() !== process.env.DEL_PWD.toString()) {
    return (ctx.body = {
      success: false,
      message: "密码错误",
    });
  }
  if (
    getAllFile(file_path)
      .map((d) => d.name)
      .includes(fname)
  ) {
    console.log(path.join(process.env.FILE_PATH, fname));
    fs.unlinkSync(path.join(process.env.FILE_PATH, fname));
    ctx.body = {
      success: true,
      message: "删除成功",
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "没有此文件",
    };
    return;
  }
});
module.exports = router;
