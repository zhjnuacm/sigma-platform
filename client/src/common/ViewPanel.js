var ViewPanel = cc.LayerColor.extend({

    _height: null,
    _weight: null,
    _page: null,
    _sLine: null,
    _content:null,

    //初始化
    init: function (color, w, h) {
        this._super(cc.c4b(color.r, color.g, color.b, color.a), w, h);//继承父类的init()函数初始化该图层
        //申请遮罩容器

        var content = cc.ScrollView.create();
        content.setViewSize(cc.SizeMake(330, 140));
        content.setPosition(cc.p(5, 42));
        content.setDirection(this);
        this.setTouchEnabled(true);

        //初始化charpage
        this._page = CharPage.create();
        content.addChild(this._page);
        this.addChild(content);

        //初始化滚动条
        this._sLine = ScrolBor.create(s_ScrolLine, s_ScrolPoint, this._page);
        this.addChild(this._sLine);
        this._sLine.setPosition(cc.p(330, 22));
        this._sLine.setTouchEnabled(true);
      
        return true;
    },

    addWord: function (user, String) {
        //加入信息到page里面
        var mes = new Message();
        //String = "[" + user + "]：" + String;
        String = user;
        mes.init(String, 52);
        this._page.addMessage(mes);
        this._sLine.setButtom();

        //var mes = new Message();
        //mes.init2(String, 23);
        //var tb = TextBox.create(mes, 1);
        //this.addChild(tb);
        //tb.setPosition(cc.p(-400, 300));

    }
});

ViewPanel.create = function (color, w, h) {
    var ret = new ViewPanel();
    if (ret && ret.init(color, w, h)) return ret;
    return null;
};

//里面信息的那个层，负责更新信息位置，添加删除信息，处理滚动操作
var CharPage = cc.Layer.extend({
    _y: null,
    _sumIndex: null,
    _tag:1222,

    init: function () {
        this._super();
        this._y = 0;
        this._sumIndex = 0;
        this.setPosition(cc.p(5, 100));

        return true;
    },
    //添加信息，动态调整
    addMessage: function (mes) {

        mes.CCLable.setPosition(cc.p(5, this._y));
        mes.CCLable.setAnchorPoint(cc.p(0, 1));
        mes.CCLable.setTag(this._tag);
        this._y -= mes._height;
        this._y -= 5;

        this.addChild(mes.CCLable);

        if (this._y < -140) {
            this.setPositionY(-this._y - 40);

        }
        else if (this._y < -600) {

            var node = this.getChildByTag(this._tag);
            var children = node.getChildren();
            this.removeChild(children[0], true);
            var cell, pos;
            alert(children.length);
            for (var i = 1; i < children.length; i++) {
                cell = children[i];
                pos.getPosition();
                cell.setPosition(cc.p(pos.x, pos.y));
            }
        }
    },

    setPositionInpercent: function (per) {

        if (this._y <= -140) {
            this.setPositionY((-this._y - 140) * per / 100 + 100);
        }
    }
});


CharPage.create = function () {
    var ret = new CharPage();
    if (ret && ret.init()) return ret;
    return null;
};


//滚动条
var ScrolBor = cc.Sprite.extend({

    _viewPage:null,
    _touchBegan: false,
    _touchEnabled: true,
    _touchDraw:false,
    _tx: null,

    point: null,

    ctor: function () {
        this._super();
    },

    init: function (s_l, s_p, page) {
        this._super();
        this._viewPage = page;
        this.initWithFile(s_l);
        this.setAnchorPoint(cc.p(0.5, 0));
        this.point = cc.Sprite.create(s_p);
        this.point.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.point);
        this.point.setPosition(cc.p(2, 102));
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
  
            var touch = touches[0].getLocation();
            var pButten = this.point.getPositionY() + 64;
            this._tx = touch.y - this.point.getPosition().y;
            if (touch.y >= pButten && touch.y <= pButten + 7) {
                this._touchDraw = true;
            } else {
            }
        }
    },


    onTouchesMoved: function (touches, event) {
        if (this._touchDraw) {
            var y = touches[0].getLocation().y;
            
            if (y <= 170 && y > 70) {
                this.point.setPositionY(y - this._tx);
                this._viewPage.setPositionInpercent(170 - y);
            }
        }
    },

    onTouchesEnded: function (touches, event) {
        if (this._touchBegan) {
            this._touchBegan = false;
            this._touchDraw = false;
        }
    },

    setButtom: function () {
        this.point.setPositionY(2);
    }

});


ScrolBor.create = function (s_l, s_p, page) {
    var ret = new ScrolBor();
    if (ret && ret.init(s_l, s_p, page)) return ret;
    return null;
};
