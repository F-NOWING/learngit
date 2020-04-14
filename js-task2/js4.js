$(document).ready(function () {
    var roleStr_s = sessionStorage.getItem("rolestr");
    var roleList_s = JSON.parse(roleStr_s);
    var allRole=Object.keys(roleList_s).length;
    //读取json，循环显示生成玩家信息
    for (var i=0; i<allRole; i++) {
        var order= roleList_s[i]["order"];
        var identity = roleList_s[i]["role"];
        $(".main-role").append(`<div class="role-in">
        <div class="role-ide"></div>
        <div class="role-order"></div>
        </div>`);
        $(".role-ide").eq(i).text(identity);
        $(".role-order").eq(i).text(order + "号");
    }
})
$(".footer-start").click(function() {
    window.location.href = "page5.html";
});
//回到游戏设置页面
$(".header-back").click(function() {
    sessionStorage.clear();
    window.location.href = "page2.html";
});
//回到首页
$(".header-close").click(function() {
    sessionStorage.clear();
    window.location.href = "page1.html";
});