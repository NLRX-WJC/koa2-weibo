/**
 * @description 环境变量
 * @author 难凉热血
 */

const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: ENV === "development",
  notDev: ENV !== "development",
  isProd: ENV === "production",
  notProd: ENV !== "production",
};
