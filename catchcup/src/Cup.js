var Cup = cc.Sprite.extend({
	_type : 0,
	_show : false,

	ctor : function(type){
		this._super();
		this._type = type;
		cupRes = null;
		cupName = "";
		switch (this._type) {
		case GameConfig.goldCup.type:
			cupRes = resource.goldRes;
			cupName = "奖 杯";
			break;
		case GameConfig.silverCup.type:
			cupRes = resource.silverRes;
			cupName = "银杯";
			break;
		case GameConfig.copperCup.type: 
			cupRes = resource.copperRes;
			cupName = "铜币";
			break;
		case GameConfig.flower.type:
			cupRes = resource.flowerRes;
			cupName = "花";
			break;
		case GameConfig.wood.type:
			cupRes = resource.woodRes;
			cupName = "木头";
			break;	
		case GameConfig.clock.type:
			cupRes = resource.clockRes;
			cupName = "时钟";
			break;
		default:
			cc.log("---------warn not match cupRes");
		break;
		}
		this.initWithFile(cupRes);
		var label = new cc.LabelTTF(cupName ,"Arial",20)
		this.addChild(label);

	},

	resetCup : function() {
		this._type = 0;

	},
	getCupType :function(){
		return this._type;
	},
	setShow : function(show){
		this._show = show;
	},
	getShow : function(){
		return this._show;
	}

}) 