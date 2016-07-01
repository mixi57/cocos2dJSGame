
var GameInfoLayer = cc.Layer.extend({
    _showType : null,
    _showLabelTable : null,
    ctor:function () {
        this._super()


        _showType = 0
        this._showLabelTable = new Array()

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

        var ruleLabel = new cc.Sprite(res.img_ruleLabel)
        ruleLabel.y = 100
        this.addChild(ruleLabel)

        var workerLabel = new cc.Sprite(res.img_workerLabel)
        workerLabel.y = 160
        this.addChild(workerLabel)

        this._showLabelTable.push(ruleLabel)
        this._showLabelTable.push(workerLabel)
        
        workerLabel.setVisible(false)

        var ruleBtn = new NewButton(
        	res.img_ruleInfoBtn,
        	(133-320)* (WIN_SIZE.width/DefultSize.width),
            888-480,
        	function(parent){
        		parent.changeLabel(0,parent)
        	},
        	this//,
        	// "游戏规则"
            )
        
        var introduceBtn = new NewButton(
        	res.img_workInfoBtn,
        	(513-320)* (WIN_SIZE.width/DefultSize.width),
            888-480,
        	function(parent){
                parent.changeLabel(1,parent)
            },
        	this//,
        	// "制作信息"
            )

        var closeBtn = new NewButton(
            res.img_closeBtn,
            (620-320)* (WIN_SIZE.width/DefultSize.width),
            935-480,
            function(parent){
                parent.removeFromParent()
            },
            this
        )
        return true;
    },
    changeLabel : function(labelType,parent){
        if(labelType >= parent._showLabelTable.length){
            return
        }
        if (parent._showType != labelType){
            var label = parent._showLabelTable[labelType]
            label.setVisible(true)

            var nextIndex = labelType + 1 < parent._showLabelTable.length ? labelType + 1 : labelType - 1
            parent._showLabelTable[nextIndex].setVisible(false)

            parent._showType = labelType
        }
            
    }

});


