$(function(){
	 // 1.查找触发事件的元素：card-header
    // 2.因为触发元素有多个,故用事件委托ul，绑定触发事件处理函数
    $("div.bgc>ul").on("click",".card-header",function(){
      //3.查找要修改的元素当前点击的card-body,card-footer和arrow
      var arrow=$(this).children(":last")//当前点击的card-header下的箭头
      var card_others=arrow.parent().siblings();//当前点击的card下的除card-header的兄弟元素
			//只要一点击,就将所有的card下的card-body和card-footer都添加Class"none"
			$(".card-body").addClass("none");
      $(".card-footer").addClass("none");
       var others=$(this).parent().parent().siblings().children().children(".card-header").children("img");//除了点击的其他箭头
			 //只要一点击,就将其他的箭头arrow都改为向下
       others.removeClass("arrow_up")
       .addClass("arrow_down")
      // console.log($(this).parent().parent().siblings().children().children(".card-header").children("img"))
      //修改元素
      if(arrow.hasClass("arrow_down")){//如果arrow箭头指向下
        arrow.removeClass("arrow_down").addClass("arrow_up");//移除向下,改为向上
        card_others.removeClass("none")//并将该card下的除card-header的兄弟元素显示出来
      }else if(arrow.hasClass("arrow_up")){//如果arrow箭头向上
				arrow.removeClass("arrow_up").addClass("arrow_down");//移除向上,改为向下
				card_others.addClass("none");//并将该card下的除card-header的兄弟元素隐藏出来
			}
    })


	//动画系列一览
    //如果鼠标移入当前li,其他li变淡,如果移出当前li,其他li变回原样
    $("ul.row").on("mouseenter","a",function(){
      var a=$(this);
      a.parent().siblings().children(":first-child").addClass("lighten")
    })
    $("ul.row").on("mouseleave","a",function(){
      var a=$(this);
      a.parent().siblings().children(":first-child").removeClass("lighten")
    })
})