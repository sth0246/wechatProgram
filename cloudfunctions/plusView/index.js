
// const cloud = require('wx-server-sdk')

// cloud.init({
//   env:'sex-wx-1gla3c2p6b26d264'
// })
const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({
  env:'sex-wx-1gla3c2p6b26d264'
});
// 1. 获取数据库引用


exports.main = async (event, context) => {
  const db = app.database();

  const _ = db.command;
  const res = await db
    .collection(event.table)
    .where({
      _id: event._id
    })
    .update({
        view: _.inc(1)
    })
  return {
    res
  };
};

