$(function () {
  //调用getUserInfos获取用户基本信息

  getUserInfo();
});

var layer = layui.layer;
//点击按钮实现退出功能
$("#btnLoginout").on("click", function () {
  //提示用户是否确认退出
  layer.confirm("确认退出登录？", { icon: 3, title: "提示" }, function (index) {
    //do something
    // 1. 清空本地存储中的 token
    localStorage.removeItem("token");
    // 2. 重新跳转到登录页面
    location.href = "/login.html";

    // 关闭 confirm 询问框
    layer.close(index);
  });
});
function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",
    //headers就是请求头配置对象
    // headers: {
    //   //   Authorization 授权
    //   Authorization: localStorage.getItem("token"),
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      // 调用renderAvatar 渲染用户头像
      renderAvatar(res.data);
    },
  });
  //   // 全局统一挂载 complete 回调函数
  //   options.complete = function (res) {
  //     // console.log('执行了 complete 回调：')
  //     // console.log(res)
  //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
  //     if (
  //       res.responseJSON.status === 1 &&
  //       res.responseJSON.message === "身份认证失败！"
  //     ) {
  //       // 1. 强制清空 token
  //       localStorage.removeItem("token");
  //       // 2. 强制跳转到登录页面
  //       location.href = "/login.html";
  //     }
  //   };
}

//1.渲染用户头像
function renderAvatar(user) {
  // 获取用户头像名称
  var name = user.nickname || user.username;
  // 2.设置欢迎文本
  $("welcome").html("欢迎&nbsp;&nbsp;" + name);
  //3.按需渲染用户头像
  if (user.user_pic !== null) {
    //3.1渲染图片头像
    $(".layui-nav-img").attar("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    //3.2渲染文本头像
    $(".layui-nav-img").hide();
    //把字母的首字母转换为大写
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
