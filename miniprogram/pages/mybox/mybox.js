// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    order_num:'',
    scores:'',
    address_num_rec:'',
  },

  SetMydata:function() {

    var that = this;
    const db = wx.cloud.database();
    const information = db.collection("information");
    const detailed_infor= db.collection("detailed_infor");
    const score = db.collection("score");
    const order = db.collection("order");
    var address = '';
    var phone_num = wx.getStorageSync('phone_num');//获取用户id
    detailed_infor.where({
      phone_num_d : phone_num,

    }).get().then(res => {
      address = res.data[0].address_num_d;
      that.setData(
        {
            order_num:phone_num,
            address_num_rec:res.data[0].address_num_d
        }
      )
      score.where({
        address_num : address,
  
      }).get().then(r=> {
        console.log(r.data[0])
        that.setData(
          {
              scores:r.data[0].scores,
          },  
        )
 
      })

    })
  
  },
 
  onRegister: function(e) {
    var page = this;
    var condition = e.detail.value.condition;
    var size = e.detail.value.size;
    var that = this;
    const db = wx.cloud.database();
    const information = db.collection("information");
    const detailed_infor= db.collection("detailed_infor");
    const score = db.collection("score");
    const order = db.collection("order");
    var address = '';
    var phone_num = wx.getStorageSync('phone_num');//获取用户id
    detailed_infor.where({
      phone_num_d : phone_num,

    }).get().then(res => {
      address = res.data[0].address_num_d;

      score.where({
        address_num : address,
  
      }).get().then(r=> {
        console.log(r.data[0])

        order.add({
          order_num:phone_num,
          address_num_rec:res.data[0].address_num_d,
          scores:r.data[0].scores,
          condition :condition,
          size:size
        })

        
 
      })
    })
     
  },


    
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.SetMydata();
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