/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
IsValid = function(){
    // return true
    return cc.sys.platform == 'browser'
}
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.FIXED_HEIGHT);
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
       cc.director.runScene(new GameStartScene());
    }, this);

    cc.inputManager.setAccelerometerEnabled(false);

    cc.view.setResizeCallback = function(){
        cc.director.getRunningScene()._gameLayer.runAction(cc.scaleTo(1,2))

    }



    //  wx add 2
    if (IsValid())
     {
        window.onerror = function(errorMessage, scriptURI, lineNumber) {
//      js崩溃统计
        var message = "=====errorMessage: "+errorMessage+"=====scriptURI: "+scriptURI+"=====lineNumber: "+lineNumber;
//      var _czc = _czc || [];
//      _czc.push(["_setAccount", "1254734581"]);
        _czc.push(["_trackEvent","ReportBug","mixi-bug: ",message,2,"canvas"]);
//      
        return false;
    };
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", "http://tzb2015.guopan.cn/server/index.php?url="+location.href.split('#')[0], true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText;
            var json = JSON.parse(response);
            cc.log("json: ",json);
            wx.config({
                debug: false,
                appId: "wx25334c2cdbb84df0",
                timestamp: String(json.timestamp),
                nonceStr: String(json.noncestr),
                signature: String(json.signature),
                jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            ]
            });
        }
    };
    xhr.send();


    wx.ready(function(){
        RegisterShare();
    });
    } 
};
cc["\x67\x61\x6d\x65"]["\x72\x75\x6e"]();//cc.game.run();