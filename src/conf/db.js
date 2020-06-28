/**
 * @description 数据库配置
 * @author难凉热血
 */

const { isProd } = require("../utils/env");
let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  REDIS_CONF,
};
