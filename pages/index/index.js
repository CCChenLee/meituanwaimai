//index.js
var app = getApp()
Page({
  data: {
    pageType: 1,
    // index
    userInfo: {},
    orderOrBusiness: 'order',
    autoplay: true,
    interval: 3000,
    duration: 500,
    vertical: true,
    circular: true,
    
    menu: [
      { id: 0, name: "发粿" },
      { id: 1, name: "红粿" },
      { id: 2, name: "机粽" },
      { id: 3, name: "朴籽粿" },
      { id: 4, name: "甜果" },
    ],

    imgArr: [
      '../../img/fa1.jpg',
      '../../img/fa2.jpg',
      '../../img/fa3.jpg'
    ],

    height: 0,
    orderType: 0,  //点菜类型
    restaurant: false,  //餐厅点菜
    map_address: '',
    buycar_num: 0,
    block: false,  //选规格
    foodtype: 0,  //选规格种类
    // bindId: 0,

    // buycar
    // totalMoney: 0,
    // chooseAll: false,
    
    arr0: [
      { id: 0, img: "../../img/fa1.jpg", name: "发粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 0, img: "../../img/fa2.jpg", name: "发粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 0, img: "../../img/fa3.jpg", name: "发粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 1, img: "../../img/hong1.jpg", name: "红粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 1, img: "../../img/hong2.jpg", name: "红粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 2, img: "../../img/ji1.jpg", name: "机粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 2, img: "../../img/ji2.jpg", name: "机粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 3, img: "../../img/pu1.jpg", name: "朴籽粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' },
      { id: 4, img: "../../img/tian1.jpg", name: "甜粿", num: "0", price: "待定", message: "介绍", message2: "介绍", message3: '' }
    ],
    
    // order
    orderOk: false,
    // me
    img: ''
  },
  onLoad: function () {    
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?ak=LClVsCTaW2aH8MzuviP1YMymrHWOIVvg&coordtype=gcj02ll&location=' + latitude + ',' + longitude + '&output=json&pois=0',
          method: "get",
          success: function (res) {
            var address = res.data.result.formatted_address;
            address = address.split('省')[1].split('市')[1];
            that.setData({
              map_address: address
            }) 
            console.log(that.data.map_address)
          }
        })
      }
    })
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
        img: userInfo.avatarUrl
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ 
          height: (res.windowHeight*.57)+'px'
        })
      }
    });
  },
  turnMenu: function(e) {
    var type = e.target.dataset.index;
    // console.log(type);
    // this.setData({
    //   orderType: type
    // })
  },
  chooseType: function (e) {
    var type = e.currentTarget.dataset.id;
    if (type == 1 && this.data.restaurant == true) {
      wx.setNavigationBarTitle({ title: '点餐' })
    } else if (type == 1 && this.data.restaurant != true) {
      wx.setNavigationBarTitle({ title: '外卖' })
    } else if (type == 2) {
      wx.setNavigationBarTitle({ title: '购物车' })
    } else if (type == 3) {
      wx.setNavigationBarTitle({ title: '订单' })
    } else if (type == 4) {
      wx.setNavigationBarTitle({ title: '我的' })
    }
    this.setData({
      pageType: type
    })
  },
  // index
  searchKey: function(e) {
    this.setData({
      searchKey: e.detail.value
    })    
  },
  searchBtn: function() {
    var keyWork = this.data.searchKey;
    wx.redirectTo({
      url: '../test/test',
    })
    wx.request({
      url: '',
      data: {
        
      },
      success: function (res) {
        
      }
    })
  },
  //商家点击
  tabChange: function(e) {
    var type = e.currentTarget.dataset.id;
    this.setData({
      orderOrBusiness: type
    })
  },
  toSetmenu: function() {
    wx.navigateTo({
      url: '../setmenu/setmenu'
    })
  },
  //扫码可以改成微信支付？
  saoma: function() {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        that.setData({
          restaurant: true
        })
        wx.setNavigationBarTitle({ title: '点餐' })
      },
      fail: (res) => {
        that.setData({
          restaurant: false
        });
      }
    })
  },
  toFoodDetail: function() {
    wx.previewImage({
      urls:['../img'],
    })
  },
  close: function () {
    this.setData({
      block: false
    })
  },
  resetNum: function (e) {
    var type = e.currentTarget.dataset.id;
    this.setData({
      foodtype: type
    })
  },
  submit: function() {
    var i = this.data.bindId;
    var arr3 = this.data.arr3;
    arr3[i].num = parseInt(arr3[i].num)+1
    this.setData({
      block: false,
      arr3: arr3
    })
  },
  getAddress: function() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        if (res.address.length > 10) {
          res.address = res.address.substr(0, 10) + '...'
        }
        that.setData({
          map_address: res.address
        })
      },
    })
  },
  takeOut: function() {
    this.setData({
      restaurant: false
    })
    wx.setNavigationBarTitle({ title: '外卖' })
  },
  // order
  orderOk: function() {
    this.setData({
      orderOk: true
    })
  },
  okCancel: function() {
    this.setData({
      orderOk: false
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '18316588252',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  okOk: function () {
    this.setData({
      orderOk: false
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toMyPackage: function () {
    wx.navigateTo({
      url: '../myPackage/myPackage'
    })
  },
  toMyAddress: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  toDetail: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  },

  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
