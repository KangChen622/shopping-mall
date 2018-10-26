// 接受传过来的关键字
var keyword=getParamsByUrl(location.href,"keyword");
// 设置当前页
var page=1;
// 页面中的数据
var html='';
// 排序规则  1是升序 2 是降序
var priceSort=1; 
// 后期改变this指向用
// 储存This
var This=null;
$(function () {
    // 通过关键字，调取搜索接口
    mui.init({
        pullRefresh:{
            container:"#refreshContainer", /*刷新区域*/
            up:{
                height:50,  /* 上拉距离触发刷新 */
                auto:true,  //自动上拉加载一次
                contentrefresh:"正在加载----",  //加载状态
                contentnomore:"没有更多数据了",  //请求完毕没有数据显示提示内容
                callback:getData //回调函数 获取新的商品
                // 此处调用this必须指向回调函数
            }
        }
    });
    // 排序重置
    $("#priceSort").on("tap",function () { 
        // 取反
        priceSort=priceSort==1?2:1;
        // 清空数据
        html='';
        page=1;
        // 重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
     });

  });
  function getData() { 
    //   最开始是this指向组建
    // 如果This一开始是没有值得，取反为真，则将this指向回调函数
      if(!This){
          This=this;
      }
      $.ajax({
          url:"/product/queryProduct",
          type:"get",
          data:{
              page:page++,  //页数+1
              pageSize:3, //每页加载数量
              paoName:keyword,  //关键字
              price:priceSort  //排序规则
          },
          success:function (response) { 
            //   如果还有数据
              if(response.data.length>0){
                //   套用模板渲染 加上原来的页面
                  html+=template("searchTpl",response);
                  $("#search-box").html(html);
                    // false表示还有数据
                  This.endPullupToRefresh(false);
                //   当前加载完毕 正在加载消失 不告诉组件，页面无法显示新数据
              }else{
                //   所有都已经加载完了 true表示没有更多数据
                This.endPullupToRefresh(true);
              }
           }
      })
   }