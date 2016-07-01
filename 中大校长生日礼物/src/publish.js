/*
 * 白色背景，淡出公司logo，呈现“火烈鸟网络出品“
 */
var PublishLayer = cc.Layer.extend({
	bg:null,
	ctor:function(){
		this._super();

		var size = cc.winSize;

		//白色背景
		this.bg = new cc.LayerColor(cc.color("#ffffff"));
		this.addChild(this.bg);
		
		return true;
	},
	
	doAnimation:function(){
		var size = cc.winSize;
		//淡出公司logo
		var to = cc.progressFromTo(2, 0, 100);
		var logo = new cc.ProgressTimer(new cc.Sprite(res.FlamingoLogo_png));
		logo.x = size.width/2;
		logo.y = size.height/2;
		logo.rotation = -90;
		logo.type = cc.ProgressTimer.TYPE_RADIAL;
		logo.midPoint = cc.p(0.5, 0.5);
		logo.barChangeRate = cc.p(1, 0);
		this.addChild(logo);

		logo.runAction(cc.Sequence(
				cc.progressFromTo(2, 0, 100),
				cc.Spawn(cc.ScaleTo(1, 0.5, 0.5),cc.MoveTo(1, cc.p(61, 541))),
				cc.DelayTime(0.5),
				cc.CallFunc(this.setAppendixTips, this)
				
		));

	},
	setAppendixTips:function(){
		var size = cc.winSize;
		var tips = new cc.LabelTTF("附黄达人校长2011至2015年间所有调研走访的所有行程", "Arival", 20);
		tips.attr({
			x: size.width/2,
			y: size.height/2,
			rotation:-90,
			scale : 0.5,
			color:cc.color("#000000")
		});
		this.addChild(tips);
		tips.runAction(cc.Sequence(
				cc.ScaleTo(1, 1, 1),
				cc.CallFunc(function(){
					this.addChild(new DragIcon());
				}, this)
				
		));
	}
});