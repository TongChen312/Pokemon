const express=require('express')
const pool=require('../Ppool.js')
var router=express.Router();	

//宝可梦列表
router.get("/Plist",(req,res)=>{
	pool.query("select * from Pokemons",(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});


//单个宝可梦详细信息
router.get("/Pquerry/:pid",(req,res)=>{
	var $pid=req.params.pid;
	var sql="select * from Pokemons where pid=?"
	pool.query(sql,[$pid],(err,result)=>{
		if(result.length>0){
			res.send(result);
		}else{
			res.send("0");
		}
		console.log(result);
	});
});
module.exports=router;