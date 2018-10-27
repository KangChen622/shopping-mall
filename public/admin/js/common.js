// 登录拦截 判断是否有登录，没有则进入登录界面、
	$.ajax({
		type: "get",
		url: "/employee/checkRootLogin",
		async:false,
		success: function (res) {
			if(res.error&&res.error==400){
				location.href="login.html";
			}
		}
	});

// 退出功能
	$(function(){
		$("#loginOut").on("click",function () { 
			if(confirm("确定要退出吗")){
				$.ajax({
					url:"/employee/employeeLogout",
					type:'get',
					success:function (res) {
						if(res.success){
							location.href="login.html";
						}else{
							alert(res.message);
						}
					  }
				});
			}
		 });

		var navLi = $('.navs li');
	
		navLi.on('click',function(){
	
			$(this).find('ul').slideToggle();
	
		});
	
	})