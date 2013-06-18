
/**
 * @ Jopix  信息类
 * @ 2013年4月5日 22:41:27
 * @ [将字符串自动换行] 长度为maxlenth
 * @ 并保持信息所占的高度
 */

var Message = function () {
    this._string;
    this._height;
    this._lk;
    this._fSize;

    /**
    * [字符串换行]
    * @param  {[string]} String            [要转换的字符串]
    * @param  {[num]} maxLenth             [每行字符数]
    * @param  {[num]} fontSize             [字体大小]
    * @param  {[bool]} isTable             [是否空两个]
    */

    this.init = function (String, maxLenth, fontSize) {
        // alert(String);
        // /<summary>获得字符串实际长度，中文2，英文1</summary>
        // /<param name="str">要获得长度的字符串</param>
        this._string = '';
        this._lk = 1;
        this._fSize = fontSize * 1.2;
        var realLength = 0, len = String.length, charCode = -1, b = 0, k = maxLenth;
        for (var i = 0; i < len; i++) {
            charCode = String.charCodeAt(i);
            if (charCode < 299)
                realLength += 1;
            else
                realLength += 2;

            if (realLength > k) {
                this._string += String.substring(b, i);
                this._string += "\n";
                b = i;
                k += maxLenth;
                this._lk++;
            }
        }
        this._string += String.substring(b, len);
        this._string += "\n";
        this._height = this._lk * this._fSize;
        return true;
    };


    this.init2 = function (String, maxLenth, fontSize) {
        // alert(String);
        // /<summary>获得字符串实际长度，中文2，英文1</summary>
        // /<param name="str">要获得长度的字符串</param>
        this._string = '';
        this._lk = 1;
        this._fSize = fontSize * 1.2;

        var realLength = 0, len = String.length, charCode = -1, b = 0, k = maxLenth;
        for (var i = 0; i < len; i++) {
            charCode = String.charCodeAt(i);
            if (charCode < 299)
                realLength += 1;
            else
                realLength += 2;

            if (realLength > k) {
                this._string += String.substring(b, i);
                this._string += "\n    ";
                //alert(newStr);
                realLength += 4;
                b = i;
                k += maxLenth;
                this._lk++;
            }
        }
        this._string += String.substring(b, len);
        this._string += "\n";
        this._height = this._lk * this._fSize;
        return true;
    };

    this.getString = function () {
        return this._string;
    };
    this.getHeight = function () {
        return this._height;
    }
};


/**
* [字符串换行]
* @param  {[string]} String            [要转换的字符串]
* @param  {[num]} maxLenth             [每行字符数]
* @param  {[num]} fontSize             [字体大小]
* @param  {[num]} form                 [是否空两个]
*        如果 form = 0; 正常换行
*             form = 1; 首行空两格
*             form = 2; 除首行之外每行空两格
*
* @return {[string]} ret               [信息类]
*/


Message.create = function (String, maxLenth, fontSize, form) {
    var ret = new Message();
    switch (form) {
        case 0:
            if (ret && ret.init(String, maxLenth, fontSize)) {
                return ret;
            }
            return null;
            break;

        case 1:
            if (ret && ret.init(String + "    ", maxLenth, fontSize)) {
                return ret;
            }
            return null;
            break;

        case 2:
            if (ret && ret.init2(String, maxLenth, fontSize)) {
                return ret;
            }
            return null;
            break;

        default:
            throw "Message.create(): Argument must be non-nil ";
            break;
    }
}



/**
* [单个信息显示]
* @param  {[string]} mes               [文本信息]
* @param  {[num]} kind                 [左右框]
*        如果 kind = 0; 向左
*             kind = 1; 向右
* @return {[string]} ret               [信息类]
*/


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
        tbTopl.setAnchorPoint(cc.p(0, 0));
        tbTopl.setPosition(cc.p(0, h - 1));

        var tbTopr = cc.Sprite.create(s_TBtopright);
        tbTopr.setAnchorPoint(cc.p(0, 0));
        tbTopr.setPosition(cc.p(w - 9, h - 5));

        var tbBotton;
        if (kind == 0) {
            tbBotton = cc.Sprite.create(s_TBbottonleft);
        } else {
            tbBotton = cc.Sprite.create(s_TBbuttonright);
        }
        tbBotton.setAnchorPoint(cc.p(0, 1));
        tbBotton.setPosition(cc.p(-1, +1));

        var tbRight = cc.Sprite.create(s_TBright);
        tbRight.setScaleY((h - 4) / 10);
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
        var h = mes.getHeight() - 14.4 + 2;
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


/**
* [列表信息]
* @param  {[string]} position          [消息显示位置]
* 这个列表每个信息只显示5面，没列只显示3个，超过的自动消失。
* @return {[string]} ret               [信息类]
*/

var MessageList = cc.Layer.extend({








});


MessageList.create = function (position) {
};
