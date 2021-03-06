﻿/**
 * @ Jopix  信息墙
 * @ 2013年4月6日 22:41:27
 * @ 显示信息的窗口
 */

var ViewPanel = cc.LayerColor.extend({

    _height: null,
    _weight: null,
    _page: null,
    _sLine: null,
    _content: null,

    //初始化
    init: function (color, w, h) {
        this._super(cc.c4b(color.r, color.g, color.b, color.a), w, h);//继承父类的init()函数初始化该图层
        //申请遮罩容器

        var content = cc.ScrollView.create();
        content.setViewSize(cc.SizeMake(330, 140));
        content.setPosition(cc.p(5, 42));
        content.setDirection(this);

        //初始化charpage
        this._page = CharPage.create();
        content.addChild(this._page);
        this.addChild(content);

        //初始化滚动条
        this._sLine = ScrolBor.create(s_ScrolLine, s_ScrolPoint, this._page);
        this.addChild(this._sLine);
        this._sLine.setPosition(cc.p(330, 22));

        return true;
    },

    addWord: function (String) {
        //加入信息到page里面
        var mes = Message.create(String, 48, 12, 2);
        this._page.addMessage(mes);
        this._sLine.setButtom();
    }


});

ViewPanel.create = function (color, w, h) {
    var ret = new ViewPanel();
    if (ret && ret.init(color, w, h)) return ret;
    return null;
};


/**
 * @ Jopix  聊天记录显示层
 * @ 2013年4月5日 22:41:27
 * @ 里面信息的那个层，负责更新信息位置，添加删除信息，处理滚动操作
 */

var CharPage = cc.Layer.extend({
    _y: null,
    _sumIndex: null,
    _message: null,

    init: function () {
        this._super();
        this._y = 0;
        this._sumIndex = 0;
        this.setPosition(cc.p(5, 100));
        this._message = cc.LabelTTF.create("", 'Liberation Mono', 12, cc.size(500, 140), cc.TEXT_ALIGNMENT_LEFT);
        this._message.setAnchorPoint(cc.p(0, 1));
        this._message.setPosition(cc.p(5, this._y));
        this.addChild(this._message);
        return true;
    },

    //添加信息，动态调整
    addMessage: function (mes) {

        var s = this._message.getString();
        s += mes.getString();
        this._y -= mes._height;

        if (this._y < -135) {
            this.setPositionY(-this._y - 36);
        }
        else if (this._y < -600) {
            var k = 8, i = 0;
            while (k-- > 0) {
                i = s.indexOf("\n");
                s = s.slice(i + 1, s.length());
            }
            this._message._height += 5 * 14.4;
            this._y += 5 * 14.4;
            this.setPositionY(-this._y - 36);
        }
        this._message.setString(s);
    },

    setPositionInpercent: function (per) {
        if (this._y <= -135) {
            this.setPositionY((-this._y - 135) * per / 105 + 100);
        }
    }
});


CharPage.create = function () {
    var ret = new CharPage();
    if (ret && ret.init()) return ret;
    return null;
};


/**
 * @ Jopix  滚动条
 * @ 2013年4月5日 22:41:27
 */
var ScrolBor = cc.Sprite.extend({

    _viewPage: null,
    _touchBegan: false,
    _touchEnabled: true,
    _touchDraw: false,
    _tx: null,
    _isTouch: null,
    point: null,

    ctor: function () {
        this._super();
    },

    init: function (s_l, s_p, page) {
        this._super();
        this._viewPage = page;
        this._isTouch = true;
        this.initWithFile(s_l);
        this.setAnchorPoint(cc.p(0.5, 0));
        this.point = cc.Sprite.create(s_p);
        this.point.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.point);
        this.point.setPosition(cc.p(2, 102));
        return true;
    },

    onEnter: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -11, true);
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

    onTouchBegan: function (touch, event) {
        if (cc.Rect.CCRectContainsPoint(this.touchRect(), touch.getLocation())) {
            this._touchBegan = true;

            var touch = touch.getLocation();
            var pButten = this.point.getPositionY() + 64;
            this._tx = touch.y - this.point.getPosition().y;
            if (touch.y >= pButten && touch.y <= pButten + 7) {
                this._touchDraw = true;
            } else {
            }
            return true;
        }
        return false;
    },


    onTouchMoved: function (touch, event) {
        if (this._touchDraw) {
            var y = touch.getLocation().y;

            if (y <= 170 && y > 65) {
                this.point.setPositionY(y - this._tx);
                this._viewPage.setPositionInpercent(170 - y);
            }
        }
    },

    onTouchEnded: function (touch, event) {
        if (this._touchBegan) {
            this._touchBegan = false;
            this._touchDraw = false;
        }
    },

    setButtom: function () {
        this.point.setPositionY(2);
    },

    setIsTouch: function (enable) {
        this._isTouch = enable;
    },
});


ScrolBor.create = function (s_l, s_p, page) {
    var ret = new ScrolBor();
    if (ret && ret.init(s_l, s_p, page)) return ret;
    return null;
};
