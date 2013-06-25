function TaskDialog() {
	this._dialogView;
	this._taskId;
	this._width;
	this._height;
	this._answer;
	this._perSize;
	this._tpoint;

	this.init = function (position, priority, taskId, title, content, isDone,
			taskType) {
	    var self = this;


	    this._tpoint = position;
	    self._taskId = taskId;
	    self._height = 60;
	    var titleLabel = cc.LabelTTF.create(title + ':', s_yahei, 16);
	    titleLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
	    titleLabel.setColor(cc.c3(80, 80, 80));
	    titleLabel.setAnchorPoint(cc.p(0, 1));
	    var contentsSplit = content.split("^");
	    var strlen = contentsSplit[0].length;


	    if (strlen < 80) {
	        self._width = 360;
	        self._perSize = 40;
	    } else if (strlen < 250) {
	        self._width = 460;
	        self._perSize = 50;
	    } else {
	        self._width = 560;
	        self._perSize = 60;
	    }

	    var taskDescription = new Message();
	    taskDescription.init('    ' + contentsSplit[0], self._perSize, 14);
	    self._height += taskDescription.getHeight() + 65;

	    var taskDescriptionViewPanel = cc.LabelTTF.create(taskDescription.getString(), 'Liberation Mono', 14, cc.size(400, 16), cc.TEXT_ALIGNMENT_LEFT);
	    taskDescriptionViewPanel.setColor(cc.c3(80, 80, 80));
	    taskDescriptionViewPanel.setAnchorPoint(cc.p(0, 0));


	    switch (taskType) {
	        case 0: // normal task
	            self.initNormalTask(content, isDone);
	            break;
	        case 1: // choose task
	            self.initChooseTask(contentsSplit[1]);
	            break;
	        case 2:
	            self.initFullTask();
	            break;
	        case 3:
	            break;
	        default:
	            this.createDig();
	            break;
	    }
	    this._dialogView.setTouchPriority(priority - 1);
	    //
	    cc.renderContext.strokeStyle = "rgba(220,220,220,1)";
	    cc.renderContext.lineWidth = "1";
	    cc.drawingUtil.drawLine(cc.p(58, 48), cc.p(this._width - 20, 48));

	    titleLabel.setPosition(cc.p(27, self._height - 25));
	    taskDescriptionViewPanel.setPosition(cc.p(52, self._height - 75));

	    self._dialogView.addChild(titleLabel);
	    self._dialogView.addChild(taskDescriptionViewPanel);
	  //  GLOBAL.mainLayer.addChild(self._dialogView);
	    return true;
	};

    this.initNormalTask = function (content, isDone) {
        var self = this;
        self._answer = "done";
        self._height += 20;
        this.createDig();
        isDone ? self._dialogView.addButtons("接受任务", self.getTask, self)
				: self._dialogView.addButtons("完成任务", self.submitTask, self);
    };

    this.initChooseTask = function (content) {
        var self = this;
        var scontent = content.split("&");
        var choose = RadioButton.create(scontent, cc.p(140, scontent.length*8+48));
        self._height += scontent.length * 16;
        this.createDig();
        self._dialogView.addChild(choose, 5);
        self._dialogView.addButtons("提交任务", function () {
            self._answer = choose.getAnswer();
            // cc.log(choose.getAnswer());
            self.submitTask();
        }, self);
    };


	this.initFullTask = function () {
	    var self = this;
	    self._height += 25;
	    this.createDig();
	    var input = cc.EditBox.create(cc.size(150, 20));
	    input.setText("请输入答案");
	    input.setPosition(cc.p(80, 20));
	    input._edTxt.style.borderWidth = "1px";
	    input._edTxt.style.borderStyle = "solid";
	    input._edTxt.style.borderRadius = "8px";
	    input._edTxt.style.borderColor = "#9A9A9A";
	    input.setBgClr(cc.c3(255, 255, 255));
	    input.setFontColor(cc.c3(170, 0, 0));
	    input.setFontSize(12);
	    temp88 = input;
	    input.setFunction("click", function (event) {
	        temp88.setText("");
	        temp88._edTxt.style.color = "#AA0000";
	    });

	    self._dialogView.addChild(input);

	    self._dialogView.addButtons("提交任务", function () {
	        // cc.log(input.getText());
	        self._answer = input.getText();
	        self.submitTask();
	    }, self);
	};

	this.getTask = function () {
	    // ajax
	    var self = this;
	    $.ajax({
	        type: "GET",
	        async: false,
	        url: genGetTaskUrl(self._taskId),
	        success: function (data) {
	            cc.log(data);
	            self._dialogView.onCloseMyself();
	        }
	    });
	};

	this.submitTask = function () {
	    var self = this;
	    $.ajax({
	        type: "GET",
	        url: genSubmitTaskUrl(self._taskId, self._answer),
	        success: function (data) {
	            cc.log(data);
	            self._dialogView.onCloseMyself();
	        }
	    });
	};

	this.createDig = function () {
	    var size = cc.Director.getInstance().getWinSize();
	    this._dialogView = DialogView.create(this._width, this._height, this._tpoint);// cc.p((size.width - this._width)/2,  (size.height + this._height)/2));
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
	this._priority;
	
	this.init = function(position, priority, npcId, taskList, title) {
		var self = this;
		self._width = 400;
		self._height = 200;
		var title = title;
		self._dialogView = DialogView.create(self._width, self._height, cc.p(0,
				0));
		self._dialogView.setTouchPriority(priority - 1);
		var titleLabel = cc.LabelTTF.create("", s_yahei, 16);
		titleLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		titleLabel.setString(title+' :');
		titleLabel.setPosition(cc.p(32, self._height - 32));
		titleLabel.setAnchorPoint(cc.p(0, 1));
		titleLabel.setColor(cc.c3(80, 80, 80));
		self._dialogView.addChild(titleLabel);

		var p = new Array();
		for ( var i = 1; i < taskList.length; i++) {
			var taskConfig = taskList[i].split("|");
			var taskTile = taskConfig[0] + " : " + taskConfig[1]
					+ ((taskConfig[3] == "0") ? "(未接受)" : "(完成)");
			var t = cc.LabelTTF.create(taskTile, s_yahei, 14);
			t.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
			t.setColor((taskConfig[3] == "0") ? cc.c3(50, 50, 50) : cc.c3(140,
					140, 140));

			t.setPositionX(0);

			// cc.log(taskConfig);
			p[i - 1] = cc.MenuItemLabel.create(t, self.createTaskDialog, self);
			p[i - 1].setAnchorPoint(cc.p(0, 0));
			p[i - 1].taskId = parseInt(taskConfig[0]);
			p[i - 1].title = taskConfig[1];
			p[i - 1].content = taskConfig[2];
			p[i - 1].isDone = taskConfig[3] == "0";
			p[i - 1].taskType = parseInt(taskConfig[4]);
		}
		var menu = cc.Menu.create(p);
		menu.alignItemsVerticallyWithPadding(8);
		menu.setPosition(cc.p(100, 100));
		self._dialogView.addChild(menu, 0, self._dialogView._menuTag);
		self._dialogView.addMenu();
		return true;
	};
	
	this.setDialogMenuPriority = function(){
		this._dialogView.getChildByTag(1).setHandlerPriority(this._priority - 1);
	};
	
	this.createTaskDialog = function (sender) {
	    var self = this;
	    var dialog = TaskDialog.create(cc.p(0, 0), self._dialogView
				.getTouchPriority(), sender.taskId, sender.title,
				sender.content, sender.isDone, sender.taskType);
	    self._dialogView.addChild(dialog._dialogView);

	    dialog._dialogView.setPosition(cc.p(-5, -5));
	};
}

NpcTaskListDialog.create = function(position, priority, npcId, taskList, title) {
	var ret = new NpcTaskListDialog();
	if (ret && ret.init(position, priority, npcId, taskList, title))
		return ret;
	return null;
}
