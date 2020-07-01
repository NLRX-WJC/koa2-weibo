/**
 * @description 数据模型入口文件
 * @author 难凉热血
 */

const User = require("./User");
const Blog = require("./Blog");

Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Blog,
};
