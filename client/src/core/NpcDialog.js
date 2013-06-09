function TaskDialog() {
	this._dialogView;
	this._taskId;
	this._width;
	this._height;
	this._answer;
	this.init = function(position, priority, taskId, title, content, isDone,
			taskType) {
		var self = this;
		self._width = 500;
		self._height = 300;
		self._taskId = taskId;
		self._dialogView = DialogView.create(self._width, self._height,
				position);
		self._dialogView.setTouchPriority(priority - 1);
		var titleLabel = cc.LabelTTF.create("", s_yahei, 24);
		titleLabel.setString(title);
		titleLabel.setPosition(cc.p(self._width * 0.5, self._height - 20));
		titleLabel.setColor(cc.c3b(0, 0, 0));
		self._dialogView.addChild(titleLabel);
		var taskDescriptionViewPanel = cc.LabelTTF.create("", s_yahei, 14);
		taskDescriptionViewPanel.setPosition(cc.p(self._width * 0.5,
				self._height - 100));
		taskDescriptionViewPanel.setColor(cc.c3b(25, 25, 25));
		var contentsSplit = content.split("^");
		taskDescriptionViewPanel.setString(contentsSplit[0]);
		self._dialogView.addChild(taskDescriptionViewPanel);
		switch (taskType) {
		case 0: // normal task
			self.initNormalTask(title, content, isDone);
			break;
		case 1: // choose task
			self.initChooseTask(title, contentsSplit[1]);
			break;
		case 2:
			self.initFullTask();
			break;
		case 3:
			break;
		default:
			break;
		}
		return true;
	}, this.initNormalTask = function(title, content, isDone) {
		var self = this;
		self._answer = "done";
		isDone ? self._dialogView.addButtons("接受任务", self.getTask, self)
				: self._dialogView.addButtons("完成任务", self.submitTask, self);

	}, this.initChooseTask = function(title, content) {
		var self = this;
		var choose = RadioButton.create(content.split("&"), cc.p(
				self._width * 0.5, self._height - 200));
		self._dialogView.addChild(choose);

		self._dialogView.addButtons("提交任务", function() {
			self._answer = choose.getAnswer();
			// cc.log(choose.getAnswer());
			self.submitTask();
		}, self);

	},

	this.initFullTask = function() {
		var self = this;
		var input = cc.EditBox.create(cc.size(150, 25));
		input.setText("请输入答案");
		input.setPosition(cc.p(self._width * 0.5 - 75, self._height - 200));
		input.setBgClr(cc.c3b(255, 0, 0));
		input.setFontColor(cc.c3b(251, 250, 0));
		input.setBorderClr(cc.c3b(55, 250, 120));
		input.setFontSize(14);
		self._dialogView.addChild(input);

		self._dialogView.addButtons("提交任务", function() {
			// cc.log(input.getText());
			self._answer = input.getText();
			self.submitTask();
		}, self);
	}
	this.getTask = function() {
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
			url : genSubmitTaskUrl(self._taskId, self._answer),
			success : function(data) {
				cc.log(data);
				self._dialogView.onCloseMyself();
			}
		});
	}
}

TaskDialog.create = function(position, priority, npcId, title, content, isDone,
		taskType) {
	var ret = new TaskDialog();
	if (ret
			&& ret.init(position, priority, npcId, title, content, isDone,
					taskType))
		return ret;
	return null;
}

function NpcTaskListDialog() {
	this._dialogView;
	this._npcId;
	this._taskList;
	this._width;
	this._height;
	this.init = function(position, priority, npcId, taskList, title) {
		var self = this;
		self._width = 400;
		self._height = 200;
		var title = title;
		self._dialogView = DialogView.create(self._width, self._height, cc.p(0,
				0));
		self._dialogView.setTouchPriority(priority - 1);
		var titleLabel = cc.LabelTTF.create("", s_yahei, 24);
		titleLabel.setString(title);
		titleLabel.setPosition(cc.p(self._width * 0.5, self._height - 20));
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

			// cc.log(taskConfig);
			p[i - 1] = cc.MenuItemLabel.create(t, self.createTaskDialog, self);
			p[i - 1].taskId = parseInt(taskConfig[0]);
			p[i - 1].title = taskConfig[1];
			p[i - 1].content = taskConfig[2];
			p[i - 1].isDone = taskConfig[3] == "0";
			p[i - 1].taskType = parseInt(taskConfig[4]);

		}

		var menu = cc.Menu.create(p);
		menu.alignItemsVerticallyWithPadding(8);
		menu.setPosition(cc.p(self._width * 0.5, self._height - 80));
		self._dialogView.addChild(menu);
		return true;
	};
	this.createTaskDialog = function(sender) {
		var self = this;
		var dialog = TaskDialog.create(cc.p(0, 0), self._dialogView
				.getTouchPriority(), sender.taskId, sender.title,
				sender.content, sender.isDone, sender.taskType);
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
