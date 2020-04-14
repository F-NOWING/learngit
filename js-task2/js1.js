//获取首页左右点击切换的页面class
var elem1 = document.getElementsByClassName("main-game1");
var elem2 = document.getElementsByClassName("main-game2");
//获取圆点切换标号
var elem3 = document.getElementsByClassName("dot1");
var elem4 = document.getElementsByClassName("dot2");
//选择游戏页
function enterGame() {
    //通过class获取的元素是一个集合。需要确定到集合中具体元素才可添加方法
    //否则报错
    elem1[0].style.display = "none";
    elem2[0].style.display = "block";
    elem3[0].style.background = "#f0f0f0";
    elem4[0].style.background = "#29bde0";
}
//首页
function enterHome() {
    elem2[0].style.display = "none";
    elem1[0].style.display = "block";
    elem4[0].style.background = "#f0f0f0";
    elem3[0].style.background = "#29bde0";
}
//进入游戏
function newGame() {
    window.location.href = "page2.html";
}