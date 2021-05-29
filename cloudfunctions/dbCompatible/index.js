// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init({
  env: 'mail-list-9gl8aqie19d28ecc'
})



// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  var target = /cloudbase/
  var cup = "";
  const _ = db.command;
  var arr = new Array;
  var temp = event.temp; //指定修改table
  var word = event.word; //指定修改字段
  var str = "cloud://mail-list-9gl8aqie19d28ecc.6d61-mail-list-9gl8aqie19d28ecc-1305628714/updolad";
  await db.collection(temp)
    .get()
    .then(res => {

      arr = res.data;

    })

  for (let i = 0; i < arr.length; i++) {
    var that = this;
    if (!/1257796010/.test(arr[i][word])) { //arr[i].cover.length >= 138
      console.log("没有执行修改")
      console.log(arr[i][word].length)
    } else {
      

      if (arr[i][word] != null) {
        cup = arr[i][word]
        console.log(cup)
        var index = cup.search(/cloudbase/)
        arr[i][word] = str + cup.substring(index - 1);
        db.collection(temp).where({
          _id: arr[i]._id
        }).update({
          data: {
            cover : arr[i][word]
          }
        })
        .then(res =>{
          console.log(res)
        })
        console.log("111")
        console.log("执行修改了")
      } else {
        console.log("未存在该字段")
      }
    }
  }
}