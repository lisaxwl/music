// pages/component/play.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'default value',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentSong:
        {
          songName:"演员",
        imgsrc:"http://p1.music.126.net/gBAPIcNMqPgVG9063wJHeg==/19145795975061565.jpg?param=140y140",
        songurl:"http://zhangmenshiting.qianqian.com/data2/music/03f079f62f693c045ec78416f8ae3515/596832469/596832469.mp3?xcode=6effbe3abbb7c4832c25efac0ddd93cf",
        author:"薛之谦",
        coverImgUrl:"http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg"
      },
      isPlay:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play: function (event) {
      console.log("-----")
      if(this.data.isPlay){
        this.listenerButtonPause();
      }else {
        var that = this;
          var data = event.currentTarget.dataset.testid;
         
            wx.playBackgroundAudio({
              dataUrl: data.songurl,
              title: data.songName,
              //图片地址地址
              coverImgUrl: data.coverImgUrl
            })
            that.setData({isPlay:true})  
      }
    },
    //监听button暂停按钮
    listenerButtonPause: function () {
      console.log('暂停播放')
      wx.pauseBackgroundAudio({});
      this.setData({isPlay:false})
      
    },
    toDetail: function(){
      wx.navigateTo({
        url: '../list/list'
      });
    }
  }
})

