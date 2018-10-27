$(function () { 
    var kucunNum=0;
    var size=null;
    var id= getParamsByUrl(location.href, 'id');
    var productId=0;
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {id:id},
        success: function (res) {
            kucunNum=res.num;
            productId=res.id;
            var html=template("productTpl",res);
            $("#product-box").html(html);
            var gallery=mui(".mui-slider");
            gallery.slider();
        }
    });
    $("#product-box").on("tap",".size span",function () {
        $(this).addClass("active").siblings("span").removeClass("active");
        size=$(this).html();
      });
      $('#product-box').on("tap","#increase",function () { 
          var num=$('#inp').val();
          num++;
          if(num>kucunNum){
              num=kucunNum;
          }
          $('#inp').val(num);
       })
       $('#product-box').on("tap","#reduce",function () { 
        var num=$('#inp').val();
        num--;
        if(num<1){
            num=1;
        }
        $('#inp').val(num);
     });

     $("#addCart").on("tap",function () { 
         if(!size){
             alert("请选择尺码");
             return;
         }
         $.ajax({
             type: "post",
             url: "/cart/addCart",
             data: {
                 productId:productId,
                 num:kucunNum,
                 size:size
             },
            
             success: function (res) {
                 if(res.success){
                     mui.confirm("加入购物车成功，正在前往购物车",function (message) { 
                         if(message.index){
                             location.href="cart.html";
                         }
                      })
                 }
             }
         });
      });


 });