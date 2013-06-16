var ChatPanel = cc.Layer.extend({


	init: function() {
		this._super();
		return true;
	}



});

ChatPanel.create = function(toUerName) {
	var ret = new ChatPanel();
	if (ret && ret.init(toUerName)) return ret;
	return null;
}
