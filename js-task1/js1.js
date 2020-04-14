//整个随机颜色赋值大循环
function circle () {
    var array1=[];
    var array3=[];
    var i, j, k;
    //初始化
    initialize();
    //取得随机格子
    function getMyGrid (array2, choose) {
        var array2=[];
        var myGrid = Math.floor(Math.random()*9 ) + 1;
        var choose="cell"+myGrid;
        array2.push(choose);
        for (i=0; i < 9; i++) {
            if (array2.length < 3) {
                myGrid = Math.floor(Math.random()*9 ) + 1;
                choose="cell"+myGrid;
                if (array2.indexOf(choose) == -1) {
                    array2.push(choose);
                } 
            } 
        }
        return array2;
    }
    array3 = getMyGrid();
    //取得随机颜色
    for (j=0; j<3; j++) {
        function getRandomColor() {
            return '#'+('00000'+(Math.random()*0x1000000 <<0).toString(16)).slice(-6);
        }
        // var myColor=getRandomColor();
        array1[j]=getRandomColor();
    }
    for ( k=0; k < 3; k++) {
        document.getElementById(array3[k]).style.backgroundColor=array1[k];
    }
    document.getElementById("start").disabled = true;
}
//初始化函数定义
function initialize () {
    var allnode = document.getElementById("grid-box");
    var i=0;
    var children = allnode.childNodes;
    for(i = 0; i < children.length; i++) {
        if (children[i].nodeType === 1) {
            children[i].style.backgroundColor = "#ffa500";
        }
    }
    document.getElementById("start").disabled = false;
}

var timename;
//点击开始
function circleStart () {
    timename=setInterval("circle()",1100);
    
}
//点击结束
function circleEnd () {
    clearInterval(timename);
    initialize();
    
}
// var oUl = document.getElementById("grid-box");    //children未纳入标准，不同浏览器会有不同表现
//     var i=0;
//     var children = oUl.children;
//     for(i = 0; i < children.length; i++) {
//         children[i].style.background = 'red';
//     }
