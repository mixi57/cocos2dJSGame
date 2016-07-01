//var audioEngine = cc.audioEngine;
//var MUSIC_FILE = cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? "res/Together Forever.mp3" : "res/Together Forever.mp3";

var PageLayer = cc.Layer.extend({
	pageView:null,
	pageLayout:null,
	lastIndex:0,
	begin:0,
	end:0,
	ctor:function () {
		this._super();
		
		// 添加背景音乐
		//audioEngine.playMusic(MUSIC_FILE, true);
	 	
		var size = cc.size(1136, 640); 
		
		this.pageView = new ccui.PageView();
		this.pageView.setTouchEnabled(true);
		this.pageView.setContentSize(size);
		
		//this.pageView.setContentSize(cc.size(640, 1136));
		//pageView的锚点时0，0
		this.pageView.x =320-568;//size.width/2;
		this.pageView.y = 568-320;//size.height/2;
		 
		this.pageLayout = [];  
		this.isDisplay = [];
		var maxPage = 9; 
		/*
		for (var i = 0; i < maxPage; ++i) {
			
			this.pageLayout[i] = new ccui.Layout();
			this.pageLayout[i].setContentSize(cc.size(1136, 640));
			var layoutRect = this.pageLayout[i].getContentSize(); 
			
			//背景
			var imageView;
			if(i % 2 == 0)
				imageView = new cc.Sprite("res/1.png");
			else
				imageView = new cc.Sprite("res/2.png");
			imageView.x = layoutRect.width/2;
			imageView.y = layoutRect.height/2;
			this.pageLayout[i].addChild(imageView);
			
			this.pageLayout[i].layer = null;
			
			this.isDisplay[i] = false; 
			
			this.pageView.addPage(this.pageLayout[i]);		
		}*/
		
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
		
		this.pageLayout[0].layer = new ScrollPaintingLayer();
		this.pageLayout[1].layer = new RoutesLayer();
		this.pageLayout[2].layer = new WorldMapLayer();
		this.pageLayout[3].layer = new PhotoWallLayer();
		this.pageLayout[4].layer = new BooksLayer();
		this.pageLayout[5].layer = new BigPhotoLayer();
		this.pageLayout[6].layer = new BirthdayLayer();
		this.pageLayout[7].layer = new PublishLayer();
		this.pageLayout[8].layer = new AppendixLayer();


		for(var i = 0; i < maxPage; ++i){
			this.pageLayout[i].addChild(this.pageLayout[i].layer);
		}
		
		this.pageLayout[0].layer.doAnimation();
		this.isDisplay[0] = true;
		
		this.pageView.addEventListener(this.pageViewEvent, this);
		this.pageView.setTouchEnabled(false);   
		this.addChild(this.pageView,1000);  
		//this.pageView.setRotation(90);
		this.setRotation(90);
		var selfPointer = this;
		
		var listener = cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event){
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchBegan at: " + pos.x + " " + pos.y + " Id:" + id );
				cc.log(selfPointer.begin); 
				selfPointer.begin = pos.y;
				
				return true;
			},
			onTouchMoved: function(touch, event) {
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchMoved at: " + pos.x + " " + pos.y + " Id:" + id );
				selfPointer.end = pos.y;

			},
			onTouchEnded: function(touch, event) {
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchEnded at: " + pos.x + " " + pos.y + " Id:" + id );
				selfPointer.end = pos.y;
				//向上拖动
				if(selfPointer.end - selfPointer.begin > 50){
					if(selfPointer.lastIndex < maxPage-1){
						selfPointer.lastIndex++;
						var i = selfPointer.lastIndex;
						selfPointer.pageView.scrollToPage(i);
						selfPointer.begin = 0;
						selfPointer.end = 0; 
						if(!selfPointer.isDisplay[i] && selfPointer.pageLayout[i].layer.doAnimation){
							selfPointer.pageLayout[i].layer.doAnimation();
							selfPointer.isDisplay[i] = true;
						}
						if(i == maxPage-1){
							selfPointer.pageLayout[i].layer.setScrollTouch();
						}
					}
				} 
				//向下拖动				
				else if(selfPointer.begin - selfPointer.end > 50){
					if(selfPointer.lastIndex > 0){
						selfPointer.lastIndex--;
						var i = selfPointer.lastIndex;
						selfPointer.pageView.scrollToPage(i);
						selfPointer.begin = 0;
						selfPointer.end = 0; 
					}
				}
			},
			onTouchCancelled:function(touch, event) {
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchCancelled at: " + pos.x + " " + pos.y + " Id:" + id );

			}
		}, this);
		this._listener = listener;
		return true; 
	}, 
	
	
	pageViewEvent:function(){
		var i = this.pageView.getCurPageIndex();
		
	}
});

var PageViewScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new PageLayer();
		this.addChild(layer);
	}
});





