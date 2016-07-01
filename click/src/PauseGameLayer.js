/**
 * Created by lickky
 **/

var Tag_PauseGameLayer = 123;
var PauseGameLayer = cc.Layer.extend({
	
	onEnter:function () {
		this._super();
		g_currentGameLayer = g_Config.CurrentLayerTag.PauseGame;
		cc.log("g_currentGameLayer: ",g_currentGameLayer,"PauseGame");

	},
	ctor:function () {
		this._super();
	var winsize = cc.winSize;
	var bg = new cc.Sprite(res.Bg_PauseGame);
	bg.x = winsize.width/2;
	bg.y = winsize.height/2;
	this.addChild(bg);
	
	var btn_continue = new ClickButton(res.Button_Continue);
	btn_continue.setPosition(winsize.width/2, winsize.height/2);
	this.addChild(btn_continue);
	btn_continue.setTouchEnable(true);
	btn_continue.setCallBack(function() {
		g_currentGameLayer = g_Config.CurrentLayerTag.MainGame;
		cc.director.getRunningScene().removeChildByTag(123);
		g_isRunning = true;
		g_isCounting = false;
	});
	
	var btn_restart = new ClickButton(res.Button_Restart);
	btn_restart.setPosition(winsize.width/2, winsize.height/3);
	btn_restart.setTouchEnable(true);
	btn_restart.setCallBack(function() {
		reSetConfig();
		cc.director.getRunningScene().removeAllChildren();
		var transitions = new cc.TransitionFade(1, new MainGameScene());
		cc.director.runScene(transitions); 
	});
	this.addChild(btn_restart);
	}
}
);

var PauseGameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new PauseGameLayer();
		this.addChild(layer);
	}
});