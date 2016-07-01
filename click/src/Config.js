var g_Config={
		WordType : [
		            ["挑","垗","珧","桃","趒",
		             "晀","眺","跳","铫","佻","逃","狣","朓","脁",
		             "姚","誂","罀","筄","铫","兆",
		             "庣","洮","恌","宨","烑","祧","窕"
		             ],
		             ["战","站","店","玷","坫","砧","枮","苫","拈","钻",
		              "阽","詀","痁","沾","粘","贴","怗","乩","敁","觇","帖","鲇"],
		             ["杯","坏","怀","还","环","盃","柸","钚","鈈","吥"],
		            ],
	    WordPicType : [
	                   res.Pic_Tiao,
	                   res.Pic_Zhan,
	                   res.Pic_Bei
	                   ], 
	    WordSmallPicType : [
	                   res.Pic_Tiao_small,
	                   res.Pic_Zhan_samll,
	                   res.Pic_Bei_small,
	                   ],            
		n : 9,
		Horizontal_Margin : 5,
		Gap : 5,
		// 计时器
		Time : 60,
		Level_bg : [
		            cc.color(207, 230, 237),
		            cc.color(136, 202, 227),
		            cc.color(116, 192, 221),
		            cc.color(96, 180, 212),
		            cc.color(67, 149, 188),
		            cc.color(35, 114, 155),
		            cc.color(18, 93, 136),
		            cc.color(11, 68, 104),
		            cc.color(11, 68, 104),
		            ],
		            
		EndGameBgColor : cc.color(253,200,1),
		LevelType : {
			Godlike : 0,
			Master : 1,
			NotBad : 2,
			Rookie : 3
		},
		ScoreScope : [
		              [0,15],
		              [15,30],
		              [30,40],
		              [40,100]
		              ],
		LevelLogo : [ res.Logo_GodLike, res.Logo_Good, res.Logo_Better, res.Logo_Easy ],
		TitleLevel : [ "挑战神人", "挑战达人", "挑战能手", "挑战新手" ],
		CurrentLayerTag : {
			StartGame :0,
			MainGame : 1,
			PauseGame :2,
			EndGame : 3
		}
		
};
