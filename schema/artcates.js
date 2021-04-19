const joi = require('@hapi/joi')
    // 导入定义验证规则的模块
    // 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
    // 校验规则对象 - 添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params: {
        id,
    },
}
exports.get_cate_schema = {
    params: {
        id,
    },
}

exports.update_cate_schema = {
    body: {
        id: id,
        name,
        alias,
    },
}