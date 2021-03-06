﻿
var DialogBackground = cc.LayerColor.extend({
    _width: 0,
    _height: 0,
    sprite: null,
    menu: null,

    init: function (pw, ph) {

        this._super(cc.c4(255,255,255,255), pw+1, ph+1);
        this._width = pw;
        this._height = ph;
        this.setAnchorPoint(cc.p(0, 0));

        var x = this.getPositionX(), y = this.getPositionY();
     
        var spriteCb = cc.Sprite.create(s_dlg[2]["res"]);
        spriteCb.setPosition(cc.p(x + this._width / 2 + 1, y - 3));
        spriteCb.setScaleX((this._width - 22) / 10);
        this.addChild(spriteCb);

        var spriteCl = cc.Sprite.create(s_dlg[3]["res"]);
        spriteCl.setPosition(cc.p(x - 1, y + this._height / 2 - 2));
        spriteCl.setScaleY((this._height - 11) / 10);
        this.addChild(spriteCl);

        var spriteClb = cc.Sprite.create(s_dlg[4]["res"]);
        spriteClb.setPosition(cc.p(x + 5, y - 1));
        this.addChild(spriteClb);

        var spriteClt = cc.Sprite.create(s_dlg[5]["res"]);
        spriteClt.setPosition(cc.p(x + 3, y + this._height - 2.5));
        this.addChild(spriteClt);

        var spriteCr = cc.Sprite.create(s_dlg[6]["res"]);
        spriteCr.setPosition(cc.p(x + this._width + 1.5, y + this._height / 2 - 2));
        spriteCr.setScaleY((this._height - 21) / 10);
        this.addChild(spriteCr);

        var spriteCrb = cc.Sprite.create(s_dlg[7]["res"]);
        spriteCrb.setPosition(cc.p(x + this._width - 3.3, y + 1));
        this.addChild(spriteCrb);

        var spriteCrt = cc.Sprite.create(s_dlg[8]["res"]);
        spriteCrt.setPosition(cc.p(x + this._width - 3.3, y + this._height - 5.5));
        this.addChild(spriteCrt);

        var spriteCt = cc.Sprite.create(s_dlg[9]["res"]);
        spriteCt.setPosition(cc.p(x + this._width / 2 - 1.5, y + this._height + 1.5));
        spriteCt.setScaleX((this._width - 17) / 10);
        this.addChild(spriteCt);

        return true;
    },
});

/**
 * [ ]
 * @param  {[type]} pw 对话框背景的宽
 * @param  {[type]} ph 对话框背景的高
 * @return {[type]}
 * 关于菜单问题： 凡是在对话框中add一个menu类的Child, tag利用this._menuTag设置， 之后都要调用一次addMenu 函数
 * 另外，如果还有除menu类以外的Child 添加tag， 请将tag设置在100 以上, 也就是0 ~ 100 用来设置menu类的tag
 */

DialogBackground.create = function (pw, ph) {
    var ret = new DialogBackground();
    if (ret && ret.init(pw, ph)) return ret;
    return null;
}

var DialogView = cc.Layer.extend({
    layer: null,
    _width: 0,
    _height: 0,
    _menuTag: 0,
    _isShake: false,
    
    actionShake : cc.Speed.create(cc.Repeat.create(
                cc.Sequence.create(
                cc.MoveBy.create(0.1, cc.p(1, 0)),
                cc.MoveBy.create(0.1, cc.p(0, 1)),
                cc.MoveBy.create(0.1, cc.p(-1, 0)),
                cc.MoveBy.create(0.1, cc.p(0, -1))),
                2),
                1
                ),
    closeButton: null,
    closeItem: null,

    init: function (pw, ph, oPoint) {

        this._super();
        this._width = pw;
        this._height = ph;
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(oPoint);
        this.layer = DialogBackground.create(pw, ph);
        this.setTouchEnabled(true);
        this.setMouseEnabled(true);
        this.setKeyboardEnabled(true);
        this.addChild(this.layer);
        this.addClose();
        return true;
    },
    
    addMenu: function() {
    	this._menuTag++;
    },
    
    
    onCloseMyself: function () {

        this.removeFromParent(true);
    },
    
    boundaryDetect: function() {
    	var size = cc.Director.getInstance().getWinSize();
    	var point = this.getParent().convertToWorldSpace(this.getPosition());
    	
    	var screenRect = cc.RectMake(0, 0, size.width, size.height);
    	var dialogRect = cc.RectMake(point.x, point.y, this._width, this._height);
    	
    	//cc.log(screenRect);
    	//cc.log(dialogRect);
    	if(cc.rectContainsRect(screenRect, dialogRect)){
    		cc.log("contain");
    	}
    	else {
    		var midPoint = cc.p(size.width / 2 - this._width / 2, size.height / 2 - this._height / 2);
    		//cc.log(midPoint);
    		var arPoint = this._parent.convertToNodeSpace(midPoint);
    		//cc.log(arPoint);
    		this.setPosition(arPoint);
    	}
    },
    addClose: function () {

        this.closeItem = cc.MenuItemImage.create(s_dlg_close_normal, s_dlg_close_select, this.onCloseMyself, this);
    	this.closeButton = cc.Menu.create(this.closeItem);
        //var rect = this.closeItem.getBoundingBoxToWorld();
        //cc.log(rect.size.width + ' ' + rect.size.height + ' ' + rect.origin.x + ' '+rect.origin.y );
    	this.closeButton.setPosition(cc.p(this._width - 15, this._height - 10));
        this.addChild(this.closeButton, 0, this._menuTag);
        this.addMenu();
    },
    
    addButtons : function (title,select_callback,target)
    {
    	var t1 = cc.LabelTTF.create(title,s_yahei, 12);
    	t1.setColor(cc.c3b(80,80,80));
    	var p1 = cc.MenuItemLabel.create(t1,select_callback,target);
    	
    	var t2 = cc.LabelTTF.create("取消",s_yahei, 12);
    	t2.setColor(cc.c3b(80,80,80));
    	var p2 = cc.MenuItemLabel.create(t2,this.onCloseMyself,this);
    	
    	var menu = cc.Menu.create(p1,p2);
    	menu.alignItemsHorizontallyWithPadding(this.layer._width*0.2);
    	menu.setPosition(cc.p(this.layer._width*0.7,26));
    	this.addChild(menu, 2, this._menuTag);
    	this.addMenu();
    },
    
    setPosition: function (point) {
//    	var size = cc.Director.getInstance().getWinSize();
//		var midPoint = cc.p(size.width / 2 - this._width / 2 + point.x, size.height / 2 - this._height / 2 + point.y);
//		//cc.log(midPoint);
//		var arPoint = this._parent.convertToNodeSpace(midPoint);
		//cc.log(arPoint);
		//this.setPosition(arPoint);
		
        this._super(point);
    },
    
    setTouchPriority: function(prority){
    	this._super(prority);
    	//this.closeButton.setTouchPriority(prority - 1);
    },
    onTouchBegan: function (touch, event) {

    	var point = this.getParent().convertToWorldSpace(this.getPosition());
    	
        var starx = point.x + this.getPositionX(), stary = point.y + this.getPositionY();
        
        var endx = starx + this._width, endy = stary + this._height;
        
        var x = touch.getLocation().x, y = touch.getLocation().y;
        
        //alert(starx + ' ' + endx + '\n' + stary + ' ' + endy + '\n' + x + ' '  + y + '\n'
        //		+ '\n' + this.getPositionX() + ' ' + this.getPositionY());
        if (x >= starx && x <= endx && y >= stary && y <= endy) {
            //对话框内容
            //alert("Yes!");
            return false;

        }
        else {
            //this.onShake();
        }
        return true;
    },

    onEnter: function () {
        this._super();
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
        this.scheduleOnce(this.setDialogMenuPriority, 1)
        this.scheduleOnce(this.boundaryDetect);
        //cc.KeyboardDispatcher.getInstance().addDelegate(this);
        //alert(this.getTouchPriority());
    },

    setDialogMenuPriority: function(){
    	var i;
        for(i = 0; i < this._menuTag; ++i){
        	var menu = this.getChildByTag(i);
        	menu.setHandlerPriority(this.getTouchPriority() - 1);
        }
    },
    
    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        //cc.KeyboardDispatcher.getInstance().removeDelegate(this);
        this._super();
    },

    onShake: function () {

        //this.removeFromParent(true);
    	if(!this._isShake)
    	{
    		this._isShake = true;
    		this.runAction(this.actionShake);
    		return ;
    	}
    	if(this.actionShake.isDone()){
    		this.runAction(this.actionShake);
    	}
    },
    onKeyDown: function (key){
    	if(key == 27)
    	{
    		this.onCloseMyself();
    		return true;
    	}
    	return false;
    }
});

/**
 * [ ]
 * @param  {[type]} pw 对话框的宽
 * @param  {[type]} ph 对话框的高
 * @param  {[type]} po 相对于父节点的位置
 * @param  {[type]} parent 父节点
 * @return {[type]}
 */
DialogView.create = function (pw, ph, po) {
    var ret = new DialogView();
    if (ret && ret.init(pw, ph, po)) return ret;
    return null;
};