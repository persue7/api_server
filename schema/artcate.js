// 导入定义验证规则的包
const joi = require('joi')

// 2. 定义 name 和 alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

exports.add_cate_schema = {
    body: {
        name: name,
        alias: alias
    },
}