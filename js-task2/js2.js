
//滑块赋值
window.onload=function () {
    var elem1 = document.querySelector('input[type="range"]');
    var elem2 = document.getElementById("players");
    var elem3 = document.querySelector('.gamer-add');
    var elem4 = document.querySelector('.gamer-sub');
    var values = document.querySelector('input[type="range"]').value;
    //对象函数，让作用域绑定到window上，使得在外部可以访问该函数add()
    elem3.add = function() {
        values ++;
        elem1.value = values;
        rangeValue()
        // console.log(values);
    }
    //对象函数，让作用域绑定到window上
    elem4.sub = function() {
        values --;
        elem1.value = values;
        rangeValue()
        // console.log(values);
    }
    //滑块赋值的函数
    function rangeValue() {
        var middle = elem1.value;
        elem2.value = middle;
        //分配玩家配比的函数
        function setPlayer_copy (killerNum) {
            var peopleNum;
            var killerNum;
            peopleNum = middle - killerNum;
            document.getElementById("people").innerHTML=peopleNum;
            document.getElementById("killer").innerHTML=killerNum;
        }
        // console.log(middle);
        //滑块滑动时背景长条随滑块值变化
        var max = elem1.getAttribute("max");
        var width = (90 / max * middle) +"%";    
        document.getElementById("range-widths").style.width = width;
        //分配玩家各角色人数
        if (middle < 4) {
            document.getElementById("people").innerHTML=" ";
            document.getElementById("killer").innerHTML=" ";
        }
        if (middle > 3 && middle < 6) {
            killerNum = 1;
            setPlayer_copy(killerNum);
        }
        else if (middle > 5 && middle < 10) {
            killerNum=2;
            setPlayer_copy(killerNum);
        }
        else if (middle > 9 && middle < 15) {
            killerNum=3;
            setPlayer_copy(killerNum);
        }
        else if (middle > 14 && middle < 19) {
            killerNum=4;
            setPlayer_copy(killerNum);
        }
      };
      //监听滑块值变化
      elem1.addEventListener("input", rangeValue);

}

//input输入框赋值
function setNum () {
    var elem2 = document.getElementById("players");
    var newValue2 = elem2.value;
    //使用正则表达式，确保输入非数值时无效
    var regexp=/\D/;
    //分配玩家配比的函数
    function setPlayer (killerNum) {
        var peopleNum;
        var killerNum;
        peopleNum = newValue2 - killerNum;
        document.getElementById("people").innerHTML=peopleNum;
        document.getElementById("killer").innerHTML=killerNum;
    }
    //正则判断
    if (newValue2.match(regexp) == null) {
        //分配玩家各角色人数
        if (newValue2 > 3 && newValue2 < 19) {
            if (newValue2 < 6) {
                killerNum = 1;
                setPlayer(killerNum);
            }
            if (newValue2 > 5 && newValue2 < 10) {
                killerNum=2;
                setPlayer(killerNum);
            }
            if (newValue2 > 9 && newValue2 < 15) {
                killerNum=3;
                setPlayer(killerNum);
            }
            if (newValue2 > 14) {
                killerNum=4;
                setPlayer(killerNum);
            }
            //以下测试使用web storage的方式进行页面间数据的传递
            // var num=new Object;
            // num.all=newValue2;
            // num.killers=killerNum;
            // var str= JSON.stringify(num);
            // sessionStorage.setItem("keyname", str);
            
            window.location.href = "page3.html?all=" + newValue2 + "&&killerNum=" + killerNum;
        } else {
            alert("请输入正确玩家数量，人数为4-18人。");
        }
    }else {
        alert("请输入正确的玩家数量");
        elem2.value="";
    }
}




