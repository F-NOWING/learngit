//原生
// var elem1 = document.getElementsByClassName("user-name")[0];
// var elem2 = document.getElementsByClassName("pwd")[0];
// var elem3 = document.getElementsByClassName("form-message")[0];
// var elem4 = document.getElementById("submit");
// function login() {
//     var value1 = elem1.value;
//     var value2 = elem2.value;
//     var data = {
//         'name': value1,
//         'pwd': value2
//     };
//     var str = JSON.stringify(data);
//     if (value1 === null || value2 === null) {
//         elem3.innerHTML = "输入不能为空";
//         return;
//     }else if (value1 != "admin" && value2 != "123456") {
//         elem3.innerHTML = "输入错误，请重新输入";
//         return;
//     }else {
//         //创建XMLHttpRequest实例对象
//         var xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState == 4) {
//                 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//                     alert(xhr.responseText);
                    
//                 } else {
//                     alert("请求失败" + xhr.status);
//                 }
//             }
//         }
//     }
//     xhr.open("POST", "/carrots-admin-ajax/a/login", true);  //true代表异步  false代表同步
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.setRequestHeader("Accept", "application/json,text/plain,*/*");
//     xhr.send("name="+value1+"&pwd="+value2); 
    
// }

//jquery写法

$("#submit").click(function() { 
    var value1 = $(".user-name").val();
    var value2 = $(".pwd").val();
    $.ajax ({
        url: "/carrots-admin-ajax/a/login",
        type: "POST",
        data: {"name": value1, "pwd": value2},
        dataType: "json",
        success: function(data) {
            if (data.code == -5003) {
                $(".form-message").text(data.message + "，请重新输入");
            }
            if (data.code == -5004) {
                $(".form-message").text(data.message + "，请重新输入");
            }
            if (data.code == 0) {
                $(".form-message").text("登录中...");                                                   
                window.location.href = "http://dev.admin.carrots.ptteng.com/#/dashboard";                                                            
            }
            
        }
    })
})
