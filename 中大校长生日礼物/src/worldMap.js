var ChinaLocationsDes=[
                  "澳门",
                  "香港",
                  "台湾\n台北 高雄 嘉义",
                  "贵州省\n都匀",
                  "河北省\n邯郸 邢台",
                  "山东省\n青岛 曲阜 济南",
                  "云南省\n昆明",
                  "海南省\n海口   三亚",
                  "江西省\n赣州  景德镇",
                  "河南省\n洛阳 开封 许昌\n驻马店",
                  "黑龙江省\n齐齐哈尔 哈尔滨\n大庆",
                  "吉林省\n长春",
                  "宁夏回族自治区\n银川",
                  "广东省\n梅州 湛江 清远\n中山广州东莞珠海",
                  "湖北省\n武汉 宜宾 孝感",
                  "福建省\n厦门   漳州",
                  "天津市",
                  "浙江省\n杭州温州宁波湖州\n金华 嘉兴 绍兴",
                  "江苏省\n南京 苏州 徐州\n盐城 镇江 常州",
                  "安徽省\n合肥",
                  "陕西省\n西安   榆林",
                  "甘肃省\n兰州",
                  "辽宁省\n沈阳 大连 锦州",
                  "湖南省\n长沙 常德",
                  "广西省\n白色 钦州",
                  "北京",
                  "四川省\n成都 沪州 自贡"
                  ];
var ChinaLocation = [
                        {x:636, y:484},
                        {x:632, y:505},
                        {x:607, y:592},
                        {x:583, y:406},
                        {x:409, y:501},
                        {x:431, y:537},
                        {x:617, y:336},
                        {x:679, y:449},
                        {x:567, y:516},
                        {x:470, y:484},
                        {x:268, y:617},
                        {x:316, y:613},
                        {x:428, y:394},//宁夏
                        {x:620, y:494},//广东
                        {x:511, y:484},//湖北
                        {x:586, y:548},//福建
                        {x:394, y:522},//天津
                        {x:534, y:571},//浙江
                        {x:482, y:570},//江苏
                        {x:499, y:534},//安徽
                        {x:468, y:427},//陕西
                        {x:459, y:373},//甘肃
                        {x:355, y:580},//辽宁
                        {x:564, y:469},//湖南
                        {x:626, y:434},//广西
                        {x:379, y:508},//北京
                        {x:537, y:354},//四川		                        

                        ];

var JanPanLocationsDes=["日本\n京都  东京"];
var JanPanLocation=[{x:487,y:337}];
var JanPanPos={x:442,y:318};

var SingaporeLocationsDes=["新加坡"];
var SingaporeLocation=[{x:386,y:337}];
var SingaporePos={x:450,y:330};


var AmericaLocationsDes=["美国\n休斯敦",
                         "美国\n迈阿密",
                         "美国\n马里兰",
                         "美国\n宾夕法尼亚",
                         "美国\n费城",
                         ];
var AmericaLocation=[
                     {x:539,y:281},//休斯敦
                     {x:588,y:539},//迈阿密
                     {x:402,y:568},//马里兰
                     {x:368,y:528},//宾夕法尼亚
                     {x:396,y:568},//费城
                     ];
var AmericaPos={x:440,y:316};


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
		
		var footStep = new cc.LabelBMFont("近五年黄校长调研走访足迹分布图", res.BM_font);
		footStep.attr({ 
			x : 180, //arrayOfRoutePos[i],
			y : size.height/2,
			textAlign : cc.TEXT_ALIGNMENT_CENTER, 
			rotation : -90,
			scale : 1.2,
		});
		this.addChild(footStep); 
		

		//蒙版
		this.mask = new cc.Sprite(res.MaskMap_png);
		this.mask.attr({
			x: size.width / 2,
			y: size.height / 2

		});
		this.mask.setVisible(false);
		this.addChild(this.mask);
		
		//中国地图
		this.layer1 = new cc.Layer();
		this.China = new cc.Sprite(res.ChinaMap_png);
		this.China.attr({
			x: 448,
			y: 470,
			scale : 0.1,
			opacity : 0
		});
		this.addChild(this.layer1);
		this.layer1.addChild(this.China);
		
		//日本
		
		this.layer2 = new cc.Layer();
		this.Japan = new cc.Sprite(res.JapanMap_png);
		this.Japan.attr({ 
			x: JanPanPos.x,
			y: JanPanPos.y,
		});
		this.addChild(this.layer2);
		this.layer2.addChild(this.Japan);
		this.layer2.setPosition(cc.p(0,640));
		
		//新加坡 从左下角出来
		this.layer3 = new cc.Layer();
		this.Singapore = new cc.Sprite(res.SingaporeMap_png);
		this.Singapore.attr({ 
			x: SingaporePos.x,
			y: SingaporePos.y,
		});
		this.addChild(this.layer3);
		this.layer3.addChild(this.Singapore);
		this.layer3.setPosition(cc.p(1136,-640));
		
		//美国
		this.layer4 = new cc.Layer();
		this.America = new cc.Sprite(res.AmericaMap_png);
		this.America.attr({ 
			x: AmericaPos.x,
			y: AmericaPos.y,
		});
		this.addChild(this.layer4);
		this.layer4.addChild(this.America);
		this.layer4.setPosition(cc.p(-300,-640));		
		 
		return true;
	},
	doAnimation:function(){
		var size = cc.size(1136, 640);//cc.winSize;
		var delay = cc.delayTime(3);
		 
		var scaleAndMove = cc.spawn(
				cc.fadeIn(0.5),
				cc.scaleTo(2, 1, 1), 
				cc.moveTo(2,cc.p(size.width/2, size.height/2)),
				cc.callFunc(function(){
					this.mask.setVisible(true);
				},this)
		);
		this.China.runAction(cc.sequence(
				cc.delayTime(2),				
				scaleAndMove,
				cc.delayTime(1),
				cc.callFunc(this.setLocation, this)
				
		));  
	},
	
	setLocation:function(){		
		//delayInterval 冒一次小气球总共用的时间
		//delaySecond : 从调用开始到第一个小气球开始冒的时间
		//deltaT : 小气球出来到消失的时间
		var delaySecond = 0.5;
		var deltaT = 0.9;
		var delayInterval = 1;
		var moveTime = 1;
		var moveStay = 0.5;
		var stayTime = 2;
		this.layer1.runAction(cc.sequence(
				//开始冒气球
				cc.callFunc(this.setLogos, this, {
					arrayOfLocations : ChinaLocation,
					locationDesc : ChinaLocationsDes,
					layer : this.layer1,
					delayInterval : delayInterval,
					delaySecond : 0,
					deltaT : deltaT
				}),
				cc.delayTime(delayInterval*ChinaLocation.length+stayTime),
				//向左移走
				cc.callFunc(this.moveTo, this.layer1, {t:moveTime-moveStay, x:0, y:-640}),
				cc.delayTime(moveTime),
				cc.callFunc(this.removeFromParentAndCleanup,this.layer1,true)
		));
		delaySecond += delayInterval*ChinaLocation.length +stayTime;
		
		
		
		//日本地图从右边划出
		this.layer2.runAction(cc.sequence(
				cc.delayTime(delaySecond),
				cc.callFunc(this.moveTo, this.layer2, {t:moveTime-moveStay, x:0, y:0}), 
				cc.delayTime(moveTime), 
				cc.callFunc(this.setLogos, this, {
					arrayOfLocations : JanPanLocation,
					locationDesc : JanPanLocationsDes,
					layer : this.layer2,
					delayInterval :delayInterval,
					delaySecond : 0,
					deltaT : deltaT
				}),
				cc.delayTime(delayInterval*JanPanLocation.length+stayTime),
				cc.callFunc(this.moveTo, this.layer2, {t:moveTime-moveStay, x:0, y:640}),
				cc.delayTime(moveTime),
				cc.callFunc(this.removeFromParentAndCleanup,this.layer2,true)
		));
		delaySecond += delayInterval*JanPanLocation.length +stayTime + moveTime;

		
		this.layer3.runAction(cc.sequence(
				cc.delayTime(delaySecond),
				cc.callFunc(this.moveTo, this.layer3, {t:moveTime-moveStay, x:0, y:0}),
				cc.delayTime(moveTime), 
				cc.callFunc(this.setLogos, this, {
					arrayOfLocations : SingaporeLocation,
					locationDesc : SingaporeLocationsDes,
					layer : this.layer3,
					delayInterval : delayInterval,
					delaySecond : 0,
					deltaT : deltaT
				}),
				cc.delayTime(delayInterval*SingaporeLocation.length+stayTime),
				cc.callFunc(this.moveTo, this.layer3, {t:moveTime-moveStay, x:1136, y:-640}),
				cc.delayTime(moveTime),
				cc.callFunc(this.removeFromParentAndCleanup,this.layer3,true)
		));		
		delaySecond += delayInterval*SingaporeLocation.length + stayTime + moveTime;
		
		
		this.layer4.runAction(cc.sequence(
				cc.delayTime(delaySecond),
				cc.callFunc(this.moveTo, this.layer4, {t:moveTime-moveStay, x:0, y:0}),
				cc.delayTime(moveTime),
				cc.callFunc(this.setLogos, this, {
					arrayOfLocations : AmericaLocation,
					locationDesc : AmericaLocationsDes,
					layer : this.layer4,
					delayInterval : delayInterval,
					delaySecond : 0, 
					deltaT : deltaT
				}),
				cc.delayTime(delayInterval*AmericaLocation.length+stayTime),
				cc.callFunc(this.moveTo, this.layer4, {t:moveTime-moveStay, x:-300, y:-640}),
				cc.delayTime(moveTime),
				cc.callFunc(this.removeFromParentAndCleanup,this.layer3,true),
				cc.callFunc(this.addIcon, this)
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
	
	setLogos:function(nodeExecutingAction, data){
		var arrayOfLocations = data.arrayOfLocations;
		var locationDesc = data.locationDesc;
		var layer = data.layer;
		var delayInterval = data.delayInterval;
		var delaySecond = data.delaySecond;
		var deltaT = data.deltaT;
		var arrayOfLogos = [];
		var arrayOfDesc = [];
		var arrayOfText = [];
		for(var i = 0; i < arrayOfLocations.length; i++) {
			//小气球
			arrayOfLogos[i] = new cc.ProgressTimer(new cc.Sprite(res.LocationLogo_png));
			arrayOfLogos[i].type = cc.ProgressTimer.TYPE_BAR;
			arrayOfLogos[i].midPoint = cc.p(1, 0);
			arrayOfLogos[i].barChangeRate = cc.p(1, 0);  
			arrayOfLogos[i].x = arrayOfLocations[i].x;
			arrayOfLogos[i].y = arrayOfLocations[i].y;
			layer.addChild(arrayOfLogos[i],100);

			//白色小背景
			arrayOfDesc[i] = new cc.Sprite(res.LocationBg_png);
			arrayOfDesc[i].attr({
				x:arrayOfLocations[i].x-30,
				y:arrayOfLocations[i].y-100,
				//opacity:0,
				rotation:-90 
			});
			var s = arrayOfDesc[i].getContentSize();

			//文字描述
			//arrayOfText[i] = new cc.LabelTTF(locationDesc[i], "Arial", 20);
			arrayOfText[i] = new cc.LabelBMFont(locationDesc[i], res.BM_font);
			arrayOfText[i].attr({
				x : s.width/2,
				y : s.height/2,
				textAlign : cc.TEXT_ALIGNMENT_CENTER,
				//color : cc.color("#000000"),
			});
			arrayOfDesc[i].addChild(arrayOfText[i]);
			layer.addChild(arrayOfDesc[i]);

			arrayOfDesc[i].setVisible(false);

			var delay = cc.delayTime(delaySecond);
			delaySecond += delayInterval;


			//小气球和文字出现
			arrayOfLogos[i].runAction(cc.sequence(
					delay, 
					cc.progressTo(0.1, 100), 
					cc.delayTime(deltaT),
					cc.callFunc(this.setVisible, arrayOfLogos[i], false)
			)); 		
			arrayOfDesc[i].runAction(cc.sequence(
					delay, 
					cc.callFunc(this.setVisible, arrayOfDesc[i], true),
					cc.delayTime(deltaT),
					cc.callFunc(this.removeFromParentAndCleanup, arrayOfDesc[i], true)
			));  
				 
		}
		for(var i = 0; i < arrayOfLocations.length; i++) {
			arrayOfLogos[i].runAction(cc.sequence(
					cc.delayTime(delaySecond),
					cc.callFunc(this.setVisible, arrayOfLogos[i], true)
			)); 	
		}
	},
	addIcon:function(){
		//this.mask.setVisible(false);
		this.mask.runAction(cc.sequence(
				cc.fadeOut(0.5),
				cc.callFunc(this.removeFromParentAndCleanup,this.mask,true)				
		));
		this.addChild(new DragIcon());
	},
	updatePage:function(){
		
	}

});