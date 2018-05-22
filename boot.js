'use strict';
const PORT = 9999;
const express = require('express');
const http = require("http")
const path = require('path');
const ejs = require("ejs");

const page = require('./router/routes');

var app = express();
// 设置 view 引擎
app.set('views', path.join(__dirname, 'view'));

//修改view 引擎为html
app.engine("html", ejs.__express);
app.set('view engine', 'html');

//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(page);

// app.all("*",function (req,res,next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })
function mapToJson(mapList) {
    if(!mapList){
        throw  new Error("param is null")
    }
    let obj = Object.create(null);
    for (let[key,value] of mapList){
        obj[key] = value
    }
    return obj;
}
app.get("/test",function (req,res,next) {
    let map = new Map()
    let callback = req.query.callback;
    console.log(req.query)
    if(!req.query.username){
        map.set("code",202).set("msg","用户名为空");
        res.send(callback + "(" +JSON.stringify(mapToJson(map)) + ")")
    }else if(!req.query.password){
        map.set("code",202).set("msg","密码为空");
        res.send(callback + "(" +JSON.stringify(mapToJson(map)) + ")")
    }else if(!req.query.verification){
        map.set("code",202).set("msg","验证码为空");
        res.send(callback + "(" +JSON.stringify(mapToJson(map)) + ")")
    }else {
        map.set("code",200).set("msg","登录成功")
        res.send(callback + "(" +JSON.stringify(mapToJson(map)) + ")")
    }
})
// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use((req, res, next)=> {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
    app.use((err, req, res, next)=> { // jshint ignore:line
        let statusCode = err.status || 500;
        if (statusCode === 500) {
            console.error(err.stack || err);
        }
        res.status(statusCode);
        res.render('error', {
            message: err.message || err,
            error: err
        });
    });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use((err, req, res, next)=> { // jshint ignore:line
    res.status(err.status || 500);
    res.render('error', {
        message: err.message || err,
        error: {}
    });
});

const server = http.createServer(app);

server.listen(PORT,(err)=>{
    if(err){
        console.log(`${PORT} is used`)
    }
    console.log(`Application run in ${PORT}`)
})
