const joi = require('joi')

// 验证规则对象 - 发布文章
exports.add_article_schema = {
    body: {
        title: joi.string().required(),
        cate_id: joi.number().integer().min(1).required(),
        content: joi.string().required().allow(''),
        state: joi.string().valid('已发布', '草稿').required()
    }
}