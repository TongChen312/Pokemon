$(function(){
  //引入页头header
  //jQuery中自带的ajax函数
  $.ajax({
    url:"header.html",
    type:"get",
    //data:{}不用写,因为请求文件不同带参数,请求的是静态HTML文件的内容
    success:function(result){
      // console.log(result);
      //用result获取html片段创建新的<header>元素代替空的<headedr>元素
      $(result).replaceAll("#header");
      //动态创建一个<link>元素,引用header.css,并将<link>自动添加<head>元素中
      $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
    }
  })

  //引入页脚footer
  $.ajax({
    url:"footer.html",
    type:"get",
    success:function(result){
      // console.log(result);
      $(result).replaceAll("#footer");
      $(`<link rel="stylesheet" href="css/footer.css">`).appendTo("head")
    }
  })

  //注册提示
  //封装一个登陆,注册提示函数
    function tips($input,Regexp,msg){
      var $span=$input.next();
      var value=$input.val();
      if(Regexp.test(value)){
        $span.html(`<img src='img/icon/ok.png'>`);
        $span.addClass("success").removeClass("fail")
        return true;
      }else{
        $span.html(`<img src='img/icon/err.png'>${msg}`)
        $span.removeClass("success").addClass("fail")
        return false;
      }
    }
   
	//每个
   $("#uname").blur(function(){
	 	tips($(this),/^[\u4E00-\u9FA5A-Za-z0-9_]{2,8}$/,"用户名称为2~8位数字,字母,或者汉字组成");
   })
   //无论字母和数字谁在前,都必须有一个字母或者数字,长度必须在6~12
	 $("#upwd").blur(function(){
	 	tips($(this),/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,"用户密码由6~12位数字和字母组成,必须包含字母")
	 })
	 $("#upwd2").blur(function(){
	 	tips($(this),/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,"确认密码必须和用户密码一致")
	 })
	 $("#phone").blur(function(){
	 	tips($(this),/^((\+86|0086)\s+)?1[3-9]\d{9}$/,"请输入11位数字组成的电话号码")
	 })
	 $("#email").blur(function(){
	 	tips($(this),/\w+@\w+\.\w+/,"邮箱格式：AABB@XX.com")
   })
  
   
   $("#btn_reg").on("click",function(){
      var $uname=$("#uname");
	    var $upwd=$("#upwd");
	    var $upwd2=$("#upwd2");
	    var $phone=$("#phone");
	    var $email=$("#email");
      if(!tips($("#uname"),/^[\u4E00-\u9FA5A-Za-z0-9_]{2,8}$/,"用户名称为2~8位数字,字母,或者汉字组成")){
        $uname.focus();
      }else if(!tips($("#upwd"),/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,"用户密码由6~12位数字和字母组成,必须包含字母")){
        $upwd.focus();
      }else if(!tips($("#upwd2"),/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,"确认密码必须和用户密码一致")){
        $upwd2.focus();
      }else if(!tips($("#phone"),/^((\+86|0086)\s+)?1[3-9]\d{9}$/,"请输入11位数字组成的电话号码")){
        $phone.focus();
      }else if(!tips($("#email"),/\w+@\w+\.\w+/,"邮箱格式：AABB@XX.com")){
        $email.focus();
      }else if($upwd.val()==$upwd2.val()){
        UserReg();
      }else{
        alert(`确认密码与密码不一致`)
      }
    }
    )
})