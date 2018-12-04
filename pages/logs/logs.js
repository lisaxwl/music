//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    MusicList:[
       {songName:"加州音乐节【Escape Psycho Circus】",
        imgsrc:"http://p1.music.126.net/gBAPIcNMqPgVG9063wJHeg==/19145795975061565.jpg?param=140y140",
        songurl:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46",
        author:"薛之谦",
        coverImgUrl:"http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg"}
    ]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  MusicStart:function(e){
  var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
  var that = this
  that.setData({
   progress: progress
  })
  console.log('音乐播放进度为'+progress+'%')
  }
})
