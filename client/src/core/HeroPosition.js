var HeroPosition = cc.Layer.extend({
	init: function() {
		this._super();
		return true;
	}
});

HeroPosition.create = function() {
	var ret = new HeroPosition();
	if (ret && ret.init()) return ret;
	return null;
}