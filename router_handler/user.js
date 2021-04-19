// 导入数据库操作模块
const db = require('../db/index')
    // 打入bcryptjs模块
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const express = require('express')
const router = express.Router()
    // 注册新用户的处理函数
exports.reguser =
    (req, res) => {
        const userinfo = req.body
            // console.log(userinfo);
            // if (!userinfo.username || !userinfo.password) {
            //     // return res.send({
            //     //     status: 1,
            //     //     message: '用户名或密码不能为空！'
            //     // })
            //     return res.cc('用户名或密码不能为空！')
            // }
            // res.send('regser ok')
        const sqlstr = 'select*from test where username=?'
        db.query(sqlstr, [userinfo.username], (err, results) => {
            if (err) {
                // return res.send({ status: 1, messsage: err.message })
                return res.cc(err)
            }
            // 判断用户名是否被占用
            if (results.length > 0) {
                // return res.send({ status: 1, messsage: '用户名被占用，请更换其他用户！' })
                return res.cc('用户名被占用，请更换其他用户！')
            }

            // 调用bcrypt进行密码加密
            // console.log(userinfo.password);
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
                // console.log(userinfo.password);

            // 定义插入新用户的SQL语句
            const sqlstr = 'insert into test set ?'
            db.query(sqlstr, {
                username: userinfo.username,
                password: userinfo.password
            }, (err, results) => {
                if (err) {
                    // return res.send({
                    //     status: 1,
                    //     message: err.message
                    // })
                    return res.cc(err)
                }
                if (results.affectedRows !== 1) {
                    // return res.send({
                    //     status: 1,
                    //     message: '用户注册失败，请稍微再试！'
                    // })
                    return res.cc('用户注册失败，请稍微再试')
                }
                res.send({
                    status: 0,
                    message: '注册成功！'
                })
            })

        })


    }


// 登录的处理函数
exports.login =
    (req, res) => {
        const userinfo = req.body
        const sqlstr = 'select*from test where username=?'
        db.query(sqlstr, [userinfo.username], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.cc(err)
            }
            // 执行 SQL 语句成功，但是查询到数据条数不等于 1
            // if (results.length !== 1) return res.cc('登录失败！')
            // TODO：判断用户输入的登录密码是否和数据库中的密码一致
            if (results.length !== 1) {
                return res.cc('登录失败！')
            }
            const commpaResult = bcrypt.compareSync(userinfo.password, results[0].password)
                // console.log(commpaResult);
            if (!commpaResult) { return res.cc('登录失败！') }
            // res.send('login ok!')
            //token
            const user = {...results[0], password: '', user_pic: '' }
                // console.log(user);
            const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
                // const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                //     expiresIn: '10h', // token 有效期为 10 个小时
                //     })

            res.send({
                status: 0,
                message: '登录成功!',
                token: 'Bearer ' + tokenStr
            });

        })

    }