
var WorldMapLayer = cc.Layer.extend({
	sprite:null,
	mask:null,
	China:null,
	Japan:null,
	Singapore:null,
	America:null,	
	layer1:null,
	layer2:null,
	layer3:null,
	layer4:null,
	ctor:function () {
		this._super();

		var size = cc.size(1136, 640);//cc.winSize;

		// 世界地图
		this.sprite = new cc.Sprite(res.Page6_png);
		this.sprite.attr({
			x: size.width / 2,
			y: size.height / 2
			
		});
		this.addChild(this.sprite);

		//蒙版
		this.mask = new cc.Sprite(res.maskMap_png);
		this.mask.attr({
			x: size.width / 2,
			y: size.height / 2

		});
		this.mask.setVisible(false);
		this.addChild(this.mask);
		this.mask.setVisible(false);
		
		//中国地图
		this.layer1 = new cc.Layer();
		this.China = new cc.Sprite(res.ChinaMap_png);
		this.China.attr({
			x: 448,
			y: 470,
			scale : 0.1,
			opacity : 0
		});
		//this.addChild(this.China);
		this.addChild(this.layer1);
		this.layer1.addChild(this.China);
		
		
		
		//日本
		
		this.layer2 = new cc.Layer();
		this.layer2.y = -size.height;
		this.Japan = new cc.Sprite(res.JapanMap_png);
		this.Japan.attr({ 
			x: size.width/2,
			y: size.height/2,
		});
		//this.addChild(this.China);
		this.addChild(this.layer2);
		this.layer2.addChild(this.Japan);
		this.layer2.setPosition(cc.p(0,-640));
		 
		return true;
	},
	doAnimation:function(){
		var size = cc.size(1136, 640);//cc.winSize;
		var delay = cc.delayTime(3);
		this.mask.setVisible(true);
		var scaleAndMove = cc.spawn(
				cc.fadeIn(0.5),
				cc.scaleTo(2, 1, 1), 
				cc.moveTo(2,cc.p(size.width/2, size.height/2))
		);
		//var moveToLeft = cc.moveTo(2,cc.p(size.width/2, size.height));
		//var setLogos = cc.callFunc(this.setLocation(), this);

//		var backToCenter = cc.Spawn(
//				cc.scaleTo(2, 1, 1),
//				cc.moveTo(2,cc.p(size.width/2, size.height/2))
//		);
//		var action = cc.Sequence(delay, scaleAndMove, delay.clone(), moveToLeft, delay.clone(), backToCenter);

		this.China.runAction(cc.sequence(
				scaleAndMove,
				cc.delayTime(1),
				cc.callFunc(this.setLocation, this)
				
		));  
	},
	
	setLocation:function(){		
		var locationDesc=["澳门",
		                  "香港",
		                  "台湾",
		                  "贵州省\n",
		                  "河北省",
		                  "山东省",
		                  "云南省",
		                  "海南省",
		                  "江西省",
		                  "河南省",
		                  "黑龙江省",
		                  "吉林省"
		                  ];
		var arrayOflocations = [
		                        {x:636, y:484},
		                        {x:632, y:505},
		                        {x:607, y:592},
		                        {x:583, y:406},
		                        {x:431, y:537},
		                        {x:431, y:537},
		                        {x:617, y:336},
		                        {x:679, y:449},
		                        {x:567, y:516},
		                        {x:470, y:484},
		                        {x:268, y:617},
		                        {x:316, y:613}
		                        ];

		var arrayOfLogos = [];
		var arrayOfDesc = [];
		var arrayOfText = [];

		var fadeIn = cc.fadeIn(3.0);
		var delaySecond = 0;
		var delayInterval = 0.3;

		//for(var i = 0; i < 1; i++) {
		for(var i = 0; i < arrayOflocations.length; i++) {
			//小气球
			arrayOfLogos[i] = new cc.ProgressTimer(new cc.Sprite(res.LocationLogo_png));
			arrayOfLogos[i].type = cc.ProgressTimer.TYPE_BAR;
			arrayOfLogos[i].midPoint = cc.p(1, 0);
			arrayOfLogos[i].barChangeRate = cc.p(1, 0);  
			arrayOfLogos[i].x = arrayOflocations[i].x;
			arrayOfLogos[i].y = arrayOflocations[i].y;
			this.layer1.addChild(arrayOfLogos[i],100);
			
			//白色小背景
			arrayOfDesc[i] = new cc.Sprite(res.LocationBg_png);
			arrayOfDesc[i].attr({
				x:arrayOflocations[i].x-30,
				y:arrayOflocations[i].y-100,
				//opacity:0,
				rotation:-90 
			});
			var s = arrayOfDesc[i].getContentSize();
			
			//文字描述
			arrayOfText[i] = new cc.LabelTTF(locationDesc[i], "Arial", 20);
			arrayOfText[i].attr({
				x : s.width/2,
				y : s.height/2,
				color : cc.color("#000000"),
			});
			arrayOfDesc[i].addChild(arrayOfText[i]);
			this.layer1.addChild(arrayOfDesc[i]);
			
			arrayOfDesc[i].setVisible(false);
									
			var delay = cc.delayTime(delaySecond);
			delaySecond += delayInterval;
			
//			arrayOfDesc[i].runAction(cc.sequence(
//					delay, 
//					cc.callFunc(this.setVisible,this,true)
//			)); 
			arrayOfDesc[i].runAction(cc.sequence(
					delay, 
					cc.callFunc(this.setVisible, arrayOfDesc[i], true),
					cc.delayTime(0.1),
					//cc.fadeIn(0.1), 
					//cc.fadeOut(0.2),
					cc.callFunc(this.removeFromParentAndCleanup, arrayOfDesc[i], true)
					
			)); 
			arrayOfLogos[i].runAction(cc.sequence(
					delay, 
					cc.progressTo(0.1, 100), 
					cc.delayTime(0.1),
					cc.callFunc(this.setVisible, arrayOfLogos[i], false)
			)); 			 
		}
		for(var i = 0; i < arrayOflocations.length; i++) {
			arrayOfLogos[i].runAction(cc.sequence(
					cc.delayTime(delaySecond),
					cc.callFunc(this.setVisible, arrayOfLogos[i], true)
			)); 	
		}
		
		this.layer1.runAction(cc.sequence(
				cc.delayTime(delaySecond+2),
				cc.callFunc(this.moveTo, this.layer1, {t:1, x:0, y:640})
				
		));
		this.layer2.runAction(cc.sequence(
				cc.delayTime(delaySecond+2),
				cc.callFunc(this.moveTo, this.layer2, {t:1, x:0, y:0})
		));
		
		
		  
	},
	removeFromParentAndCleanup:function (nodeExecutingAction, data) {
		nodeExecutingAction.removeFromParent(data);
	},
	setVisible:function(nodeExecutingAction, data) {
		nodeExecutingAction.setVisible(data);
	},
	moveTo:function(nodeExecutingAction, data) {
		nodeExecutingAction.runAction(cc.moveTo(data.t, cc.p(data.x, data.y)));
	},
});