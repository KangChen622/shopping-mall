$(function () { 
    $("#modify-btn").on("tap",function () { 
        var originPass=$.trim($("[name='originPass']").val());
        var newPass=$.trim($("[name='newPass']").val());
        var confirmNewPass=$.trim($("[name='confirmNewPass']").val());
        var vCode=$.trim($("[name='vCode']").val());
        if(!originPass){

			mui.toast('请输入原密码');

			return;

		}

		if(newPass != confirmNewPass){

			mui.toast('两次输入的密码不一致');

			return;

        }
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
                oldPassword: originPass,
				newPassword: newPass,
				vCode: vCode
            },
            success: function (res) {
                // 此处可添加提示，如果输入错误、
                if(res.success){
                    console.log('aaa');
                    mui.toast("修改密码成功");
                    setTimeout(function () {
                        location.href="login.html";
                      },2000)
                }
                
            }
        });
     })


    //  获取验证码
    $("#getCode").on("tap",function () { 
        $.ajax({
            type: "get",
            url: "/user/vCodeForUpdatePassword",
            success: function (res) {
                console.log(res.vCode);
            }
        });
     });
 });