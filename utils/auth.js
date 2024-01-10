async function authSlat(ctx, next) {
  const { slat } = ctx.request;
  if (ctx.request.method === "GET" || ctx.request.url === "/we/upload") {
    await next();
    return;
  }
  if ((slat || "").toString() !== process.env.SLAT.toString()) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      message: "验证失败",
    });
  }
  await next();
}
module.exports = authSlat;
