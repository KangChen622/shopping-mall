$(function () { 
    // 定义一个变量 接受地址
    var address=null;
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function (res) {
            // 存储收货地址
            address=res;
            // 模板渲染到界面
            var html=template("addressTpl",{result:res});
            $("#address-box").html(html);
        }
    });
    // 删除地址
    $("#address-box").on("tap",".delete-btn",function () { 
        // 获取每个自定义的ID
        var id=this.getAttribute("data-id");
        var li=this.parentNode.parentNode;
        // 组件删除提示
        mui.confirm("确定要删除吗?",function (message) {
            // message.index为1 则是确认删除  0 则是取消删除
            if(message.index==1){
                $.ajax({
                    url:'/address/deleteAddress',
                    type:'post',
                    data:{
                        // 传递要删除的地址id
                        id:id
                    },
                    success:function (res) {
                        if(res.success){
                            // 删除成功页面重加载
                            location.reload();
                        }
                      }
                })
            }else{
                // 关闭消息框，编辑删除归位隐藏
                mui.swipeoutClose(li);
            }

          })
     })
    // 编辑地址操作
     $("#address-box").on("tap",".edit-btn",function () {

         var id=this.getAttribute("data-id");
        //  将之前储存的所有地址遍历 根据id找到要编辑的地址
         for(var i=0;i<address.length;i++){
             if(address[i].id==id){
                //  把id传到修改界面 转化为字符串
                 localStorage.setItem("editAddress",JSON.stringify(address[i]));
                 break;
             }
         }
         location.href="addAddress.html?isEdit=1";
       })
      


     
 }) 