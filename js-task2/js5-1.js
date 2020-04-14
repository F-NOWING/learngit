function setJson(json, str, name) {
    var str = JSON.stringify(json);
    sessionStorage.setItem(name,str);
}
var roleRecord_s = sessionStorage.getItem("recordStr");
var newRecord = JSON.parse(roleRecord_s);
console.log(newRecord);
//生成两个数组。比对玩家状态
var roleStr_s = sessionStorage.getItem("rolestr");
//存储玩家信息的第一个数组
var roleList_s = JSON.parse(roleStr_s);
var allRole=Object.keys(roleList_s).length;
//用于判断玩家状态是否死亡的第二个玩家信息存储数组
var roleCompara = JSON.parse(roleStr_s);
//死亡玩家被标记放入该数组
var roleRecord = {};
// var data=0;
if (sessionStorage.datacount) { 

} else {
    sessionStorage.datacount = 0;
}

var data=Number(sessionStorage.datacount);
if (newRecord == null) {
    roleRecord[data] = {};
}else {
    roleRecord = JSON.parse(roleRecord_s);
    //每次为json插入新行时都需要创建一个新对象
    roleRecord[data] = {};
}
console.log(newRecord);
console.log(roleRecord);
//展示玩家状态信息，死亡玩家背景变色
for (var i=0; i<allRole; i++) {
    var order= roleList_s[i]["order"];
    var identity = roleList_s[i]["role"];
    $(".main-roles").append(
    `<div class="role-in" tabindex="-1">
    <div class="role-ide"></div>
    <div class="role-order"></div>
    <img src="image/kill.png" class="role-killed">
    </div>`);
    $(".role-ide").eq(i).text(identity);
    if (roleList_s[i]["life"] == 0) {
        $(".role-ide").eq(i).css("background-color", "#83b09a");
    }
    $(".role-order").eq(i).text(order + "号");
    
}

var regexp2 = /\d+/;
var num;
$(".role-killed").hide();
//2.1,聚焦即判定玩家死亡，
$(".role-in").focusin(function(){
    // $(this).css("background-color","#83b09a");
    $(this).children(".role-killed").show();
    num = $(this).children(".role-order").text().match(regexp2);
    console.log(num[0]);
    
    roleList_s[num[0]-1]["life"] = 0;
    console.log(roleList_s);
    console.log(roleCompara);
});
//2.2,失焦玩家状态正常
$(".role-in").focusout(function(){
    // $(this).css("background-color","#f5c97b");
    $(this).children(".role-killed").hide();
    num = $(this).children(".role-order").text().match(regexp2);
    //除被点击标记的以外玩家状态恢复为正常
    for (let j=0; j<allRole; j++){
        if (j != num[0]-1){
            roleList_s[j]["life"] = 1;
        }
    }
    // roleList_s[num[0]-1]["life"] = 1;
    console.log(roleList_s);
});

var roleStr;
var newStr;
var strArr = ["rolestr", "recordStr"];

$(".footer-next").click(function() {
    //黑夜杀手杀人 
        for (let k=0; k<allRole; k++) {
            //3，确定后判断玩家状态
            if (roleList_s[k]["life"] == 0) {
                //4，比较记录玩家状态数组中的身份，是否死亡
                if (roleCompara[k]["role"] == "杀手") {
                    // $(this).children(".role-killed").hide();
                    alert("你是杀手不能杀死本职业玩家，请选择其他玩家");
                    return;
                }else if (roleCompara[k]["life"] == 0) {
                    alert("当前玩家已死亡，请选择其他玩家。");
                    return;
                }else {
                    roleCompara[k]["life"] = roleList_s[k]["life"];
                    setJson(roleCompara, roleStr, strArr[0]);
                    //5，将相应的死亡玩家存入相应天数的状态记录数组
                    roleRecord[data]["days"] = data + 1;
                    roleRecord[data]["night"] = k + 1;
                    setJson(roleRecord, newStr, strArr[1]);
                    console.log(newRecord);
                    window.location.href = "page5.html";
                    //满足条件即对进入黑夜次数计数
                    if (data == 1) {
                        sessionStorage.nightcount = Number(sessionStorage.nightcount)+1;
                    }
                }
            }
        }
}); 
$(".footer-vote").click(function() {
    //白天讨论投票
        console.log(newRecord);
    for (let k=0; k<allRole; k++) {
        if (roleList_s[k]["life"] ==0) {
            if (roleCompara[k]["life"] == 0) {
                alert("当前玩家已死亡，请选择其他玩家。");
                return;
            }else {
                roleCompara[k]["life"] = roleList_s[k]["life"];
                //保存死亡玩家信息
                setJson(roleCompara, roleStr, strArr[0]);
                newRecord[data]["daytime"] = k + 1;
                //保存死亡玩家信息另一对象
                setJson(newRecord, newStr, strArr[1]);
                console.log(newRecord);
                //session 计数
                sessionStorage.datacount = Number(sessionStorage.datacount)+1; 
            }
        }
    }
    //跳转
    window.location.href = "page5.html";
});  
//回到首页
$(".header-close").click(function() {
    sessionStorage.clear();
    window.location.href = "page1.html";
});
$(".footer-end").click(function() {
    alert("即将退出游戏，确定吗？")
    sessionStorage.clear();
    window.location.href = "page1.html";
});
    