const express=require('express')
const pool=require('../pool.js')
var router=express.Router();							

//注册页面                              
router.post("/reg",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	pool.query("insert into xz_user(uname,upwd) value(?,?)",[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0){
			res.send("1")
		}
	});
});


//登录页面






//修改信息页面


















module.exports=router;