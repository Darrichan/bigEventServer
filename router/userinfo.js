// const express = require('express')
// const router = express.Router

// router.get('/userinfo', (req, res) => {
//     res.send('OK!')
// })
// module.exports = router



// 导入 express
const express = require('express')
    // 创建路由对象
const router = express.Router()
    // 导入用户信息处理模块
const userinfo_handler = require('../router_handler/userinfo')
    // 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
    // 导入验证规则
const {
    updata_userinfo_schema,
    up,
    updata_password_schema,
    update_avatar_schema
} = require('../schema/user')
    // 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
    // 更新用户密码
router.post('/updatepwd', expressJoi(updata_password_schema), userinfo_handler.updatePassword)
    // 更新用户信息的路由
router.post('/userinfo', expressJoi(updata_userinfo_schema), userinfo_handler.updateUserInfo)
    // 更改用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updataAvatar)
    // 获取文章列表
    // router.post('')
module.exports = router