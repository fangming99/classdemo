const {checkName: checkRegName,checkPassword:checkRegPassword} = require('../common/utils')
const {findOne}=require('../models/user')
const model= require('../models/user')
// const { model } = require('mongoose')



async function checkName(name) {
  let data={flag:true}
    //正则检查
  if (checkRegName(name)){
      //用户名是否重复

    let result=await model.findOne({name})
    if(result){
      data.flag=false
      data.message='用户名重复'
    }

  }else{
    data.flag=false
    data.message='用户名不符合要求'
  }
  return data
}
async function checkPassword(password){

  return checkRegPassword(password)
}



//注册
async function regist(name,password){

  await model.insertOne({ name, password} )
}



//登录
async function login(name,password){

  let result=await model.findOne({ name, password} )
  let data={status:'success'}
  if(!result){
    data.status='failed'
    data.message='密码不正确'
  }
  return data
}

module.exports = {
  checkName,
  checkPassword,
  regist,
  login
}
