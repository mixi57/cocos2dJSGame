/**
 * Created by lickky
 */
var g_currentGameLayer = 0;
var StartGameLayer = cc.Layer.extend({

	ctor:function () {
		this._super();
		var winsize = cc.winSize;
		var bg = new cc.Sprite(res.Bg_StartGame);
		bg.x = winsize.width/2;
		bg.y = winsize.height/2;
		this.addChild(bg);
		
		var btn_start = new ClickButton(res.Button_Start);
		btn_start.setPosition(winsize.width/2, winsize.height/8);
		this.addChild(btn_start);
		btn_start.setCallBack(function() {
			reSetConfig();
			var transitions = new cc.TransitionFade(1, new MainGameScene());
			cc.director.runScene(transitions); 
		});
		btn_start.setTouchEnable(true);
	},
	onEnter:function () {
		this._super();
		g_currentGameLayer = g_Config.CurrentLayerTag.StartGame;
		cc.log("g_currentGameLayer: ",g_currentGameLayer,"StartGame");
	}
}
);

var StartGameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new StartGameLayer();
		this.addChild(layer);
	}
});