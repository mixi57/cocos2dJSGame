var PauseLayer = cc.Layer.extend({
	ctor : function(color, width, height){
		// this._super(color, width, height);
		this._super();
		this.setContentSize(cc.size(width,height));
		this.ignoreAnchorPointForPosition(false);
		this.setAnchorPoint(0.5, 0.5);
		
	},
	onEnter : function(){
		this._super();
		var restartGameBtn = new MyButton(GameConfig.buttonType.kRestartGame);
		var continueBtn = new MyButton(GameConfig.buttonType.kContinue);
		var layerW = this.getContentSize().width;
		var layerH = this.getContentSize().height;
		var btnW = restartGameBtn.getContentSize().width;
		var btnH = restartGameBtn.getContentSize().height;
		var btnSpace = (layerH-2*btnH)/3;
		restartGameBtn.setPosition(layerW*0.5,btnSpace+btnH*0.5);
		restartGameBtn.setTag(100);
		restartGameBtn.setTag(101);

		continueBtn.setPosition(layerW*0.5,2*btnSpace+btnH*1.5);
		restartGameBtn.setCallBack(function(){
			cc.log("game restart");
			cc.director.resume();
			
		});
		this.addChild(restartGameBtn,100);
		this.addChild(continueBtn,100);


// 		cc.eventManager.addListener({
// event: cc.EventListener.TOUCH_ONE_BY_ONE,
// 			swallowTouches: false,

// 		},this)

cc.eventManager.addListener({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: true,
		onTouchBegan: function (touch, event) {  
			cc.log("began touch PauseLayer");
			var target = event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());    
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
			if (cc.rectContainsPoint(rect, locationInNode)) {
				cc.log("touch PauseLayer");
				return true;
			}
			return false;
		},
		onTouchEnded: function (touch, event) {        
		}, 
	},this);


	}

});