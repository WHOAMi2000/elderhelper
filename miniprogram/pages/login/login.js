// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name : "",
    password : "",
    userid : ""
  },


  onLogin: function(e) {

    const db = wx.cloud.database();
    const users = db.collection("information");
    var userid = e.detail.value.userid;
    var password = e.detail.value.password;

    console.log(userid)
    console.log(password)
    users.where({
      phone_num : userid,
      password: password
    }).get().then(res => {
      if (res.data.length) {
        wx.setStorageSync('phone_num', res.data[0].phone_num); //将user_name存入本地缓存
        wx.showModal({
          title: "提示",
          content: "登陆成功"
        })
  
      } else {
        wx.showModal({
          title: "提示",
          content: "用户名不存在或密码错误"
        })
        
      }
    })

  },
  turntoregister:function(){
    wx.redirectTo({
      url: '../../pages/change/register',
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})