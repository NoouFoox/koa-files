const Router = require("koa-router");
const router = new Router();
router.get("/", async (ctx) => {
  ctx.body = {
    code: 404,
  };
});
module.exports = router;
