/**
 * Created by lickky
 */

var RectSprite = ClickButton.extend({
	_word : null,
	_Scale : 1,
	ctor : function (n,SpecialWord) {
		this._super();
		this.setTexture(res.Bg_White)
		this._word = new cc.LabelBMFont(SpecialWord,res.Test);
		this._word.x=this.getContentSize().width/2;
		this._word.y=this.getContentSize().height/2;
		this.addChild(this._word);
		this._Scale=((cc.winSize.width-g_Config.Horizontal_Margin*2)/n-g_Config.Gap)/(this.getContentSize().width)
		this.setScale(this._Scale);
	},
});