
var BigPhotoLayer = cc.Layer.extend({
	bg:null,
	desc1:null,
	desc2:null,
	ctor:function(){
		this._super();

		var size = cc.size(1136, 640);//cc.winSize;
		//背景
		this.bg = new cc.Sprite(res.Page9_png);
		this.bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(this.bg);
		
		//革命尚未成功，同志仍需努力
		this.desc1 = new cc.ProgressTimer(new cc.Sprite(res.BigPhotoDesc1_png));
		this.desc1.type = cc.ProgressTimer.TYPE_BAR;
		this.desc1.midPoint = cc.p(0, 0);
		this.desc1.barChangeRate = cc.p(1, 0); 
		this.addChild(this.desc1);
		this.desc1.x = 329;
		this.desc1.y = 184;
		
		//革命尚未成功，同志仍需努力
		this.desc2 = new cc.ProgressTimer(new cc.Sprite(res.BigPhotoDesc2_png));
		this.desc2.type = cc.ProgressTimer.TYPE_BAR;
		this.desc2.midPoint = cc.p(0, 0);
		this.desc2.barChangeRate = cc.p(1, 0); 
		this.addChild(this.desc2);
		this.desc2.x = 335;
		this.desc2.y = 121; 
		
		
		return true;
	},
	
	doAnimation:function(){
		var t = 0.5;
		var deltaT = 1;
		this.desc1.runAction(cc.sequence(
				cc.delayTime(t),
				cc.progressTo(deltaT, 100)
		));
		t+=deltaT;
		this.desc2.runAction(cc.sequence(
				cc.delayTime(t),
				cc.progressTo(deltaT, 100),
				cc.callFunc(function(){
					this.addChild(new DragIcon());
				}, this)
		));
		
	}
});