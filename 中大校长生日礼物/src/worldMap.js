
var WorldMapLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		this._super();

		var size = cc.winSize;

		// 世界地图
		this.sprite = new cc.Sprite(res.Page6_png);
		this.sprite.attr({
			x: size.width / 2,
			y: size.height / 2,
			
		});
		this.addChild(this.sprite, 100);

		return true;
	},
	doAnimation:function(){
		var size = cc.winSize;
		var delay = cc.delayTime(3);
		var scaleAndMove = cc.spawn(
				cc.scaleTo(2, 2, 2),
				cc.moveTo(2,cc.p(size.width/2, 0))
		);
		var moveToLeft = cc.moveTo(2,cc.p(size.width/2, size.height));
		//var setLogos = cc.callFunc(this.setLocation(), this);

		var backToCenter = cc.Spawn(
				cc.scaleTo(2, 1, 1),
				cc.moveTo(2,cc.p(size.width/2, size.height/2))
		);
		var action = cc.Sequence(delay, scaleAndMove, delay.clone(), moveToLeft, delay.clone(), backToCenter);

		this.sprite.runAction(action);  
	},
	
	setLocation:function(){		
		var arrayOflocations = [
		                        {x : 500, y : 310},
		                        {x : 520, y : 320},
		                        {x : 430, y : 330}, 
		                        {x : 440, y : 340},
		                        {x : 650, y : 450},
		                        {x : 560, y : 260},
		                        {x : 410, y : 410},
		                        {x : 620, y : 520},
		                        {x : 730, y : 330}

		                        ];

		var arrayOfLogos = [];

		var fadeIn = cc.fadeIn(3.0);
		var delaySecond = 5;
		var delayInterval = 0.5;

		for(var i = 0; i < arrayOflocations.length; i++) {
			arrayOfLogos[i] = new cc.Sprite(res.LocationLogo_png);
			arrayOfLogos[i].attr({
				x: arrayOflocations[i].x,
				y: arrayOflocations[i].y,
				opacity: 0,
				scale: 0.5,
			});
			this.addChild(arrayOfLogos[i],100);
			var delay = cc.delayTime(delaySecond);
			delaySecond += delayInterval;
			//arrayOfLogos[i].runAction(cc.sequence(delay, fadeIn)); 
			arrayOfLogos[i].runAction(cc.sequence(delay, fadeIn)); 
		}
	}

});