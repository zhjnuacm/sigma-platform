var ChatPanel = cc.Layer.extend({
    _canSend: null,
    _toUser:null,
    _bg: null,
    _mesList: [],
    _mesRoot: null,
    _kind: null,

    ctor: function () {
        this._super();
        cc.associateWithNative(this, cc.Layer);
    },

    init: function(toUerName, tpoint, mpoint, kind) {
	    this._super();

	    this._canSend = true;
	    this._toUser = toUerName;
	    this._mesRoot = mpoint;
	    this._kind = kind;

	    this._bg = cc.Sprite.create(s_char_rect);
	    this._bg.setPosition(cc.p(134, 18));
	    this.addChild(this._bg);

	    // 定义输入框,对输入框加入键盘回车动作
	    this._box = cc.EditBox.create(cc.size(210, 18));
	    this._box.setText("想向'" + toUerName + "'说什么呢");
	    this._box.setPosition(30, 11);
	    this._box.setBgClr(cc.c3(255, 255, 255));
	    this._box.setFontColor(cc.c3(100, 100, 100));
	    this._box.setBorderClr(cc.c3(255, 255, 255));
	    this._box.setFontSize(12);
	    this._box.setFunction("keydown", function (event) {
	        if (event.keyCode == 13) {
	            GLOBAL.chatD.sendMessage();
	        }
	    });


	    this._box.setFunction("click", function (event) {
	        GLOBAL.chatD._box.setText("");
	        GLOBAL.chatD._box.setColor(cc.c3(30, 30, 30));
	        GLOBAL.chatD._box.setBgClr(cc.c3(255, 255, 255));
	    });

	    this.addChild(this._box);


	    // 定义表情菜单
	    var faceButton = cc.MenuItemImage.create(s_face, s_face2, s_face, this.faceList, this);
	    faceButton.setPosition(cc.p(17, 18));
        // 定义回车
	    var crButton = cc.MenuItemImage.create(s_cr, s_cr, s_cr,this.sendMessage, this);
	    crButton.setPosition(cc.p(250, 18));

	    // 将所有的按钮加到菜单容器里面
	    var menu = cc.Menu.create(faceButton, crButton);
	    menu.setPosition(cc.p(0, 0));
	    this.addChild(menu);

	    this.setPosition(tpoint);

	    GLOBAL.mainLayer.addChild(this);

		return true;
	},

	onEnter: function () {
	    cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -15, true);
	    this._touchEnabled = true;
	    this._super();
	},

	onExit: function () {
	    cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
	    this._touchEnabled = false;
	    this._super();
	},

	faceList: function () {
	    alert("jsdk");
	},

	sendMessage: function () {
	    if (this._box.getText() == '')
	        return;

	    if (this._canSend) {
	        var str = this._box.getText();
	        this.addMessage(str);
	        var toUser = this._toUser;
	        str = ' To' + toUser + ':'+ str;
	        // cc.log(str);
	        $.ajax({
	            type: "GET",
	            url: genPushMessageUrl("all", 0, str),
	            success: function (data) {
	                // cc.log(data);
	            }
	        });
	        str = '[' + '我' + ']:' + str;
	        //这里整个字符串不需要加回车
	        GLOBAL.inputD.view.addWord(str);
	    }
	    else {
	        var str = "[系统]：艹，别按那么快，老子不用休息啊";
	        this.view.addWord(str);
	    }

	    this._box.setText("");
	},


	touchRect: function () {
	    return this._bg.getBoundingBoxToWorld();
	},


	onTouchBegan: function (touch, event) {

	    if (cc.Rect.CCRectContainsPoint(this.touchRect(), touch.getLocation())) {

	    }
	    else {
	        this.removeSelf();
	    }
	},

	removeSelf: function () {
	    this.removeFromParent(true);
	},

    /**
     * [addMessage 上面显示消息 5秒自动消失，超过3条则消失]
     * 需要this._mesRoot坐标
     * @param  {[string]} mes        [文本信息]
     */

	addMessage: function (mes) {
	    var tm = TextBox.create(mes, this._kind);

	    for (var i = 0; i < this._mesList.length; i++) {
	        var actionBy = cc.MoveBy.create(0.5, cc.p(0, tm.getHeight() + 30));
	        this._mesList[i].runAction(actionBy);
	    }
        
	    this.addChild(tm);
	    tm.setPosition(this._mesRoot);
	    this._mesList.push(tm);
	    if (this._mesList.length >3) {
	        this.shiftOne();
	    }
	},

	shiftOne:function(){
	    var tm = this._mesList.shift();	
	    var fadeOut = cc.FadeOut.create(0.5);
	    var cellf = cc.CallFunc.create(function(){
	        tm.removeFromParent(true);
	    }, this);
	    var fadeS = cc.Sequence.create(fadeOut, cellf);
	    tm.runAction(fadeS);
	},
});

ChatPanel.create = function(toUerName, tpoint, mpoint, kind) {
	var ret = new ChatPanel();
	if (ret && ret.init(toUerName, tpoint, mpoint, kind)) return ret;
	return null;
}
