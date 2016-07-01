var audioEngine = cc.audioEngine;
var MUSIC_FILE = cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? "res/Together Forever.mp3" : "res/Together Forever.mp3";

var PageLayer = cc.Layer.extend({
	pageView:null,
	pageLayout:null,
	lastIndex:0,
	ctor:function () {
		this._super();
		
		// 添加背景音乐
		audioEngine.playMusic(MUSIC_FILE, true);
	 	
		var size = cc.winSize;

		this.pageView = new ccui.PageView();
		this.pageView.setTouchEnabled(true);
		this.pageView.setContentSize(size);
		//pageView的锚点时0，0
		this.pageView.x = 0;//size.width/2;
		this.pageView.y = 0;//size.height/2;
		 
		this.pageLayout = [];  
		this.isDisplay = [];
		var maxPage = 8; 
		for (var i = 0; i < maxPage; ++i) {
			this.pageLayout[i] = new ccui.Layout();
			this.pageLayout[i].setContentSize(size);
			var layoutRect = this.pageLayout[i].getContentSize(); 
			
			//背景
			//var imageView = new cc.LayerColor(cc.color("#ffffff"));
			var imageView = new ccui.ImageView();
			imageView.loadTexture(res.Backgound_png);
			imageView.x = layoutRect.width/2;
			imageView.y = layoutRect.height/2;
			this.pageLayout[i].addChild(imageView);
			
			this.pageLayout[i].layer = null;
			
			this.isDisplay[i] = false; 
			
			this.pageView.addPage(this.pageLayout[i]);		
		}
		//this.pageLayout[0].layer = new RoutesLayer(res.Page2_png, res.Timeline1_png, 0, 10);
		//this.pageLayout[0].addChild(this.pageLayout[0].layer);
		
		
		
		
		this.pageLayout[0].layer = new ScrollPaintingLayer();
		this.pageLayout[1].layer = new RoutesLayer(res.Page2_png, res.Timeline1_png, 0, 10, true);
		this.pageLayout[2].layer = new WorldMapLayer();
		this.pageLayout[3].layer = new PhotoWallLayer();
		this.pageLayout[4].layer = new BooksLayer();
		this.pageLayout[5].layer = new BirthdayLayer();
		this.pageLayout[6].layer = new PublishLayer();
		this.pageLayout[7].layer = new AppendixLayer();
		
		
		for(var i = 0; i < maxPage; ++i){
			this.pageLayout[i].addChild(this.pageLayout[i].layer);
		}
		
		
		this.pageView.addEventListener(this.pageViewEvent, this);
		this.addChild(this.pageView,1000);  
		
		this.pageLayout[0].layer.doAnimation();
		this.isDisplay[0] = true;

		return true;
	}, 
	
	pageViewEvent:function(){
		var i = this.pageView.getCurPageIndex();
		//该页还没展示
		if(!this.isDisplay[i] && this.pageLayout[i].layer.doAnimation){
			this.pageLayout[i].layer.doAnimation();
			this.isDisplay[i] = true;
			/*
			switch(i){
			//卷轴画 
			case 0:
				this.pageLayout[i].layer = new ScrollPaintingLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
				//行程时间轴 
			case 1:
				this.pageLayout[i].layer = new RoutesLayer(res.Page2_png, res.Timeline1_png, 0, 10, true);
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
			case 2:
				this.pageLayout[i].layer = new RoutesLayer(res.Page3_png, res.Timeline2_png, 11, 22, false);
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
			case 3:
				this.pageLayout[i].layer = new RoutesLayer(res.Page3_png, res.Timeline2_png, 23, 34, false);
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
			case 4:
				this.pageLayout[i].layer = new RoutesLayer(res.Page5_png, res.Timeline3_png, 35, 43, false); 
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break; 
				//世界地图
			case 5:
				this.pageLayout[i].layer = new WorldMapLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
				//照片墙
			case 6:
				this.pageLayout[i].layer = new PhotoWallLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
				//山水图和书影
			case 7:		
				this.pageLayout[i].layer = new BooksLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
				//祝校长生日快乐
			case 8:		
				this.pageLayout[i].layer = new BirthdayLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
				//火烈鸟出品logo
			case 9:		
				this.pageLayout[i].layer = new PublishLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
				//附录
			case 10:		
				this.pageLayout[i].layer = new AppendixLayer();
				this.pageLayout[i].addChild(this.pageLayout[i].layer);
				this.isDisplay[i] = true;
				break;
			default:
				break;
			}*/
		}
		if(i == 7){
			this.pageLayout[i].layer.setScrollTouch();
		}	
		
	}
});

var PageViewScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new PageLayer();
		this.addChild(layer);
	}
});





