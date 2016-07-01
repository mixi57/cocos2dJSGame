
var BirthdayLayer = cc.Layer.extend({
	bg:null,
	ctor:function(){
		this._super();
		
		var size = cc.size(1136, 640);//cc.winSize;
		//背景
		this.bg = new cc.Sprite(res.Page10_png);
		this.bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(this.bg);
		
		return true; 
	},
	doAnimation:function(){
		this.addChild(new DragIcon());
	}
	,
	updatePage:function(){
		
	}
});