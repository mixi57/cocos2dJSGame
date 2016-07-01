// 具体行程呈现的位置
var arrayOfRoutePos = [
287,358,445,527,608,692,776,861,938,1022,1112,
177,260,330,437,500,585,665,750,833,917,1000,1083,
177,260,330,437,500,585,665,750,833,917,1000,1083,
177,260,330,437,500,585,665,750,833
                       ];

var arrayOfTimelinePos = [                     
300,375,458,540,625,708,790,875,956,1040,1136,
192,275,349,452,515,600,680,765,848,932,1014,1136,
192,275,349,452,515,600,680,765,848,932,1014,1136,
192,275,349,452,515,600,680,765,1136
                          ];
// 具体行程的内容 
var arrayOfDateDesc = [ 
	"2011年2月15日",
	"2011年2月26日",
	"2011年3月2日",
	"2011年3月3日",
	"2011年3月3日",
	"2011年3月4日",
	"2011年3月8日",
	"2011年4月9日",
	"2012年1月15日",
	"2012年1月17日",
	"2012年1月18日",
	"2012年10月22日",
	"2012年10月22日",
	"2012年10月23日",
	"2012年10月24日",
	"2012年10月26日",
	"2012年10月27日",
	"2012年11月1日",
	"2012年5月26日",
	"2012年5月27日",
	"2012年5月28日",
	"2013年1月7日",
	"2013年3月12日",
	"2013年3月12日", 
	"2013年3月14日",
	"2013年4月5日",
	"2013年4月11日",
	"2013年4月11日",
	"2013年4月18日",
	"2014年1月7日",
	"2014年1月13日",
	"2014年1月14日",
	"2014年2月16日",
	"2014年1月18日",
	"2014年2月17日",
	"2014年2月28日",
	"2014年3月4日",
	"2014年3月2日",
	"2014年3月17日",
	"2014年3月18日",
	"2015年1月5日",
	"2015年1月7日",
	"2015年1月21日",
	"2015年1月22日"	
     ];


var arrayOfRouteDesc = [
	"在北京访问中国人民大学校长纪宝成校长",
	"在长沙访问中南大学黄伯云校长",
	"在北京访问哈尔滨工业大学王树国校长",
	"在北京访问中国农业大学瞿振元书记",
	"在北京访问浙江大学原校长潘云鹤",
	"在北京访问武汉大学原党委书记、校长顾海良",
	"在北京访问北京师范大学钟秉林校长",
	"在兰州访问兰州大学原校长李发伸",
	"在香港访问香港城市大学程星协理副校长",
	"在新加坡访问新加坡南洋理工大学余明华副校长",
	"在新加坡访问新加坡南洋理工学院林靖东院长",
	"在美国费城访问天普大学戴海龙校长",
	"在美国宾夕法尼亚州访问尤西纽斯学院黄伊侣校长",
	"在美国马里兰州访问马里兰大学原校长牟德",
	"在美国马里兰州访问台湾中央大学院校长刘全生",
	"在美国迈阿密访问圣托马斯大学陈思齐校长",
	"在美国休斯敦访问香港科技大学原校长朱经武",
	"在湖南常德临澧访问马萨诸塞大学波斯顿分校夏宗国副校长",
	"在广州访问香港大学前副校长李焯芬",
	"在广州访问香港浸会大学陈新滋校长",
	"在澳门访问澳门大学赵伟校长",
	"在洛阳给河南科技大学讲课",
	"在日本京都访问立命馆大学长田丰臣理事长",
	"在日本京都访问京都大学松本紘校长",
	"在日本东京访问早稻田大学桥本周司常务副校长",
	"在上海访问上海交通大学校长张杰校长",
	"在北京访问清华大学生命科学学院施一公院长",
	"在北京访问北京大学生命科学学院饶毅院长",
	"在河南开封调研河南大学",
	"在海口给海南医学院讲课",
	"在昆明访问云南工商学院李孝轩董事长",
	"在重庆访问重庆科技学院严欣平院长",
	"在广西钦州调研钦州学院",
	"在海南三亚调研三亚城市职业技术学院",
	"在安徽合肥访问合肥学院蔡敬民书记",
	"在江苏南京访问南京工程学院孙玉坤院长",
	"在广州给广东技术师范学院讲课",
	"在江苏徐州访问徐州工程学院韩宝平院长",
	"在四川宜宾访问宜宾学院汪明义院长",
	"在四川成都访问成都（大学）学院周激流院长",
	"在苏州调研西交利物浦大学",
	"在浙江绍兴给浙江越秀外国语学院讲课",
	"在河北邢台给河北机电职业技术学院讲课",
	"在河南许昌访问许昌学院陈建国院长"
	
    ];


//var arrayOfRoutes = [];
//var arrayOfDates = [];
//
//var arrayOfDelay = [];

var middle = 200;  //时间轴的中心

var RoutesLayer = cc.Layer.extend({
//	bg:null,
//	timeline:null,
//	timelineAction:[],
//	arrayOfRoutes:[],
//	arrayOfDates:[], 
//	count:0,
	ctor:function(background, sprite, start, end){
		this._super();
		
		var size = cc.winSize;
		
		var bg = new cc.Sprite(background);
		bg.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(bg);
		
		//时间轴
		//this.timeline = new cc.Sprite(res.Branch_png); 
		var timeline = new cc.ProgressTimer(new cc.Sprite(sprite));
		timeline.type = cc.ProgressTimer.TYPE_BAR;
		//timeline.midPoint = cc.p(0, 0);   //从左到右
		timeline.midPoint = cc.p(0, 0);
		timeline.barChangeRate = cc.p(1, 0); //y=0表示y不变
		
		timeline.x = size.width/2;
		timeline.y = size.height/2;
		 
		this.addChild(timeline);
		
		
		//var onSetRoute = cc.callFunc(this.setRoutes, this, {start:0, end:10});
		//var delay = cc.delayTime(0.5);  

		//var action = cc.sequence(cc.progressTo(1, 100), delay, onSetRoute);
		
		//时间轴的滚动动作
		//var timelineAction = [];

		var timelineAction = [];
		var arrayOfRoutes = [];
		var arrayOfDates = []; 
		var arrayOfDates = [];
		
		var t = 0;
		var count = 0;
		for(var i = start; i <= end; ++i){
			//timelineAction[4*i] = cc.DelayTime(2);
			timelineAction[t++] = cc.progressTo(0.5, arrayOfTimelinePos[i]/1136*100);
			//timelineAction[t++] = cc.DelayTime(0.5);
			timelineAction[t++] = cc.callFunc(this.setRoutes, this, {dates:arrayOfDates, routes:arrayOfRoutes, i: i, t : count});
			timelineAction[t++] = cc.DelayTime(1.5);
			count++;
		}
		if(timelineAction.length > 0) {
			var action = cc.Sequence(timelineAction);
			timeline.runAction(action);
		}
		
		return true;
	},
	
	setRoutes:function(nodeExecutingAction, data){
		var i = data.i;
		var arrayOfRoutes = data.routes;
		var arrayOfDates = data.dates;
		var t = data.t;
		
		var dTime = 0.5;
		
		//日期
		arrayOfDates[t] = new cc.LabelTTF(arrayOfDateDesc[i], "Arial", 20);
		arrayOfDates[t].attr({
			x : arrayOfRoutePos[i],
			y : middle-30-arrayOfDates[t].getContentSize().width/2,
			opacity : 0,
			color : cc.color("#000000"),
			rotation : -90,
			scale : 0.5
		});
		/*
		arrayOfDates[i].x = arrayOfRoutePos[i];
		arrayOfDates[i].y = middle-30-arrayOfDates[i].getContentSize().width/2;
		arrayOfDates[i].opacity = 0;
		arrayOfDates[i].color = cc.color("#000000");
		arrayOfDates[i].rotation = -90;
		 */
		this.addChild(arrayOfDates[t]);
		//arrayOfDates[i].runAction(cc.fadeIn(1));
		arrayOfDates[t].runAction( cc.Sequence(cc.DelayTime(dTime), cc.Spawn(cc.scaleTo(dTime,1,1),cc.fadeIn(dTime))));

		
		
		//具体行程
		arrayOfRoutes[t] = new cc.LabelTTF(arrayOfRouteDesc[i], "Arial", 20, cc.size(390, 24));	
		arrayOfRoutes[t].attr({
			x : arrayOfRoutePos[i],
			y : middle+30+arrayOfRoutes[t].getContentSize().width/2,
			opacity : 0,			
			color : cc.color("#000000"),
			rotation : -90,
			scale : 0.5
		});

		/*
		arrayOfRoutes[i].x = arrayOfRoutePos[i];
		arrayOfRoutes[i].y = middle+30+arrayOfRoutes[i].getContentSize().width/2;
		arrayOfRoutes[i].opacity = 0;
		arrayOfRoutes[i].color = cc.color("#000000");
		arrayOfRoutes[i].vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM;
		arrayOfRoutes[i].hAlignment = cc.TEXT_ALIGNMENT_RIGHT;
		arrayOfRoutes[i].rotation = -90;
		*/
		this.addChild(arrayOfRoutes[t]);
		//arrayOfRoutes[i].runAction(cc.fadeIn(1));
		arrayOfRoutes[t].runAction( cc.Sequence(cc.DelayTime(dTime), cc.Spawn(cc.scaleTo(dTime,1,1), cc.fadeIn(dTime))));


		
		
		/*
		var start = data.start;
		var end = data.end;
		var size = cc.winSize;
		var delayInterval = 1;
		var displayDelay = 0;
		for(var i = start; i <= end; i++) {
			//具体行程
			displayDelay += delayInterval;
			//var delay = cc.DelayTime(displayDelay);
			arrayOfDelay[i] = cc.DelayTime(displayDelay);
			
			arrayOfRoutes[i] = new cc.LabelTTF(arrayOfRouteDesc[i], "Arial", 20, cc.size(300, 50));	
			
			arrayOfRoutes[i].x = arrayOfRoutePos[i];
			arrayOfRoutes[i].y = middle+30+arrayOfRoutes[i].getContentSize().width/2;
			arrayOfRoutes[i].opacity = 0;
			arrayOfRoutes[i].color = cc.color("#000000");
			arrayOfRoutes[i].vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM;
			arrayOfRoutes[i].hAlignment = cc.TEXT_ALIGNMENT_RIGHT;
			arrayOfRoutes[i].rotation = -90;
			
			
			this.addChild(arrayOfRoutes[i]);
						
			arrayOfRoutes[i].runAction( cc.Sequence(arrayOfDelay[i], cc.fadeIn(1)));
			
			
			//日期
			arrayOfDates[i] = new cc.LabelTTF(arrayOfDateDesc[i], "Arial", 20);
			arrayOfDates[i].x = arrayOfRoutePos[i];
			arrayOfDates[i].y = middle-30-arrayOfDates[i].getContentSize().width/2;
			arrayOfDates[i].opacity = 0;
			arrayOfDates[i].color = cc.color("#000000");
			arrayOfDates[i].rotation = -90;
			this.addChild(arrayOfDates[i]);
			arrayOfDates[i].runAction( cc.Sequence(arrayOfDelay[i], cc.fadeIn(1)));
			
		}*/
	}
	
});
