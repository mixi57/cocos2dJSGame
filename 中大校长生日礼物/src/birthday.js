
var BirthdayLayer = cc.Layer.extend({
	bg:null,
	ctor:function(){
		this._super();
		
		var size = cc.size(1136, 640);//cc.winSize;
		//白色背景
		this.bg = new cc.Sprite(res.Page9_png);
		this.bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(this.bg);
		
		//校长照片
		/*
		var photo = new cc.Sprite(res.PresidentPhoto_png);
		photo.attr({
			x : photo.getContentSize().height,
			y : size.height/2,
			scale : 2,
			rotation : -90
		});
		this.addChild(photo);
		*/
		
		//谨祝黄达人校长生日快乐
		var congratulation = cc.LabelTTF("谨祝黄达人校长生日快乐", "Avrial", 50);
		congratulation.attr({
			x : size.width/2,
			y : size.height/2,
			rotation: -90,			
			color : cc.color("#000000")
		});
		this.addChild(congratulation);
		
		return true;
	},
	doAnimation:function(){

		//革命尚未成功，同志仍需努力
		var desc = cc.LabelTTF("革命尚\n未成功\n，\n同志仍\n需  努\n力。", "Avrial", 30);
		var descSize = desc.getContentSize();
		desc.attr({
			x : descSize.height/2+100,
			y : descSize.width/2+50,
			color : cc.color("#000000"),
			rotation: -90,
			opacity: 0
		});
		this.addChild(desc);
		desc.runAction(cc.Sequence(cc.DelayTime(2), cc.FadeIn(2)));
	}
});