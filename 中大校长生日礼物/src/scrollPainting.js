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
	ctor:function () {
		this._super();

		var size = cc.winSize;

		this.bg = new cc.Sprite(res.Page1_png);
		this.bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(this.bg);
        //////////////////////////////////////////////////////////
        // 卷轴画滚动动作

        this.sprite = new cc.ProgressTimer(new cc.Sprite(res.ScrollPainting_png));
        this.sprite.type = cc.ProgressTimer.TYPE_BAR;
        this.sprite.midPoint = cc.p(0, 0);
        this.sprite.barChangeRate = cc.p(1, 0); 
        this.addChild(this.sprite);
        this.sprite.x = 523;//size.width/2;
        this.sprite.y = 323;//size.height/2;
        //this.sprite.runAction(to1.repeatForever());

        

        var onDesc = cc.callFunc(this.setDescription, this);
        var delay = cc.delayTime(0.5);  //卷轴完全打开后延迟0.5s，再显示字体

        //var action = cc.sequence(cc.progressTo(4, 100), delay, onDesc);

        var action = cc.progressTo(4, 100);
        this.sprite.runAction(action);



	
		return true;
	},


	setDescription:function() { 
		/*
		var size = cc.size(300,300);
		var winSize = cc.winSize;
		var layout = new ccui.Layout();
		layout.setContentSize(size);
		
		var layoutRect = layout.getContentSize();
		
		//layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		//layout.setBackGroundColor(cc.color(128, 128, 128));
		
		
		 // 正文 label的锚点 0.5，0.5
        var titleLabel = new cc.LabelTTF("论\n语\n ·\n雍\n也", "Arial", 38);
        var titleSize = titleLabel.getContentSize(); 
       
        titleLabel.x = titleSize.height/2 + 10;
        titleLabel.y = size.height - titleSize.width/2 - 10;
        cc.log( "%d, %d", titleLabel.x,  titleLabel.y); 
        
        titleLabel.rotation = 270;
        layout.addChild(titleLabel, 100);
        
        var bodyLabel = new cc.LabelTTF("    己欲立而\n立人\n    己欲达而\n达人", "Arial", 38);
	    //bodyLabel.setDimensions(cc.Size(100,100));
        var bodySize = bodyLabel.getContentSize();
        
	    bodyLabel.x = bodySize.height/ 2 + 10; //字距离左边的距离
	    bodyLabel.y = bodySize.width/2 + 10;  //字距离下边的距离
	    bodyLabel.rotation = 270;

	    layout.addChild(bodyLabel, 100);
	    
	    //layout.setFlippedX(true);
	    layout.setPosition(winSize.width/2-size.width/2,winSize.height/2-size.height/2); 
	   
	    this.addChild(layout, 100);
*/
		var winSize = cc.winSize; 
		var description = new DescriptionLayer();
		description.setPosition(winSize.width/2, winSize.height/2);
		//description.setRotation(270);
	    this.addChild(description, 100);
	}

});

// layer的锚点是 0.5， 0.5
var DescriptionLayer = cc.Layer.extend({ 
	ctor:function() {
		this._super();
		var size = cc.size(640, 1136);
		this.setContentSize(size);
		this.setAnchorPoint(cc.p(0.5,0.5));
		var winSize = cc.winSize;
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

