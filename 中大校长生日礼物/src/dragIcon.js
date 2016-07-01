
var DragIcon = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile(res.Icon_png);
		this.attr({
			x : 1038,
			y : 320,
			opacity : 0,
		});
		var s = this.getContentSize();
		arrow = new cc.Sprite(res.Arrow_png);
		arrow.attr({
			x : s.width/2+10, 
			y : s.height/2-3,
			opacity : 0
		});   
		this.addChild(arrow);

		this.runAction(cc.fadeIn(0.5));
		arrow.runAction(cc.fadeIn(0.5));
		arrow.runAction(				
				cc.repeatForever(cc.sequence(
						cc.moveTo(0.7, cc.p( s.width/2+8,s.height/2-3)), 
						cc.moveTo(0.7, cc.p( s.width/2-6,s.height/2-3))
				)));
	}
});