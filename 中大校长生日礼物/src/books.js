/*
 * 在有春秋楼的山水图下，首先呈现“修五经授六艺有教无类诲人不倦；游列国说仁政疆无大小锲而不舍”，
 * 其次呈现“他是行走中的探索者，也让自己的思想‘行走’在世界各个角落”，
 * 文字淡出后，校长自编的6本书的书影从右侧进入展示（不停留），
 * 引出“然而这一切都只是他的兴趣“（停留至中间）。
 */


var BooksLayer = cc.Layer.extend({
	bg:null,
	ctor:function(){
		this._super();

		var size = cc.winSize;

		//背景山水图
		this.bg = new cc.Sprite(res.Page7_png);
		this.bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(this.bg);
		
		//呈现“修五经授六艺有教无类诲人不倦；游列国说仁政疆无大小锲而不舍”
		
		var desc1 = new cc.LabelTTF("修五经授六艺有教无类诲人不倦\n游列国说仁政疆无大小锲而不舍", "Arvial", 28);
		desc1.attr({
			color:cc.color("##ff00ff"),
			x : 485,
			y : size.height/2,
			opacity : 0,
			rotation : -90
		});
		
		this.addChild(desc1);
		//desc1.runAction(cc.sequence(cc.FadeIn(1), cc.DelayTime(2), cc.fadeOut(2)));
		
		desc1.runAction(cc.sequence(
				cc.Spawn(cc.FadeIn(2), cc.scaleTo(2,1.5,1.5)),
				cc.DelayTime(2), 
				cc.FadeOut(1)
				));
		var desc2 = new cc.LabelTTF("他是行走中的探索者，\n也让自己的思想‘行走’\n在世界各个角落", "Arvial", 30);
		desc2.attr({
			color:cc.color("##ff00ff"),
			x : 535,
			y : size.height/2,
			opacity : 0,
			rotation : -90
		});

		this.addChild(desc2);
		desc2.runAction(cc.sequence(
				cc.DelayTime(5), 
				cc.Spawn(cc.FadeIn(2), cc.scaleTo(2,1.5,1.5)),
				cc.DelayTime(2), 
				cc.FadeOut(1),
				cc.CallFunc(this.moveBooks,this)
		)); 
		
		
		
		//this.runAction(cc.Sequence(cc.DelayTime(1), cc.CallFunc(this.moveBooks,this)));
		
		return true;
		
	},
	
	moveBooks:function(){
		var size = cc.winSize;
		
		// 6本书的书影
		var arrayOfBookName = [
		                        res.Book1_png, 
		                        res.Book2_png, 
		                        res.Book3_png, 
		                        res.Book4_png, 
		                        res.Book5_png, 
		                        res.Book6_png
		                        ]; 

		var arrayOfBooks = [];
		var startW = 702;
		var startH = 700;//520;
		var endW = 702;
		var endH = -60; //120;
		var midW = 900;
		var midH = size.height/2;

		for(var i = arrayOfBookName.length-1; i>=0; --i) {
			arrayOfBooks[i] = new cc.Sprite(arrayOfBookName[i]);
			arrayOfBooks[i].attr({
				x: startW,
				y: startH,
				opacity:0,
				rotation: -90
			});
			this.addChild(arrayOfBooks[i]);
		}

		var controlPoints = [ cc.p(startW, startH), cc.p(midW, midH), cc.p(endW, endH)];
		var bezier = cc.bezierTo(3, controlPoints);

		var delaySecond = 1; 
		for(var i = 0; i < arrayOfBookName.length; i++) {
			var delay = cc.delayTime(delaySecond);
			var bezier = cc.bezierTo(5, controlPoints);
			delaySecond += 0.7;
			arrayOfBooks[i].runAction(cc.sequence(delay, cc.FadeIn(1), bezier, cc.FadeOut(1)));  
		}
		
		var label = new cc.LabelTTF("然而这一切都只是他的兴趣", "Arvial", 30);
		label.attr({
			color:cc.color("##ff00ff"),
			x: size.width/2,
			y: size.height/2,
			opacity:0,
			rotation: -90
		});

		this.addChild(label);
		label.runAction(cc.Sequence(cc.DelayTime(delaySecond+2), cc.Spawn(cc.FadeIn(2), cc.scaleTo(2,1.5,1.5))));
		
	}

	
});