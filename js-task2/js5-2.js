//确定玩家生存人数
var killerNum = 0;
var peopleNum = 0;
//取得玩家死亡信息记录对象json
var roleRecord_s = sessionStorage.getItem("recordStr");
var newRecord = JSON.parse(roleRecord_s);
//获取所有玩家的状态记录对象json
var roleStr_s = sessionStorage.getItem("rolestr");
var roleList_s = JSON.parse(roleStr_s);
//获取玩家记录对象json长度
var allRole=Object.keys(roleList_s).length;
var allRole2=Object.keys(newRecord).length;
//向html添加玩家剩余人数
for (let i=0; i < allRole; i ++) {
    if (roleList_s[i]["role"] == "杀手" && roleList_s[i]["life"] == 1) {
        killerNum += 1;
    }else if (roleList_s[i]["role"] == "平民" && roleList_s[i]["life"] == 1) {
        peopleNum +=1;
    }
}
$(".surplus-killerNum").text(killerNum);
$(".surplus-peopleNum").text(peopleNum);
//向玩家展示每天的游戏情况记录
for (let i=0; i < allRole2; i++) {
    $(".main-result").append(`
    <div class="result-show">
    <div class="result-days"></div>
    <div class="result-night mt2"></div>
    <div class="result-daytime mt2"></div>
    </div>`);
    //从玩家死亡记录json获取玩家序号
    var data = newRecord[i]["days"];
    var death_1 = newRecord[i]["night"];
    var death_2 = newRecord[i]["daytime"]
    //通过序号从玩家信息记录json中找到对应的身份
    var identity_1 = roleList_s[death_1 - 1]["role"];
    var identity_2 = roleList_s[death_2 - 1]["role"];
    //写入取得的记录信息
    $(".result-days").eq(i).text("第"+ data +"天");
    $(".result-night").eq(i).text("黑夜：" + death_1 + "号被杀死了，真实身份是" + identity_1);
    $(".result-daytime").eq(i).text("白天：" + death_2 + "号被投死了，真实身份是" + identity_2);
}
//点击重新开始游戏
$(".footer-restart, .header-home").click(function() {
    sessionStorage.clear();
    window.location.href = "page2.html";
});
