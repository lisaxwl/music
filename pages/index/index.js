//index.js
//获取应用实例
var common = require('../../modules/common.js')
const app = getApp();
var order = ['red', 'yellow', 'blue', 'green', 'red'];

Page({
  data: {
     winWidth: 0, 
  winHeight: 0, 
  // tab切换 
  currentTab: 0, 
    imgUrls: [
      { id: 0, url: "../../images/banner/01.jpg", },
      { id: 1, url: "../../images/banner/02.jpg", },
      { id: 2, url: "../../images/banner/03.jpg", },
      { id: 3, url: "../../images/banner/04.jpg", },
      { id: 4, url: "../../images/banner/05.jpg", },
      { id: 5, url: "../../images/banner/06.jpg", },
      { id: 6, url: "../../images/banner/07.jpg", },
      { id: 7, url: "../../images/banner/08.jpg", },
      { id: 8, url: "../../images/banner/09.jpg", },
      { id: 9, url: "../../images/banner/10.jpg", }
    ],
    indicatorDots: true,//显示面板指示点
    autoplay: true,//自动播放
    beforeColor: "white",//指示点颜色
    afterColor: "coral",//当前选中的指示点颜色
    music_list:[
      {
        albumname:"失落少年孤独心俱乐部",
        albumimg:"http://p1.music.126.net/f4rq2vrd2AQ1i8KDazRHhQ==/109951163421407852.jpg?param=140y140",
        listennum:58
      },
      {
        albumname:"另类R&B|无法抗拒的别样性感",
        albumimg:"http://p1.music.126.net/wF_Nrb1fkPxd6kff3QYAcQ==/109951163515579946.jpg?param=140y140",
        listennum:34
      },
      {
        albumname:"《中国新说唱》入围选手作品合集",
        albumimg:"http://p1.music.126.net/EkTY14KMxcQGPVrt6FAHuA==/109951163380159129.jpg?param=140y140",
        listennum:134
      },
      {
        albumname:"加州音乐节【Escape Psycho Circus】",
        albumimg:"http://p1.music.126.net/gBAPIcNMqPgVG9063wJHeg==/19145795975061565.jpg?param=140y140",
        listennum:67
      },
      {
        albumname:"当我和世界初相见，当我曾经是少年",
        albumimg:"http://p1.music.126.net/nTilbFmTKP3GVWBQEh-sxw==/109951163400107737.jpg?param=140y140",
        listennum:84
      },
      {
        albumname:"华语速爆新歌",
        albumimg:"http://p1.music.126.net/AgAjHpAHJ2NRPpzVUjTSqg==/109951163410056655.jpg?param=140y140",
        listennum:72
      }
    ],
    progress:0,
    currentSong:
        {
          songName:"演员",
        imgsrc:"http://p1.music.126.net/gBAPIcNMqPgVG9063wJHeg==/19145795975061565.jpg?param=140y140",
        songurl:"http://zhangmenshiting.qianqian.com/data2/music/03f079f62f693c045ec78416f8ae3515/596832469/596832469.mp3?xcode=6effbe3abbb7c4832c25efac0ddd93cf",
        author:"薛之谦",
        coverImgUrl:"http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg"
      }
        
  },
  MusicStart:function(e){
    var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
    var that = this
    that.setData({
     progress: progress
    })
    console.log('音乐播放进度为'+progress+'%')
  },
  MusicEnd:function(){
    this.setData({
     progress: 0
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    /**
     * 监听音乐播放
     */

     var that = this; 
  
  /** 
   * 获取系统信息 
   */
  wx.getSystemInfo( { 
  
   success: function( res ) { 
    that.setData( { 
     winWidth: res.windowWidth, 
     winHeight: res.windowHeight 
    }); 
   } 
  
  }); 

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {//页面显示/切入前台时触发。
    console.log(this.route)//到当前页面的路径
  },
  onReady: function () {//页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。

  },
  onHide: function () { //页面隐藏/切入后台时触发。

  },
  onPullDownRefresh:function(){//监听用户下拉刷新事件。

  },
  onUnload: function () {//页面卸载时触发。如redirectTo或navigateBack到其他页面时。

  },
  onReachBottom: function () {//监听用户上拉触底事件

  },
  onPageScroll: function () { //监听用户滑动页面事件。

  },
  onShareAppMessage: function (res) {//监听用户点击页面内转发按钮（<button> 组件 open-type="share"）或右上角菜单“转发”按钮的行为
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: 'pages/index/index'
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 

  /** 
   * 滑动切换tab 
   */
 bindChange: function( e ) { 
  console.log(e)
  var that = this; 
  that.setData( { currentTab: e.detail.current }); 
 }, 
 /** 
  * 点击tab切换 
  */
 swichNav: function( e ) { 
  
  var that = this; 
  
  if( this.data.currentTab === e.target.dataset.current ) { 
   return false; 
  } else { 
   that.setData( { 
    currentTab: e.target.dataset.current 
   }) 
  } 
  console.log(e.target.dataset )
 } ,

  songList:function(){
    wx.navigateTo({
      url: '../list/list'
    });
  }

})
