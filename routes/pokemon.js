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



module.exports=router;