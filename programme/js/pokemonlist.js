$(function () {
  function PokemonList() {
    //创建xhr对象
    return new Promise(
      function (door) {
        var imgs = [];
        var xhr = new XMLHttpRequest();
        //绑定监听,接收请求
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            //json解析,解析结果是对象数组
            var arr = JSON.parse(result);
            //将解析的结果用模板字符串的列表形式展示出来
            var list = `	
						<table cellpadding="2" border="8" style="width:550px">
							<tr>
								<th rowspan="2">图像</th>
								<th rowspan="2">编号</th>
								<th colspan="3">宝可梦</th>
								<th colspan="2" rowspan="2">属性</th>
							</tr>
							<tr>
								<th>中文</th>
								<th>日文</th>
								<th>英文</th>
              </tr>`;
            for (var i = 0; i < 31; i++) {
              // if(arr[i].character2===null){
              // 	arr[i].character2="";
              // }
              list += `
								<tr>
									<td style="width:40px;"><p p${i + 1}></p></td>
									<td><a href="04.pokemon.html?pid=${arr[i].pid}" target="_blank">${arr[i].poid}</a></td>
									<td>${arr[i].pname}</td>
									<td>${arr[i].pname1}</td>
									<td>${arr[i].pname2}</td>`

              // 	<td class="Chars">${arr[i].character1}</td>
              //  	<td class="Chars">${arr[i].character2}</td>
              //  </tr>`;

              //判断char2是否为空
              if (arr[i].character2 == null) {
                //如果数据库中值是空的,就在页面上添加一个行数为2的char1  (td)
                list += `
										<td class="Chars" colspan="2">${arr[i].character1}</td>
									</tr>`;
              } else {
                //如果数据库中值不为空,就在页面上添加一个行数为1的char1和char2  (td)
                list += `
										<td class="Chars">${arr[i].character1}</td>			
										<td class="Chars">${arr[i].character2}</td>
									</tr>`;
              }
              imgs.push(arr[i].p_picture)
            }
            //将列表放入div中
            list += `</table>`;
            pl.innerHTML = list;
            // console.log(img)
            door(imgs)
          }
        }
        //打开连接,创建请求
        xhr.open("get", "/pokemon/Plist", true);
        //发送请求
        xhr.send(null);
      }
    )
  }

  //将数据库中的队伍信息加载到team信息中
  var $tid = 1;
  function team() {
    return new Promise(
      function (door) {
        $.ajax({
          url: "/pokemon/team/" + $tid,
          type: "get",
          datatype: "json",
          success: function (result) {
            // console.log(result)
            $("#first-result").html(result[0].team1)
            $("#second-result").html(result[0].team2)
            $("#third-result").html(result[0].team3)
            door();
          }
        })
      }
    )
  }

  //属性背景动态判断渲染
  function show() {
    //查找table元素
    var table = document.getElementsByTagName("table")[0];
    // console.log(table);
    //查找table元素下的classname的集合
    var Chars = table.getElementsByClassName("Chars");
    // console.log(Chars);
    //遍历Chars集合,判断每一个集合中的元素的innerHTML;根据值的不同,动态添加背景样式
    for (var char of Chars) {
      // console.log(char.innerHTML)
      switch (char.innerHTML) {
        case "草": char.innerHTML == "草";
          char.style.backgroundColor = "#77CC55"; break;
        case "火": char.innerHTML == "火";
          char.style.backgroundColor = "#FF4422"; break;
        case "毒": char.innerHTML == "毒";
          char.style.backgroundColor = "#AA5599"; break;
        case "飞行": char.innerHTML == "飞行";
          char.style.backgroundColor = "#6699FF"; break;
        case "水": char.innerHTML == "水";
          char.style.backgroundColor = "#3399FF"; break;
        case "虫": char.innerHTML == "虫";
          char.style.backgroundColor = "#AABB22"; break;
        case "一般": char.innerHTML == "一般";
          char.style.backgroundColor = "#BBBBAA"; break;
        case "电": char.innerHTML == "电";
          char.style.backgroundColor = "#FFCC33"; break;
        case "地面": char.innerHTML == "地面";
          char.style.backgroundColor = "#DDBB55"; break;
        case "妖精": char.innerHTML == "妖精";
          char.style.backgroundColor = "#FFAAFF"; break;
        case "格斗": char.innerHTML == "格斗";
          char.style.backgroundColor = "#BB5544"; break;
        case "岩石": char.innerHTML == "岩石";
          char.style.backgroundColor = "#BBAA66"; break;
        case "超能力": char.innerHTML == "超能力";
          char.style.backgroundColor = "#FF5599"; break;
        case "冰": char.innerHTML == "冰";
          char.style.backgroundColor = "#77DDFF"; break;
        case "幽灵": char.innerHTML == "幽灵";
          char.style.backgroundColor = "#6666BB"; break;
        case "龙": char.innerHTML == "龙";
          char.style.backgroundColor = "#7766EE"; break;
        case "恶": char.innerHTML == "恶";
          char.style.backgroundColor = "#775544"; break;
        case "钢": char.innerHTML == "钢";
          char.style.backgroundColor = "#AAAABB"; break;
      }
    }
  }





  //异步函数
  (async function () {
    //首先 Ajax获取数据库的数据,并显示在页面,同时将PokemonList()的图片地址数组传出来,赋值给变量imgs
    var imgs = await PokemonList()
    //在这之后对数据中属性一栏进行背景添加(判断)
    await show();
    await team();
    //获取要修改的元素的父元素ul,得出子元素li集合
    var ul = document.getElementById("random_pic");
    var lis = ul.getElementsByTagName("li");
    for (var li of lis) {
      //找出给一个遍历出来的li的唯一子元素div  的唯一子元素img
      var img = li.children[0].children[0]
      //随机生成的一个数字,要求是图片地址数组imgs的下标
      var random = Math.ceil(Math.random() * (imgs.length - 1));
      // console.log(random)
      img.setAttribute("src", `${imgs[random]}`)
      //每遍历一次将这次遍历出来的图片地址在原数组imgs上删除一次
      //保证下一次不会选择到同一个图片地址
      imgs.splice(random, 1)
    }
    // console.log($("#pl").width())//列表宽度
  })()



  //加载部分  
  var pno = 2; ps = 31
  $("#load").on("click", ":first-child", function () {
    $.ajax({
      url: "/pokemon/Plistmore/",
      type: "post",
      data: { pno: `${pno}` },
      dataTpye: "json",
      success: function (result) {
        if (result.length == 0) {
          alert("没有更多啦")
        }
        var list
        for (var i = 0; i < result.length; i++) {
          list += `
          <tr>
            <td style="width:40px;"><p p${result[i].pid}></p></td>
            <td><a href="04.pokemon.html?pid=${result[i].pid}" target="_blank">${result[i].poid}</a></td>
            <td>${result[i].pname}</td>
            <td>${result[i].pname1}</td>
            <td>${result[i].pname2}</td>`
          if (result[i].character2 == null) {
            list += `
              <td class="Chars" colspan="2">${result[i].character1}</td>
            </tr>`;
          } else {
            list += `
              <td class="Chars">${result[i].character1}</td>			
              <td class="Chars">${result[i].character2}</td>
            </tr>`;
          }
        }
        $("#pl tbody").append(list)
        show();
      }
    })
    pno++;
  })




  //加载全部
  $("#load").on("click", ":nth-child(2)", function () {
    // $(window).on(function(){
    // return new Promise(
    //   function(door){
    $.ajax({
      url: "/pokemon/Plist",
      type: "get",
      dataTpye: "json",
      success: function (result) {
        // console.log(result);
        var list
        for (var i = (pno - 1) * ps; i < result.length; i++) {
          list += `
              <tr>
                <td style="width:40px;"><p p${result[i].pid}></p></td>
                <td><a href="04.pokemon.html?pid=${result[i].pid}"    target="_blank">${result[i].poid}</a></td>
                <td>${result[i].pname}</td>
                <td>${result[i].pname1}</td>
                <td>${result[i].pname2}</td>`
          if (result[i].character2 == null) {
            list += `
                  <td class="Chars" colspan="2">${result[i].character1}</td>
                </tr>`;
          } else {
            list += `
                  <td class="Chars">${result[i].character1}</td>			
                  <td class="Chars">${result[i].character2}</td>
                </tr>`;
          }
        }
        $("#pl tbody").append(list)
        show();
        // door()
      }
    })
    // }).then(show)
  }
  )








  //当双击的时候,将我的队伍显示出来
  $("#myteam").on("dblclick", "img", function () {
    $("#myteam").children(":nth-child(2)").toggle().addClass("fadeInLeft")
    //切换图标的路径,使其在队伍显示前后样式改变
    if ($(this).attr("src") == "img/icon/icons8-精灵球-50.png") {
      $(this).attr({ src: `img/icon/icons8-神秘的宠物小精灵-50.png` })
    } else if ($(this).attr("src") == "img/icon/icons8-神秘的宠物小精灵-50.png") {
      $(this).attr({ src: `img/icon/icons8-精灵球-50.png` })
    }
  })

  //定义了一个拖动的功能
  var Move = false;//定义一个变量,控制拖动的精灵球的状态(是否可拖动)
  var offsetX = 0, offsetY = 0;
  //当鼠标按下精灵球图标,获取他的x,y轴
  $("#myteam").on("mousedown", function (e) {
    if (Move == false) {
      Move = true;
    } else if (Move == true) {
      Move = false;
    }

    // offsetX=$(this).offset().left;//获取点击位置相对与该元素left距离
    // offsetY=$(this).offset().top;//获取点击位置相对与该元素top距离
    offsetX = e.offsetX;//获取点击位置相对与该元素left距离
    offsetY = e.offsetY;//获取点击位置相对与该元素top距离
  })

  $(window).on("mousemove", function (e) {
    if (Move == true) {
      var x = e.clientX;//获取点击元素相对浏览器的X轴距离
      var y = e.clientY;//获取点击元素相对浏览器的Y轴距离
      var left = x - offsetX;//点击位置相对与浏览器的x轴距离
      var top = y - offsetY;//点击位置相对与浏览器的y轴距离
      if (left < 0) {
        left = 0;
      } else if (left > innerWidth - 300) {
        left = innerWidth - 300
      }
      if (top < 0) {
        top = 0;
      } else if (top > innerHeight - 100) {
        top = innerHeight - 100
      }
      $("#myteam").css({ "left": `${left}px`, "top": `${top}px` })//fixed位置
    }
  })

  $(window).on("mouseleave", function () {//当鼠标移出浏览器页面,不再拖动
    // $("#myteam").css({"left":"50px","top":"150px"})
    Move = false;
  })

  $("#myteam").on("mouseup", function () {//当鼠标移出元素,不再拖动
    Move = false;
  })

  //创建一个函数createMy   创建队伍、
  function createMy() {
    //设置一个数组(myteam),将之后的每一个成员放入
    //因为一个人可以有很多队伍,为避免myteam被全局污染,和命名冲突,采用闭包
    var myteam = [];
    var callback = function (e) {
      var that = e.target;
      var html = $(that).html()
      // console.log(html)
      // console.log(html);//获取当前点击的成员编号
      if (html != "宝可梦") {
        if (myteam.length < 6) {
          if (myteam.indexOf(html) == -1) {
            myteam.push(html)
          } else {
            alert(`您的该队伍已经有这个Pokemon了,请勿重复添加`)
          }
        } else {
          alert(`您的该队伍数量已经达到上限6只了`)
        }
      }
      return `` + myteam //result
    };
    return callback
  }


  //点击按钮,创建队伍,一共有三个
  //点击第一个按钮,就可以创建第一只队伍
  $("#first-team").on("click", function () {
    //清除之前tr的事件委托
    $("tr").off("click")
    var first = createMy("first");//callback
    //将点击成员的触发事件事件委托到tr上
    $("tr").on("click", ":nth-child(3)", function (e) {
      //每一次点击都是调用一次createMy函数中的回调函数callback
      //每次调用都是将该次点击的成员编号加入myteam数组中
      result = first(e);//callback中的返回结果result
      $("#first-result").html(result)
    })
  })


  $("#second-team").on("click", function () {
    $("tr").off("click")
    //createMy的第二个孩子callback,每个孩子只用自己的红包myteam
    var second = createMy("second");
    $("tr").on("click", ":nth-child(3)", function (e) {
      result = second(e);
      $("#second-result").html(result)
    })
  })

  $("#third-team").on("click", function () {
    $("tr").off("click")
    var third = createMy("third");//createMy的第三个孩子
    $("tr").on("click", ":nth-child(3)", function (e) {
      result = third(e);
      $("#third-result").html(result)
    })
  })


  //将页面上的所有队伍信息根据tid查询修改数据库中的队伍信息 
  $("#upto").on("click", function () {
    var $first = $("#first-team").next().html();
    var $second = $("#second-team").next().html();
    var $third = $("#third-team").next().html();
    var params = { "$first": `${$first}`, "$second": `${$second}`, "$third": `${$third}`, "$tid": `${$tid}` }
    $.ajax({
      url: "/pokemon/myteam",
      type: "post",
      data: params,
      dataType: "json",
      success: function (result) {
        console.log(result);
      }
    })
  })

})