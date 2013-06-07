
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

    actionShake : cc.Speed.create(cc.Repeat.create(
                cc.Sequence.create(
                cc.MoveBy.create(0.1, cc.p(1, 0)),
                cc.MoveBy.create(0.1, cc.p(0, 1)),
                cc.MoveBy.create(0.1, cc.p(-1, 0)),
                cc.MoveBy.create(0.1, cc.p(0, -1))),
                2),
                2
                ),
    closeButton: null,
    closeItem: null,

    init: function (pw, ph, oPoint) {

        this._super();
        this._width = pw;
        this._height = ph;
        this.setAnchorPoint(cc.p(0, 0));
        this.setPosition(oPoint);
        this.layer = DialogBackground.create(pw, ph);
        this.setTouchEnabled(true);
        this.setMouseEnabled(true);
        this.setKeyboardEnabled(true);
        this.addClose();
        this.addChild(this.layer);
        return true;
    },

    onCloseMyself: function () {

        this.removeFromParent(true);
    },
    boundaryDetect: function() {
    	var size = cc.Director.getInstance().getWinSize();
    	var starx = this._oPoint.x + this.getPositionX() - 22, stary = this._oPoint.y + this.getPositionY() - 32;
        var endx = this._oPoint.x + this.getPositionX() + this._width - 22, endy = this._oPoint.y + this.getPositionY() + this._height - 32;
        
        
    },
    addClose: function () {

        this.closeItem = cc.MenuItemImage.create(s_dlg[0]["res"], s_dlg[1]["res"], this.onCloseMyself, this);
    	this.closeButton = myButton.create(this.closeItem);
        //var rect = this.closeItem.getBoundingBoxToWorld();
        //cc.log(rect.size.width + ' ' + rect.size.height + ' ' + rect.origin.x + ' '+rect.origin.y );
    	this.closeButton.setPosition(cc.p(this._width - 15, this._height - 10));
        this.addChild(this.closeButton);
    },
    
    addButtons : function (title,select_callback,target)
    {
    	var t1 = cc.LabelTTF.create(title,s_yahei, 18);
    	t1.setColor(cc.c3b(0,255,0));
    	var p1 = cc.MenuItemLabel.create(t1,select_callback,target);
    	
    	var t2 = cc.LabelTTF.create("取消",s_yahei, 18);
    	t2.setColor(cc.c3b(255,0,0));
    	var p2 = cc.MenuItemLabel.create(t2,this.onCloseMyself,this);
    	
    	var menu = cc.Menu.create(p1,p2);
    	menu.alignItemsHorizontallyWithPadding(this.layer._width*0.2);
    	menu.setPosition(cc.p(this.layer._width*0.5,30));
    	this.addChild(menu,2);
    },
    
    setPosition: function (point) {
        this._super(point);
    },

    onTouchBegan: function (touch, event) {

    	var point = this.getParent().convertToWorldSpace(this.getPosition());
    	
        var starx = point.x + this.getPositionX(), stary = point.y + this.getPositionY();
        
        var endx = starx + this._width, endy = stary + this._height;
        
        var x = touch.getLocation().x, y = touch.getLocation().y;
        
        //alert(starx + ' ' + endx + '\n' + stary + ' ' + endy + '\n' + x + ' '  + y + '\n' + this._oPoint.x + ' ' + this._oPoint.y
        //		+ '\n' + this.getPositionX() + ' ' + this.getPositionY());

        if (x >= starx && x <= endx && y >= stary && y <= endy) {
            //对话框内容
            //alert("Yes!");
        }
        else {
            this.onShake();
        }
        return true;
    },

    onEnter: function () {
        this._super();
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
        //cc.KeyboardDispatcher.getInstance().addDelegate(this);
        //alert(this.getTouchPriority());
    },

    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        //cc.KeyboardDispatcher.getInstance().removeDelegate(this);
        this._super();
    },

    onShake: function () {

        //this.removeFromParent(true);
        this.runAction(this.actionShake);
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
 * @return {[type]}
 */
DialogView.create = function (pw, ph, po) {
    var ret = new DialogView();
    if (ret && ret.init(pw, ph, po)) return ret;
    return null;
};