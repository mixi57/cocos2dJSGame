// GameScene 
var MOVE_TIME = 0.25
var WIN_SIZE
var BEST_SCORE 
var gameLayer = cc.Layer.extend({
    sprite:null,
    _playerModel : null,
    _mapLayer : null,
    _gradeLabel : null,
    _timeLabel : null,
    _time : null,
    _grade : null,
    _moveDisGather : null,

    _touchActionCache : null,
    _stopBtn : null,
    _colorWin : null,

    _stopGame : null,

    _allTime : null,
    _startGame : null,

    _leftBtn : null,
    _rightBtn : null,
    ctor:function () {

        this._super();
        RegisterShare()
        var size = cc.winSize;
        if(!ADD_HEIGHT){
            ADD_HEIGHT = size.height - 960
        }
        if(!WIN_SIZE){
            WIN_SIZE = size
        }
        if(!BUTTON_EVENT){
            BUTTON_EVENT = true
        }
        if(!BEST_SCORE){
            // BEST_SCORE = MOVE_TIME * (mapInfoTable.length -1)
            //搜索最短路径
            // var shorterLine = ""
            var btnTimes = 0
            for(var i = 0; i < mapInfoTable.length-1 ;i++){
                if( mapInfoTable[i+1] > 0 ){
                    if(mapInfoTable[i+2] > 0){      
                        cc.log(i+" jump")
                        i++
                        btnTimes++
                    } else{
                        cc.log(i+" go")
                        btnTimes++
                    } 
                } else {
                    
                    cc.log(i+"jump")
                    i++
                    btnTimes++
                }
            }
            BEST_SCORE = MOVE_TIME * btnTimes
            cc.log("best score "+BEST_SCORE+" ",btnTimes,mapInfoTable.length -1)
        }
       
        _time = 30.0
        _grade = 0
        _moveDisGather = 0
        _stopGame = false
        _allTime = 0
        _startGame = false

        _touchActionCache = new Array()

        _mapLayer = new mapLayer()
        this.addChild(_mapLayer)

        _mapLayer.setAddTimeFunc(this.addTime)
        _mapLayer.setAddGradeFunc(this.addGrade)

        _playerModel = new playerModel()
        // _playerModel.setAnchorPoint(cc.p(0.5,0.5))
        // _playerModel.x = 
        _playerModel.y = MAPLAYER_LOWER_HEIGHT + 1.5 * MAPLAYER_STEP_HEIGHT
        // _playerModel.setAnchorPoint(cc.p(0.5,0))
        this.addChild(_playerModel)

        _leftBtn = new NewButton(
            res.img_goBtn,
            (73 + 0.5*MAPLAYER_LINE_DISTANCE)* (WIN_SIZE.width/DefultSize.width) ,
            120,
            this.goEvent,
            this
        )
        _leftBtn.rotation = 90 
        // _leftBtn.setScale(1.5)
        _rightBtn = new NewButton(
            res.img_jumpBtn,
            (571 - 0.5*MAPLAYER_LINE_DISTANCE)* (WIN_SIZE.width/DefultSize.width),
            120,
            this.jumpEvent,
            this
        )
        // _rightBtn.setScale(1.5)

        // var leftBtn = new ccui.Button()
        // leftBtn.setTouchEnabled(true)
        // leftBtn.loadTextures(res.img_goBtn, "", "")
        // leftBtn.x = size.width / 6.0;
        // leftBtn.y = 100 //size.height / 4.0;
        // leftBtn.addTouchEventListener(this.goEvent, this);
        // this.addChild(leftBtn);

        // var rightBtn = new ccui.Button()
        // rightBtn.setTouchEnabled(true)
        // rightBtn.loadTextures(res.img_jumpBtn, "", "")
        // rightBtn.x = size.width / 6.0*5;
        // rightBtn.y = 100 //size.height / 4.0;
        // // rightBtn.rotation = 90
        // rightBtn.addTouchEventListener(this.jumpEvent, this);
        // this.addChild(rightBtn);

        _gradeLabel = new NewButton(
            res.img_orangeBtn,
            107 * (WIN_SIZE.width/DefultSize.width),
            908,
            null,
            this,
            "0km",
            cc.color(255,77,0),
            30            
        )

        _timeLabel = new NewButton(
            res.img_orangeBtn,
            350 * (WIN_SIZE.width/DefultSize.width),
            908,
            null,
            this,
            "30.0s",
            cc.color(255,77,0),
            30            
        )

        _stopBtn = new NewButton(
            res.img_stopBtn,
            602 * (WIN_SIZE.width/DefultSize.width),
            908,
            this.stopEvent,
            this
        )

        this.schedule(this.updateTimeLabel,0.1)
        // this.schedule(this.updateGradeLabel,MOVE_TIME)

        return true;
    },
    goEvent:function(self){
        if(!_startGame){
            _startGame = true
        }
        if(_playerModel.getLifeInfo()){
            self.judgeState(0)                    
        } else{
            self.removeActionCache()
        }
        // sender.setScale9Enabled(!sender.isScale9Enabled());
        // sender.setContentSize(200,100);
    }, 
    jumpEvent:function(self){
        if(!_startGame){
            _startGame = true
        }
        if(_playerModel.getLifeInfo()){
            self.judgeState(1)                  
        }else{
            self.removeActionCache()
        }
    },   

    stopEvent:function(parent){
        // cc.Director.getInstance().pause(); 
        _stopGame = true
    // parent.unschedule(parent.updateTimeLabel)
    // parent.unschedule(parent.updateGradeLabel)
    // cc.Director.getInstance().getActionManager().pauseTarget(_mapLayer)
    // cc.Director.getInstance().getActionManager().pauseTarget(_playerModel)

        parent.showStopWin()
    // cc.Director.getInstance().getActionManager().resumeTarget(img) 
    },
    updateGradeLabel : function(){
        if (_grade == mapInfoTable.length -1){
            this.gameOver(true)
        }
        if(_gradeLabel){
    	   _gradeLabel.setTitleText(String(_grade)+"km")
        }
    },
    updateTimeLabel : function(){ 
        if(!_stopGame && _startGame){
            _time = _time - 0.1
            _time = Math.round(_time*10)/10.0 
            // cc.log("time2",_time,_allTime)
 
            _allTime += 0.1
            _allTime = Math.round(_allTime*10)/10.0 
    
            if(_time - 0 < 0.1){
                this.gameOver(false)
            }
            if(_timeLabel){
                var zero = ""
                if (_time*10%10==0) {
                    zero = ".0"
                };
                _timeLabel.setTitleText(String(_time)+zero+"s")
            }
        }
    }, 
    addTime : function(timeNums){
        _time += timeNums
    },
    addGrade : function(grade){
        _grade += grade
        cc.director.getRunningScene()._gameLayer.updateGradeLabel()
    },

    judgeState : function(btnType){
// cc.log("judgeState",_playerModel.getPlayerMoveState(),_mapLayer.getMapMoveState())
        if(_playerModel.getPlayerMoveState() || _mapLayer.getMapMoveState()){
            _touchActionCache.push(btnType)
            // cc.log("judgeState cahce")
            return false
        }
    // cc.log("judgeState event")
        this.pushEvent(btnType)
    },
    pushEvent : function(btnType){

        switch(btnType){
            case 0 : // left go
        
                    var stepNums = _mapLayer.getPlayerStepNumsByNextPos(_moveDisGather+1)
                    cc.log("GameScene 0",_moveDisGather+1,stepNums)
                    _playerModel.jumpAction(0,stepNums)

                    if (stepNums>0){
                        _mapLayer.scrollLineNum(1)
                        _moveDisGather += 1
                    } else {
                        _mapLayer.removeCache()
                    }
            break
            case 1 : // right jump 
                    

                    var stepNums = _mapLayer.getPlayerStepNumsByNextPos(_moveDisGather+2)
                    cc.log("GameScene 1",stepNums)

                    _playerModel.jumpAction(1,stepNums)//_playerModel.runAction(cc.jumpBy(1, cc.p(0, 0), 50*2, 1))
                    
                    if(stepNums>0){
                        _mapLayer.scrollLineNum(2)
                        _moveDisGather += 2
                    } else {
                        _mapLayer.removeCache()
                    }

            break
        }
    },

    actionCallFunc : function(){
        if(_playerModel.getPlayerMoveState()==false && _mapLayer.getMapMoveState()==false){
            if(_touchActionCache.length>0)
            {
                // cc.log("actionCallFuncactionCallFuncactionCallFunc")
                var type = _touchActionCache.shift()
                this.pushEvent(type)
            }
        }
    },
    removeActionCache : function(){
        cc.log("removeActionCacheremoveActionCache")
        _touchActionCache.splice(0,_touchActionCache.length)
    },
    gameOver : function(gameResult){
        BUTTON_EVENT = false
        // 移除动作的缓存
        this.removeActionCache()
        _leftBtn.setTouchEnabled(false)
        _rightBtn.setTouchEnabled(false)
        this.unschedule(this.updateTimeLabel)
        // this.unschedule(this.updateGradeLabel)
    // cc.log("_allTime_allTime_allTime",_allTime,gameResult)
    // var gatherTime = _allTime
    
        var deleyTime = gameResult ? 3 : MOVE_TIME
        this.runAction(cc.sequence(
            cc.delayTime(deleyTime),
            cc.callFunc(function(){
                GameOverSave(_allTime,gameResult,function(json){
                    var data = json.data
                    if(data){
                        PLAYER_RATIO = json.data.ratio
                    }else{
                        PLAYER_RATIO = "0%"
                    }
                    // cc.log("PLAYER_RANK",PLAYER_RANK,json.data.rank)
                var scene = new GameEndScene(gameResult,_allTime)
            // scene.initInfo(gameResult,this._allTime)
                var transitions = new cc.TransitionFade(1, scene);
                cc.director.runScene(transitions);
            // cc.director.getRunningScene().initInfo(gameResult,this._allTime)
                })
            })

        ))
    },
    showStopWin : function(){
    
        this._colorWin = new cc.LayerColor(cc.color(211,245,255),WIN_SIZE.width,WIN_SIZE.height)
        this._colorWin.y = 85
        this._colorWin.setOpacity(100)
        this.addChild(this._colorWin,20)

        var stopWinBg = new cc.Sprite(res.img_darkBlueBg)
        stopWinBg.x = WIN_SIZE.width/2
        stopWinBg.y = WIN_SIZE.height/2
        this._colorWin.addChild(stopWinBg)

        /*var label = new cc.LabelTTF("不要丢下我哦！",res.Font_MSYH.name,30,cc.size(0, 0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP)
        //)//("后面还有更精彩的关等您挑战呢，\n\n不要走开哦"
        label.x = stopWinBg.width / 2
        label.y = stopWinBg.height / 2 + 30 
        stopWinBg.addChild(label)*/

        stopWinBg.getLayer = this

        var goOnBtn = new NewButton(
            res.img_goOnBtn,
            120,50,
            function(parent){
                parent.getLayer.continueGame(parent.getLayer)
            },
            stopWinBg
        )

        var restartBtn = new NewButton(
            res.img_restartBtn,
            350,50,
            this.restartGame,
            stopWinBg
        )
    },
    continueGame : function(parent){
    
        parent._colorWin.removeFromParent()
        _stopGame = false
    // parent.schedule(parent.updateTimeLabel)
    // parent.schedule(parent.updateGradeLabel)

    // cc.Director.getInstance().getActionManager().pauseTarget(_mapLayer)
    // cc.Director.getInstance().getActionManager().pauseTarget(_playerModel)
    // resumeTarget

    
    // var transitions = new cc.TransitionFade(1, new GameStartScene());
    // cc.director.runScene(transitions);
    },
    restartGame : function(parent){
        var scene = cc.director.getRunningScene()
        scene.restartLayer(scene)
    }
});

var GameScene = cc.Scene.extend({
    _gameLayer : null,
    onEnter:function () {
        this._super();
        this._gameLayer = new gameLayer();
        this.addChild(this._gameLayer);
    },
    restartLayer : function(gameScene){
        gameScene._gameLayer.removeFromParent()
        gameScene._gameLayer = new gameLayer()
        gameScene.addChild(gameScene._gameLayer)
    }
});

