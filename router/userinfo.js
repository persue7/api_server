const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')
    // 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象
const Reg = require('../schema/user')

// 挂载路由
// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(Reg.updateInfo), userinfo_handler.updateUserInfo)

// 更新密码的路由
router.post('/updatepwd', expressJoi(Reg.update_password_schema), userinfo_handler.updatePassword)

// 更换头像的路由
router.post('/update/avatar', expressJoi(Reg.update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router