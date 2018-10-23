$(function () {
    // 初始化滚动插件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function (response) {
              var html=template('category-first',{result:response.rows});
              $('.links').html(html);
        }
    });


})