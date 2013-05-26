
var DialogBackground = cc.LayerColor.extend({
    _width: 0,
    _height: 0,
    sprite: null,
    closeItem: null,
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


DialogBackground.create = function (pw, ph) {
    var ret = new DialogBackground();
    if (ret && ret.init(pw, ph)) return ret;
    return null;
}

var DialogView = cc.Layer.extend({
    layer: null,
    _width: 0,
    _height: 0,
    _oPoint: null,

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

    init: function (pw, ph, oPoint) {//对话框左下角

        this._super();
        this._width = pw;
        this._height = ph;
        this._oPoint = oPoint;
        this.setAnchorPoint(cc.p(0, 0));
        this.setPosition(cc.p(-0.5 * pw, 60));
        this.layer = DialogBackground.create(pw, ph);
        this.setTouchEnabled(true);
        this.setMouseEnabled(true);
        this.addClose();
        this.addChild(this.layer);
        return true;
    },

    onCloseMyself: function () {

        this.removeFromParent(true);
    },

    addClose: function () {

        this.closeItem = cc.MenuItemImage.create(s_dlg[0]["res"], s_dlg[1]["res"], this.onCloseMyself, this);
        //closeItem.setAnchorPoint(cc.p(0.5, 0.5));
        this.closeButton = myButton.create(this.closeItem);
        this.closeButton.setPosition(cc.p(this._width -15, this._height - 10));
        this.closeButton.setTouchPriority(this.getTouchPriority() - 1);
        this.addChild(this.closeButton, 5);

        var backgroundButton = cc.Scale9Sprite.create(s_dlg[0]["res"]);
        var backgroundHighlightedButton = cc.Scale9Sprite.create(s_dlg[1]["res"]);

        var titleButton = cc.LabelTTF.create("", "Marker Felt", 30);

        titleButton.setColor(cc.c3(255, 255, 255));

    //    alert(this.getTouchPriority());
        this.closeItem = cc.ControlButton.create(titleButton, backgroundButton);
        this.closeItem.setBackgroundSpriteForState(backgroundHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
        this.closeItem.setTitleColorForState(cc.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);

        //controlButton.setAnchorPoint(cc.p(0.5, 1));
        this.closeItem.setPosition(cc.p(this.layer._width - 10, this.layer._height - 8));
        this.closeItem.setDefaultTouchPriority(this.getTouchPriority() - 1);
  //      alert(this.closeItem.getDefaultTouchPriority());
        this.addChild(this.closeItem);

        this.closeItem.addTargetWithActionForControlEvent(this, this.onCloseMyself, cc.CONTROL_EVENT_TOUCH_DOWN);

    },

    setPosition: function (point) {
        this._super(point);
    },

    onTouchBegan: function (touch, event) {

        var starx = this._oPoint.x + this.getPositionX(), stary = this._oPoint.y + this.getPositionY()-90;
        var endx = this._oPoint.x + this.getPositionX() + this._width, endy = this._oPoint.y + this.getPositionY() + this._height-90;
        var x = touch.getLocation().x, y = touch.getLocation().y;


        //alert(starx + ' ' + endx + '\n' + stary + ' ' + endy);
        //alert(this._oPoint.x + ' ' + this._oPoint.y);
        //alert(this.getPositionX() + ' ' + this.getPositionY());
        //alert(touch.getLocation().x + "  " + touch.getLocation().y);

        if (x >= starx && x <= endx && y >= stary && y <= endy) {
            //对话框内容
            alert("Yes!");
        }
        else {
            this.onShake();
        }
        return true;
    },

    onEnter: function () {
        this._super();
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
        //alert(this.getTouchPriority());
    },

    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },

    onShake: function () {

        //this.removeFromParent(true);
        this.runAction(this.actionShake);
    },
});


DialogView.create = function (pw, ph, po) {
    var ret = new DialogView();
    if (ret && ret.init(pw, ph, po)) return ret;
    return null;
};