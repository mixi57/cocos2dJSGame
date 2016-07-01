
var MainScene = cc.Scene.extend({
	_man : null,
	g_score : 0,
	_scoreLable : null,
	g_time : GameConfig.levelTime,
	_timeLable : null,
	g_level :1,
	
	//生成奖杯等掉落的物体
	g_goldArray :[],
	g_silverArray :[],
	g_copperArray :[],
	g_flowerArray :[],
	g_woodArray :[],
	g_clockArray :[],

	ctor : function(){
		this._super();
 
	},
	onEnter:function(){
		this._super();
		this.g_level = cc.sys.localStorage.getItem("level") || 1 ; 

		cc.log(" level ",this.g_level);
		var bg = new cc.Sprite(resource.bgRes);
		
		bg.setPosition(cc.winSize.width*0.5, cc.winSize.height*0.5)
		this.addChild(bg);
		
		this._scoreLable = new cc.LabelTTF("积分："+this.g_score,"黑体",32);
		this._timeLable = new  cc.LabelTTF("时间："+this.g_time,"黑体",32);
		this._scoreLable.setPosition(this._scoreLable.getContentSize().width, cc.winSize.height-70);
		this._timeLable.setPosition(cc.winSize.width*0.5, cc.winSize.height-70);
		this._scoreLable.setString("积分："+this.g_score);
		this._timeLable.setString("时间："+this.g_time);
		this.addChild(this._scoreLable);
		this.addChild(this._timeLable);

		this.scheduleUpdate();
		
		this.setCupScheduler();
		
		this.schedule(this.timeCount, 1); 
    	
		this.initMan(); 
	
	},
	
	//每帧进行，检查人物是否接到东西以及接到的是什么
	update:function(){
		var manRect = this._man.getBoundingBox();
		for (var i = 0; i < this.g_goldArray.length; i++) {
			if(this.g_goldArray[i].getShow() && cc.rectIntersectsRect(manRect, this.g_goldArray[i].getBoundingBox())){
				cc.log(" get goldcup");
				this.g_time = this.g_time + 10;
				this.g_score = this.g_score + 1;   
				this._scoreLable.setString("积分："+this.g_score);
				this._timeLable.setString("积分："+this.g_time); 


				this.removeCup(this.g_goldArray[i]);
				break;
			}
		}
		 
		for (var i = 0; i < this.g_woodArray.length; i++) {
			if(this.g_woodArray[i].getShow() && cc.rectIntersectsRect(manRect, this.g_woodArray[i].getBoundingBox())){
				this.removeCup(this.g_woodArray[i]);
				break;
			}
		}
		
		if(this.g_time == 0){
			cc.director.pause();
		}


	},
	
	
	//初始化接东西的人以及控制逻辑
	initMan:function(){
		this._man = new cc.Sprite(resource.manRes);
		this._man.setPosition(cc.winSize.width*0.5, this._man.getContentSize().height*0.5)
		this.addChild(this._man);
		var listen = cc.EventListener.create({
			event : cc.EventListener.TOUCH_ONE_BY_ONE,
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
		cc.eventManager.addListener(listen, this._man);
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
		this.drop(GameConfig.goldCup.type, GameConfig.goldCup.speed,this.g_goldArray);

	}, 
	dropSilverCup:function(){
		this.drop(GameConfig.silverCup.type, GameConfig.silverCup.speed,this.g_silverArray);
	},
	dropCopperCup:function(){
		this.drop(GameConfig.copperCup.type, GameConfig.copperCup.speed,this.g_copperArray);

	},
	dropFlowerCup:function(){
		this.drop(GameConfig.flower.type, GameConfig.flower.speed,this.g_flowerArray);

	},
	dropWoodCup:function(){
		this.drop(GameConfig.wood.type, GameConfig.wood.speed,this.g_woodArray);

	},
	dropClockCup:function(){

		this.drop(GameConfig.clock.type, GameConfig.clock.speed,this.g_clockArray);
   
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
			cc.log(" ---- move over");
			remove(cup);

		});
		cup.runAction(new cc.Sequence(move,callBack));
		this.addChild(cup); 
		cc.log(" goldarray length ",this.g_goldArray.length);
		cc.log(" g_silverArray length ",this.g_silverArray.length);
		cc.log(" g_copperArray length ",this.g_copperArray.length);
		cc.log(" g_flowerArray length ",this.g_flowerArray.length);
		cc.log(" g_woodArray length ",this.g_woodArray.length);
		cc.log(" g_clockArray length ",this.g_clockArray.length);

	},
	removeCup:function(cup){
		cup.removeFromParent(true);
		var cupInitX = Math.round(Math.random()*(cc.winSize.width - cup.getContentSize().width))+cup.getContentSize().width*0.5
		cup.setShow(false);
		cup.setPosition(cupInitX,cc.winSize.height+cup.getContentSize().height*0.5);
	},
	timeCount:function(){
		this.g_time--;
		this._timeLable.setString("时间："+this.g_time);
	}
	
	
																					
	
	
	
})     