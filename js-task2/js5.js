
var roleRecord_s = sessionStorage.getItem("recordStr");
var newRecord = JSON.parse(roleRecord_s);
//生成两个数组。比对玩家状态
var roleStr_s = sessionStorage.getItem("rolestr");
//存储玩家信息的第一个数组
var roleList_s = JSON.parse(roleStr_s);
var allRole=Object.keys(roleList_s).length;
//使用状态机模拟步骤变化
var fsm = new StateMachine ({
    init: '0',
    transitions: [
        {name: 'step1', from: '0', to: '1'},
        {name: 'step2', from: '1', to: '2'},
        {name: 'step3', from: '2', to: '3'},
        {name: 'step4', from: '3', to: '0'},
    ],
    methods: {
        onStep1: function() { $(".process-one").css("background-color","#83b09a").addClass("change");},
        onStep2: function() { alert("请死者亮明身份并且发表遗言") },
        onStep3: function() { alert("玩家依次发言讨论") },
        onStep4: function() { alert("操作成功") },
    }
});

// $("*").click(function() {
//     var color = $(".main-start").find("*").attr("background-color");
//     console.log(color);
//     if (color == "#83b09a") {
//         alert("请进行下一项活动。");
//     }
    
// });
//使用session 进行计数
if (sessionStorage.daycount) { 

} else {
    //计数每天
    sessionStorage.daycount = 0;
    //计数每晚
    sessionStorage.nightcount = 0;
}
var data=Number(sessionStorage.daycount);
var data2=Number(sessionStorage.nightcount);

// 筛选出每次存活的玩家
var killerNum=0;
var peopleNum=0;
for (let i=0; i < allRole; i ++) {
    if (roleList_s[i]["role"] == "杀手" && roleList_s[i]["life"] == 1) {
        killerNum += 1;
    }else if (roleList_s[i]["role"] == "平民" && roleList_s[i]["life"] == 1) {
        peopleNum +=1;
    }
}
console.log(killerNum);
console.log(peopleNum);
//判断杀手是否大于平民人数
if (killerNum == 0) {
    window.location.href = "page8.html";
}else if (killerNum > peopleNum) {
    window.location.href = "page8.html";
}
//上一天操作完后，生成下一天
if (newRecord != null) {
    // for (let i=0; i < dataOrder; i ++) {
    if (newRecord[0]["daytime"] != undefined) { 
        addNew();
    }
}
//展示游戏过程信息
if (newRecord != null) {
    //获取记录死亡玩家json的长度
    var lenght = Object.keys(newRecord).length;
    //判断天数是否与记录长相等，确定杀手黑夜杀死玩家
    if (lenght == data+1) { 
        fsm.step1();
        var deathOrder_1 = newRecord[data].night;
        console.log(deathOrder_1);
        var truth_1 = roleList_s[deathOrder_1-1]["role"];
        console.log(truth_1);
        $(".message-night").eq(data).text(deathOrder_1 + "号被杀手杀死，真实身份是" + truth_1);
    }
        
}

//展示每一天的游戏过程信息
if (newRecord != null) {
    if (newRecord[0]["daytime"] != undefined) {
        for (let i=0; i < data; i ++) {
            var deathOrder_3 = newRecord[i]["night"];
            var deathOrder_4 = newRecord[i]["daytime"];
            var death_1 = roleList_s[deathOrder_3 - 1]["role"];
            var death_2 = roleList_s[deathOrder_4 - 1]["role"];
            $(".message-night").eq(i).text(deathOrder_3 + "号被杀手杀死，真实身份是" + death_1);
            $(".message-daytime").eq(i).text(deathOrder_4 + "号被投票投死了，真实身份是" + death_2);
            $(".start-day").eq(i).text("第" + (i+1) + "天");
            $(".process-one").eq(i).css("background-color","#83b09a").addClass("change");
            // $(document).off("click", ".process-one");
            // $(document).off("click", ".process-two");
            $(".process-two").eq(i).css("background-color","#83b09a").addClass("change").removeAttr('onclick');
            $(".process-three").eq(i).css("background-color","#83b09a").addClass("change").attr("disabled", "true");
            $(".process-four").eq(i).css("background-color","#83b09a").addClass("change").off("click");
        }
    }
}

//以下 类change的添加用于jQuery控制伪元素::before；

//第一环节
$(document).on('click', '.process-one', function() {
    if (fsm.state == 0) {
        // fsm.step1();
        window.location.href = "page6.html";
    }else {
        alert("请进行游戏下一项活动");
    }
});
// var data=0;
// var dataOrder=Object.keys(newRecord).length;

//第二环节
$(document).on('click', '.process-two', function() {
    if (fsm.state == 1) {
        fsm.step2();
        $(this).css("background-color","#83b09a").addClass("change"); 
    }else {
        alert("请顺序操作");
    }
});
//第三环节
$(document).on('click', '.process-three', function() {
    if (fsm.state == 2) {
        fsm.step3();
        $(this).css("background-color","#83b09a").addClass("change");
    }else {
        alert("请顺序操作");
    }
});
//第四环节
$(document).on('click', '.process-four', function() {
    if (fsm.state == 3) {
        window.location.href = "page7.html";
        //每完成每天的四个步骤即对天数加一
        sessionStorage.daycount = Number(sessionStorage.daycount)+1; 
    }else {
        alert("请顺序操作");
    }
});
//用于生成新的一天
function addNew() {
            for (let i=0; i < data; i++) {
            $(".start-process").eq(i).hide();
            $(".start-sign-box").eq(i).hide();
        
            $(".main-game").append(`
            <div class="main-start">
                <div class="start-day"></div>
                <div class="start-sign-box">
                    <div class="start-sign"></div>
                </div>
                <div class="start-process">
                    <div class="process-box">
                        <div class="process-one process-triangle">
                            <img src="image/moon.png">
                            <div>杀手杀人</div>
                        </div>
                        <div class="mt20 message-night"></div>
                        <div class="process-two process-triangle">
                            <img src="image/sun.png">
                            <div>亡灵发表遗言</div >
                        </div>
                        <div class="process-three process-triangle">玩家依次发言</div>
                        <div class="process-four process-triangle">全民投票</div>
                        <div class="mt20 message-daytime"></div>
                    </div>
                </div>
            </div>`);
            $(".start-day").eq(data).text("第" + (data+1) + "天");
        }
          
}
var regexp2 = /\d+/;
//可点击用于隐藏或展示每天的游戏信息
$(".start-day").click(function() {
    //获取当前点击的元素的天数当作在html中的索引
    var a = $(this).text().match(regexp2);
    // $(this).children(".start-process").toggle();
    // $(this).children(".start-sign-box").toggle();
    $(".start-process").eq(a-1).toggle();
    $(".start-sign-box").eq(a-1).toggle();
}); 
//可多次使用用于生成sessionstorage的函数
function setJson(json, str, name) {
    var str = JSON.stringify(json);
    sessionStorage.setItem(name,str);
}
$(".footer-note").click(function() {
    window.location.href = "page9.html";
});
//回到游戏设置页面
$(".header-back").click(function() {
    alert("即将退出游戏，确定吗？");
    sessionStorage.clear();
    window.location.href = "page2.html";
});
//回到首页
$(".header-close, .footer-end").click(function() {
    alert("即将退出游戏，确定吗？");
    sessionStorage.clear();
    window.location.href = "page1.html";
});
       
 
    

