var SystemFunction = cc.Layer.extend({

	init: function() {
		this._super();
		return true;
	}
});

SystemFunction.create = function() {
	var ret = new SystemFunction();
	if (ret && ret.init()) return ret;
	return null;
}

