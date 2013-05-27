
/**
 * 提示信息管理类，作为单例的来用
 * @type {[type]}
 */
var TipsManage = cc.Layer.extend({
    _tipsNumber:null,
    _winSize:null,
    init: function() {
        this._super();
        this._tipsNumber = 0 ;
        this._winSize = cc.Director.getInstance().getWinSize();
        return true;
    },
    addTip : function(information)
    {
        var position = cc.p(this._winSize.width / 2, this._winSize.height - this._tipsNumber++ * 20 - 100);
        var tipx = TipBox.create(information,position);
        this.addChild(tipx);
        tipx.run();

        if(this._tipsNumber > 5)
            this._tipsNumber = 0;
    }
});

TipsManage.create = function()
{
    var ret = new TipsManage();
    if(ret && ret.init())
    {
        return ret;
    }
    return ret;
}
