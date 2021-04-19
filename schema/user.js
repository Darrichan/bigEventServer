const joi = require('@hapi/joi')
    // 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
    // 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
const avatar = joi.string().dataUri().required()

// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
    // 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}
exports.updata_userinfo_schema = {
        // 表示需要对 req.body 中的数据进行验证
        body: {
            id,
            nickname,
            email
        },
    }
    // 更新密码的验证规则对象
exports.updata_password_schema = {
    body: {
        oldpwd: password,
        newPwd: joi.not(joi.ref('oldpwd')).concat(password)
    }
}
exports.update_avatar_schema = {
    body: {
        avatar
    }
}