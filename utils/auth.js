async function authSlat(ctx, next) {
  const { slat } = ctx.request.body;
  if ((slat || "").toString() !== process.env.SLAT.toString()) {
    return (ctx.body = {
      success: false,
      message: "验证失败",
    });
  }
  await next();
}
module.exports = authSlat;
