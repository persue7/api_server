const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
        // if (!userinfo.username || !userinfo.password) {
        //     return res.send({
        //         status: 1,
        //         msg: '用户名或密码不合法'
        //     })
        // }
        // 定义 SQL 语句，查询用户名是否被占用

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        //用户名重复
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                return res.send({ status: 1, message: err.message })
            }
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }

            // res.send({ status: 0, message: '用户注册成功！' })
            res.cc('用户注册成功！', 0)
        })
    })

}

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo = req.body
        // 定义 SQL 语句
    const sql = `select * from ev_users where username=?`
        // 执行 SQL 语句，根据用户名查询用户的信息
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
        if (results.length !== 1) return res.cc('用户名不正确登录失败！')

        // TODO：判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码不正确登录失败！')

        // TODO：在服务器端生成 Token 的字符串
        const user = {...results[0], password: '', user_pic: '' }

        // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

        // 调用 res.send() 将 Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}