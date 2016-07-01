var g_score = 0;
var g_time = GameConfig.levelTime;
var g_level = 1;
//生成奖杯等掉落的物体
var g_goldArray =[];
var g_silverArray =[];
var g_copperArray =[];
var g_flowerArray =[];
var g_woodArray =[];
var g_clockArray =[];

var MainGameLayer = cc.Layer.extend({
	_man : null,
	_scoreLable : null,
	_timeLable : null,
	_pauseGameButton : null,

	
	ctor : function(){
		this._super();
 
	},
	onEnter:function(){
		this._super();
		g_level = cc.sys.localStorage.getItem("level") || 1  ; 
		
		cc.log("this level ",g_level);
		var bg = new cc.Sprite(resource.bgRes);
		
		bg.setPosition(cc.winSize.width*0.5, cc.winSize.height*0.5)
		this.addChild(bg);
		
		this._scoreLable = new cc.LabelTTF("积分："+g_score,"黑体",32);
		this._timeLable = new  cc.LabelTTF("时间："+g_time,"黑体",32);
		this._pauseGameButton = new MyButton(GameConfig.buttonType.kPauseGame);
		this._scoreLable.setPosition(this._scoreLable.getContentSize().width, cc.winSize.height-70);
		this._timeLable.setPosition(cc.winSize.width*0.5, cc.winSize.height-70);
		this._scoreLable.setString("积分："+g_score);
		this._timeLable.setString("时间："+g_time); 
		this.addChild(this._scoreLable);
		this.addChild(this._timeLable);
		
		this._pauseGameButton.setPosition(cc.winSize.width*0.5+170, cc.winSize.height-70);
		this._pauseGameButton.setTag(102);

		// this._pauseGameButton.setCallBack(this.pauseGame);
		

		
		this.addChild(this._pauseGameButton,10);
		
		// var layer = new testLayer(cc.color(255,0,0,200),500,500);
		// this.addChild(layer);
		// layer.setPosition(bg.getPosition());
		/*
		var layer = new cc.LayerColor();
		layer.setContentSize(cc.size(500,500));
		layer.setColor(cc.color(255,0,0,200));
		layer.setPosition(bg.getPosition())

		this.addChild(layer)
		cc.eventManager.addListener({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: false,
		onTouchBegan: function (touch, event) {  
			cc.log("began touch layer");
			var target = event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());    
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
			if (cc.rectContainsPoint(rect, locationInNode)) {
				cc.log("touch layer");
				return true;
			}
			return false;
		},
		onTouchEnded: function (touch, event) {        
		}, 
	},layer);


		var btn = new MyButton(GameConfig.buttonType.kContinue);
		layer.addChild(btn)
		*/



		// var button = 


		// this.scheduleUpdate();
		
		// this.setCupScheduler();
		
		// this.schedule(this.timeCount, 1); 
    	
		this.initMan();  
		this.pauseGame();

		// this.pauseGame();
	
	},
	
	//每帧进行，检查人物是否接到东西以及接到的是什么
	update:function(){
		var manRect = this._man.getBoundingBox();
		for (var i = 0; i < g_goldArray.length; i++) {
			if(g_goldArray[i].getShow() && cc.rectIntersectsRect(manRect, g_goldArray[i].getBoundingBox())){
				cc.log(" get goldcup");
				g_time = g_time + 10;
				g_score = g_score + 1;   
				this._scoreLable.setString("积分："+g_score);
				this._timeLable.setString("时间："+g_time); 


				this.removeCup(g_goldArray[i]);
				break;
			}
		}
		 
		for (var i = 0; i < g_woodArray.length; i++) {
			if(g_woodArray[i].getShow() && cc.rectIntersectsRect(manRect, g_woodArray[i].getBoundingBox())){
				this.removeCup(g_woodArray[i]);
				break;
			}
		}
		
		if(g_time == 0){
			cc.director.pause();
		}

	},
	
	initGameLevel:function(level){
		
	},
	
	//初始化接东西的人以及控制逻辑
	initMan:function(){
		this._man = new cc.Sprite(resource.manRes);
		this._man.setPosition(cc.winSize.width*0.5, this._man.getContentSize().height*0.5)
		this.addChild(this._man);
		var listen = cc.EventListener.create({
			event : cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: function (touch, event) {
				if(cc.rectContainsPoint(event.getCurrentTarget().getBoundingBox(),touch.getLocation())){
					return true;
				}else{
					return false;
				}
			}, 
			onTouchMoved: function (touch, event) {
				var touchMan = event.getCurrentTarget();
				var touchManSizeW = touchMan.getContentSize().width;
				var touchManSizeH = touchMan.getContentSize().height;
				var touchX = touch.getLocationX();
				
				if(touchX <= touchManSizeW*0.5 ){
					touchMan.setPosition(touchManSizeW*0.5,touchManSizeH*0.5);
				}else if (touchX >= cc.winSize.width -touchManSizeW*0.5 ) {
					touchMan.setPosition(cc.winSize.width -touchManSizeW*0.5,touchManSizeH*0.5); 
				}else {
					touchMan.setPosition(touch.getLocation().x,touchManSizeH*0.5);
				}
			},
			onTouchEnded: function (touch, event) {
				
			}
		});
		// cc.eventManager.addListener(listen, this._man);
	},
	
	setCupScheduler:function(){
		this.schedule(this.dropGoldCup, GameConfig.goldCup.dropInterval, cc.REPEAT_FOREVER, 0.1); 
		this.schedule(this.dropSilverCup, GameConfig.goldCup.dropInterval, cc.REPEAT_FOREVER, 4);
		this.schedule(this.dropCopperCup, GameConfig.goldCup.dropInterval, cc.REPEAT_FOREVER, 9);
		this.schedule(this.dropFlowerCup, GameConfig.goldCup.dropInterval, cc.REPEAT_FOREVER, 12);
		this.schedule(this.dropWoodCup, GameConfig.goldCup.dropInterval, cc.REPEAT_FOREVER, 16);
		this.schedule(this.dropClockCup, GameConfig.goldCup.dropInterval, cc.REPEAT_FOREVER, 18);


	},
	dropGoldCup:function(){
		this.drop(GameConfig.goldCup.type, GameConfig.goldCup.speed,g_goldArray);

	}, 
	dropSilverCup:function(){
		this.drop(GameConfig.silverCup.type, GameConfig.silverCup.speed,g_silverArray);
	},
	dropCopperCup:function(){
		this.drop(GameConfig.copperCup.type, GameConfig.copperCup.speed,g_copperArray);

	},
	dropFlowerCup:function(){
		this.drop(GameConfig.flower.type, GameConfig.flower.speed,g_flowerArray);

	},
	dropWoodCup:function(){
		this.drop(GameConfig.wood.type, GameConfig.wood.speed,g_woodArray);

	},
	dropClockCup:function(){

		this.drop(GameConfig.clock.type, GameConfig.clock.speed,g_clockArray);
   
	},
	
	//显示掉落的物体，新建物体的逻辑是，新建一个array，判断array是否有该类型的掉落物体且没有显示在屏幕上，如果有，就直接用这个物体，没有就new一个，再添加到这个array，bug：重新引用没有显示
	//在屏幕上的物体会报错--fuck
	drop:function(type,speed,cupArray){
		var cup = null;
		if(cupArray.length == 0){
			var newLength = cupArray.push(new Cup(type));
			cup = cupArray[newLength - 1];
			cup.retain();
			//要显示在屏幕上
			cup.setShow(true);
			cc.log(" new cup is ",cup);

		}else{
			for (var i = 0; i < cupArray.length; i++) {

				if (cupArray[i] && !cupArray[i].getShow()){
					cup = cupArray[i];
					cup.setShow(true);
					break;
				}
			}

			if( !cup ){
				var newLength = cupArray.push(new Cup(type));
				cup = cupArray[newLength - 1];
				cup.retain();
				//要显示在屏幕上
				cup.setShow(true);

			}
		}

		var cupInitX = Math.round(Math.random()*(cc.winSize.width - cup.getContentSize().width))+cup.getContentSize().width*0.5
		cup.setPosition(cupInitX,cc.winSize.height+cup.getContentSize().height*0.5);
		var move = new cc.MoveTo((cc.winSize.height+cup.getContentSize().height)/speed, cc.p(cupInitX, 0-(cup.getContentSize().height*0.5)));
		var remove = this.removeCup;
		var callBack = cc.CallFunc.create(function(){
			// cc.log(" ---- move over");
			remove(cup);

		});
		// cup.runAction(new cc.Sequence(move,callBack));
		// this.addChild(cup); 

	},
	removeCup:function(cup){
		cup.removeFromParent(true);
		var cupInitX = Math.round(Math.random()*(cc.winSize.width - cup.getContentSize().width))+cup.getContentSize().width*0.5
		cup.setShow(false);
		cup.setPosition(cupInitX,cc.winSize.height+cup.getContentSize().height*0.5);
	},
	timeCount:function(){
		g_time--;
		this._timeLable.setString("时间："+g_time);
	},
	resetGame:function(){
		g_level ++;
		cc.sys.localStorage.setItem("level",g_level);
		cc.director.getRunningScene().cleanup();
		g_score = 0;
		g_time = GameConfig.levelTime;
		for (var i = 0; i < g_goldArray.length; i++) {
			if(g_goldArray[i] ){
				if(g_goldArray[i].getShow()){
					g_goldArray[i].removeFromParent(true);					
				}
				g_goldArray[i].release();
			}
		}
		for (var i = 0; i < g_silverArray.length; i++) {
			if(g_silverArray[i] ){
				if(g_silverArray[i].getShow()){
					g_silverArray[i].removeFromParent(true);					
				}
				g_silverArray[i].release();
			}
		}
		for (var i = 0; i < g_copperArray.length; i++) {
			if(g_copperArray[i] ){
				if(g_copperArray[i].getShow()){
					g_copperArray[i].removeFromParent(true);					
				}
				g_copperArray[i].release();
			}
		}
		for (var i = 0; i < g_flowerArray.length; i++) {
			if(g_flowerArray[i] ){
				if(g_flowerArray[i].getShow()){
					g_flowerArray[i].removeFromParent(true);					
				}
				g_flowerArray[i].release();
			}
		}
		for (var i = 0; i < g_woodArray.length; i++) {
			if(g_woodArray[i] ){
				if(g_woodArray[i].getShow()){
					g_woodArray[i].removeFromParent(true);					
				}
				g_woodArray[i].release();
			}
		}
		for (var i = 0; i < g_clockArray.length; i++) {
			if(g_clockArray[i] ){
				if(g_clockArray[i].getShow()){
					g_clockArray[i].removeFromParent(true);					
				}
				g_clockArray[i].release();
			}
		}
		 g_goldArray =[];
		 g_silverArray =[];
		 g_copperArray =[];
		 g_flowerArray =[];
		 g_woodArray =[];
		 g_clockArray =[];
		 cc.director.runScene( new cc.TransitionFade(0.2,new MainScene()));
         
	},
	pauseGame : function(){
		cc.log(" pause game");
		// cc.director.pause();
		var pauseLayer = new PauseLayer(cc.color(255,255,0,50),cc.winSize.width,cc.winSize.height*0.5);
		pauseLayer.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.5);
		cc.director.getRunningScene().addChild(pauseLayer,100);
		
		// cc.log("pauseLayer pauseLayer",pauseLayer.isTouchEnabled())
		// 
		// pauseLayer.setTouchEnabled(true)
		// cc.log("isTouchEnabled",pauseLayer.isTouchEnabled());
		
	}
																
});

var MainScene = cc.Scene.extend({
	_mainLayer :null,
	_selfThis :null,
	onEnter:function(){
		this._super();
		var layer = new MainGameLayer();
		this.addChild(layer);
		_mainLayer = layer;
		_selfThis = this;
	},
	getMainLayer:function(){
		return _selfThis._mainLayer;
	}
});