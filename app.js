// 导入express模块
const express = require('express')
    // 创建express服务器实例
const app = express()
const joi = require('@hapi/joi')
    // 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件 
app.use(express.urlencoded({ encoded: false }))
app.use('/uploads', express.static('./uploads'))
    // 路由之前封装 res.cc函数
app.use((req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
const config = require('./config')
    // 解析 token 的中间件
const expressJWT = require('express-jwt')
    // 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
    // app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
    // 导入并使用用户路由模块
const userRouter = require('./router/user')
const { response } = require('express')
app.use('/api', userRouter)

const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 获取文章路由
const articleCateRouter = require('./router/atriclecate')
app.use('/my/article/', articleCateRouter)

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
    // 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)
    // 错误中间件


app.use(function(err, req, res, next) {
        // 省略其它代码...
        // 捕获身份认证失败的错误
        if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
            // 未知错误...
        return res.cc(err)
    })
    // 调用app.listen方法， 指定端口号并启动web服务器
app.listen(3000, function() {
    console.log('api sever running at http://101.133.165.226/:3000');
})