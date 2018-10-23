$(function () { 
    // 搜索点击事件
    $('#search-btn').on("click",function () { 
        // 获取搜索内容
        var keyword=$(this).siblings("input").val();
        // 如果搜索内容存在
        if(keyword){
            // 将搜索内容放进数组储存 新搜索的最前面
            keyArr.unshift(keyword);
            // 本地储存数组转为的字符串
            localStorage.setItem("keyArr",JSON.stringify(keyArr));
            // 地址栏跳转,传递关键字
            location.href="search-result.html?keyword="+keyword;
        }else{
            alert("请输入要搜索的商品");
        }
     });
    //  定义一个空数组
     var keyArr=[];
    //  如果数组里面存在数据
     if(localStorage.getItem("keyArr")){
        //  将存储的字符串转化为数组
         keyArr=JSON.parse(localStorage.getItem("keyArr"));
        //  将数组套用模板引擎,动态生成历史记录
         var html=template("historyTpl",{result:keyArr});
         $("#history-box").html(html);
     }
    // 清除历史记录,将数组清空  历史记录清空  清空储存的数组
     $("#clearBtn").on("click",function () { 
            keyArr=[];
         $("#history-box").html("");
         localStorage.removeItem("keyArr");
      })





 })