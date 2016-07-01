// (imgName,x,y,touchEvent,parent,text)
var NewButton = ccui.Button.extend({
	_touchEvent : null,
    _btnParent : null,
    _btnReturnThis : null,
    ctor:function (imgName,x,y,touchEvent,parent,text,labelColor,labelSize,self) {
        this._super()
        _touchEvent = null
        _btnParent = null
        

        
        if(imgName)
        this.loadTextures(imgName, "", "")
        if(x)
        this.x = x;
        if(y){
        this.y = y + ADD_HEIGHT
    }
        if(parent){
        	this._btnParent = parent 
        	this._btnParent.addChild(this);
            if(self){
                this._btnReturnThis = self
            }else{
                this._btnReturnThis = this._btnParent
            }
        }
        

        if(text){
        	// var label = new cc.LabelTTF(text,"黑体",38)
        	// this.addChild(label)
        	// label.x = this.width/2
        	// label.y = this.height/2
            if (!labelSize)
                labelSize = 28
            this.setTitleFontSize(labelSize)
            this.setTitleText(text)
            if(labelColor){
                // label.setColor(labelColor)
                this.setTitleColor(labelColor)
            } else {
                // this.setTitleColor(cc.color(9,19,153))
            }
        }
        
    if(touchEvent){
    	// this.addTouchEventListener()
        this.setTouchEnabled(true)
    	this.addTouchEventListener(this.btnTouchEvent, this);

    	this._touchEvent = touchEvent
    }else{
        this.setTouchEnabled(false)
    }
        return true;
    },
    btnTouchEvent : function(sender,type){
    	// 要加sender 不然就全改了
        // cc.log("GAMEING",BUTTON_EVENT)
        if(!BUTTON_EVENT){
            return
        }

    	if(type == ccui.Widget.TOUCH_ENDED){
            if(sender._touchEvent){
    		    sender._touchEvent(this._btnReturnThis)
    	    }
        }
    }
    	    
});


