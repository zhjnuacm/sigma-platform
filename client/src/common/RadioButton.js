var RadioButton = cc.Layer.extend({
	_chooseItems : null,
	_answer : null,
	_answerLabel: null,

	init: function (options, position) {
		var self = this;
		self._chooseItems = new Array();
		var size = cc.Director.getInstance().getWinSize();
		self._answerLabel = [ "A", "B", "C", "D", "E", "F" ];
		for (var i = 0; i < options.length; i++) {
			self._chooseItems[i] = self.getMenuItemFromTitle(
					self._answerLabel[i] + " : " + options[i],
					self.optionsClickCallBack, self);
			self._chooseItems[i].setAnchorPoint(cc.p(0, 0));
			self._chooseItems[i].optionId = i;
		}
		//var menu = myButton.create(self._chooseItems);
		var menu = cc.Menu.create(self._chooseItems);
		//menu.setHandlerPriority(this.getTouchPriority() - 1);
		menu.alignItemsVerticallyWithPadding(5);
		self.addChild(menu);
		menu.setPosition(cc.p(0, 0));
		this.setPosition(position);
		self._chooseItems[0].activate();
		self._answer = "A";
		return true;
	},

	getMenuItemFromTitle : function(title, select_callback, target) {
	    var t1 = cc.LabelTTF.create(title, s_yahei, 12);
	    t1.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
	    t1.setColor(cc.c3(140, 140, 140));
		var p1 = cc.MenuItemLabel.create(t1, select_callback, target);
		return p1;
	},

	getAnswer : function() {
		return this._answer;
	},

	optionsClickCallBack : function(sender) {
		var self = this;
		sender.setColor(cc.c3b(170, 0, 0));
		self._answer = self._answerLabel[sender.optionId];
		for ( var i = 0; i < self._chooseItems.length; i++) {
			if (i == sender.optionId)
				continue;
			self._chooseItems[i].setColor(cc.c3b(100, 100, 100));
		}
	},
});

RadioButton.create = function(options, position) {
	var ret = new RadioButton();
	if (ret && ret.init(options, position))
		return ret;
	return null;
};