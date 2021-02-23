// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    count:0
  },
  
  onRegister: function(e) {
    var page = this;
    const db = wx.cloud.database();
    const information = db.collection("information");
    const detailed_infor= db.collection("detailed_infor");
    const score = db.collection("score");
    var phone_num = e.detail.value.phone_num;
    var password1 = e.detail.value.password1;
    var password2 = e.detail.value.password2;
    var age = e.detail.value.age ;
    var address_num = e.detail.value.address_num;
    var name = e.detail.value.name;
    var sex = e.detail.value.sex;


    information.where({
      phone_num: phone_num
    }).get().then(res => {
      if (res.data.length) {
        wx.showModal({
          title: "提示",
          content: "用户名已被占用，请重新起名"
        })
      } else{
        if (phone_num.length != 11) {
          wx.showModal({
            titel: "提示",
            content: "用户名必须是手机号"
          })
        } else if (password1 != password2) {
          wx.showModal({
            titel: "提示",
            content: "两次密码不一致"
          })
        } else if (password1.length < 6) {
          wx.showModal({
            titel: "提示",
            content: "请输入6位及以上密码"
          })
        } else if ((password1.search(/[a-z]/) == -1 & password1.search(/[A-Z]/) == -1 )|| password1.search(/\d/) == -1) {
          wx.showModal({
            titel: "提示",
            content: "密码必须同时包含字母和数字"
          })
        } else {
          var count = parseInt(Math.random()*90000+10000);
   
          information.add({
            data: {
              phone_num: phone_num,
              password: password1,
              id:count

            }
          })
          detailed_infor.add({
              data: {
                phone_num_d: phone_num,
                age: age,
                id_d:count,
                sex:sex,
                name:name,
                address_num_d:address_num,

  
              }
            })
            score.where({
              address_num:address_num
            }).get().then(res => {
          score.add({
                data: {
                  address_num:address_num,
                  scores:0
    
                }
                })
              })
  
          
          wx.showModal({
            titel: "提示",
            content: "注册成功!请登录",
            duration:3000,
             success(res){
               wx.redirectTo({
                 url: '../login/login',
               })
             }
          });
        }
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
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