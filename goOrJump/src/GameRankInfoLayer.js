
var GameRankInfoLayer = cc.Layer.extend({
    ctor:function () {
        this._super()
        RegisterShare()
        var bg = new cc.Sprite(res.img_gameInfoBg)
        this.addChild(bg)

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch,event){
                // log("touch point ")
                return true
            }
            },
        bg);


        var infoBg = new cc.Sprite(res.img_rankInfoBg)
        infoBg.y = 60
        this.addChild(infoBg)

        var closeBtn = new NewButton(
            res.img_closeBtn,
            (620-320)* (WIN_SIZE.width/DefultSize.width),
            935-480,
            function(parent){
                parent.removeFromParent()
            },
            this
        )
        
        // GetPlayerInfo(function(json,self){
        //     var data = json.data
        //     var parent = self
        //     PLAYER_RATIO = data.ratio
        //     PLAYER_RANK = data.rank
        //     PLAYER_CCUP_NUM = data.num_ccup
        //     PLAYER_TCUP_NUM = data.num_tcup
        //     PLAYER_MIN_TIME = data.min_playtime 

        //     if(!PLAYER_MIN_TIME ||PLAYER_MIN_TIME<30){
        //         PLAYER_MIN_TIME = "无"
        //     }

            var ccupLabel = new cc.LabelTTF(GetValidValue(PLAYER_CCUP_NUM)+"个",res.Font_MSYH.name,30)
            this.addChild(ccupLabel)
            ccupLabel.setAnchorPoint(cc.p(0,0.5))
            ccupLabel.x = 80
            ccupLabel.y = 240

            var tcupLabel = new cc.LabelTTF(GetValidValue(PLAYER_TCUP_NUM)+"个",res.Font_MSYH.name,30)
            this.addChild(tcupLabel)
            tcupLabel.x = 80
            tcupLabel.y = 120
            tcupLabel.setAnchorPoint(cc.p(0,0.5))

            var bestLabel = new cc.LabelTTF("",res.Font_MSYH.name,30)
            this.addChild(bestLabel)
            bestLabel.x = 80
            bestLabel.y = 0
            bestLabel.setAnchorPoint(cc.p(0,0.5))
            var text = GetValidValue(PLAYER_MIN_TIME)
            if (Number(text)>=0){
                text = String(text)+"秒"
            } else {
                text = "无"
            }
            bestLabel.setString(text)
 

            var rankLabel = new cc.LabelTTF("",res.Font_MSYH.name,30)
            this.addChild(rankLabel)
            rankLabel.x = 80//640/2
            rankLabel.y = -120
            text = GetValidValue(PLAYER_RANK)
            if (Number(text)){
                text = String(text)+"名" 
            } 
            // if(PLAYER_RATIO){
            //     text = text + "text" + String(PLAYER_RATIO)
            // }

            rankLabel.setString(text)
            rankLabel.setAnchorPoint(cc.p(0,0.5))
            cc.log("22text ",text)

        // })

        return true;
    },
 
});


