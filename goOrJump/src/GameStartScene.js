// GameStartScene 游戏开始页面 场景
var ADD_HEIGHT 
var BUTTON_EVENT 
var gameStartLayer = cc.Layer.extend({
    sprite:null,
    onEnter:function () {

        this._super();
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
        res.img_commonBtn,
        size.width / 2.0,
        170 ,
        this.gameInfoTouchEvent,
        this,
        "关于游戏"
        )//ccui.Button()
        
        // var rankBtn = new NewButton(
        // res.img_commonBtn,
        // size.width / 2.0,
        // 158 ,
        // null,
        // this,
        // "今日战绩"
        // )

        var startBtn = new NewButton(
        res.img_commonBtn,
        size.width / 2.0,
        238 ,
        this.startBtnTouchEvent,
        this,
        "开始游戏"
        )

        return true;
    },
    startBtnTouchEvent:function(sender,type){
        var transitions = new cc.TransitionFade(1, new GameScene());
        cc.director.runScene(transitions);                  
    },
    gameInfoTouchEvent:function(parent){
        var layer = new GameInfoLayer();
        layer.x =cc.winSize.width/2
        layer.y = cc.winSize.height/2
        var img = cc.Sprite(res.img_goBtn)

        parent.addChild(layer); 

    }

});

var GameStartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameStartLayer();
        this.addChild(layer,10);
    }
});

