$(function () {

	/**
	 * 用户登录
	 * 1.获取登录按钮并且添加点击事件
	 * 2.获取到用户输入的表单信息
	 * 3.调用登录接口实现登录
	 * 4.如果用户登录成功跳转到会员中心
	 */
	// 登录开始
	$('#login-btn').on('click', function () {
		// 内容去空格
		var username = $.trim($("[name='username']").val());
		var password = $.trim($("[name='password']").val());
		// 获取账号密码发送后台

		if (!username) {
			mui.toast("请输入用户名");
			return;
		}

		if (!password) {
			mui.toast("请输入密码");
			return;
		}

		$.ajax({
			url: '/user/login',
			type: 'post',
			data: {
				username: username,
				password: password
			},
			// 告诉用户正在登录
			beforeSend: function () {
				$('#login-btn').html("正在登录...");
			},
			success: function (res) {
				if (res.success) {
					mui.toast("登录成功");

					$('#login-btn').html("登录");

					setTimeout(function(){
						location.href = "user.html";
					}, 2000);
				} else {
					$('#login-btn').html("登录");
					mui.toast("你的账号或密码输入有误");
				}

			}
		})


	});

});