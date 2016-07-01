// mapLayer 首页
var MAPLAYER_LINE_DISTANCE = 64
var MAPLAYER_LOWER_HEIGHT = 140
var MAPLAYER_STEP_HEIGHT = 71

var __DEBUG__ = false

var mapInfoTable = [
// 1,1,1,1,1,1,1,1,1,1,
// 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
// 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,0,1,1,1,0,2,2,2,2,0,3,
3,0,3,3,0,4,4,0,3,3,0,4,4,0,
4,4,4,4,0,3,3,0,2,2,0,1,1,0,
2,2,2,2,0,2,0,3,3,0,3,0,2,2,
0,2,2,2,0,2,2,2,2,0,3,3,0,4,
4,0,3,3,0,2,2,2,0,1,1,0,1,1,
1,1,0,1,1,0,2,2,0,3,3,0,3,3,
0,2,0,3,3,3,3,0,2,2,0,3,3,0,
4,0,3,0,2,0,2,2,0,3,0,4,0,4,
4,0,3,3,0,4,4,0,4,4,4,4,0,3,
3,0,2,2,0,3,3,3,0,3,3,0,2,0, 
1,0,2,2,0,3,3,0,4,0,3,3,0,2,
2,0,2,2,0,2,0,2,0,3,3,3,3,0,
4,4,0,3,3,0,2,2,0,2,2,2,2,0,
1,0,2,2,0,1,0,1,1,0,2,2,0,3,
3,0,3,3,3,0,2,2,0,3,0,2,2,2,
0,3,3,3,0,2,2,2,0,3,3,0,4,4,
0,3,3,0,4,0,3,3,0,2,2,0,1,1,
0,1,1,1,0,2,2,2,0,2,2,0,3,3,
0,3,0,2,0,3,3,0,2,0,3,3,0,4]

var SchoolPos = [
// 1,2,4,5,6,8,9,10,11,13,14,16,17,
19,39,59,79,99,119,139,159,179,199,219,239,259,279
]
var BookPos = [
10,26,47,62,69,82,84,112,135,136,154,167,178,192,193,213,222,254,267,274
]
// [11,27,48,63,70,83,85,113,136,137,155,168,179,193,194,214,223,255,268,275]
//[13,27,41,55,69,83,97,111,125,139,153,167,181,195,209,223,237,251,265,279]
var mapLayer = cc.Layer.extend({
    _mapLinesTable : null,
    _batchNode : null,
    _isMapMove : false,
    _actionCache : null,
    _showStartPos : null,
    _showEndPos : null,
    _moveNums : null,

    _mapBgTable : null,
    _mapBgBatchNode : null,
    _mapSize : null,

    _labelParent : null,
    _labelTable : null,

    _bookIndex : null,
    _bookParent : null,
    _bookIndexTable : null,

    _schoolIndex : null,
    _schoolParent : null,
    _schoolIndexTable : null,
    _showSchoolIconTable : null,

    _addGradeFunc : null,
    _addTimeFunc : null,

    _lastBookIndex : null,
    _lastSchoolIndex : null,

    _moveNode : null,

    ctor:function(){
        this._super() 

        _moveNode = new cc.Node()
        this.addChild(_moveNode,10)
        //batchnode
        _mapBgBatchNode = new cc.SpriteBatchNode(res.img_gameBg)
        _mapSize = _mapBgBatchNode.texture.getContentSize()
        this.addChild(_mapBgBatchNode,-1)

        _mapBgTable  = new Array()
        this.updateMapBg()

        if (__DEBUG__){
            _labelParent = null
            _labelTable = new Array()
        }

        //batchnode
        var batchNodeRes = res.img_stonePng
        _batchNode = new cc.SpriteBatchNode(batchNodeRes)
        _moveNode.addChild(_batchNode,5)

        _schoolIndex = 0
        _schoolParent = new cc.Node()
        _lastSchoolIndex = 0
        _showSchoolIconTable = new Array()
        _moveNode.addChild(_schoolParent,6)

        _bookIndex = 0
        _lastBookIndex = 0
        _bookIndexTable = new Array()
        _bookParent = new cc.Node()
        _moveNode.addChild(_bookParent,6)


        var mapShowNum = 640 / MAPLAYER_LINE_DISTANCE

        _showStartPos = 0 
        _showEndPos = 0 //_showStartPos + mapShowNum
        _moveNums = 0

        _addGradeFunc = null
        _addTimeFunc = null


        
        _mapLinesTable = new Array()
        _actionCache = new Array()
        _schoolIndexTable = new Array()

        _tipLabelTable = new Array()


        this.addMapLine(mapShowNum)
        _isMapMove = false

        return true
    },
    scrollLineNum : function( lineNum,isActionCache ){
        if(lineNum <= 0){
            return
        }
        if (!isActionCache){
        // 移动状态 先缓存下操作
        if(_isMapMove ){
            cc.log("地图正在动作中  缓存")
            _actionCache.push(lineNum)
            return 
        }}
        
        _moveNums = lineNum
        
        this.addMapLine(_moveNums)
        _isMapMove = true
        
        var moveChildOffset = function(parent,moveOffset){
            // for (var child in parent.getChildren()){
            var children = parent.getChildren()
            for (var i = 0;i < children.length;i++){
                child = children[i]
                if (child) {
                    // cc.log("what happen",moveOffset)
                    child.x += moveOffset
                };
            }
            // if (parent) {
            //     parent.x += moveOffset
            // };
        }

        var removeUnusedChild = function(parent,childTable){
            // for (var child in parent.getChildren()){
            //     if (child) {
            //         if (child.x + child.width * (1 - child.getAnchorPoint().x) < 0) {
            //             child.rem
            //         };
            //     };
            // }
            for (var i = 0; i < childTable.length ;){
                var sprite = childTable[i]
                if (sprite) {
                    if (sprite.x + sprite.width * (1 - sprite.getAnchorPoint().x) < 0){
                        sprite.removeFromParent()
                        childTable.shift()
                    } else {
                        sprite.stopAllActions()
                        i++
                    }
                };
            }

        }


        for (var i = _mapBgTable.length - 1; i >= 0; i--) {
            var moveMap = _mapBgTable[i]
            if (moveMap){
                var acc = 0.5
                var mapNewPos = [moveMap.x - _moveNums * MAPLAYER_LINE_DISTANCE * acc,0]
                // moveMap.retain()
                moveMap.runAction(cc.moveTo(MOVE_TIME,mapNewPos[0],mapNewPos[1]))
            }
        };

         var newPos =_moveNums * MAPLAYER_LINE_DISTANCE
        
        _moveNode.runAction(cc.sequence(
            cc.moveTo(MOVE_TIME,-newPos,0),
            cc.callFunc(function(){
                var newOffset = _moveNode.x
                
                moveChildOffset(_batchNode,newOffset)
                // _batchNode.x = 0

                if(__DEBUG__){
                    cc.log("label num ",_labelParent.getChildren().length)
                    moveChildOffset(_labelParent,newOffset)
                    // var labelChild = _labelParent.getChildren()
                    // for(var i=0;i<labelChild.length;i++){
                    //     var c = labelChild[i]
                    //     c.x += newOffset
                    // }
                    // _labelParent .x = 0
                }
                moveChildOffset(_bookParent,newOffset)
                moveChildOffset(_schoolParent,newOffset)
                
                _bookParent .x =0
                _schoolParent .x =0

                // _batchNode.x = 0
_moveNode.x = 0 
                //check
                 
                for (var i = 0; i < _mapLinesTable.length ;) {
                var sprite = _mapLinesTable[i]
                if(sprite){
                    if (sprite.x + sprite.width * (1 - sprite.getAnchorPoint().x) < 0){
                        sprite.removeFromParent()
                        _mapLinesTable.shift()

                    } else {
                        sprite.stopAllActions()
                        i++
                    }
                }}

                this.updateMapBg()
                this.addGradeFromMap(_moveNums)
            _showStartPos = _showStartPos + _moveNums

            
                if (_schoolIndex > 0){
                var schoolTimes = 1
                var schoolIconPos = SchoolPos[_schoolIndex - schoolTimes]

                

                while (schoolIconPos >= _showStartPos && _schoolIndex > _lastSchoolIndex){
                    if(schoolIconPos == _showStartPos){
                        
                        _lastSchoolIndex = _schoolIndex - schoolTimes
                       this.removeSchoolIcon(_showStartPos)
                       break 
                    } else {
                        schoolTimes++
                        schoolIconPos = SchoolPos[_schoolIndex - schoolTimes] 
                    }
                }
            }
            if (_bookIndex > 0){
                var bookTimes = 1
                var bookIndex = BookPos[_bookIndex - bookTimes]
                while (bookIndex >= _showStartPos && _bookIndex > _lastBookIndex){
                    if(bookIndex == _showStartPos){
                        _lastBookIndex = _bookIndex - bookTimes
                        this.removeBookIcon(_showStartPos)
                        break 
                    } else {
                        bookTimes++
                        bookIndex = BookPos[_bookIndex - bookTimes] 
                    }
                }
            }
            for (var i = 0; i < _schoolIndexTable.length; ) {
                
            var arrayTable = _schoolIndexTable[i]
            var icon = arrayTable[1]
            if(icon && icon.x + 30 < 0){
                icon.removeFromParent()
                _schoolIndexTable.splice(i,1)
                // cc.log("_schoolIndexTable  sss ",_schoolIndexTable.length)

            }else{
                break
            }
            }
            for (var i = 0; i < _bookIndexTable.length; ) {
            
            var arrayTable = _bookIndexTable[i]
            var icon = arrayTable[1]
            if(icon.x + 30 < 0){
                icon.removeFromParent()
                _bookIndexTable.splice(i,1)
            }else{
                break
            }}

            if( _actionCache.length > 0 ){
                var newLineNum = _actionCache[0]
                this.scrollLineNum( newLineNum ,true)
                _actionCache.shift()
            } else{
                _isMapMove = false
                cc.log("callbackfun isMove == false")
            }

            this.getParent().actionCallFunc()



                // callbackFun()
                // cc.callFunc(callbackFun,this)
            }//,
            // cc.callFunc(callbackFun,this))
        ,this)
))

        // this.runAction(cc.sequence(
        //     cc.delayTime(MOVE_TIME+0.02),
        //     cc.callFunc(callbackFun,this)))
       
    },
    addMapLine : function( lineNum ){
        if(lineNum <= 0){
            return
        }

        var lineIndex = _showEndPos
        // cc.log("addMapLineadd",lineNum,_showStartPos,_showEndPos)
        // var 
        for (var i = 0; i < lineNum; i++) {

            var index = lineIndex + i
            var pos = this.getLinePosByIndex(index)
            
            if (pos){
                var mapLine = new cc.Sprite(_batchNode.texture)
                mapLine.x = pos[0]//oldEndPos + ( i * MAPLAYER_LINE_DISTANCE )
                mapLine.y = pos[1]//MAPLAYER_LOWER_HEIGHT
                // mapLine.setScaleY(10)
                _batchNode.addChild(mapLine)
                // cc.log("addMapLine",i,pos[0],pos[1])

                _mapLinesTable.push(mapLine)

// cc.log("_bookIndex < BookPos.length",_bookIndex , BookPos.length,index)
                // book 
                if (_bookIndex < BookPos.length && BookPos[_bookIndex] == index)
                {
                    var bookIcon = new cc.Sprite(res.img_bookIcon)
                    bookIcon.setScale(0.5)
                    bookIcon.setAnchorPoint(cc.p(0.5,0))
                    bookIcon.x = pos[0]//(index+0.5) * MAPLAYER_LINE_DISTANCE//pos[0]//(index+0.5) * MAPLAYER_LINE_DISTANCE//pos[0]
                    bookIcon.y = pos[1] + mapLine.height * 0.5
                    _bookParent.addChild(bookIcon,100)
                    _bookIndex ++

                    _bookIndexTable.push([index,bookIcon])
                }

                //school
                if (_schoolIndex < SchoolPos.length && SchoolPos[_schoolIndex] == index)
                {
                    var schoolIcon = new cc.Sprite(res.img_schoolSign)//(res["img_schoolIcon"+String(_schoolIndex)])
                    // schoolIcon.setScale(0.2)
                    schoolIcon.setAnchorPoint(cc.p(0.5,0))
                    schoolIcon.x = pos[0]//(index+0.5) * MAPLAYER_LINE_DISTANCE//pos[0]//(index+0.5) * MAPLAYER_LINE_DISTANCE//pos[0]
                    schoolIcon.y = pos[1] + mapLine.height * 0.5
                    _schoolParent.addChild(schoolIcon,100)
                    _schoolIndex ++

                    _schoolIndexTable.push([index,schoolIcon])
                }


                if (__DEBUG__){
                    if(!_labelParent){
                        _labelParent = new cc.Node()
                        _moveNode.addChild(_labelParent,10)
                    }
                // cc.log("indexindex",index)
                    var label = new cc.LabelTTF(String(index),res.Font_MSYH.name,50)

                    label.x = pos[0]//(index+0.5) * MAPLAYER_LINE_DISTANCE
                    label.y = pos[1]
                    label.setColor(cc.color(255,0,0,255))
                    _labelParent.addChild(label,10)
                    _labelTable.push(label)
                }

            }   
        };
        _showEndPos = _showEndPos + lineNum
    },

    getLinePosByIndex : function (index,reSet){
        var stepNum = mapInfoTable[index]
        var pos = null
        if (stepNum == 0){
            return;
        }
        var startPos = 0.5 * MAPLAYER_LINE_DISTANCE
        if (!reSet && index <= _showEndPos && index < _mapLinesTable.length){
            startPos = _mapLinesTable[0].x
        }
        var indexX = startPos + (index - _showStartPos ) * MAPLAYER_LINE_DISTANCE
        var indexY = MAPLAYER_LOWER_HEIGHT + stepNum * MAPLAYER_STEP_HEIGHT
//        cc.log("getLinePosByIndex",stepNum,index,startPos,indexX,indexY,_showStartPos,_showEndPos)
        return [indexX,indexY] //cc.p(indexX,indexY)
    },

    updateMapBg : function(){

        var oldMapPos = cc.p(-_mapSize.width,0)
        
        // cc.log("update map bg ",_mapBgTable.length)
        for (var i = 0; i < _mapBgTable.length; ) {
//          cc.log("index",i)
            var moveMapBg = _mapBgTable[i]
            // cc.log("iiii",i,_mapBgTable.length)
            if (moveMapBg){
                // moveMap.release()
            // cc.log("moveMap.x + _mapSize.width",i,moveMapBg.x , _mapSize.width)
                if (moveMapBg.x + _mapSize.width < 0){
                    moveMapBg.removeFromParent()
                    _mapBgTable.shift()
                } else {
                    moveMapBg.stopAllActions()
                    if (i == _mapBgTable.length - 1){
                        oldMapPos = _mapBgTable[i].getPosition()
                    }
                    i++
                }
            }
        };


        var newMapPosX = oldMapPos.x + _mapSize.width - 10
        // cc.log("newMapPos",newMapPosX)
        if( newMapPosX - 2 * MAPLAYER_LINE_DISTANCE <= 640 ){ 
            // cc.log("new one map")
            var bg = new cc.Sprite(_mapBgBatchNode.texture)
            bg.setAnchorPoint(cc.p(0,0))
            bg.x = newMapPosX
            bg.y = oldMapPos.y
            _mapBgBatchNode.addChild(bg)
            _mapBgTable.push(bg)
        }
       
    },

    getPlayerStepNumsByNextPos : function(posNum){
        // var index = _showStartPos + posNum + _actionCache.length
        // if (_isMapMove){
        //     index++
        // }
        // cc.log("iiiiiiiii",index,mapInfoTable[index],_showStartPos)
        // cc.log("123",_showStartPos,_showEndPos)
        var value = 0
        if (posNum < mapInfoTable.length )
        {
            value = mapInfoTable[posNum]

        }
        return value
    },

    removeCache : function(){
        _actionCache.splice(0,_actionCache.length)
    },

    removeSchoolIcon : function(index){
        for (var i = 0; i < _schoolIndexTable.length; i++) {
            var arrayTable = _schoolIndexTable[i]
            var arrayIndex = arrayTable[0]
            if (arrayIndex >= index){
                if(arrayIndex == index){
                    var schoolIndex = 0
                    for (var j = _schoolIndex ;j >=0 ;j--){
                        if (SchoolPos[j] == index){
                            schoolIndex = j
                            break
                        }
                    }
                    // if(_showSchoolIconTable.length>1){
                    //     var lastIcon = _showSchoolIconTable[_showSchoolIconTable.length]
                    //     lastIcon:runAction(cc.sequence(
                    //             cc.scaleTo(0.5,0.2),
                    //             cc.fadeOut(0.5))
                    //         )
                            
                    // }
                    var oldSchoolIcon = arrayTable[1]
                    
                    // _showSchoolIcon.setAnchorPoint(oldSchoolIcon.getAnchorPoint())
                    // _showSchoolIcon.x = oldSchoolIcon.x + _schoolParent.x
                    // _showSchoolIcon.y = oldSchoolIcon.y + _schoolParent.y
                    
                    var pos = cc.p(oldSchoolIcon.x + _schoolParent.x,oldSchoolIcon.y+100)
                    this.addTipLabel(3,pos)

                    oldSchoolIcon.removeFromParent(true)

                    var newIcon = this.createSchoolIcon(schoolIndex)
                    this.addChild(newIcon)
                    
                    // cc.log("111removeSchoolIcon _schoolIndexTable.length",_schoolIndexTable.length)

                    _schoolIndexTable.splice(i,1)
                    // cc.log("removeSchoolIcon _schoolIndexTable.length",_schoolIndexTable.length)

                
                }
                break
            }
        };
    },

    schoolShowCallFunc : function(){
        if(_showSchoolIconTable.length>0){
            var removeIcon = _showSchoolIconTable.shift()
            removeIcon.removeFromParent()
        }
    },

    removeBookIcon : function(index){
        for (var i = 0; i < _bookIndexTable.length; i++) {
            var arrayTable = _bookIndexTable[i]
            var arrayIndex = arrayTable[0]
            if (arrayIndex >= index){
                if(arrayIndex == index){
                    var book = arrayTable[1]
                    var pos = cc.p(book.x + _bookParent.x,book.y+_bookParent.y+100)
                    this.addTipLabel(2,pos)

                    arrayTable[1].removeFromParent()
                    _bookIndexTable.splice(i,1)
                }
                break
            }
        }
    },
    addTipLabel : function(addTime,pos){
        var tipLabel = new cc.LabelTTF("+"+String(addTime)+"s",res.Font_MSYH.name,30)
        tipLabel.setPosition(pos)
        tipLabel.setColor(cc.color(255,0,0,255))
        this.addTimeFromMap(addTime)

        tipLabel.runAction(cc.sequence(
            cc.moveBy(1,cc.p(0,50)),
            cc.fadeOut(1),
            cc.callFunc(this.tipLabelCallFunc,this)

        ))

        cc.director.getRunningScene().addChild(tipLabel,10)
        _tipLabelTable.push(tipLabel)
    },
    tipLabelCallFunc : function(){
        var label = _tipLabelTable.shift()
        label.removeFromParent()
    },
    setAddTimeFunc : function(func){
        _addTimeFunc = func
    },
    addTimeFromMap : function(time){
       if( _addTimeFunc ){
           _addTimeFunc(time)
       }
    },
    setAddGradeFunc : function(func){
        _addGradeFunc = func
    },
    addGradeFromMap : function(grade){
       if( _addGradeFunc ){
           _addGradeFunc(grade)
       }
    },
    getMapMoveState : function(){
        return _isMapMove
    },
    createSchoolIcon : function(index){
        var iconTable = new Array()
        
        var iconAction = cc.sequence(
                            // cc.spawn(
                            //     cc.moveTo(1,cc.p(320,500)),
                cc.scaleTo(1,1),
                            // ),
                cc.delayTime(5),
                cc.fadeOut(1),
                cc.callFunc(this.schoolShowCallFunc,this)
            )

        var icon = new cc.Sprite(res["img_schoolIcon"+String(index)])//(oldSchoolIcon.texture)
        icon.setScale(0.2)
        icon.x = cc.winSize.width / 2
        icon.y = cc.winSize.height *(650/960)

        icon.runAction(
            iconAction.clone()
        )
        _showSchoolIconTable.push(icon)
       
        return icon
 
    }

})