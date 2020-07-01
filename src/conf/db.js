/**
 * @description 数据库配置
 * @author 难凉热血
 */

const path = require("path");
const { isProd } = require("../utils/env");

let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};

let SQLITE_CONF = {
  storage: path.resolve(__dirname, "../../db.sqlite3"),
};

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };

  SQLITE_CONF = {
    storage: path.resolve(__dirname, "../../db.sqlite3"),
  };
}

module.exports = {
  REDIS_CONF,
  SQLITE_CONF,
};
