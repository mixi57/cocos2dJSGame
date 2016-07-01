var ClickButton= cc.Sprite.extend({
	_callback : null,
	_scaleScope : 0.1,
	_isTouchEnable : false,
	ctor : function (fileName) {
		this._super(fileName);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {  
				
				
				var target = event.getCurrentTarget();
				if (!target._isTouchEnable) {
					return false;
				}
				var locationInNode = target.convertToNodeSpace(touch.getLocation());    
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					var new_scale = target.getScale() - target._scaleScope;

					target.setScale(new_scale);

					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {        
				var target = event.getCurrentTarget();  
				var new_scale = target.getScale() + target._scaleScope;
				target.setScale(new_scale);
				if(target._callback){
					target._callback();					
				}
			}, },this);
	},
	
	setTouchEnable : function(arg) {
		this._isTouchEnable = arg;
	},
	
	setScaleScope : function(arg) {
		this._scaleScope = arg;
	},
	setCallBack : function(arg) {
		
		this._callback = arg;	
		
	}
}
);