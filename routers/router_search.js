const express = require("express");
const {Users, Posts} = require("../models")
const {Op} = require("sequelize");
const router = express.Router();
const connection = require("../assets/mySqlLib")
const authMiddlewareAll = require("../middlewares/auth-middleware_all")
const Joi = require("joi")


// FIXME SQL Injection은 어떻게 막지? / Keyword에서 문제가 무조건 생긴다. / 특수문자를 입력받지 말자
const keywordSchema = Joi.string().required().pattern(new RegExp("^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\\s|0-9a-zA-z]{1,30}$"))
const userIdSchema = Joi.number().required()

router.get('/search', authMiddlewareAll, async (req, res) => {
    try {
        let result = [];

        const keyword = await keywordSchema.validateAsync(Object.keys(req.query).length ? req.query.keyword : req.body.keyword);
        // userId 0번은 존재하지 않으므로 Favorites에 0을 검색해 모든 favorite를 FALSE로 출력한다.
        const userId = await userIdSchema.validateAsync(Object.keys(res.locals).length ? res.locals.user.userId : 0);

        //FIXME query를 mysql 모듈로 사용하지 않고 ORM을 사용하도록 수정하자
        const query = `select postId, img, 
            case when postId in (select postId from Favorites where userId = ${userId}) then "TRUE" else "FALSE" end as favorite
            from Posts
            where title like '%${keyword}%';`;
        // mysql 모듈에서 query를 실행시킨다.
        connection.query(query, function (err, posts, fields) {
            if (err) {
                console.error(err);
                res.status(400).send({
                        errorMessage: "Posts 값들이 존재하지 않습니다."
                    }
                )
                return;
            }
            for (const post of posts) {
                result.push(
                    {
                        postId: post.postId,
                        img: post.img,
                        favorite: post.favorite,
                    }
                )
            }
            res.send({result})
        });
    } catch (error) {
        // console.log(error);
        res.status(412).send({
            errorMessage: "입력된 데이터형식이 일치하지 않습니다."
        })
        return;
    }
})

module.exports = router