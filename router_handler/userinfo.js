const db = require('../db/index')
    // 导入用户密码处理模块
const bcrypt = require('bcryptjs')



// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    const sqlstr = 'SELECT id,username,nickname,email,user_pic FROM `test` WHERE id =?'
        // console.log(req);
        // console.log(req.user.id);
    db.query(sqlstr, req.user.id, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.length !== 1) {
                return res.cc('获取用户信息失败！')
            }
            res.send({
                status: 0,
                message: '获取用户信息成功',
                data: results[0]

            })
        })
        // console.log('OK!');
}
exports.updateUserInfo = (req, res) => {
    // res.send('ok')
    const sqlstr = 'update test set? where id =?'
    db.query(sqlstr, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('更新用户基本信息失败！')
        }
        res.cc('更新用户成功', 0)
    })
}
exports.updatePassword = (req, res) => {
        // res.send('重置密码成功！')
        const sqlstr = 'select*From test where id=?'
        db.query(sqlstr, req.user.id, (err, results) => {
                if (err) {
                    return res.cc(err)
                }
                if (results.length !== 1) {
                    return res.cc('用户名不存在！')
                }
                const compareResult = bcrypt.compareSync(req.body.oldpwd, results[0].password)
                if (!compareResult) {
                    return res.cc('请输入正确的原密码！')
                }

                const sqlstr = 'UPDATE test SET password =? WHERE id =?'
                    // console.log(sqlstr);
                const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
                    // console.log(newPwd);
                    // console.log(req.user.id);
                db.query(sqlstr, [newPwd, req.user.id], (err, results) => {
                    if (err) {
                        return res.cc(err)
                    }
                    if (results.affectedRows !== 1) {
                        return res.cc('修改密码失败！')
                    }
                    res.send({
                        status: 0,
                        message: '修改密码成功！'
                    })
                })

            }
            // console.log(sqlstr); console.log(req);

            //     // 执行 SQL 语句，根据 id 更新用户的密码


        )
    }
    // 更新用户头像的处理函数
exports.updataAvatar = (req, res) => {
    const sqlstr = 'update test set user_pic=? where id =?'
    db.query(sqlstr, [req.body.avatar, req.user.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('更新用户头像失败！')
            }
            res.cc('更换头像成功！', 0)
        })
        // res.send('GEGNXINYONGHUCHENGG!')
}