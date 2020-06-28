/**
 * @description 链接 redis 的方法 get set
 * @author 难凉热血
 */

const redis = require("redis");

const { REDIS_CONF } = require("../conf/db");

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", (err) => {
  console.error("redis error", err);
});

// set
/**
 * redis set
 * @param {string} key
 * @param {string} val
 * @param {number} timeout 过期时间，单位 秒
 */
const set = (key, val, timeout = 60 * 60) => {
  if (val && typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
};

// get
/**
 * redis get
 * @param {string} key
 */
const get = (key) => {
  let promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(val);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val);
      }
    });
  });

  return promise;
};

module.exports = {
  set,
  get,
};
