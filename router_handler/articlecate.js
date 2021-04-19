const db = require('../db/index')
exports.getArticleCates = (req, res) => {
    const sqlstr = 'select * from article where is_delete=0 order by id asc'
    db.query(sqlstr, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            message: '获取文章列表成功',
            data: results,
        })
    })
}
exports.addArticleCate = (req, res) => {
    const sql = `select * from article where name=? or alias=?`
        // 执行查重操作
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
            // 分别判断 分类名称 和 分类别名 是否被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用， 请更换后重试！ ')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用， 请更换后重试！ ')
            // TODO：新增文章分类
        const sql = `insert into article set ?`
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
                // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) {
                return res.cc(res.message)
            }
            // 新增文章分类成功
            res.cc('新增文章分类成功！', 0)
        })
    })

}
exports.deleteCateById = (req, res) => {
    const sql = `update article set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
            // 删除文章分类成功
        res.cc('删除文章分类成功！', 0)
    })

    // res.send('Delete~ok!')
}
exports.getArticleById = (req, res) => {
        const sql = `select * from article where id=?`
        db.query(sql, req.params.id, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
                // SQL 语句执行成功，但是没有查询到任何数据
            if (results.length !== 1) return res.cc('获取文章分类数据失败！')
                // 把数据响应给客户端
            res.send({
                status: 0,
                message: '获取文章分类数据成功！',
                data: results[0],
            })
        })

    }
    // 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    const sql = `select * from article where name=? or alias=?`
        // 执行查重操作
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
            // 分别判断 分类名称 和 分类别名 是否被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用， 请更换后重试！ ')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用， 请更换后重试！ ')
            // TODO：新增文章分类
        const sql = `update article set ? where Id=?`
        db.query(sql, [req.body, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
                // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
                // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}