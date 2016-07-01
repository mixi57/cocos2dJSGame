// share WX
var GameInfoTable = {
    // test  goOrJump
        gameLink: "http://tzb2015.guopan.cn/goOrJump/",
        gameLinkLogo : "http://tzb2015.guopan.cn/goOrJump/res/linkLogo.jpg",
        gameTitle : "勇夺挑战路",
        gameLinkDes : "我在“勇闯挑战路”中勇往前行",
        gameLinkDesRank : "，把%s玩家甩在后面",
        gameLinkDesEnd: "，你敢来追我吗？",

}

var RegisterShare = function(){
 if (IsValid()) 
 {
        //html5 浏览器
        var wxDesc 
        if (PLAYER_RATIO != -1) {
            wxDesc = GameInfoTable.gameLinkDes + cc.formatStr(GameInfoTable.gameLinkDesRank,PLAYER_RATIO) +GameInfoTable.gameLinkDesEnd
        } else{
            wxDesc = GameInfoTable.gameLinkDes + GameInfoTable.gameLinkDesEnd
        }
        // 微信好友
        wx.onMenuShareAppMessage({
            title: GameInfoTable.gameTitle,
            link: GameInfoTable.gameLink,
            desc: wxDesc, // 分享描述
            imgUrl: GameInfoTable.gameLinkLogo,
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
                alert("分享失败："+JSON.stringify(res));
            },
            complete : function (res) {
            }
        });
        // 微信朋友圈
        wx.onMenuShareTimeline({
            title: wxDesc,
            link: GameInfoTable.gameLink,
            imgUrl: GameInfoTable.gameLinkLogo,
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
                alert("分享失败："+JSON.stringify(res));
            },
            complete : function (res) {
            }
        });
 }

}

var RecordScore = function(gameResult,time){
    if (IsValid())
    {
        _czc.push(["_trackEvent","Score",gameResult,time,3,"canves"]);
    }
}

var RecordWrongGrade = function(time){
    if (IsValid())
    {
        _czc.push(["_trackEvent","WrongGrade",time,"true",1,"canves"]);
    }
}

var GetTwoBitString = function(number){
    // cc.log("num ",number)
    number = number % 100
    number = number < 10 ? "0"+number : String(number)
    return number
}

var TransformFunc = function(transformValue,number){
    var newValue = ""
    for (var i = number.length - 1; i >= 0; i--) {
        var temp = Number(number[i])
        newValue += transformValue[temp]
        // cc.log("i ",i,temp,newValue)
    };
    return newValue
}

var NewName = function(){
    var myDate = new Date();
    var nowTime = GetTwoBitString(myDate.getFullYear()) + GetTwoBitString(myDate.getMonth()+1)+GetTwoBitString(myDate.getDate())+GetTwoBitString(myDate.getHours())+GetTwoBitString(myDate.getMinutes())+GetTwoBitString(myDate.getSeconds())

    var value = "tiaozhnbey"
    return TransformFunc(value,nowTime)

}
var GetSysName = function(){
    // if(cc.sys){
    var sysName = GetPlayerID() //cc.sys.localStorage.getItem("playerId")
    var needCal = true
    // var nameTable = new Array()
    if (sysName){
        needCal = false
    } else {
        sysName = NewName()
    }
    // var nameTable = [needCal,sysName]
    return [sysName,needCal]    
    // }
}

var XHRServer = function(params,callBack,parent){
    var url = "http://tzb2015.guopan.cn/server/gojump.php?"
    url = url + params
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText;
                var json = JSON.parse(response);
                cc.log("response",response,json.data)
                callBack(json,parent)
                
            }
    };
    xhr.send();
}

var GameStarting = function(callBack){
    var param = "do=add&uid=%s&bool=%s"
    var valueTable = GetSysName()
    param = cc.formatStr(param,valueTable[0],valueTable[1])//param.format(valueTable[0])//,valueTable[1])
    cc.log("do=add&uid=216&bool=true",param)
    XHRServer(param,callBack)
}

var GameOverSave = function(gameTime,gameType,callBack){
    var param = "do=save&uid=%s&time=%s&type=%s"
    var type = gameType?1:0;
    param = cc.formatStr(param,PLAYER_ID,gameTime,type)//param.format(valueTable[0])//,valueTable[1])
    cc.log("GameOverSave",param)
    XHRServer(param,callBack)
 
}

var GetPlayerInfo = function(callBack,parent){
    var param = "do=get&uid=%s"
    param = cc.formatStr(param,PLAYER_ID)//param.format(valueTable[0])//,valueTable[1])
    cc.log("GetPlayerInfo",param)
    XHRServer(param,callBack,parent)
 
}

var GetValidValue = function(oldValue){
    var value = "无"
    cc.log("oldValue",oldValue)
    if (oldValue) {
        oldValue = Number(oldValue)
        value = oldValue >= 0 ? oldValue : 0;
    };
    return value
}

var GetPlayerID = function(){
    if (!PLAYER_ID) { 
        if(cc.sys){
            PLAYER_ID = cc.sys.localStorage.getItem("playerId")
        }
    };

    return PLAYER_ID;
}



