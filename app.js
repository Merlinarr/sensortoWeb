// 导入 express
const express = require('express')
    // 创建服务器的实例对象
const app = express()
const joi = require('joi')

const path = require('path')
const fs = require('fs')


const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static('./uploads'))

app.use((req, res, next) => {

    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//--------------------
const Datahandle = require('./router/datahandle')
app.use('/api', Datahandle)

// 定义错误级别的中间件
app.use((err, req, res, next) => {

    res.cc(err)
})

// https.createServer(options, app).listen(3007);

//启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})