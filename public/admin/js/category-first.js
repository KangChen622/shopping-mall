$(function () {
	// 当前页
	var page = 1;
	// 每页加载数量
	var pageSize = 10;
	// 最大页数
	var totalPage = 0;
	// 调用发送请求
	getCategory();
	// 上一页事件
	$("#prevBtn").on("click", function () {
		page--;
		if (page < 1) {
			page = 1;
			alert("已经是第一页了");
			return;
		}
		getCategory();
	});
	//  下一页事件
	$("#nextBtn").on("click", function () {
		page++;
		if (page > totalPage) {
			page = totalPage;
			alert("已经是最后一页了");
			return;
		}
		getCategory();
	});
	//  发送请求
	function getCategory() {
		$.ajax({
			url: '/category/queryTopCategoryPaging',
			type: 'get',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function (result) { 
				// 计算出最大页数 向上取整
				totalPage=Math.ceil(result.total/pageSize);
				$('#categoryBox').html(template('categoryTpl',{data:result}));
			 }
		})

	}
	
	// 添加分类
	$("#addCategory").on("click",function () {
		// 收集分类信息
		var categoryName=$("#categoryName").val();
		if(!categoryName){
			alert("请输入分类名称");
			return;
		}
		// 调用接口 添加分类、
		$.ajax({
			type:"post",
			url:"/category/addTopCategory",
			data:{
				categoryName:categoryName
			},
			success:function (result) {
				if(result.success){
					
					location.reload();
				}
			  }
		})
	  })




})