var TextBox = cc.LayerColor.extend({
    _h: null,
    //初始化

    init: function (mes, kind) {
        var cMes = Message.create(mes, 22, 12, 0);
        this._h = cMes._height;
        //文字对话框宽度固定为175
        this._super(cc.c4b(255, 255, 255, 255), 175, this._h);//继承父类的init()函数初始化该图层
        this.initborder(175, this._h, kind);
        this.addWord(cMes);
        return true;
    },

    initborder: function (w, h, kind) {
        var tbTopl = cc.Sprite.create(s_TBtopleft);
        tbTopl.setAnchorPoint(cc.p(0,0));
        tbTopl.setPosition(cc.p(0, h-1));

        var tbTopr = cc.Sprite.create(s_TBtopright);
        tbTopr.setAnchorPoint(cc.p(0, 0));
        tbTopr.setPosition(cc.p(w - 9, h-5));

        var tbBotton;
        if (kind == 0) {
            tbBotton = cc.Sprite.create(s_TBbottonleft);
        } else {
            tbBotton = cc.Sprite.create(s_TBbuttonright);
        }
        tbBotton.setAnchorPoint(cc.p(0, 1));
        tbBotton.setPosition(cc.p(-1, +1));

        var tbRight = cc.Sprite.create(s_TBright);
        tbRight.setScaleY((h - 4)/ 10);
        tbRight.setAnchorPoint(cc.p(0, 0));
        tbRight.setPosition(cc.p(w, 0));

        this.addChild(tbTopl);
        this.addChild(tbTopr);
        this.addChild(tbBotton);
        this.addChild(tbRight);

        //产生的框

        var fadeOut = cc.FadeOut.create(0.5);
        var da = cc.DelayTime.create(5);
        var cellf = cc.CallFunc.create(function () {
            this.removeFromParent(true);
        }, this);
        var fadeS = cc.Sequence.create(da, fadeOut, cellf);
        this.runAction(fadeS);
        return true;
    },

    addWord: function (mes) {
        var ccMes = cc.LabelTTF.create(mes.getString(), 'Liberation Mono', 12, cc.size(174, 16), cc.TEXT_ALIGNMENT_LEFT);
        ccMes.setColor(cc.c3(30, 30, 30));
        var h = mes.getHeight()- 14.4 + 2;
        ccMes.setPosition(cc.p(96, h));
        this.addChild(ccMes);
    },

    getHeight: function () {
        return this._h;
    },

});


TextBox.create = function (mes, kind) {
    var ret = new TextBox();
    if (ret && ret.init(mes, kind)) return ret;
    return null;
};
