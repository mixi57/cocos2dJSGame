// mapLayer 首页
var MAPLAYER_LINE_DISTANCE = 64
var MAPLAYER_LOWER_HEIGHT = 200
var MAPLAYER_STEP_HEIGHT = 100

var mapInfoTable = [
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
var bookPos = [
11,27,48,63,70,83,85,113,136,137,155,168,179,193,194,214,223,255,268,275
]
var mapLayer = cc.Layer.extend({
    _mapLinesTable : null,
    _batchNode : null,
    _isMapMove : false,
    _addCallFunc : null,
    _actionCache : null,
    _showStartPos : null,
    _showEndPos : null,
    _moveNums : null,

    _mapBgTable : null,
    _mapBgBatchNode : null,
    _mapSize : null,

    ctor:function(){
    	this._super() 

        //batchnode
        _mapBgBatchNode = new cc.SpriteBatchNode(res.img_gameBg)
        _mapSize = _mapBgBatchNode.getContentSize()
        this.addChild(_mapBgBatchNode,-1)

        _mapBgTable  = new Array()
        this.updateMapBg()


    	//batchnode
    	var batchNodeRes = res.img_stonePng
    	_batchNode = new cc.SpriteBatchNode(batchNodeRes)
    	this.addChild(_batchNode,5)



    	var mapShowNum = 640 / MAPLAYER_LINE_DISTANCE

        _showStartPos = 0 
        _showEndPos = 0 //_showStartPos + mapShowNum
        _moveNums = 0

        _mapLinesTable = new Array()
        _actionCache = new Array()

        this.addMapLine(mapShowNum)
        _isMapMove = false
        _addCallFunc = null

    	return true
    },
    scrollByDistance : function( distance ){

    },
    scrollLineNum : function( lineNum,isActionCache ){
        if(lineNum <= 0){
            return
        }
        if (!isActionCache){
        // 移动状态 先缓存下操作
        if(_isMapMove && _isMapMove == true){
            cc.log("地图正在动作中  缓存")
            _actionCache.push(lineNum)
            // if(_addCallFunc){
            //     var oldCallFunc = _addCallFunc
            //     _addCallFunc = function(){
            //         oldCallFunc()
            //         this.scrollLineNum(lineNum)
            //     }
            // } else{
            //     _addCallFunc = function(){
            //         this.scrollLineNum(lineNum)
            //     }
            // }
            return 
        }}
        // cc.log("scrollLineNum",callTimes,_isMapMove,isActionCache)

        var time = 1
        _moveNums = lineNum
        // cc.log("scrollLineNum",lineNum,_showStartPos)
        this.addMapLine(_moveNums)
        _isMapMove = true
        for (var i = 0; i < _mapLinesTable.length ; i++) {
            var sprite = _mapLinesTable[i]
            if (sprite){
                // sprite.runAction(cc.moveBy(time,-lineNum*MAPLAYER_LINE_DISTANCE,0))
                // var spritePos = this.getLinePosByIndex(i-lineNum)
                // var spritePosX = spritePos.x
                // var spritePosY=spritePos.y
                // cc.log("pospos",i,_mapLinesTable.length,_showStartPos)
                // cc.log("pospos1",sprite.x)
                // cc.log("pospos2",sprite.y)
                var spritePos = [sprite.x - _moveNums * MAPLAYER_LINE_DISTANCE,sprite.y]//this.getLinePosByIndex(i-lineNum)
                // cc.log("newpos ",i,spritePos[0],spritePos[1])
                sprite.runAction(cc.moveTo(time,spritePos[0],spritePos[1]))
            }
        };

        var callbackFun = function(){
            
            // var removeNum = 0
            for (var i = 0; i < _mapLinesTable.length ;) {
                var sprite = _mapLinesTable[i]
                if(sprite){
                    // cc.log("callbackfun",i,removeNum,sprite.x)
                    if (sprite.x + sprite.width * (1 - sprite.getAnchorPoint().x) < 0){
                        // cc.log("remove",sprite.x)
                        sprite.removeFromParent()
                        _mapLinesTable.shift()
                        // removeNum = removeNum + 1
                        // cc.log("remove index ",i)
                    } else {
                        sprite.stopAllActions()
                        i = i + 1
                        
                        // sprite.x = this.getLinePosByIndex(i)[0]//.x
                        // if (i==1){
                        // cc.log("最左边的位置 ",sprite.x)}
                        // break
                    }
                }
            };
            // cc.log("callbackfun",callTimes)
            // callTimes = callTimes + 1
            _showStartPos = _showStartPos + _moveNums 
            // cc.log("startPos",_showStartPos,removeNum)

            // if(_addCallFunc)
            // {
            //     _addCallFunc()
            //     _addCallFunc = null
            // }
            if( _actionCache.length > 0 ){
                var newLineNum = _actionCache[0]
                this.scrollLineNum( newLineNum ,true)
                _actionCache.shift()
            }else
            {
                _isMapMove = false
                cc.log("callbackfun isMove == false")
            }
        }

        this.runAction(cc.sequence(
            cc.delayTime(time),
            cc.callFunc(callbackFun,this)))
       
    },
    addMapLine : function( lineNum ){
        if(lineNum <= 0){
            return
        }
        // var oldLineNum = _mapLinesTable.length
        // var oldEndPos = this.getLinePosByIndex(0)[0]
        // if (oldLineNum > 0) {
        //     var sprite = _mapLinesTable[oldLineNum-1]
        //     if(sprite){
        //         oldEndPos = sprite.x
        //     } else {
        //         cc.log("why error",oldLineNum)
        //     }
            
        // };

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

            }   
        };
        _showEndPos = _showEndPos + lineNum
    },

    getLinePosByIndex : function (index){
        var stepNum = mapInfoTable[index]
        var pos = null
        if (stepNum == 0){
            return;
        }
        var startPos = 0.5 * MAPLAYER_LINE_DISTANCE
        if (index <= _showEndPos && index < _mapLinesTable.length){
            startPos = _mapLinesTable[0].x
        }
        var indexX = startPos + (index - _showStartPos ) * MAPLAYER_LINE_DISTANCE
        var indexY = MAPLAYER_LOWER_HEIGHT + stepNum * MAPLAYER_STEP_HEIGHT
//        cc.log("getLinePosByIndex",stepNum,index,startPos,indexX,indexY,_showStartPos,_showEndPos)
        return [indexX,indexY] //cc.p(indexX,indexY)
    },

    updateMapBg : function(){

        var oldMapPos = cc.p(-_mapSize.width,0)
        
        if (_mapBgTable.length > 0){
            oldMapPos = _mapBgTable[_mapBgTable.length - 1].getPosition()
        }

        var newMapPosX = oldMapPos.x + _mapSize.width
        cc.log("newMapPos",newMapPosX)
        if( newMapPosX <= 640 ){ 
            var bg = new cc.Sprite(_mapBgBatchNode.texture) //("res/gameBg.jpg")//
            bg.setAnchorPoint(cc.p(0,0))
            bg.x = newMapPosX
            bg.y = oldMapPos.y
            _mapBgBatchNode.addChild(bg)
            _mapBgTable.push(bg)
        }

        
        
    },

})