$(function () {
    // 初始化滚动插件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function (response) {
            // console.log(response);
            var html = template('category-first', {
                result: response.rows
            });
            // console.log(html);
            $('.links').html(html);
            if(response.rows.length){
                $('.links a').eq(0).addClass('active').siblings().removeClass('active');
                var id=response.rows[0].id;
                getSecond(id);
            }
        }

       
    });
 $('.links').on("click",'a',function () { 
     var id=$(this).data('id');
     $(this).addClass('active').siblings().removeClass('active');
     getSecond(id);
     
  });
    function getSecond(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            success: function (response) {
                var html = template('category-second', response);
                $('.brand-list').html(html);
            }
        })

    }
 

})
