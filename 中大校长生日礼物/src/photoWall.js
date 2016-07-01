/*
 * Page4 照片墙
 * 首先呈现三张校长的相片（可以自行选择呈现效果），
 * 然后三张相片最底层有一个图片墙（面积约占屏幕的50%），
 * 然后相片缩小回落到校长的图片墙上，图片墙放大充满整屏（作背景），
 * 然后位于图片墙中间板块呈现矩形蒙版（iOS8）。矩形内呈现一段文字
 */

var description = "自2010年12月23日卸任中山大学校长起，截至2015年4月19日，黄达人校长共走访高校183所，其中国内部属高校39所，地方本科高校75所，高职院校48所。海外高校21所。与201位大学管理者进行了单独深入交流。足迹遍布我国湖北、湖南、江西、安徽、江苏、浙江、上海市、陕西、河南、河北、山东、天津市、北京市、福建、广东、海南、台湾、广西区、香港特区、澳门特区、云南、贵州、四川、重庆市、甘肃、宁夏区、新疆区、黑龙江、吉林、辽宁等30个省、直辖市和特区。深入调研美国、日本、新加坡等国高等教育情况。"

var PhotoWallLayer = cc.Layer.extend({
	bg:null,
	ctor:function(){
		this._super();
		
		var size = cc.winSize;
		
		//背景
		this.bg = new cc.Sprite(res.Page8_png);
		this.bg.attr({
			x: size.width /  2,
			y: size.height / 2,
		});
		this.addChild(this.bg);
		
		//照片墙
		var photoWall = new cc.Sprite(res.PhotoWall_png);
		photoWall.attr({
			x: size.width /4*3,
			y: size.height / 2,
			scale : 0.5
		});
		this.addChild(photoWall);
		
		//3张大照片
		var photo1 = new cc.Sprite(res.PresidentPhoto1_png);
		var photo2 = new cc.Sprite(res.PresidentPhoto2_png);
		var photo3 = new cc.Sprite(res.PresidentPhoto3_png);
		
		photo1.attr({
			x: 300,//size.width / 2,
			y: 500,//size.height / 2,
			//scale: 0.5,
			rotation: -90
		});
		
		photo2.attr({
			x: 380, //size.width / 2,
			y: 450, //size.height / 2,
			//scale: 0.5,
			rotation: 0
		});
		
		photo3.attr({
			x: 380, //size.width / 2,
			y: 200, //size.height / 2,
			//scale: 0.5,
			rotation: -40
		});
		
		this.addChild(photo1);
		this.addChild(photo2);
		this.addChild(photo3);
		
		
		
		
		/*
		photo1.runAction(
				cc.spawn(
						cc.rotateTo(2, -135),
						cc.moveTo(2, cc.p(100, 100))
				)
		);
		
		photo2.runAction(
				cc.spawn(
						cc.rotateTo(2, -45),
						cc.moveTo(2, cc.p(100, 400))
				)
		);
		
		photo3.runAction(
				cc.spawn(
						cc.rotateTo(2, -90),
						cc.moveTo(2, cc.p(400, 320))
				)
		);
		*/
		
		var onBackToWall = cc.CallFunc(this.backToWall, this);
		
		var onDesc = cc.CallFunc(this.setDesc, this);
		
		var delay = cc.DelayTime(2);
		
		//相片缩小回落到校长的图片墙上，图片墙放大充满整屏
		var action = cc.Sequence(delay, onBackToWall, delay, cc.ScaleTo(2, 4, 4), delay, onDesc);
		
		var action = cc.Sequence(
				cc.DelayTime(5), 
				cc.CallFunc(function(){
					photo1.runAction(
							cc.spawn(
									cc.scaleTo(2, 0.5),
									cc.rotateTo(2, -90),
									cc.moveTo(2, cc.p(600, 200))
							)	
					);

					photo2.runAction( 
							cc.spawn(
									cc.scaleTo(2, 0.5),
									cc.rotateTo(2, -90),
									cc.moveTo(2, cc.p(500, 400))
							)	
					);
					photo3.runAction(
							cc.spawn(
									cc.scaleTo(2, 0.5),
									cc.rotateTo(2, -90),
									cc.moveTo(2, cc.p(700, 100))
							)	
					); 
			
				}, this),
				cc.DelayTime(2), 
				cc.Spawn(cc.moveTo(2,cc.p(size.width/2, size.height/2)), cc.ScaleTo(2, 1, 1)),
				cc.CallFunc(function(){
					var photoDesc = new cc.Sprite(res.PhotoDesc_png);
					photoDesc.attr({
						x : size.width/2,
						y : size.height/2,
						//scale : 0.5,
						opacity : 0
					});
					this.addChild(photoDesc);
					photoDesc.runAction(cc.FadeIn(2));
					//photoDesc.runAction(cc.Spawn(cc.FadeIn(2), cc.ScaleTo(2,1,1)));
				}, this)
		);
		
		
		//var action = cc.Sequence(cc.ScaleTo(2, 4, 4), delay, onDesc);
		
		photoWall.runAction(action); 
		
		
		
		return true;
	},
	
	setDesc:function(){
		var winSize = cc.winSize;
		
		//文字背景色
		var descBackground = new cc.LayerColor(cc.color("#EEEEE0"), 640, 200);
		var descSize = descBackground.getContentSize();
		descBackground.attr({
			rotation:-90,
			x: winSize.width/2 - descSize.width/2,
			y: winSize.height/2-descSize.height/2,
			opacity:50
		});
		//文字描述
		this.desc = new cc.LabelTTF(description, "Arial", 20, descBackground.getContentSize());			
		descBackground.addChild(this.desc);
		this.desc.setPosition(cc.p(descSize.width/2, descSize.height/2));

		
		this.addChild(descBackground);
		
		//this.desc.setOpacity(0);
		descBackground.runAction(cc.FadeIn(2));
		//this.desc.runAction(cc.FadeIn(2));
	}
});