var Npc = cc.Sprite.extend({

    _title:null,
    _touchBegan: false,
    _touchEnabled: true,
    _touchDraw: false,
    _priority:null,
    _x:null,
    _y: null,

    ctor: function () {
        this._super();
    },

    init: function () {
        this._super();
        this.initWithFile(s_npc_1);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(cc.p(1750, 900));
        this._priority = 10,
        this._x += 200;
        this._y += 200;
        ////title
        //this._title = cc.LabelTTF.create("Œ“ «…µ±∆");
        //this._title.setAnchorPoint(cc.p(0.5, 0.5));
        //this._title.setPosition(cc.p(1750, 900 - 50));
        //this._title.setFontSize(11);
        //this.addChild(this._title);

        return true;
    },

    onEnter: function () {
        cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, 0);
        this._touchEnabled = true;
        this._super();
    },

    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._touchEnabled = false;
        this._super();
    },


    touchRect: function () {
        return this.getBoundingBoxToWorld();
    },

    setTouchEnabled: function (enable) {
        if (enable && !this._touchEnabled) {
            cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, 0);
            this._touchEnabled = true;
        }
        else if (!enable && this._touchEnabled) {
            cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
            this._touchEnabled = false;
        }
    },

    onTouchesBegan: function (touches, event) {
        if (cc.Rect.CCRectContainsPoint(this.touchRect(), touches[0].getLocation())) {
            this._touchBegan = true;

            var dig = DialogView.create(400, 200, touches[0].getLocation());
            dig.setTouchPriority(this._priority - 1);
            this.addChild(dig);
            this._priority -= 2;
            this._x += 20;
            this._y += 20;
        }
    },

    onTouchesMoved: function (touches, event) {
        if (this._touchDraw) {
        }
    },

    onTouchesEnded: function (touches, event) {

        if (this._touchBegan && (cc.Rect.CCRectContainsPoint(this.touchRect(), touches[0].getLocation()))) {
            this._touchBegan = false;
            this._touchDraw = false;
        }
    },

    setButtom: function () {
      //  this.point.setPositionY(2);
    }
});


Npc.create = function () {
    var ret = new Npc();
    if (ret && ret.init()) return ret;
    return null;
};
