// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'sex-wx-1gla3c2p6b26d264'
})


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  var arr = new Array;
  var i = 0
  const $ = db.command.aggregate
  console.log(111)
  try {
     await db.collection('dmeo2').get()
      .then(res => {
        arr = res.data
      })
  } catch(e) {
    console.error(e)
  }
  console.log(arr.length)
  for(let i = 0;i < arr.length;i++){
    db.collection('dmeo2').where({
      name : arr[i].name
    }).update({
      data :{
        name : 'x'+arr[i].name.substring(2)
      }
    }).then(res =>{
      console.log(res)
    })
  }

}