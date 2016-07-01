var res = {
		
		Icon_png : "res/click_circle.png",
		Arrow_png : "res/v.png",
		
		ScrollPainting1_png : "res/scrollPainting1.png",
		ScrollPainting2_png : "res/scrollPainting2.png",
		ScrollDesc1_png : "res/scrollDesc1.png",
		ScrollDesc2_png : "res/scrollDesc2.png",
		ScrollDesc3_png : "res/scrollDesc3.png",
		ScrollDesc4_png : "res/scrollDesc4.png",
		
		Timeline1_png : "res/timeline1.jpg",
		Timeline2_png : "res/timeline2.jpg",
		Timeline3_png : "res/timeline3.jpg",
		Timeline4_png : "res/timeline4.jpg",
		Boat_png : "res/boat.png", 
		
		
		LocationLogo_png : "res/locationLogo.png",
		ChinaMap_png : "res/mapOfChina.png",
		SingaporeMap_png : "res/mapOfSingapore.png",
		AmericaMap_png : "res/mapOfAmerica.png",
		JapanMap_png : "res/mapOfJapan.png",
		
		MaskMap_png : "res/mapMask.png",
		LocationBg_png : "res/locationBg.png",
		
		BigPhotoDesc1_png : "res/bigPhotoDesc1.png",
		BigPhotoDesc2_png : "res/bigPhotoDesc2.png",
		
		
		
		PhotoWall_png : "res/photoWall.jpg",
		PhotoWallBg_png : "res/photoWallBg.jpg",
		PhotoDesc_png : "res/photoDesc.png",
		PresidentPhoto1_png : "res/presidentPhoto1.jpg",
		PresidentPhoto2_png : "res/presidentPhoto2.jpg",
		PresidentPhoto3_png : "res/presidentPhoto3.jpg",
		
		Book1_png : "res/book1.png",
		Book2_png : "res/book2.png",
		Book3_png : "res/book3.png",
		Book4_png : "res/book4.png", 
		Book5_png : "res/book5.png", 
		Book6_png : "res/book6.png",
		
		
		
		FlamingoLogo_png : "res/flamingoLogo.png", 
		
		Page1_png : "res/1.jpg",
		Page6_png : "res/6.jpg",
		Page7_png : "res/7.jpg",
		Page9_png : "res/9.jpg",
		Page10_png : "res/10.jpg",
				
		BM_font : "res/font/hk.fnt" ,
		BM_font_png : "res/font/hk_0.png" ,

		label_p2 : "res/label_p2.png",
		Appendix_jpg : "res/appendix.jpg",
			//,
		// BM_font_bmfc : "res/font/hk.bmfc"
		/*
		Font_1: 
    {
        type:"font",
        name:"xingkai",
        srcs:["res/fonts/xingkai.ttf"]
    },
    Font_2:
    {
        type:"font",
        name:"comic",
        srcs:["res/fonts/comic.ttf"]
    },
    Font_3:
    {
        type:"font",
        name:"private_bold",
        srcs:["res/fonts/private_bold.ttf"]
    },
    */
    // Font_4:
    //     {
    //     type:"font",
    //     name:"CourierNew",//"res/fonts/Courier New.eot",
    //     srcs:[ "res/fonts/Courier New.eot"]
    // },
    
    // Font_5:
    //     {
    //     type:"font",
    //     name:"Xingkaittc",//"res/fonts/Courier New.eot",
    //     srcs:[ "res/fonts/Courier New.ttf"]
    // },

};



var g_resources = [
        {
        type:"font",
        name:"Xingkaittc",//"res/fonts/Courier New.eot",
        srcs:[ "res/fonts/xingkai.ttf"]
    },

];
for (var i in res) {
	g_resources.push(res[i]);
}