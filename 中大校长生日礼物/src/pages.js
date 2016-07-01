//var audioEngine = cc.audioEngine;
//var MUSIC_FILE = cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? res.BgMusic :  res.BgMusic;

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
		
		for (var i = 0; i < maxPage; ++i) {
			this.pageLayout[i] = new ccui.Layout();
			this.pageLayout[i].setContentSize(size);
			var layoutRect = this.pageLayout[i].getContentSize(); 

			//背景
			//var imageView = new cc.LayerColor(cc.color("#ffffff"));
//			var imageView = new ccui.ImageView();
//			imageView.loadTexture(res.Backgound_png);
//			imageView.x = layoutRect.width/2;
//			imageView.y = layoutRect.height/2;
//			this.pageLayout[i].addChild(imageView);

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
		var pageSizeWidth = size.width;//selfPointer.pageView.getPage(0).getContentSize().width;
		var pageNum = maxPage;
		
		
		var moveFunction = function(offsetX){
			var page = null;
			var nextPageX = 0;
			var movePageNum = 0;
			var index = pageNum - 1;
			while ( movePageNum < pageNum ){
				page = selfPointer.pageLayout[index];
				if (page) {
					nextPageX = page.x + offsetX;
					//cc.log("page index ",index ,nextPageX,page.x);
					if (index == 0 || index == pageNum-1 ){
						if (index == 0 && nextPageX > 0) {
							nextPageX = 0;
							break;
						}else if (index == pageNum-1 && nextPageX < 0) {
							nextPageX = 0;
							break;
						}
					}
					page.x = nextPageX; 
					// next
					movePageNum ++;
					index ++;
					if (index == pageNum) {
						index = 0;
					}
				}

			}
		}
		
		var listener = cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event){
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchBegan at: " + pos.x + " " + pos.y + " Id:" + id );
				cc.log(selfPointer.begin); 
				selfPointer.begin = pos.y;
				selfPointer.end = pos.y;
				return true;
			},
			onTouchMoved: function(touch, event) {
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchMoved at: " + pos.x + " " + pos.y + " Id:" + id );
				//selfPointer.end = pos.y;
				moveFunction(selfPointer.end - pos.y);
				selfPointer.end = pos.y;
			},
			onTouchEnded: function(touch, event) {
				var pos = touch.getLocation();
				var id = touch.getID();
				cc.log("onTouchEnded at: " + pos.x + " " + pos.y + " Id:" + id );
				selfPointer.end = pos.y;
				
				var scrollTime = 0;
				var needUpdatePos = true;
				//向上拖动
				if(selfPointer.end - selfPointer.begin > 50){
					if(selfPointer.lastIndex < maxPage-1){
						selfPointer.lastIndex++;
						var i = selfPointer.lastIndex;
						selfPointer.pageView.scrollToPage(i);   needUpdatePos =false;
						if (i+1 < maxPage){
							selfPointer.pageLayout[i+1].layer.updatePage(); 
						}
						selfPointer.begin = 0;
						selfPointer.end = 0; 
						if(!selfPointer.isDisplay[i] && selfPointer.pageLayout[i].layer.doAnimation){
							selfPointer.pageLayout[i].layer.doAnimation();
							selfPointer.isDisplay[i] = true;
						}
						if(i == maxPage-1){
							selfPointer.pageLayout[i].layer.setScrollTouch();
						}
						selfPointer.display(i, maxPage);
					}
				}  
				//向下拖动				
				else if(selfPointer.begin - selfPointer.end > 50){
					if(selfPointer.lastIndex > 0){
						selfPointer.lastIndex--;
						var i = selfPointer.lastIndex;
						selfPointer.pageView.scrollToPage(i);  needUpdatePos = false;
						
						selfPointer.begin = 0;
						selfPointer.end = 0; 
						selfPointer.display(i, maxPage);
					}
				}
				if(needUpdatePos){
					//updateAllPagesPosition();	
					selfPointer.pageView.scrollToPage(selfPointer.pageView.getCurPageIndex());
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
	//显示第i页时，将不相邻的setEnable(false)
	display:function(i, maxPage){
		var preFrom, preTo, postFrom, postTo;
		if(i >= 2){
			preFrom = 0; 
			preTo = i-1;
		}else {
			preFrom = 0; 
			preTo = -1;
		}
		if(i <= maxPage-3){
			postFrom = i+1;
			postTo = maxPage-1;
		}
		else{
			postFrom = 0;
			postTo = -1;
		}
		for(var j = preFrom; j <= preTo; ++j){
			this.pageLayout[j].setEnabled(false);
		}
		for(var j = postFrom; j <= postTo; ++j){
			this.pageLayout[j].setEnabled(false);
		}
		if (i > 0)
			this.pageLayout[i-1].setEnabled(true);
		if (i < maxPage-1)
			this.pageLayout[i+1].setEnabled(true);
		this.pageLayout[i].setEnabled(true);
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





