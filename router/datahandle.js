const express = require("express");
const router = express.Router();

// 导入找回密码路由处理函数对应的模块
const data_arbeiten = require("../router_handler/datahandle");


router.post(
    "/dataSave",
    data_arbeiten.dataSave
);
router.get(
    "/temupdatesensordata",
    data_arbeiten.getdatatemp
);


module.exports = router;