var MyButton= cc.Sprite.extend({
	_callback : null,
	_scaleScope : 0.1,
	_isTouchEnable : true,
	_buttonType : 0,
	_listen:null,
	_name:"",
	ctor : function (buttonType) {
		this._super(buttonType);
		this._buttonType = buttonType;
		var buttonRes = null;

		switch (this._buttonType) {
		case GameConfig.buttonType.kPauseGame:
			buttonRes = resource.pauseGameRes;
			break;
		case GameConfig.buttonType.kStartGame:
			buttonRes = resource.startGameRes;
			break;
		case GameConfig.buttonType.kRestartGame:
			buttonRes = resource.restartGameRes;
			break;
		case GameConfig.buttonType.kShare:
			buttonRes = resource.shareRes;
			break;	
		case GameConfig.buttonType.kShareTip:
			buttonRes = resource.shaoreTipRes;
			break;
		case GameConfig.buttonType.kContinue:
			buttonRes = resource.continueRes;
			break;
		default:
			cc.log("---------warn not match button");
		break;
		}
		var selfThis = this
		selfThis._name=buttonRes;
		this.initWithFile(buttonRes);
		cc.log("new button name",buttonRes)
		 
		var listen = cc.EventListener.create(
			{
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: function (touch, event) {  


				var target = event.getCurrentTarget();
				cc.log("target tag ",target.getTag(),buttonRes,selfThis._name);
				if (!target._isTouchEnable) {
					cc.log(" button untouchable");
					return false;
				}

				var s = target.getContentSize();
				cc.log("bound x y w h touch x y ",target.getBoundingBoxToWorld().x ,target.getBoundingBoxToWorld().y ,target.getBoundingBoxToWorld().width,target.getBoundingBoxToWorld().height,touch.getLocation().x,touch.getLocation().y)
				if (cc.rectContainsPoint(target.getBoundingBoxToWorld(),touch.getLocation())) {
					var new_scale = target.getScale() - target._scaleScope;

					target.setScale(new_scale);
                    cc.log("touch true",buttonRes)
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
				cc.log("touchend ",selfThis._name)
				// cc.eventManager.removeListener(selfThis._listen)
				// target.removeFromParent()
			}
		});	
        selfThis._listen = listen.clone();
		cc.eventManager.addListener(selfThis._listen
			,selfThis);
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