
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
        this._height = Math.ceil(this._height);
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
        this._height = Math.ceil(this._height);
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


var TextBox = cc.Layer.extend({
    _height: null,
    _bgres: null,
    //初始化
    init: function (mes, kind) {
        this._bgres = new Array();
        var cMes = Message.create(mes, 22, 12, 0);
        this._height = cMes._height;
        //文字对话框宽度固定为175

        this.initborder(175, this._height, kind);
        this.addWord(cMes);
        return true;
    },

    initborder: function (w, h, kind) {

        var tbMid = cc.Sprite.create(s_TBmid);
        tbMid.setScale(w/16, h/8);
        tbMid.setAnchorPoint(cc.p(0, 0));
        this.addChild(tbMid);
        this._bgres.push(tbMid);

        var tbTop = cc.Sprite.create(s_TBtop);
        tbTop.setAnchorPoint(cc.p(0, 0));
        tbTop.setPosition(cc.p(0, h));
        this.addChild(tbTop);
        this._bgres.push(tbTop);

        var tbBotton;
        if (kind == 0) {
            tbBotton = cc.Sprite.create(s_TBbottonleft);
        } else {
            tbBotton = cc.Sprite.create(s_TBbuttonright);
        }
        tbBotton.setAnchorPoint(cc.p(0, 1));
        tbBotton.setPosition(cc.p(-1, 0));
        this.addChild(tbBotton);
        this._bgres.push(tbBotton);

        var tbRight = cc.Sprite.create(s_TBright);
        tbRight.setScaleY((h - 4) / 10);
        tbRight.setAnchorPoint(cc.p(0, 0));
        tbRight.setPosition(cc.p(w - 2, 0));
        this.addChild(tbRight);
        this._bgres.push(tbRight);

        //产生的框
        return true;
    },

    addWord: function (mes) {
        var ccMes = cc.LabelTTF.create(mes.getString(), 'Liberation Mono', 12, cc.size(174, 16), cc.TEXT_ALIGNMENT_LEFT);
        ccMes.setColor(cc.c3(30, 30, 30));
        var h = mes.getHeight() - 14.4 + 2;
        ccMes.setPosition(cc.p(96, h));
        this.addChild(ccMes);

        var fadeOut = cc.FadeOut.create(0.5);
        var da = cc.DelayTime.create(5);
        var cellf = cc.CallFunc.create(function () {
            this.removeFromParent(true);
        }, this);
        var fadeS = cc.Sequence.create(da, fadeOut, cellf);
        ccMes.runAction(fadeS);
    },

    getHeight: function () {
        return this._height;
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
    _mesList: null,
    _mesRoot: null,
    _kind:0,

    init: function (position) {
        this._mesList = new Array();
        this._mesRoot = position;
        this.setPosition(position);
        return true;

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
        this.runIn(tm);

        this._mesList.push(tm);
        if (this._mesList.length > 3) {
            this.shiftOne();
        }
    },

    shiftOne: function () {
        var tm = this._mesList.shift();
        this.runOut(tm);
    },

    runIn: function (tm) {
        for (var i = 0; i < tm._bgres.length; i++) {
            var da = cc.DelayTime.create(5);
            var fadeOut = cc.FadeOut.create(0.5);
            var cellf = cc.CallFunc.create(function () {
                this._mesList.shift();
                tm.removeFromParent(true);
            }, this);
            var fadeS = cc.Sequence.create(da, fadeOut, cellf);
            tm._bgres[i].runAction(fadeS);
        }
    },

    runOut: function (tm) {
        for (var i = 0; i < tm._bgres.length; i++) {
            var fadeOut = cc.FadeOut.create(0.5);
            var cellf = cc.CallFunc.create(function () {
                tm.removeFromParent(true);
            }, this);
            var fadeS = cc.Sequence.create(fadeOut, cellf);
            tm._bgres[i].runAction(fadeS);
        }
    },
});


MessageList.create = function (position) {
    var ret = new MessageList();
    if (ret && ret.init(position)) {
        return ret;
    }
    return null;
};
