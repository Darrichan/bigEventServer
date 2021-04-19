const express = require('express')
const router = express.Router()
const articlecates_handler = require('../router_handler/articlecate')
const expressJoi = require('@escook/express-joi')
const { add_cate_schema } = require('../schema/artcates')
const { delete_cate_schema } = require('../schema/artcates')
const { update_cate_schema } = require('../schema/artcates')
    // 导入根据 Id 获取分类的验证规则对象
const { get_cate_schema } = require('../schema/artcates')

router.get('/cates', articlecates_handler.getArticleCates)

router.post('/addcates', expressJoi(add_cate_schema), articlecates_handler.addArticleCate)
router.get('/deletecate/:id', expressJoi(delete_cate_schema),
        articlecates_handler.deleteCateById)
    // 根据 Id 获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), articlecates_handler.getArticleById)
    // 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), articlecates_handler.updateCateById)

module.exports = router