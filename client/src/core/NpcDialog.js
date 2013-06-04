function TaskDialog() {
	this._dialogView;
	this._taskId;

	this.init = function(position, priority, taskId, title, content, isDone) {
		var self = this;
		var width = 400;
		var height = 200;
		self._taskId = taskId;
		self._dialogView = DialogView.create(width, height, position);
		self._dialogView.setTouchPriority(priority - 1);

		if (isDone == true)
			self._dialogView.addButtons("接受任务", self.getTask, self);
		else if (isDone == false)
			self._dialogView.addButtons("完成任务", self.submitTask, self);
		var titleLabel = cc.LabelTTF.create("", s_yahei, 24);
		titleLabel.setString(title);
		titleLabel.setPosition(cc.p(width * 0.5, height - 20));
		titleLabel.setColor(cc.c3b(0, 0, 0));
		self._dialogView.addChild(titleLabel);

		var taskDescriptionViewPanel = cc.LabelTTF.create("", s_yahei, 14);
		taskDescriptionViewPanel.setPosition(cc.p(width * 0.5, height - 100));
		taskDescriptionViewPanel.setColor(cc.c3b(25, 25, 25));
		taskDescriptionViewPanel.setString(content);
		self._dialogView.addChild(taskDescriptionViewPanel);

		return true;
	}, this.getTask = function() {
		// ajax
		var self = this;
		$.ajax({
			type : "GET",
			url : genGetTaskUrl(self._taskId),
			success : function(data) {
				cc.log(data);
				self._dialogView.onCloseMyself();
			}
		});

	},

	this.submitTask = function() {
		var self = this;
		$.ajax({
			type : "GET",
			url : genSubmitTaskUrl(self._taskId),
			success : function(data) {
				cc.log(data);
				self._dialogView.onCloseMyself();
			}
		});

	}

}

TaskDialog.create = function(position, priority, npcId, title, content, isDone) {
	var ret = new TaskDialog();
	if (ret && ret.init(position, priority, npcId, title, content, isDone))
		return ret;
	return null;
}
function NpcTaskListDialog() {
	this._dialogView;
	this._npcId;
	this._taskList;
	this.init = function(position, priority, npcId, taskList, title) {
		var self = this;
		var width = 400;
		var height = 200;
		var title = title;
		self._dialogView = DialogView.create(width, height, cc.p(0, 0));
		self._dialogView.setTouchPriority(priority - 1);
		var titleLabel = cc.LabelTTF.create("", s_yahei, 24);
		titleLabel.setString(title);
		titleLabel.setPosition(cc.p(width * 0.5, height - 20));
		titleLabel.setColor(cc.c3b(0, 0, 0));
		self._dialogView.addChild(titleLabel);

		var p = new Array();
		for ( var i = 1; i < taskList.length; i++) {
			var taskConfig = taskList[i].split("|");
			var taskTile = taskConfig[0] + " : " + taskConfig[1]
					+ ((taskConfig[3] == "0") ? "(未接受)" : "(完成)");
			var t = cc.LabelTTF.create(taskTile, s_yahei, 16);
			t.setColor((taskConfig[3] == "0") ? cc.c3b(0, 50, 0) : cc.c3b(0,
					255, 0));

			p[i - 1] = cc.MenuItemLabel.create(t, self.createTaskDialog, self);
			p[i - 1].taskId = parseInt(taskConfig[0]);
			p[i - 1].title = taskConfig[1];
			p[i - 1].content = taskConfig[2];
			p[i - 1].isDone = taskConfig[3] == "0";
		}

		var menu = cc.Menu.create(p);
		menu.alignItemsVerticallyWithPadding(8);
		menu.setPosition(cc.p(width * 0.5, height - 80));
		self._dialogView.addChild(menu);
		return true;
	};
	this.createTaskDialog = function(sender) {
		var self = this;
		var dialog = TaskDialog.create(cc.p(0, 0), self._dialogView
				.getTouchPriority(), sender.taskId, sender.title,
				sender.content, sender.isDone);
		self._dialogView.addChild(dialog._dialogView);

		dialog._dialogView.setPosition(cc.p(-5, -5));
	}
}

NpcTaskListDialog.create = function(position, priority, npcId, taskList, title) {
	var ret = new NpcTaskListDialog();
	if (ret && ret.init(position, priority, npcId, taskList, title))
		return ret;
	return null;
}
