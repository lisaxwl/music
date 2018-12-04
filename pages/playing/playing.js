//playing.js
//获取应用实例
const app = getApp();

Page({
  data:{
    songInfo:'',
    audioIndex:0,
    playStatus: true,
    songData: {
      songUrl:'',
      songPic:'',
      songName:'',
      singer:'',
      id:''
    },
    newSongList:{},
    currentTime:0,
    totalTime:0,
    timer:''
  },
  onLoad: function () {
    this.setData({
      newSongList:app.globalData.songList //从全局中获取歌曲列表
    })

    var audioIndexStorage = wx.getStorageSync('audioIndex');
    console.log("音频的Index..." + parseInt(audioIndexStorage));
    if (audioIndexStorage) {
      this.setData({ audioIndex: audioIndexStorage });
    }
    this.play();
  },
  onReady: function () {

  },
  
  //音乐播放进度条
  bindSliderchange: function (e) {
    // clearInterval(this.data.timer)
    let value = e.detail.value
    let that = this
    console.log(e.detail.value)
    //获取后台音乐播放的状态
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let { status, duration } = res
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          });
          //控制音乐播放的进度
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          });
        }
      }
    })
  },

  //上一首
  bindPrevSong: function () {
    if (this.data.sign == 0) {
      wx.showToast({
        title: '暂无更多歌曲',
        image: '../../images/warning.png',
        duration: 2000
      })
    } else {
      
      let length = this.data.newSongList.data.length;
      let audioIndexPrev = this.data.audioIndex;
      let audioIndexNow = audioIndexPrev;
      if (audioIndexPrev === 0) {
        audioIndexNow = length - 1;
      } else {
        audioIndexNow = audioIndexPrev - 1;
      }
      console.log('上一首歌曲...'+audioIndexNow)
      this.setData({
        audioIndex: audioIndexNow,
        sliderValue: 0,
        currentTime: 0,
        totalTime: 0,
      })
      let that = this
      setTimeout(() => {
        if (that.data.playStatus === true) {
          that.play();
        }
      }, 1000);
      //设置audioIndex 为当前的index
      wx.setStorageSync('audioIndex', audioIndexNow);
    }
  },
  //下一首
  bindNextSong: function () {
    if(this.data.sign ==0){
      wx.showToast({
        title: '暂无更多歌曲',
        image:'../../images/warning.png',
        duration: 2000
      }) 
    }else{
      
      let length = this.data.newSongList.data.length;
      let audioIndexPrev = this.data.audioIndex;
      let audioIndexNow = audioIndexPrev;
      if (audioIndexPrev === length - 1) {
        audioIndexNow = 0;
        console.log(audioIndexNow+"==end")
      } else {
        audioIndexNow = audioIndexPrev + 1;
        console.log(audioIndexNow+"==")
      }
      console.log('下一首歌曲...'+audioIndexNow+"==")

      this.setData({
        audioIndex: audioIndexNow,
        sliderValue: 0,
        currentTime: 0,
        totalTime: 0,
      })
      let that = this
      setTimeout(() => {
        if (that.data.playStatus === true) {
          that.play();
        }
      }, 1000)
      wx.setStorageSync('audioIndex', audioIndexNow);
    }
  },
  //播放 暂停
  bindPlaySong: function () {
    console.log('播放/暂停音乐...');
    console.log(this.data.playStatus);
    if (this.data.playStatus) {
      this.play();
      this.setData({ 
        playStatus: false 
      });
    } else {
      wx.pauseBackgroundAudio();
      this.setData({ 
        playStatus: true 
      });
    }
  },
  //播放音乐函数
  play() {
    console.log("===========")
    let that = this;
    let { newSongList, audioIndex } = that.data;

    console.log("播放时的数据..."+this.data.playStatus)
    console.log(that.data);
      
    let songId, songUrl, songPic,songName,singer;

    let rankFormatOne = newSongList.data[audioIndex]; //  从歌单中获取当前的歌曲信息
      songUrl = rankFormatOne.url;
      songPic = rankFormatOne.pic;
      songName = rankFormatOne.songName;
      singer = rankFormatOne.singer;
      songId =rankFormatOne.id;

    that.setData({
      songData: {
        songUrl: songUrl,
        songPic: songPic,
        songName: songName,
        singer: singer,
        id:songId
      },
    })

    wx.playBackgroundAudio({
      dataUrl: that.data.songData.songUrl,
      title: that.data.songData.songName,
      coverImgUrl: that.data.songData.songPic
    })
    let timer = setInterval(function () {
      that.setDuration(that)
    }, 1000)
    that.setData({ timer: timer })
  },
  //音乐 时间轴
  setDuration(that) {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        // console.log(res)
        let { status, duration, currentPosition } = res
        if (status === 1 || status === 0) {
          that.setData({
            currentTime: that.stotime(currentPosition),
            totalTime: that.stotime(duration),
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
        }
      }
    })
  },
  //时间转换
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },
});