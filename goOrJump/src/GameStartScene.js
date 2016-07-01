// GameStartScene 游戏开始页面 场景
var ADD_HEIGHT 
var BUTTON_EVENT 
var PLAYER_ID
var PLAYER_ID_NAME = "playerId"
var PLAYER_RATIO = -1
var PLAYER_RANK 
var PLAYER_CCUP_NUM = -1
var PLAYER_TCUP_NUM = -1
var PLAYER_MIN_TIME 
var DefultSize = cc.size(640, 960)


var gameStartLayer = cc.Layer.extend({
    sprite:null,
    onEnter:function () {
// var timestamp = Date.parse(new Date()); 
// cc.log("var timestamp = Date.parse(new Date()); ",timestamp)
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

        var bg = new ccui.ImageView(res.img_startBg)
        bg.x = size.width / 2
        bg.y = size.height / 2
        this.addChild(bg)

        var gameInfoBtn = new NewButton(
        res.img_gameInfoBtn,
        size.width / 2.0,
        104,//170 ,
        this.gameInfoTouchEvent,
        this//,
        // "关于游戏"
        )//ccui.Button()
        
        var rankBtn = new NewButton(
        res.img_rankInfoBtn,
        size.width / 2.0,
        177,//102 ,
        this.gameRankInfo,
        this
        )

        var startBtn = new NewButton(
        res.img_startBtn,
        size.width / 2.0,
        250,//238 ,
        this.startBtnTouchEvent,
        this//,
        // "开始游戏"
        )

        // var valueTable = GetSysName()
        // cc.log("valueTable",valueTable[0],valueTable[1])

        return true;
    },
    startBtnTouchEvent:function(sender,type){
        GameStarting(function(json){
            PLAYER_ID = json.uid
        if(cc.sys){
            cc.sys.localStorage.setItem("playerId",PLAYER_ID)
        }  
        var transitions = new cc.TransitionFade(1, new GameScene());
        cc.director.runScene(transitions);

        })                               
    },
    gameInfoTouchEvent:function(parent){
        var layer = new GameInfoLayer();
        layer.x =cc.winSize.width/2
        layer.y = cc.winSize.height/2

        parent.addChild(layer); 
    },
    gameRankInfo : function(parent){
        if (!GetPlayerID())
        {
            var layer = new GameRankInfoLayer();
            layer.x =cc.winSize.width/2
            layer.y = cc.winSize.height/2
        
            parent.addChild(layer); 
        
            return
        };
        GetPlayerInfo(function(json,parent){
            var data = json.data
            // var parent = self
            PLAYER_RATIO = data.ratio
            PLAYER_RANK = data.rank
            PLAYER_CCUP_NUM = data.num_ccup
            PLAYER_TCUP_NUM = data.num_tcup
            PLAYER_MIN_TIME = data.min_playtime 

            var layer = new GameRankInfoLayer();
            layer.x =cc.winSize.width/2
            layer.y = cc.winSize.height/2
        
            cc.director.getRunningScene()._startLayer.addChild(layer); 
        })
    }

});

var GameStartScene = cc.Scene.extend({
    _startLayer : null,
    onEnter:function () {
        this._super();

        var layer = new gameStartLayer();
        this.addChild(layer,10);
        this._startLayer = layer;
    }});

