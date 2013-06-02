var TextBox = cc.LayerColor.extend({

    //初始化
    init: function (mes, kind) {
        var h = mes._height;
        //文字对话框宽度固定为175
        this._super(cc.c4b(255,255,255,255), 174, h);//继承父类的init()函数初始化该图层
        this.initborder(174, h, kind);
        this.addWord(mes);
        return true;
    },

    initborder: function (w, h, kind) {
        var tbTopl = cc.Sprite.create(s_TBtopleft);
        tbTopl.setAnchorPoint(cc.p(0,0));
        tbTopl.setPosition(cc.p(0, h));

        var tbTopr = cc.Sprite.create(s_TBtopright);
        tbTopr.setAnchorPoint(cc.p(0, 0));
        tbTopr.setPosition(cc.p(w - 7, h-4));

        var tbBotton;
        if (kind == 0) {
            tbBotton = cc.Sprite.create(s_TBbottonleft);
        } else {
            tbBotton = cc.Sprite.create(s_TBbuttonright);
        }
        tbBotton.setAnchorPoint(cc.p(0, 1));
        tbBotton.setPosition(cc.p(0, 0));

        var tbRight = cc.Sprite.create(s_TBright);
        tbRight.setScaleY((h - 4)/ 10);
        tbRight.setAnchorPoint(cc.p(0, 0));
        tbRight.setPosition(cc.p(w, 0));

        this.addChild(tbTopl);
        this.addChild(tbTopr, 10);
        this.addChild(tbBotton);
        this.addChild(tbRight);
        return true;
    },

    addWord: function (mes) {
 
        mes.CCLable.setAnchorPoint(cc.p(0, 0.5));
        var h = mes._height- 14 + 2;
        mes.CCLable.setPosition(cc.p(12, h));
        this.addChild(mes.CCLable);
    }
});


TextBox.create = function (mes, kind) {
    var ret = new TextBox();
    if (ret && ret.init(mes, kind)) return ret;
    return null;
};