$(function () { 
	// 调用接口展示 相关信息
	$.ajax({
		type: "get",
		url: "/user/queryUser",
		data: {
			page:1,   //页数
			pageSize:10 //每页数量
		},
		success: function (result) {
			$("#userBox").html(template("userTpl",{data:result}));
		}
	});
	$("body").on("click","#deleteBtn",function () {
		var id=$(this).data("id");
		var isDelete=parseInt($(this).data("isDelete"));
		console.log(isDelete);
		$.ajax({
			url:"/user/updateUser",
			type:'post',
			data:{
				id:id,
				// 1 是启用 0 是禁用  点击取反
				isDelete:isDelete?0:1
			},
			success:function (res) { 
				console.log(isDelete);
				if(res.success){
					// 页面重加载
					location.reload();
				}
			 }
		})
	  })
 })