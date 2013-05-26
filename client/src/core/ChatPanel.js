var ChatPanel = cc.Layer.extend({
	init: function() {
		this._super();
		return true;
	}
});

ChatPanel.create = function() {
	var ret = new ChatPanel();
	if (ret && ret.init()) return ret;
	return null;
}
