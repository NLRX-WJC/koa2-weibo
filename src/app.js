const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const path = require("path");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");

const { REDIS_CONF } = require("./conf/db");
const { isProd } = require("./utils/env");

const index = require("./routes/index");
const users = require("./routes/users");
const errorViewRouter = require("./routes/view/error");

// error handler
let onErrorConf = {};
if (isProd) {
  onErrorConf = {
    redirect: "/error",
  };
}
onerror(app, onErrorConf);

app.keys = ["nlrx"];

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(require("koa-static")(__dirname + "/public"))
  .use(
    views(path.join(__dirname, "/views"), {
      options: { settings: { views: path.join(__dirname, "views") } },
      map: { ejs: "ejs" },
      extension: "ejs",
    })
  )
  // session 配置
  .use(
    session({
      key: "weibo:sid",
      prefix: "weibo:sess:",
      cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
      }),
    })
  );

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
