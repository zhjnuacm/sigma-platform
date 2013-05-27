var myButton = cc.Menu.extend({

    registerWithTouchDispatcher: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
    },
});

myButton.create = function () {

    var ret = new myButton();
    if (arguments.length == 0) {
        ret.initWithItems(null, null);
    } else if (arguments.length == 1) {
        if (arguments[0] instanceof Array) {
            ret.initWithArray(arguments[0]);
            return ret;
        }
    }
    ret.initWithItems(arguments);
    return ret;
};