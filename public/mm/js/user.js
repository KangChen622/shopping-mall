var userInfo = null;
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    success: function (res) {
        if (res.error && res.error == 400) {
            location.href = "login.html";
            console.log("aaaa");
        }
        userInfo = res;
    }
});
$(function () {
    $("#logout").on("click", function () {
        $.ajax({
            url: "/user/logout",
            type: 'get',
            success: function (res) {
                console.log("aaa");
                if (res.success) {
                    mui.toast("退出登录成功");
                    
                    setTimeout(function () {
                        console.log("bbb");
                       location.href="index.html";
                    }, 2000);
                }
            }
        })
    })
    var html=template("userTpl",userInfo);
    $("#userInfoBox").html(html);
})