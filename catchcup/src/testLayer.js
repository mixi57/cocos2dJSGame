var testLayer = cc.LayerColor.extend({
	ctor : function(color, width, height){
		this._super(color, width, height);
		// this._super();
		// this.setContentSize(cc.size(width,height));
		// this.ignoreAnchorPointForPosition(false);
		// this.setAnchorPoint(0.5, 0.5);
		
	},
	onEnter : function(){
		this._super();

		cc.eventManager.addListener({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: false,
		onTouchBegan: function (touch, event) {  
			cc.log("began touch layer");
			var target = event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());    
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
			if (cc.rectContainsPoint(rect, locationInNode)) {
				cc.log("touch layer");
				return true;
			}
			return false;
		},
		onTouchEnded: function (touch, event) {        
		}, 
	},this);

		var btn = new MyButton(GameConfig.buttonType.kContinue);
		this.addChild(btn)


	}

});