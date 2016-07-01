var GameConfig = {

		goldCup :{
			type : 0,
			speed : 300,
			dropInterval : 2
		},
		silverCup :{
			type : 1,
			speed : 140, 
			dropInterval : 3
		},
		copperCup :{
			type : 2,
			speed : 400,
			dropInterval : 3
		},
		flower :{
			type : 3,
			speed : 150,
			dropInterval : 3
		},
		wood :{
			type : 4,
			speed : 160,
			dropInterval : 3
		},
		clock :{
			type : 5,
			speed : 300,
			dropInterval : 3
		},
	
		levelTime : 60,
		
		level:{
			goldSpeed:[],
	        silverSpeed:[],
	        copperSpeed:[],
	        flowerSpeed:[],
	        woodSpeed:[],
	        clockSpeed:[],
			targetPoint:[]
		},
		buttonType :{
			kPauseGame : 0,
			kStartGame : 1,
			kRestartGame : 2,
			kShare : 3,
			kShareTip : 4,
			kContinue : 5
		} 
}
