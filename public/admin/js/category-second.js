$(function () {
	var page = 1;
	var pageSize = 10;
	var totalPage = 0;
	// 二级页面动态生成
	GetCategory();

	function GetCategory() {

		$.ajax({
			type: 'get',
			url: '/category/querySecondCategoryPaging',
			data: {
				page: page,
				pageSize: pageSize
			},
			success: function (result) {

				console.log(result)

				totalPage = Math.ceil(result.total / pageSize);

				$('#categoryBox').html(template('categoryTpl', {
					data: result
				}))

			}
		});

	}
// 上一页
	$('#prevBtn').on('click', function () {

		page--;

		if (page < 1) {

			page = 1;

			alert('已经是第一页了');

			return;

		}

		GetCategory()

	});
	// 下一页

	$('#nextBtn').on('click', function () {

		page++;

		if (page > totalPage) {

			page = totalPage;

			alert('已经是最后一页了');

			return;

		}

		GetCategory();

	});
	// 上传图片预览
	$('#fileUpload').fileupload({
		dataType: 'json',
		done: function (e, data) {
			// 储存图片地址
			brandData.brandLogo = data._response.result.picAddr;
			// 获取上传图片地址 实现图片预览
			var imgUrl = data._response.result.picAddr;
			$("#showBrand").attr("src", imgUrl);
		}
	});

	// 获取一级分类
	$.ajax({
		url: '/category/queryTopCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function (result) {
			$('#firstCategory').html(template('firstCategoryTpl', {
				data: result.rows
			}));
		}
	});
	var brandData = {
		brandName: "",
		categoryId: "",
		brandLogo: "",
		hot: 0   //火热品牌 1表示火热 必填
		
	};
	// 添加分类
	$("#addCategory").on("click", function () {
		// 获取商品名称
		brandData.brandName = $('#brandName').val().trim();
		// 所属一级分类 不选默认为-1
		brandData.categoryId = $('#categoryId').val().trim();

		if (brandData.categoryId === "-1") {
			alert("请输入品牌所属分类");
			return;
		}
		if(!brandData.brandName){
			alert("请输入品牌名称");
			return;
		}
		if(!brandData.brandLogo){
			alert("请上传品牌图片");
			return;
		}
		$.ajax({
			url:'/category/addSecondCategory',
			type:'post',
			data:brandData,
			success:function(result){

				if(result.success){

					location.reload();

				}else{

					alert('品牌添加失败');

					console.log(result);

				}

			}
		})
	})

})