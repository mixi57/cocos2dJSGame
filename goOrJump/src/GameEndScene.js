
var GameEndLayer = cc.Layer.extend({
    
    ctor:function (gameResult,time) {
        this._super()
        // cc.log("gameResultgameResult",gameResult,time)
        if(!BUTTON_EVENT){
            BUTTON_EVENT = true
        }
        var size = cc.winSize;
        if(!ADD_HEIGHT){
            ADD_HEIGHT = size.height - 960
        }
        if(!WIN_SIZE){
            WIN_SIZE = size
        }
        var gameBg = new cc.Sprite(res.img_gameBg)
        gameBg.setAnchorPoint(cc.p(0,0))
        // gameBg.x = size.width / 2
        // gameBg.y = size.height / 2
        this.addChild(gameBg)

        var colorWin = new cc.LayerColor(cc.color(211,245,255),WIN_SIZE.width,WIN_SIZE.height)
    
        colorWin.setOpacity(100)
        this.addChild(colorWin,20)

        var showWinBg = new cc.Sprite(res.img_blueBg)
        showWinBg.x = WIN_SIZE.width/2
        showWinBg.y = 486+ADD_HEIGHT
        colorWin.addChild(showWinBg)
     
        var needIcon = false
        var textValue = ""
        if(gameResult){
        // cc.log("ttime2",time)
            if(time <= 120){ 
        // cc.log("ttime",time)
                needIcon = 1
                textValue = "您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点！您以惊人的速度取得了“挑战杯”一座，去炫耀一下吧！"//"您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点，这里是由广东工业大学和香港科技大学联合承办的第14届全国挑战杯决赛现场！您以惊人的速度取得了“挑战杯”一座，去炫耀一下吧！"
            } else if( 120 < time && time <= 180){
                needIcon = 2
                textValue = "您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点！您以较高速度获得“优胜杯”一座，再快一点就能获得“挑战杯”哟！"//"您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点，这里是由广东工业大学和香港科技大学联合承办的第14届全国挑战杯决赛现场！您以较高速度获得“优胜杯”一座，再快一点就能获得“挑战杯”哟！"
            } else if(time>180){
                textValue = "：您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点！加快一下步伐，“挑战杯”等你来取！"//"您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点，这里是由广东工业大学和香港科技大学联合承办的第14届全国挑战杯决赛现场！加快一下步伐，“挑战杯”等你来取！"
            }}else{
                textValue = "您在“勇闯挑战路”上奋战了（"+String(time)+"秒），但还未到达终点，挑战尚未成功，勇者仍需努力！再来挑战吧，我们在第14届全国挑战杯决赛现场等你！"
            }
            if (needIcon){
                var icon = new cc.Sprite(res["img_reward"+needIcon])
                icon.setAnchorPoint(cc.p(0.5,0))
                icon.setScale(0.7)
                icon.x = showWinBg.width / 2
                icon.y = showWinBg.height / 2 + showWinBg.height/2
                showWinBg.addChild(icon)
        // cc.log("www")
            }
    var label = new cc.LabelTTF(textValue,"",28,cc.size(0, 0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP)
    label.setDimensions(showWinBg.width,0)
    label.x = showWinBg.width / 2
    label.y = showWinBg.height / 2  
    label.setColor(cc.color(9,19,153))
    showWinBg.addChild(label)


        var returnBtn = new NewButton(
        	res.img_returenBtn,
        	size.width/2,285,
        	function(){
                var transitions = new cc.TransitionFade(1, new GameStartScene());
                cc.director.runScene(transitions);
            },
        	colorWin
        )

        var shareBtn = new NewButton(
        	res.img_shareBtn,
        	size.width/2,350,
        	this.shareWin,
        	colorWin,
            null,null,null,
            this
        )

        var sponsorInfo = new cc.Sprite(res.img_sponsorInfo)
        sponsorInfo.x = size.width/2
        sponsorInfo.y = 140 
        colorWin.addChild(sponsorInfo)
        
        return true;
    },
    shareWin : function(self){

        self._shareWin = new  cc.LayerColor(cc.color(119,217,251),WIN_SIZE.width,WIN_SIZE.height)
        
        self._shareWin.setOpacity(200)
        self.addChild(self._shareWin,20)

        var shareBg = new cc.Sprite(res.img_shareBg)
        shareBg.y = WIN_SIZE.height/2
        shareBg.x = WIN_SIZE.width/2        
        self._shareWin.addChild(shareBg)

        var shareRewardLabel = new cc.Sprite(res.img_shareLabel)
        shareBg.addChild(shareRewardLabel)
        shareRewardLabel.x = shareBg.width/2
        shareRewardLabel.y = shareBg.height/2

        var shareLabel = new cc.LabelTTF("点击分享","",30)//cc.Sprite(res.img_shareLabel)
        shareLabel.setColor(cc.color(35,98,148))
        shareLabel.x = WIN_SIZE.width - 100
        shareLabel.y = WIN_SIZE.height - 100
        self._shareWin.addChild(shareLabel)

        var arrow = new cc.Sprite(res.img_arrowSign)
        self._shareWin.addChild(arrow)
        arrow.x = WIN_SIZE.width -50
        arrow.y = WIN_SIZE.height-50
        var action1 = cc.rotateTo(0.4, -20);
        var action2 = cc.rotateTo(0.4, 20); 
        var _timeAnimation = cc.sequence(action1, action2);
        arrow.runAction(_timeAnimation.repeatForever()); 
    },
    shareCallBack : function(){
        if(this._shareWin){
            this._shareWin.removeFromParent()
        }
    }
});
var GameEndScene = cc.Scene.extend({
    ctor:function (gameResult,time) {
        // cc.log("enendnenene",gameResult,time)
        this._super();
        var layer = new GameEndLayer(gameResult,time);
        this.addChild(layer,10);
    }
});

