
/**
 * [TipBox 用来显示一个提示信息]
 * @type {[type]}
 */
var TipBox = cc.Layer.extend({
    tip: "未定义的信息",
    _tLable:null,
    init:  function(information , position) {
        this._super();
        this._tLable = cc.LabelTTF.create(information, "Arial", 20);
        this._tLable._color = cc.black();
        this.addChild(this._tLable, 2);

        return true;
    },
    run : function()
    {
        this._tLable.runAction(cc.Sequence.create(
        cc.ScaleTo.create(1, 0.5), cc.CallFunc.create(this.callback,this)));
    },

    callback: function(node) {

        // issue 14  这里需要清理内存
        // 
        this.setVisible(false);
    }
});

TipBox.create = function(information , position)
{
    var ret = new TipBox();
    if(ret && ret.init(information,position))
    {
        ret.setPosition(position);
        return ret;
    }
    return null;
}
