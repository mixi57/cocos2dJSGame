/**
 * Created by lickky
 */

// 初始n*n个格子
var g_currentNumber = 2;
// 分数
var g_Score = 0;
// 计时器
var g_time = g_Config.Time;
// 游戏是否运行中
var g_isRunning = true;
// 是否重新
var g_isRestartGame = false;

var g_isCounting = false;

var reSetConfig = function() {
	g_currentNumber = 2;
	g_time = g_Config.Time;
	g_isRunning = true;
	g_isRestartGame = false;
	g_isCounting = false;
	
};


var MainGameLayer = cc.Layer.extend({
	_gameViewNode : null,
	_scroreSprite : null,
	_isActionRunning : false,
	ctor:function () {
		this._super();
		var cup = new cc.Sprite(res.Logo_Cup);
		cup.x = cc.winSize.width/2;
		cup.y = cc.winSize.height/6*5;
		this.addChild(cup,10); 

		var btn_stop = new ClickButton(res.Button_Stop);
		btn_stop.setAnchorPoint(1, 0)
		btn_stop.x = cc.winSize.width;
		btn_stop.y = cc.winSize.height-btn_stop.getContentSize().height;
		btn_stop.setTouchEnable(true);
		btn_stop.setCallBack(function() {
			g_isRunning = false;
//			cc.audioEngine.pauseMusic();
			var pauseGameLayer = new PauseGameLayer();
			cc.director.getRunningScene().addChild(pauseGameLayer,100,123);
		})
		this.addChild(btn_stop,10);
		
		this._scroreSprite = new cc.LabelTTF(String(g_Score),"comic",80);
		this._scroreSprite.x = cc.winSize.width/2-220;
		this._scroreSprite.y = cc.winSize.height/5*4;
		this.addChild(this._scroreSprite,10);
		
		this.fenSprite = new cc.LabelTTF("分","private_bold",50); 
		this.fenSprite.x = this._scroreSprite.x+69;
		this.fenSprite.y = this._scroreSprite.y-7;
		this.addChild(this.fenSprite,10);
		
		this.actionNode = new cc.Sprite(res.Score_Animation);
		this.actionNode.setVisible(false);
		this.actionNode.x = this._scroreSprite.x;
		this.actionNode.y = this._scroreSprite.y;
		this.addChild(this.actionNode,10); 

		var blinkAction = cc.blink(0.5,1);
		this.action = cc.sequence(cc.callFunc(function() {
										this.setVisible(true);
										}, this.actionNode),
										blinkAction,
									cc.callFunc(function() {
										this.setVisible(false);
									}, this.actionNode),
									cc.callFunc(this.onTrace, this));
		this.action.retain();
		
		this._timeSprite = new cc.LabelTTF(String(g_time),"comic",80);
		this._timeSprite.setString(g_time);
		this._timeSprite.x = cc.winSize.width/2+180;
		this._timeSprite.y = cc.winSize.height/5*4;
		this.addChild(this._timeSprite,10);
		
		
		this.secSprite = new cc.LabelTTF("s","comic",50); 
		this.secSprite.x = cc.winSize.width/2+255;
		this.secSprite.y = cc.winSize.height/5*4-10;
		this.addChild(this.secSprite,10);
		
		this._timeAnimationSprite = new cc.Sprite(res.Clock_1);
		this._timeAnimationSprite.setVisible(false);
		this._timeAnimationSprite.x = this._timeSprite.x+100;
		this._timeAnimationSprite.y = this._timeSprite.y;
		this.addChild(this._timeAnimationSprite, 10);
		var action1 = cc.rotateTo(0.1, 90);
		var action2 = cc.rotateTo(0.1, 0);
		var _timeAnimation = cc.sequence(action1, action2);
		this._timeAnimationSprite.runAction(_timeAnimation.repeatForever()); 
		

		this._gameViewNode = new cc.Node();
		this.bg = new cc.Sprite(res.Bg_White);
		this.bg.x = cc.winSize.width/2;
		this.bg.y = cc.winSize.height/2;
		this.bg.setScale(cc.winSize.width/this.bg.getContentSize().width*1.5, cc.winSize.height/this.bg.getContentSize().height)*1.5;
		this.addChild(this.bg,-1,1001);
		
		this._gameViewNode.x = g_Config.Horizontal_Margin/2;
		this._gameViewNode.y= 0;

		this._gameViewNode.clickRect = function() {
						
			this.removeAllChildren();
			var num = (g_Score+1) % g_Config.WordType.length;
			g_Score++;
			if (!this.getParent()._isActionRunning) {
				this.getParent().actionNode.runAction(this.getParent().action);
				this.getParent().actionNode.setVisible(false);
				this.getParent()._isActionRunning = true;
			}
			if (g_currentNumber < g_Config.n) {
				g_currentNumber = parseInt(g_Score/3) + 2;
			} 
			this.getParent().addRect(num); 
		};

		this.addChild(this._gameViewNode);
		this.schedule(function(){
			if(g_time > 0 && g_isRunning)
			{
				--g_time;
				if(g_time<0){g_time = 0;}
				this._timeSprite.setString(g_time);
				
				if (g_time <= 10 && !g_isCounting) {
					this._timeAnimationSprite.setVisible(true);
					g_isCounting = true;
				}else if (g_time > 10) {
					this._timeAnimationSprite.setVisible(false);
				}
				
			}else if (g_time <= 0) {
				g_isCounting = false;
				this.endGame();
			}
			
			if(g_isRestartGame){
				this.reStartGame();
			}
			
		},1);
		this.startGame();
		
		if (wx){
		wx.onMenuShareAppMessage({
			title: '齐齐来挑战呗',
			link: 'tzb2015.guopan.cn',
			desc: '我刚试玩了挑战杯“齐齐来挑战呗”游戏，你也快来接受挑战呗！', // 分享描述
			imgUrl: 'http://tzb2015.guopan.cn/res/logo.jpg',
			trigger: function (res) {
			},
			success: function (res) {
			},
			cancel: function (res) {
			},
			fail: function (res) {
			},
			complete : function (res) {
			}
		});
	}
		
		return true;
	},
	onTrace : function() {
		this._isActionRunning = false;
	},
	/**
	 * @type g_Config.WordType第几个数组 int类型
	 */
	addRect : function(type) {
		var gameViewRealWidth = cc.winSize.width-g_Config.Horizontal_Margin*2;
		var Vertical_Gap = cc.winSize.height/20;  // cc.winSize.height/2-gameViewRealWidth/2;
		this.bg.setColor(g_Config.Level_bg[g_currentNumber-1]);
		this._scroreSprite.setString(g_Score);
		var fontColor = 0;
		if(g_currentNumber > 6){
			fontColor = 0;
		}else{
			fontColor = 8;
		}
		this._scroreSprite.setColor(g_Config.Level_bg[fontColor]); 
		this._timeSprite.setColor(g_Config.Level_bg[fontColor]); 
		this.fenSprite.setColor(g_Config.Level_bg[fontColor]); 
		this.secSprite.setColor(g_Config.Level_bg[fontColor]); 
// 随机产生2个数值，对应随机格子
		var x = parseInt(Math.random() * g_currentNumber);
		var y = parseInt(Math.random() * g_currentNumber);
		
		var value = Math.floor(Math.random()*(g_Config.WordType[type].length-1))+1;
		var batchNodeRes = {};
		if (g_currentNumber >= 8) {
			batchNodeRes = g_Config.WordSmallPicType[type];
		}else {
			batchNodeRes = g_Config.WordPicType[type];
		}
		var batchNode = new cc.SpriteBatchNode(g_Config.WordPicType[type], g_currentNumber*g_currentNumber);
		this._gameViewNode.addChild(batchNode);
// 以下是循环生成方块的逻辑
		for (var indexX = 0; indexX < g_currentNumber; indexX++) {
			for (var indexY = 0; indexY < g_currentNumber; indexY++) {
				
				var sprite = new cc.Sprite(batchNode.texture);
				sprite.getTexture().setAntiAliasTexParameters();
				sprite.setScale(((cc.winSize.width-g_Config.Horizontal_Margin*2)/g_currentNumber-g_Config.Gap)/(sprite.getContentSize().width));
				
				sprite.x = indexX;
				sprite.y = indexY;
				if (sprite.x == x && sprite.y == y) {
					sprite = new RectSprite(g_currentNumber,g_Config.WordType[type][value]);
					this._gameViewNode.addChild(sprite);
					sprite.setTouchEnable(true);
					sprite.setCallBack(function() {
					this.getParent().clickRect();
					});
				} else{
					batchNode.addChild(sprite);
				}
				
				sprite.x = indexX * (gameViewRealWidth / g_currentNumber)+320/g_currentNumber;
				sprite.y = indexY * (gameViewRealWidth / g_currentNumber)+Vertical_Gap+320/g_currentNumber;
				sprite.setTag(111);
				
			}
		}
	},
	onEnter:function () {
		this._super();
		g_currentGameLayer = g_Config.CurrentLayerTag.MainGame;
		cc.log("g_currentGameLayer: ",g_currentGameLayer,"MainGame");

	},

	startGame : function() {
		g_Score = 0;
		this.addRect(0);
	},
	reStartGame : function() {
		reSetConfig();
		this._gameViewNode.removeAllChildren(true);
		this.startGame();
	},
	endGame : function() {
		reSetConfig();
		this.unschedule();
		if (g_Score >= 50) {
			var transitions = new cc.TransitionFade(1, new SpeEndGameScene());
			cc.director.runScene(transitions); 
		}else{
			var transitions = new cc.TransitionFade(1, new EndGameScene());
			cc.director.runScene(transitions); 
		}
	}
	
});

var MainGameScene = cc.Scene.extend({
	ctor:function () {
		this._super();
		var layer = new MainGameLayer();
		this.addChild(layer);
		
		cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
			switch (g_currentGameLayer) {
			case g_Config.CurrentLayerTag.MainGame:
				{
				//处理游戏进入后台的情况
				var pauseGameLayer = new PauseGameLayer();
				cc.director.getRunningScene().addChild(pauseGameLayer,100,123);
				}
				break;
				break;

			default:
				break;
			}
		});
	}
});