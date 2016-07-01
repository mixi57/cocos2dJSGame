
var GameEndLayer = cc.Layer.extend({
    
    ctor:function (gameResult,time) {
        this._super()

        RegisterShare()
        RecordScore(gameResult,time)
        
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
        this.addChild(colorWin)
        // colorWin.setTouchEnabled(true)
        /*
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {  
                
        
                var target = event.getCurrentTarget();
                                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    // var new_scale = target.getScale() - target._scaleScope;
cc.log("touch me")
                    // target.setScale(new_scale);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {        
                var target = event.getCurrentTarget(); 
                target.removeFromParent()
cc.log("touch end")
                // if(target._callback){
                //     target._callback();                 
                // }
            }, },colorWin);
*/


        var showWinBg = new cc.Sprite(res.img_blueBg)
        showWinBg.x = WIN_SIZE.width/2
        showWinBg.y = 495+ADD_HEIGHT
        colorWin.addChild(showWinBg)
     
        var needIcon = false
        var textValue = "谢谢参与我们的游戏"
        if(gameResult){
        // cc.log("ttime2",time)
            if(time <= 80){ 
        // cc.log("ttime",time)
                needIcon = 1
                textValue = "您历时"+String(time)+"秒成功抵达“勇闯挑战路”终点！您以惊人的速度取得了“挑战杯”一座，去炫耀一下吧！"//"您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点，这里是由广东工业大学和香港科技大学联合承办的第14届全国挑战杯决赛现场！您以惊人的速度取得了“挑战杯”一座，去炫耀一下吧！"
            } else if( 80 < time && time <= 90){
                needIcon = 2
                textValue = "您历时"+String(time)+"秒成功抵达“勇闯挑战路”终点！您以较高速度获得“优胜杯”一座，再快一点就能获得“挑战杯”哟！"//"您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点，这里是由广东工业大学和香港科技大学联合承办的第14届全国挑战杯决赛现场！您以较高速度获得“优胜杯”一座，再快一点就能获得“挑战杯”哟！"
            } else if(time>90){
                textValue = "您历时"+String(time)+"秒成功抵达“勇闯挑战路”终点！加快一下步伐，“挑战杯”等你来取！"//"您历时（"+String(time)+"秒）成功抵达“勇闯挑战路”终点，这里是由广东工业大学和香港科技大学联合承办的第14届全国挑战杯决赛现场！加快一下步伐，“挑战杯”等你来取！"
            }
        }else{
                textValue = "您在“勇闯挑战路”上奋战了"+String(time)+"秒，但还未到达终点，挑战尚未成功，勇者仍需努力！再来挑战吧，我们在第14届全国挑战杯决赛现场等你！"
            }
            var iconName 
            if (needIcon){
                iconName = "img_reward"+needIcon
            } else {
                iconName = "img_badge"
            }
            {
                var icon = new cc.Sprite(res[iconName])
                icon.setAnchorPoint(cc.p(0.5,0))
                // icon.setScale(0.7)
                icon.x = showWinBg.width / 2
                icon.y = 146//572//showWinBg.height / 2 + showWinBg.height/2
                showWinBg.addChild(icon)
        // cc.log("www")
            }
    var label = new cc.LabelTTF(textValue,res.Font_MSYH.name,25,cc.size(0, 0),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP)
    label.setDimensions(showWinBg.width-20,0)
    label.x = showWinBg.width / 2
    label.y = showWinBg.height / 2  
    label.setColor(cc.color(9,19,153))
    showWinBg.addChild(label)


        var returnBtn = new NewButton(
        	res.img_returenBtn,
        	308,//size.width/2,
            311,//285,
        	function(){
                var transitions = new cc.TransitionFade(1, new GameStartScene());
                cc.director.runScene(transitions);
            },
        	colorWin
        )

        var shareBtn = new NewButton(
        	res.img_shareBtn,
        	308,//size.width/2,
            375,//350,
        	this.shareWin,
        	colorWin,
            null,null,null,
            this
        )

        var sponsorInfo = new cc.Sprite(res.img_sponsorInfo)
        sponsorInfo.x = 308//size.width/2
        sponsorInfo.y = 148 
        colorWin.addChild(sponsorInfo)
        // remove tip 0522 
        // this.runAction(cc.sequence(
        //     cc.delayTime(1.5),
        //     cc.callFunc(this.createTipLayer,this))
        // )
        
        return true;
    },
    shareWin : function(self){
        if(!self.shareLabel){
        self.shareLabel = new cc.LabelTTF("点击分享",res.Font_MSYH.name,30)//cc.Sprite(res.img_shareLabel)
        self.shareLabel.setColor(cc.color(35,98,148))
        self.shareLabel.x = WIN_SIZE.width - 100
        self.shareLabel.y = WIN_SIZE.height - 100
        self.addChild(self.shareLabel)

        var arrow = new cc.Sprite(res.img_arrowSign)
        self.addChild(arrow)
        arrow.x = WIN_SIZE.width -50
        arrow.y = WIN_SIZE.height-50
        var action1 = cc.rotateTo(0.4, -20);
        var action2 = cc.rotateTo(0.4, 20); 
        var _timeAnimation = cc.sequence(action1, action2);
        arrow.runAction(_timeAnimation.repeatForever()); 
        }
    },
    createTipLayer : function(){
        var self = this
        self._shareWin = new  cc.LayerColor(cc.color(119,217,251),WIN_SIZE.width,WIN_SIZE.height)
        
        self._shareWin.setOpacity(200)
        // self._shareWin.setScale(0.2)
        // self._shareWin.runAction(cc.fadeTo(3,200))
        self.addChild(self._shareWin,20)

        var shareBg = new cc.Sprite(res.img_shareBg)
        shareBg.y = WIN_SIZE.height/2
        shareBg.x = WIN_SIZE.width/2        
        self._shareWin.addChild(shareBg)

        
        var closeBtn = new NewButton(
            res.img_closeBtn,
            620,//-320,
            935,//-480,
            function(parent){
                parent.removeFromParent()
            },
            this._shareWin
        )

    
    }
});
var GameEndScene = cc.Scene.extend({
    ctor:function (gameResult,time) {
        // cc.log("enendnenene",gameResult,time)
        this._super();
        
        if(gameResult && BEST_SCORE > time){
            time = BEST_SCORE
            RecordWrongGrade()
        }
        var layer = new GameEndLayer(gameResult,time);
        this.addChild(layer,10);
    }
});

