/*
 * 默认值:
- 旋转:0 
- 位置: (x=0,y=0) 
- 缩放比例: (x=1,y=1) 
- 文本尺寸: (x=0,y=0)
- 锚点: (x=0,y=0)
- 颜色: (r=255,g=255,b=255)
- 透明度: 255
 * 
 * */
 
var ScrollPaintingLayer = cc.Layer.extend({
	bg:null,
	sprite:null,
	scroll:null,
	ctor:function () {
		this._super();

		var size = cc.size(1136, 640);//cc.winSize;

		this.bg = new cc.Sprite(res.Page1_png);
		this.bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(this.bg);
        //////////////////////////////////////////////////////////
        // 卷轴画

		
        this.sprite = new cc.ProgressTimer(new cc.Sprite(res.ScrollPainting1_png));
        this.sprite.type = cc.ProgressTimer.TYPE_BAR;
        this.sprite.midPoint = cc.p(0, 0);
        this.sprite.barChangeRate = cc.p(1, 0); 
        this.addChild(this.sprite);
        this.sprite.x = 365;//size.width/2;
        this.sprite.y = size.height/2;
        //this.sprite.runAction(to1.repeatForever());
        this.sprite.runAction(cc.progressTo(0.01, 200/721*100)); 
        this.scroll = new cc.Sprite(res.ScrollPainting2_png);
        this.scroll.x = 200;
        this.scroll.y = 320; 
        this.addChild(this.scroll);
        //this.scroll.setVisible(false); 
       
        //this.doAnimation();
	
		return true;
	},
	//加按钮
	addIcon:function(){
		cc.log("add icon");
		this.addChild(new DragIcon());
		/*
		icon = new cc.Sprite(res.Icon_png);
		icon.attr({
			x : 1038,
			y : 320,
			opacity : 0,
		});
		var s = icon.getContentSize();
		arrow = new cc.Sprite(res.Arrow_png);
		arrow.attr({
			x : s.width/2+10, 
			y : s.height/2-3,
			opacity : 0
		});   
		icon.addChild(arrow);
		this.addChild(icon);
		
		icon.runAction(cc.FadeIn(0.5));
		arrow.runAction(cc.FadeIn(0.5));
		arrow.runAction(				
				cc.RepeatForever(cc.Sequence(
						cc.MoveTo(0.7, cc.p( s.width/2+6,s.height/2-3)), 
						cc.MoveTo(0.7, cc.p( s.width/2-6,s.height/2-3))
				)
		));*/
	},
	doAnimation:function(){ 
		
		//var action = cc.progressTo(4, 100);
		//this.sprite.runAction(action);
		var pos = [
		           {x : 422, y : 397 },
		           {x : 416, y : 340 },
		           {x : 410, y : 284 },
		           {x : 411, y : 231 }	           
		           ];
		this.desc = [];
		for(var i = 0; i < pos.length; ++i){
			this.desc[i] = new cc.ProgressTimer(new cc.Sprite("res/scrollDesc"+(i+1)+".png"));
			this.desc[i].type = cc.ProgressTimer.TYPE_BAR;
			this.desc[i].midPoint = cc.p(0, 0);
			this.desc[i].barChangeRate = cc.p(1, 0);  
			this.desc[i].x = pos[i].x;
			this.desc[i].y = pos[i].y;
			
			this.addChild(this.desc[i]);
			
		}
		
		var scrollTime = 0.5;
		//卷轴动作
		//卷轴画动作
		var w = 721; 
		var path = [200, 300, 400, 500, 600, w];
		/*  
		this.sprite.runAction(cc.Sequence(
				cc.progressTo(scrollTime, path[0]/w*100),
				cc.callFunc(function(){
					this.scroll.setVisible(true);
				}, this) 
		));*/
		var t = scrollTime;
		for(var i = 1; i < path.length; ++i){
			this.sprite.runAction(cc.sequence(
					cc.DelayTime(t),
					cc.progressTo(scrollTime, path[i]/w*100)
					
			));
			this.scroll.runAction(cc.sequence(
					cc.DelayTime(t),
					cc.MoveTo(scrollTime, cc.p(path[i], 320))
			));
			t += scrollTime;
		}
		this.scroll.runAction(cc.sequence(
				cc.DelayTime(t),
				cc.rotateTo(0.05,2),
				cc.rotateTo(0.05,-2),
				cc.rotateTo(0.05, 0),
				cc.rotateTo(0.05,2),
				cc.rotateTo(0.05,-2),
				cc.rotateTo(0.05, 0) 
				//cc.MoveTo(scrollTime, cc.p(path[i], 320))
		));
		t += scrollTime;   
 
		
		
		//this.sprite.runAction(cc.progressTo(scrollTime, 100));
		//t += 0.5;
		//文字展现  
		for(var i = 0; i < pos.length; ++i){
			this.desc[i].runAction(cc.Sequence(cc.DelayTime(t),cc.progressTo(0.4, 100)));	
			t += 0.4;
		}
		//按钮出现
		this.runAction(cc.sequence(cc.DelayTime(t+1), cc.CallFunc(this.addIcon, this)));
	
	},
	addScroll:function(){
		
	}
});

// layer的锚点是 0.5， 0.5
var DescriptionLayer = cc.Layer.extend({ 
	ctor:function() {
		this._super();
		var size = cc.size(640, 1136);
		this.setContentSize(size);
		this.setAnchorPoint(cc.p(0.5,0.5));
		var winSize = cc.size(1136, 640);//cc.winSize;
		var richText = new ccui.RichText();
		
        richText.ignoreContentAdaptWithSize(false);
        richText.setContentSize(cc.size(320, 400));

        var re1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "   己欲立而\n立人，\n  己欲达而\n", "Arial", 30);
        var re2 = new ccui.RichElementText(2, cc.color.YELLOW, 255, "达人", "Arial", 40);
        var re3 = new ccui.RichElementText(3, cc.color.WHITE, 255, "。\n", "Arial", 30);
        
        richText.pushBackElement(re1);
        richText.pushBackElement(re2);
        //richText.insertElement(re2, 1);
        //richText.insertElement(re3, 2);
        richText.pushBackElement(re3);
 
        
        richText.setPosition(cc.p(size.width/2-richText.getContentSize().width/2, size.height/2-richText.getContentSize().height/2));
		
        this.addChild(richText,1000);
        
        var titleLabel = new cc.LabelTTF("论\n语\n ·\n雍\n也", "Arial", 38);
        var titleSize = titleLabel.getContentSize(); 
        titleLabel.x = 0;//size.width/2 - titleSize.width/2 - 10;
        titleLabel.y = 0;//size.height/2 - titleSize.height/2 - 10;
        //cc.log( "%d, %d", titleLabel.x,  titleLabel.y); 

        
        this.addChild(titleLabel, 100);
        this.setPosition(cc.p(winSize.width/2,winSize.height/2));
//        this.x = winSize.width/2;//-size.width/2;
//        this.y = winSize.height/2;// - size.height/2;
        this.rotation = 270;
        
        return true;
	}
});






var ScrollPaintingScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new ScrollPaintingLayer();
		this.addChild(layer);
	}
});

