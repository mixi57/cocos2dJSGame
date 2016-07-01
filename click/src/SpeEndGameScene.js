/**
 * Created by lickky
 **/

var SpeEndGameLayer = cc.Layer.extend({

	onEnter:function () {
		this._super();
		g_currentGameLayer = g_Config.CurrentLayerTag.EndGame;
		cc.log("g_currentGameLayer: ",g_currentGameLayer,"EndGame");
	},
	
	ctor:function () {
		this._super();
		var winsize = cc.winSize;
		
		var descString = "                居然能拿到"+g_Score+"分\n\n                就算开挂也是屌\n\n 我在广州火烈鸟网络科技有限公司\n\n        有兴趣来一起征服地球吗？"
		var descSprite = new cc.LabelTTF(descString,"",23);
		descSprite.setColor(cc.color(0, 0, 0));
		descSprite.setPosition(winsize.width/2, winsize.height/3*2+60);
		this.addChild(descSprite,3);
		
		var logo = new cc.Sprite(res.logo_flamingo);
		logo.setScale(0.7);
		logo.x = winsize.width/2;
		logo.y = winsize.height/2+60;
		this.addChild(logo,10);
		
		var bg = new cc.Sprite(res.Bg_EndGame);
		bg.x = winsize.width/2;
		bg.y = winsize.height/2;
		this.addChild(bg);
		
		var shareSprite = new cc.Sprite(res.Share_Logo);
		shareSprite.setAnchorPoint(1, 1);
		shareSprite.setVisible(false);
		shareSprite.setScale(1.5);
		shareSprite.x = winsize.width;
		shareSprite.y = winsize.height;
		this.addChild(shareSprite);
		
		var sharePoint = new cc.Sprite(res.Share_Point);
		sharePoint.setVisible(false);
		sharePoint.setScale(1.5);
		sharePoint.x = winsize.width-100;
		sharePoint.y = winsize.height-50;
		this.addChild(sharePoint);
		var action1 = cc.rotateTo(0.4, -20);
		var action2 = cc.rotateTo(0.4, 20); 
		var _timeAnimation = cc.sequence(action1, action2);
		sharePoint.runAction(_timeAnimation.repeatForever()); 
		
 
		var btn_send = new ClickButton(res.Button_Send);
		btn_send.setTouchEnable(true);
		btn_send.setPosition(winsize.width/2, winsize.height/6);
		btn_send.setCallBack(function() {
			shareSprite.setVisible(true);
			sharePoint.setVisible(true);
		})
		this.addChild(btn_send);

		var btn_again = new ClickButton(res.Button_Again);
		btn_again.setPosition(winsize.width/2, winsize.height/3);
		btn_again.setTouchEnable(true);
		btn_again.setCallBack(function() {
			var transitions = new cc.TransitionFade(1, new MainGameScene());
			cc.director.runScene(transitions); 
		});
		this.addChild(btn_again);
		_czc.push(["_trackEvent","Score",g_Score,"",1,"canves"]);

		wx.onMenuShareTimeline({
			title: '刚在“齐齐来挑战呗”砍下'+g_Score+'分,勇夺“'+g_Config.TitleLevel[type]+'”称号,不服来战！',
			link: 'tzb2015.guopan.cn',
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
		wx.onMenuShareAppMessage({
			title: '齐齐来挑战呗',
			link: 'tzb2015.guopan.cn',
			desc: '我在挑战杯“齐齐来挑战呗”游戏中砍下'+g_Score+'分,获“'+g_Config.TitleLevel[type]+'”称号,不服来战！', // 分享描述
			imgUrl: 'http://tzb2015.guopan.cn/res/logo.jpg',
			trigger: function (res) {
			},
			success: function (res) {
			},
			cancel: function (res) {
			},
			fail: function (res) {
				alert("分享失败："+JSON.stringify(res));
			},
			complete : function (res) {
			}
		});

	},
}
);

var SpeEndGameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new SpeEndGameLayer();
		this.addChild(layer);
	}
});