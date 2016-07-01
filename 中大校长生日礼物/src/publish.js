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
		
		
		//火烈鸟logo
		
		var to = cc.progressFromTo(2, 0, 100);
		var logo = new cc.ProgressTimer(new cc.Sprite(res.FlamingoLogo_png));
		logo.x = size.width/2;
		logo.y = size.height/2;
		logo.rotation = -90;
		logo.type = cc.ProgressTimer.TYPE_RADIAL;
		logo.midPoint = cc.p(0.5, 0.5);
		logo.barChangeRate = cc.p(1, 0);
		
		this.addChild(logo);
		
		logo.runAction(to);
		
		
		return true;
	}
});