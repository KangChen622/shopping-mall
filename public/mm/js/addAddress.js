 $(function () {
        //   根据标识来判断是修改还是添加
             var isEdit = Number(getParamsByUrl(location.href, "isEdit"));
            //  1 为真 表示编辑
             if (isEdit) {
                // 如果存在地址标识，就动态渲染改地址
                 if (localStorage.getItem("editAddress")) {
                    //  转化为json格式
                     var address = JSON.parse(localStorage.getItem("editAddress"));
                    //  套用模板动态生成
                     var html = template("editTpl", address);
                     $("#editForm").html(html);
                 }
             } else {
                //  如果没有表示，则是添加地址
                 var html = template("editTpl", {});
                 $('#editForm').html(html);
             }
             // 创建picker选择器
             var picker = new mui.PopPicker({
                 layer: 3
             });
             // 为picker选择器添加数据
             picker.setData(cityData);
             // 当用户点击收货地址栏 调用三级联动
             $('#selectCity').on('tap', function () {
                 // 显示picker选择器
                 picker.show(function (selectItems) {
                     // 将用户选择的内容显示在文本框中
                     $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
                 });
             });
            //  确认按钮点击
             $('#addAddress').on('tap', function () {
                // 收集信息
                 var username = $.trim($("[name='username']").val());
                 var postCode = $.trim($("[name='postCode']").val());
                 var city = $.trim($("[name='city']").val());
                 var detail = $.trim($("[name='detail']").val());

                 if (!username) {
                     mui.toast("请输入收货人姓名");
                     return;
                 }

                 if (!postCode) {
                     mui.toast("请输入邮政编码");
                     return;
                 }

                 var data = {
                     address: city,
                     addressDetail: detail,
                     recipients: username,
                     postcode: postCode
                 };
                //  根据标识来判断是修改还是添加
                 if (isEdit) {

                     // 编辑操作
                     var url = "/address/updateAddress";

                     data.id = address.id;

                 } else {

                     // 添加操作
                     var url = "/address/addAddress";
                 }

                 $.ajax({
                    //  根据标识动态查询接口,是修改还是新增 
                     url: url,
                     type: 'post',
                     data: data,
                     success: function (res) {

                         if (res.success) {

                             if (isEdit) {
                                 mui.toast("地址修改成功");
                             } else {
                                 mui.toast("地址添加成功");
                             }
                            //  修改完成后跳转至地址管理界面
                             setTimeout(function () {
                                 location.href = "address.html";
                             }, 2000) 

                         }

                     }
                 })


             });
         })