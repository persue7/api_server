// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
// const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
    // const email=joi.string().email().required()
exports.userSchema = {
    body: {
        // 定义用户名和密码的验证规则
        username: joi.string().alphanum().min(1).max(10).required(),
        password: password,

    }
}
exports.updateInfo = {
    body: {
        // 定义 id, nickname, email 的验证规则
        id: joi.number().integer().min(1).required(),
        nickname: joi.string().required(),
        email: joi.string().email().required()
    }
}
exports.update_password_schema = {
    body: {
        oldPwd: password,
        // newPwd: joi.ref('oldPwd'),
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.update_avatar_schema = {
    body: {
        avatar: joi.string().dataUri().required()
    }
}


// exports.reg_login_schema = {
//     body: {
//         username,
//         password
//     }
// }