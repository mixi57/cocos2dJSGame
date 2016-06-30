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
	"2011年\n3月3日",
	"2011年3月4日",
	"2011年3月8日",
	"2011年4月9日",
	"2012年1月15日",
	"2012年1月17日",
	"2012年1月18日",
	"2012年5月26日",
	
	"2012年5月27日",
	"2012年5月28日",
	"2012年10月22日",
	"2012年10月22日",
	"2012年10月23日",
	"2012年10月24日",
	"2012年10月26日",
	"2012年10月27日",
	"2012年11月1日",
	"2013年1月7日",
	"2013年3月12日",
	"2013年3月12日", 
	
	"2013年3月14日",
	"2013年4月5日",
	"2013年\n4月11日",
	"2013年\n4月18日",
	"2014\n年\n1月\n7日",
	"2014\n年\n1月\n13日",
	"2014年\n1月14日",
	"2014年1月18日",
	"2014年2月16日",
	"2014年2月17日",
	"2014年2月28日",
	"2014年3月4日",
	
	"2014年\n3月2日",
	"2014年\n3月17日",
	"2014年\n3月18日",
	"2015年1月5日",
	"2015年1月7日",
	"2015年1月21日",
	"2015年1月22日",
	"2015年1月22日"
     ];


var arrayOfRouteDesc = [
	"在北京访问中国人民大学校长纪宝成校长",
	"在长沙访问中南大学黄伯云校长",
	"在北京访问哈尔滨工业大学王树国校长",
	"在北京访问中国农业大学瞿振元书记",
	"在北京访问武汉大学原党委书记、校长顾\n海良",
	"在北京访问北京师范大学钟秉林校长",
	"在兰州访问兰州大学原校长李发伸",
	"在香港访问香港城市大学程\n星协理副校长",
	"在新加坡访问新加坡南\n洋理工大学余明华\n副校长",
	"在新加坡访问新加坡\n南洋理工学院林靖东\n院长",
	"在广州访问香港大学\n前副校长李焯芬",

	
	"在广州访问香港浸会大\n学陈新滋校长",
	"在澳门访问澳门大学赵伟校长",
	"在美国宾夕法尼亚州访问尤西纽斯学\n院黄伊侣校长",
	"在美国费城访问天普大学戴海龙校长",	
	"在美国马里兰州访问马里兰大学\n原校长牟德",
	"在美国马里兰州访问台湾中央大学院校\n长刘全生",
	"在美国迈阿密访问圣托马斯大学\n陈思齐校长",
	"在美国休斯敦访问香港科技大学\n原校长朱经武",
	"在湖南常德临澧访问马萨诸\n塞大学波斯顿分校夏宗国\n副校长",
	"在洛阳给河南科技大学讲课",
	"在日本京都访问立命馆大学\n长田丰臣理事长",
	"在日本京都访问京都大学松\n本紘校长",
	
	
	"在日本东京访问早稻田大学桥本\n周司常务副校长",
	"在上海访问上海交通大学校长张杰校长",
	"在北京访问清华大学生命科学学院施一公\n院长",
	"在北京访问北京大学生命科学学院饶毅院长",
	"在河南开封调研河南大学",
	"在海口给海南医学院讲课",
	"在昆明访问云南工商学院李孝轩董事长",
	"在重庆访问重庆科技学院严欣平院长",
	"在海南三亚调研三亚城市职业技术\n学院",
	"在广西钦州调研钦州学院",
	"在安徽合肥访问合肥学院蔡\n敬民书记",
	"在江苏南京访问南京工程学\n院孙玉坤院长",
	"在广州给广东技术师范学院讲课",
	
	"在江苏徐州访问徐州工程学院韩宝平院长",
	"在四川宜宾访问宜宾学院汪明义院长",
	"在四川成都访问成都（大学）学院周激流院长",
	"在苏州调研西交利物浦大学",
	"在浙江绍兴给浙江越秀外国语学\n院讲课",
	"在河北邢台给河北机电职\n业技术学院讲课",
	"在河南许昌访问许昌学\n院陈建国院长",
	"在河南许昌给许昌学院\n讲课"
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
	scrollView:null,
	boat:null,
	ctor:function(){
		this._super();
		 
		var size = cc.size(1136, 640);//cc.winSize;
		
		this.scrollView = new ccui.ScrollView();
		this.scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
		this.scrollView.setTouchEnabled(false);
		this.scrollView.setContentSize(size);
		this.scrollView.x = 0;
		this.scrollView.y = 0;
		this.addChild(this.scrollView);
		this.scrollView.setInnerContainerSize(cc.size(1136*4, 640));
		
		//4张时间轴背景图
		var timeline1 = new cc.Sprite(res.Timeline1_png);
		timeline1.attr({ 
			x : size.width/2,
			y : size.height/2
		});
		var timeline2 = new cc.Sprite(res.Timeline2_png);
		timeline2.attr({
			x : size.width + size.width/2,
			y : size.height/2
		});
		var timeline3 = new cc.Sprite(res.Timeline3_png);
		timeline3.attr({
			x : size.width*2 + size.width/2,
			y : size.height/2
		});
		var timeline4 = new cc.Sprite(res.Timeline4_png);
		timeline4.attr({
			x : size.width*3 + size.width/2,
			y : size.height/2
		});
		this.scrollView.getInnerContainer().addChild(timeline1);
		this.scrollView.getInnerContainer().addChild(timeline2);
		this.scrollView.getInnerContainer().addChild(timeline3);
		this.scrollView.getInnerContainer().addChild(timeline4);
		
		//小船
		this.boat = new cc.Sprite(res.Boat_png);
		this.boat.attr({ 
			x : 53,
			y : 235
		});
		this.scrollView.getInnerContainer().addChild(this.boat);
		//this.boat.setVisible(false);
		
			
		
		return true;
	},
	
	doAnimation:function(){
		var arrayOfBoatPos = [{x:143, y:189},
		                      {x:230, y:159},
		                      {x:320, y:144},
		                      {x:405, y:138},
		                      {x:493, y:149},
		                      {x:589, y:185},
		                      {x:679, y:238},
		                      {x:767, y:308},
		                      {x:860, y:366},
		                      {x:945, y:390},
		                      {x:1031, y:393},
		                      {x:1137, y:353},
		                      {x:1226, y:283},
		                      {x:1326, y:224},
		                      {x:1409, y:199},
		                      {x:1516, y:189},
		                      {x:1613, y:198},
		                      {x:1706, y:219},
		                      {x:1815, y:264},
		                      {x:1910, y:302},
		                      {x:2009, y:325},
		                      {x:2088, y:322},
		                      {x:2180, y:305},
		                      
		                      {x:2341, y:191},
		                      {x:2423, y:137},
		                      {x:2506, y:99},
		                      {x:2620, y:80},
		                      {x:2741, y:97},
		                      {x:2845, y:153},
		                      {x:2936, y:235},
		                      {x:3009, y:282},
		                      {x:3095, y:309},
		                      {x:3196, y:302},
		                      {x:3308, y:247},

		                      {x:3439, y:155},
		                      {x:3523, y:133},
		                      {x:3605, y:148},
		                      {x:3688, y:192},
		                      {x:3765, y:281},
		                      {x:3855, y:347},
		                      {x:3933, y:368},
		                      {x:4015, y:355}
		                      
		                      ]; 
		
		var arrayOfRoutes = [];
		var arrayOfDates = []; 
		
		//this.boat.setVisible(true);
		
		var t = 1;
		var v = 90;
		var deltaV = 5;
		var deltaT = 0.5; //没行字出现的时间
		for(var i = 0; i < arrayOfBoatPos.length; ++i){
			v += deltaV;  //速度
			if(i == 0)
				deltaT = 90/v;
			else
				deltaT = (arrayOfBoatPos[i].x - arrayOfBoatPos[i-1].x)/v;
			//小船移动 
			this.boat.runAction(cc.sequence(
					cc.delayTime(t), 
					cc.moveTo(deltaT, cc.p(arrayOfBoatPos[i].x, arrayOfBoatPos[i].y))				
			));
			//日期
			arrayOfDates[i] = new cc.LabelTTF(arrayOfDateDesc[i], res.XingKai_ttf, 20);
			arrayOfDates[i].attr({
				x : arrayOfBoatPos[i].x+42, //arrayOfRoutePos[i],
				y : arrayOfBoatPos[i].y-arrayOfDates[i].getContentSize().width/2-27,//middle-30-arrayOfDates[i].getContentSize().width/2, 
				color : cc.color("#000000"),
				rotation : -90,
				scale : 0.5,
				opacity : 0
			});
			this.scrollView.getInnerContainer().addChild(arrayOfDates[i]);
			arrayOfDates[i].runAction(cc.sequence(
					cc.delayTime(t), 
					cc.spawn(cc.fadeIn(deltaT), cc.scaleTo(deltaT, 1, 1))					
			));
			//具体行程
			arrayOfRoutes[i] = new cc.LabelTTF(arrayOfRouteDesc[i], "Arial", 20, cc.size(390, 24));	
			arrayOfRoutes[i].attr({
				x : arrayOfBoatPos[i].x+42,//arrayOfRoutePos[i],
				y : arrayOfBoatPos[i].y+arrayOfRoutes[i].getContentSize().width/2+27,//middle+30+arrayOfRoutes[i].getContentSize().width/2,		
				color : cc.color("#000000"),
				rotation : -90,
				scale : 0.5,
				opacity : 0 
			});
			this.scrollView.getInnerContainer().addChild(arrayOfRoutes[i]);
			arrayOfRoutes[i].runAction(cc.sequence(
					cc.delayTime(t), 
					cc.spawn(cc.fadeIn(deltaT), cc.scaleTo(deltaT, 1, 1))					
			));
			if(i > 10){
				this.runAction(cc.sequence(
						cc.delayTime(t), 
						cc.callFunc(this.scrollTo, this, {x : arrayOfBoatPos[i].x, t:deltaT})				
				));
				//this.scrollView.scrollToPercentHorizontal((arrayOfBoatPos[i].x+500)/(1136*4)*100, deltaT, false);
			}
			t += deltaT; 
			
		}
		
	    //this.scrollView.scrollToRight( 2, false);
		//this.scrollView.scrollToPercentHorizontal(50, 3, false);
		
//		for(var i = 0; i < arrayOfBoatPos.length; ++i){
//			cc.log("{x:%d, y:%d},", arrayOfBoatPos[i].x+1136*3, arrayOfBoatPos[i].y);
//		}
//		this.timeline.runAction(cc.sequence(
//				cc.progressTo(1, 100), 
//				cc.DelayTime(0.5),
//				cc.CallFunc(this.setRoutes, this, {dates:arrayOfDates, routes:arrayOfRoutes, start:start, end:end})
//		));
	}, 
	scrollTo:function(nodeExecutingAction, data){
		this.scrollView.scrollToPercentHorizontal((data.x+50)/(1136*4)*100, data.t, false);
	}, 
	  
	setRoutes:function(nodeExecutingAction, data){
		
		var dTime = 1;  //放大并淡出的时间
		var t = 0; 
		var arrayOfDates = data.dates;
		var arrayOfRoutes = data.routes;
		var start = data.start;
		var end = data.end;
		for(var i = start; i <= end; ++i){
			
			
			
			
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
			this.addChild(arrayOfDates[t]);

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
			this.addChild(arrayOfRoutes[t]);
			++t;
		}
		for (var i = 0; i < arrayOfDates.length; ++i) {
			arrayOfDates[i].runAction(cc.Spawn(cc.scaleTo(dTime,1,1),cc.fadeIn(dTime)));
			arrayOfRoutes[i].runAction(cc.Spawn(cc.scaleTo(dTime,1,1), cc.fadeIn(dTime)));
		}
	}
	
});
