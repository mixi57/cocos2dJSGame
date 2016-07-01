/*
 * 白色背景，淡出公司logo，呈现“火烈鸟网络出品“
 */
var PublishLayer = cc.Layer.extend({
	bg:null,
	ctor:function(){
		this._super();

		var size = cc.size(1136, 640);//cc.winSize;

		//白色背景
		this.bg = new cc.LayerColor(cc.color("#ffffff"),1136, 640);
		this.addChild(this.bg);
		
		return true;
	},
	
	doAnimation:function(){
		var size = cc.size(1136, 640);//cc.winSize;
		//淡出公司logo
		var to = cc.progressFromTo(2, 0, 100);
		var logo = new cc.ProgressTimer(new cc.Sprite(res.FlamingoLogo_png));
		logo.x = size.width/2;
		logo.y = size.height/2;
		logo.scale = 2;
		logo.rotation = -90; 
		logo.type = cc.ProgressTimer.TYPE_RADIAL;
		logo.midPoint = cc.p(0.5, 0.5);
		logo.barChangeRate = cc.p(1, 0);
		this.addChild(logo);
		logo.runAction(cc.sequence(
				cc.progressFromTo(2, 0, 100),
				cc.spawn(cc.scaleTo(1, 0.5, 0.5),cc.moveTo(1, cc.p(61, 541))),
				cc.delayTime(0.5),
				cc.callFunc(this.setAppendixTips, this)
				
		));

	},
	setAppendixTips:function(){
		var size = cc.size(1136, 640);//cc.winSize;
		var tips = new cc.LabelTTF("附黄达人校长\n\n2011至2015年间所有调研走访的所有行程", "Arival", 30);
		tips.attr({
			x: size.width/2,
			y: size.height/2,
			rotation:-90,
			scale : 1,
			textAlign : cc.TEXT_ALIGNMENT_CENTER,
			color:cc.color("#000000")
		});
		this.addChild(tips);
		tips.runAction(cc.sequence(
				cc.scaleTo(1, 1, 1),
				cc.callFunc(function(){
					this.addChild(new DragIcon());
				}, this)
				
		));
	}
});