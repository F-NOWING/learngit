//读取url中的参数数据
var url=decodeURI(window.location.href).split('=');
console.log(url);
var regexp1 = /\d+/;
var allPlayers=url[1].match(regexp1);
var killer = url[2].match(regexp1);
var all=allPlayers[0];
var killereNum=killer[0];
var roleList = {};
//以下是对上一页面所传session参数的读取测试；
// var str = sessionStorage.getItem("keyname");
// var numbers=JSON.parse(str);
// console.log(str);
// var a=numbers.all;
// var b=numbers.killers;
for (var i=0; i<all; i++) {                          //优先生成角色最多的平民
    roleList[i]={};
    roleList[i]["order"] = i+1;
    roleList[i]["role"] = "平民";
    roleList[i]["life"] = 1;
}
//随机生成杀手号数
var killerArr=[];
var random = Math.floor(Math.random()*all);
killerArr.push(random);
for (var j=0; j<all; j++) {
    if (killerArr.length<killereNum) {
        var randomNum = Math.floor(Math.random()*all);
        if (killerArr.indexOf(randomNum) == -1) {
            killerArr.push(randomNum);
        }
    }
}
//将杀手身份插入角色对象json中
for (var k=0; k<killereNum; k++) {
    roleList[killerArr[k]].role = "杀手";
}
// var a=Object.keys(roleList).length;       //测试json长度
// console.log(a);
//返回游戏设置页面
$(".header-back").click(function() {
    sessionStorage.clear();
    window.location.href = "page2.html";
});
//回到首页，退出游戏
$(".header-close").click(function() {
    sessionStorage.clear();
    window.location.href = "page1.html";
});

//显示角色信息
var h=0;
var clickTotal=0;
var order;
var identity;
var alls = all - 1;
//1，点击开始查看身份
$(".footer-check").click(function() {
    var status;
    //玩家身份的读取
    order=roleList[h]["order"] + 1;  
    identity=roleList[h]["role"];
    //点击次数奇偶判断
    status= clickTotal % 2;
    //判断是否展示完毕
    if (h == alls) {
        status=2;
    } 
    //进入正式游戏环节的判断
    if (clickTotal == 2*all - 1) {
        status=3;
    }
    switch(status) {
        //2，隐藏身份并传递给下一人
        case 0: 
            $(this).val("隐藏并传递给" + order + "号"); 
            $(".main-check").css("display","none");
            $(".identity-true").css("display","block");
            $("#identity-role").text(identity);    
            break;
        //3，查看玩家身份
        case 1:
            $(this).val("查看" + order + "号");
            $("#order").text(order);
            $(".identity-true").css("display","none");
            $(".main-check").css("display","inline-block");
            h += 1;
            break;
        //4，身份全部展示完成
        case 2:
            $(this).val("法官查看");
            $(".main-check").css("display","none");
            $(".identity-true").css("display","block");
            $("#identity-role").text(identity);
            break;
        //5，进入正式游戏环节
        case 3:
            window.location.href="page4.html";
            break;
    }
    clickTotal += 1;
    // console.log(clickTotal);
}); 
//以前写法，不够清晰，淘汰。
//显示角色信息
// var h=0;
// var order;
// var identity;

// $("#footer-checked").click(function() {
//     order=roleList[h]["order"] + 1;
//     identity=roleList[h]["role"];
//     // var abc="隐藏并传递给" + order + "号";
//     // console.log(abc);
//     $(this).css("display","none");
//     $("#checked-copy").val("隐藏并传递给" + order + "号")
//     .css("display","block");
//     $(".main-check").css("display","none");
//     $(".identity-true").css("display","block");
//     $("#identity-role").text(identity);
//     // h +=1;
//     // console.log(h);
// });

// $("#checked-copy").click(function() {
//     order=roleList[h+1]["order"];
//     // var identity=roleList[h]["role"];
//     $(this).css("display","none");
//     $("#order").text(order);
//     $("#footer-checked").val("查看"  + order + "号身份")
//     .css("display","block");
//     $(".main-check").css("display","inline-block");
//     $(".identity-true").css("display","none");
//     h +=1;
//     console.log(h);
//     if (order==all) {
//         $("#footer-checked").click(function() {
//             $(this).css("display","none");
//             $("#checked-copy").css("display","none");
//             $("#checked-copy-t").val("法官查看")
//             .css("display","block");
//             $(".main-check").css("display","none");
//             $(".identity-true").css("display","block");
//             $("#identity-role").text(identity);
             
//         });
//     }
// });

// $("#checked-copy-t").click(function() {
//     window.location.href="page4.html";
// });
// 将角色配比传给下一页面
if (typeof(Storage)!=="undefined") {
    var roleStr = JSON.stringify(roleList);
    sessionStorage.setItem("rolestr",roleStr);
}else {
    alert("您的设备不支持web storage");
}
