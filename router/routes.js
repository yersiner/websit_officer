const express = require("express");
const router = express.Router();
router.all("*",(req,res,next)=>{
    console.log("sas");
    res.locals= {
        android : "http://shouji.baidu.com/software/23241065.html",
        ios : "https://itunes.apple.com/cn/app/%E8%9C%82%E9%B8%9F%E5%8C%BB%E7%94%9F/id1329469159?mt=8"
    }
    next();
})
router.get("/", (req,res,next)=> {
    res.render("index",
        {"title":"贵州米可医疗科技有限公司官网","name":"index"});
})
router.get("/about", (req,res,next) =>{
    res.render("about",{"title":"贵州米可医疗科技有限公司官网 关于我们","name":"about"})
})
router.get("/state", (req,res,next)=> {
    res.render("state",{"title":"贵州米可医疗科技有限公司官网 相关声明","name":"state"})
})
router.get("/platform", (req,res,next)=> {
    res.render("product/platform",{"title":"贵州米可医疗科技有限公司官网 产品中心","name":"produce"})
})
router.get("/doctor", (req,res,next)=> {
    res.render("product/doctor",{"title":"贵州米可医疗科技有限公司官网 产品中心","name":"produce"})
})
router.get("/user", (req,res,next)=> {
    res.render("product/user",{"title":"贵州米可医疗科技有限公司官网产品中心","name":"produce"})
})
router.get("/dev", (req,res,next)=> {
    res.render("product/dev",{"title":"贵州米可医疗科技有限公司官网 产品中心","name":"produce"})
})
router.get("/weichat/:dsfjs",(req,res,next)=>{
    console.log(req.query,"sdfsdfsdfsdfsdf");
    res.json({a : 1});
})
router.post("/weichat/:sdfsdf",(req,res,next)=>{
    console.log(req.body,"sdfsdfsdfsdfsdf");
    res.json({a : 1});
})
module.exports = router;
