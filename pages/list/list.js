var util = require('../../utils/util.js');

const app = getApp();

Page({
  data:{
  	list:[]
  },
  onLoad: function () {
    // 异步调用方法

    // util.getRecommendList(27,function (data) {
    //   console.log("推荐新歌...");
    //   that.setData({
    //     list: data
    //   })
    // });


    //本地化方法
    this.setData({
	  	list:{
	  		album:"华语 酷(温柔)女孩，男孩们了解一下",
	  		pic_album:"http://p1.music.126.net/Ct4Fbftkdk_zulGEhpgUjA==/109951163032803654.jpg?param=130y130",
	  		time:"2018-03-19",
	  		data:[
	  			{
			  		songName:"红短发女孩",
			  		id:"1",
			  		singer:"龚子婕JessieG",
			  		url:"http://mpge.5nd.com/2015/2015-6-7/67375/2.mp3",
			  		pic:"http://p1.music.126.net/Ct4Fbftkdk_zulGEhpgUjA==/109951163032803654.jpg?param=130y130"
			  	},{
			  		songName:"爱了很久的朋友",
			  		id:"2",
			  		singer:"田馥甄",
			  		url:"http://mpge.5nd.com/2015/2015-6-7/67375/3.mp3",
			  		pic:"http://p1.music.126.net/tegGg2OyD9OdsXyHG-IRfQ==/109951163213124268.jpg?param=130y130"
			  	},{
			  		songName:"你我之间",
			  		id:"3",
			  		singer:"周也棠",
			  		url:"http://mpge.5nd.com/2015/2015-6-7/67375/1.mp3",
			  		pic:"http://p1.music.126.net/3C__hbv7v62mZ4cZBhLd3Q==/7942872001145752.jpg?param=130y130"
			  	},{
			  		songName:"他不爱我",
			  		id:"4",
			  		singer:"金沙",
			  		url:"http://mpge.5nd.com/2015/2015-6-7/67375/2.mp3",
			  		pic:"http://p1.music.126.net/q5Hq-bTYy9t0_fJRJIdAxQ==/272678883704278.jpg?param=130y130"
			  	},{
			  		songName:"遥远的歌",
			  		id:"5",
			  		singer:"刘惜君",
			  		url:"http://mpge.5nd.com/2015/2015-6-7/67375/3.mp3",
			  		pic:"http://qukufile2.qianqian.com/data2/pic/bfbc7f2652d41dcf33d53b9dbee910cf/566552305/566552305.jpeg@s_1,w_224,h_224"
			  	},{
			  		songName:"演员",
			  		id:"6",
			  		singer:"薛之谦",
			  		url:"http://mpge.5nd.com/2015/2015-6-7/67375/1.mp3",
			  		pic:"http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg"
			  	}
	  		]
	  	}
	  })
  },

  playsongTap:function(e){
  	console.log(e.currentTarget.id+"==="+JSON.stringify(e.currentTarget))
  	app.setGlobalData({
      songList: e.currentTarget.dataset.data,//歌单设置到全局中
      audioIndex: parseInt(e.currentTarget.id, 10) //当前的歌曲id放到本地缓存
    });
    wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10));//设置本地数据缓存


  	wx.navigateTo({
      url: '../playing/playing'
    });
  }

})