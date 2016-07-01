// player 玩家模型
var _jumpTypeArray = [
    // time ,jumpMaxTalk,talk 
    [1,0],
    [1,100]
]
var jumpActionTimes = 0
var playerMoveTimes = 0
var playerModel = cc.Node.extend({
    _isPlayerMove : null,
    _moveActionCache : null,
    _playerPos : null,
    _isDie : null,
    _nowStep : null,
    _lastStep : null,
    _oldPos : null,
    _actionPlayer : null,
    _actionAnimation : null,
    _jumpActionAnimation : null,
    _jumpPlayer : null,

    ctor : function(){
        this._super()
        _isPlayerMove = false
        _moveActionCache = new Array()
        _isDie = false
        _nowStep = -1
        _lastStep = -1
        _oldPos = cc.p(-1,-1)
        _actionPlayer = null
        _actionAnimation = null
        _jumpPlayer = null

        this.addPlayer()

        return true
    },

    jumpAction : function(type,jumpActionStepNum){
        cc.log("jumpAction",jumpActionTimes)
        jumpActionTimes = jumpActionTimes + 1
    	if (_isPlayerMove) {
            _moveActionCache.push([type,jumpActionStepNum])
            cc.log("人物正在动",playerMoveTimes,type,jumpActionStepNum)
            return
    	};
        cc.log(",type,stepNum",type,jumpActionStepNum)

    	var time = MOVE_TIME//_jumpTypeArray[type][0]
    	var talk = _jumpTypeArray[type][1]

        _nowStep = jumpActionStepNum

        if (_nowStep == 0){
            cc.log("死定了")
            _isDie = true

            cc.director.getRunningScene()._gameLayer.removeActionCache()
        }

        _oldPos = this.getPosition()

        var newPosX,newPosY
        if (jumpActionStepNum == 0){
            newPosY = -100
            talk =  _oldPos.y - 100
            newPosX = _oldPos.x + MAPLAYER_LINE_DISTANCE * ((type + 1) * 2)
        } else {
            newPosY = MAPLAYER_LOWER_HEIGHT + (0.5 + jumpActionStepNum) * MAPLAYER_STEP_HEIGHT
            newPosX = _oldPos.x
        }
        
        _isPlayerMove = true
        this.goAction(type)
    	this.runAction(cc.sequence(
            cc.jumpTo(time, cc.p(newPosX,newPosY), talk, 1),
            cc.delayTime(0.02),
            cc.callFunc(this.jumpActionCallFun,this)))
        //(cc.moveBy(1.0,10,0))
                

    },
    jumpActionCallFun : function(){
        cc.log("动完",playerMoveTimes)
        playerMoveTimes++
        _isPlayerMove = false 
        this.stopAllActions()
        cc.log("laststep ",_lastStep,_nowStep)
        if (_nowStep == 0 ){
           // cc.log("死定了")
           //  _isDie = true

            _moveActionCache.splice(0,_jumpTypeArray.length)
            _actionPlayer.setOpacity(0)
            // this.setColor(cc.color(100,100,100))
            this.setPosition(cc.p(_oldPos.x,MAPLAYER_LOWER_HEIGHT + (0.5 + _lastStep) * MAPLAYER_STEP_HEIGHT))
            this.runAction(cc.sequence(
                cc.delayTime(2.5),
                cc.callFunc(function(){
                    _actionPlayer.setOpacity(100)
                }),
                // cc.fadeTo(1,5),
                // cc.tintTo(1,255,255,255),
                cc.blink(0.5,5),
                cc.callFunc(this.revertLife,this)
                ))
            return
        } else {
            _lastStep = _nowStep
        }

        this.getParent().actionCallFunc()

        // this.setPosition(_oldPos)
        if (_moveActionCache.length > 0) {
            var cacheInfo = _moveActionCache.shift()
            this.jumpAction(cacheInfo[0],cacheInfo[1])
        };
    },
    getLifeInfo : function(){
    	return !_isDie;
    },
    revertLife : function(){
        _isDie = false;
        _actionPlayer.setOpacity(255)
    },
    getPlayerMoveState  : function(){
        return _isPlayerMove
    },
    addPlayer : function(){
        var winSize = cc.winSize

var spriteFrameCache = cc.spriteFrameCache;

        spriteFrameCache.addSpriteFrames(res.playerList)
        cc.log("res.playerList",res.playerList,res.playerJumpList)
        spriteFrameCache.addSpriteFrames(res.playerJumpList)

        var ss = new cc.Sprite("#boywalk01.png")//("#grossini_dance_01.png");
        ss.x = 20//ss.width/6 // 70//winSize.width / 2 - 80;
        ss.y = -16;
        ss.setAnchorPoint(cc.p(0.5,0))

        var spritebatch = new cc.SpriteBatchNode(res.playerPng)//s_grossini);
        spritebatch.addChild(ss);
        this.addChild(spritebatch);

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i <= 6; i++) {
            str = "boywalk" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        str = "boywalk01.png";
        frame = spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);

        _actionAnimation = new cc.Animation(animFrames, MOVE_TIME/animFrames.length);
        _actionAnimation.retain()
        _actionPlayer = ss

        /*
        var jumpAnimFrames = []
        for (var i = 1; i <= 4; i++) {
            str = "boyjumpjian" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = spriteFrameCache.getSpriteFrame(str);
            jumpAnimFrames.push(frame);
        }
        str = "boyjumpjian01.png"
        frame = spriteFrameCache.getSpriteFrame(str);
        jumpAnimFrames.push(frame);

        _jumpActionAnimation = new cc.Animation(jumpAnimFrames, MOVE_TIME/jumpAnimFrames.length);
        _jumpActionAnimation.retain()

        _jumpPlayer = new cc.Sprite("#boyjumpjian01.png")//(res.playerJumpPng)//("#boyjumpjian01.png")//("#grossini_dance_01.png");
        _jumpPlayer.x = 38//100//_jumpPlayer.width/6 // 70//winSize.width / 2 - 80;
        _jumpPlayer.y = -2//-16//70;
        _jumpPlayer.setAnchorPoint(cc.p(0.5,0))
        // _jumpPlayer.setColor(cc.color(255,0,0))
        _jumpPlayer.setVisible(false) //setOpacity(0)


        var jumpSpritebatch = new cc.SpriteBatchNode(res.playerJumpPng)//s_grossini);
        jumpSpritebatch.addChild(_jumpPlayer);
        this.addChild(jumpSpritebatch);
        // _jumpPlayer.runAction(cc.animate(_jumpActionAnimation
        //     ))
*/
    },
    goAction : function(type){
        cc.log("goAction",type)
        _actionPlayer.runAction(cc.animate(_actionAnimation));
        /*
        switch(type){
            case 0:
            _actionPlayer.setVisible(true)//setOpacity(255)
            _jumpPlayer.setVisible(false)//setOpacity(0)
            _actionPlayer.runAction(cc.animate(_actionAnimation));

            break;
            case 1:
            _actionPlayer.setVisible(false) //setOpacity(0)
            _jumpPlayer.setVisible(true) //setOpacity(255)
            _jumpPlayer.runAction(
                cc.sequence(
                cc.animate(_jumpActionAnimation),
                cc.callFunc(function(){
                    _actionPlayer.setVisible(true)//setOpacity(255)
                    _jumpPlayer.setVisible(false)//setOpacity(0)
                })
                )
            );
            break;
        }
        */
    }
}) 