function NpcDialog () {
	this._dialogView;
	this._npcId;
	this.init = function(position,priority,npcId)
	{
		var self = this;
		var width = 400;
		var height = 200;
		var title = "初入江湖";
		var content = "盘古开天辟地之时，天地初开。\n" +
					"话说陈双平老师为了保卫人民，教大家软件开发，\n" +
					"用计算机来抵抗邪恶势力，如果你想开始学习c语言，\n" +
					"先到陈双平老师那里报到！"
		self._npcId = npcId;
		self._dialogView = DialogView.create(width,height,position);
		self._dialogView.setTouchPriority(priority-1);
		self._dialogView.addButtons("接受任务",self.getTaskDescription,self);

		var titleLabel = cc.LabelTTF.create("",s_yahei, 24);
		titleLabel.setString(title);
		titleLabel.setPosition(cc.p(width*0.5,height-20));
		titleLabel.setColor(cc.c3b(0,0,0));
		self._dialogView.addChild(titleLabel);

		//var taskDescriptionViewPanel = ViewPanel.create(width*0.8,height*0.3);
		var taskDescriptionViewPanel = cc.LabelTTF.create("",s_yahei, 14);
		taskDescriptionViewPanel.setPosition(cc.p(width*0.5,height-100));
		taskDescriptionViewPanel.setColor(cc.c3b(25,25,25));
		taskDescriptionViewPanel.setString(content);
		self._dialogView.addChild(taskDescriptionViewPanel);

		
		return true;
	}
	this.getTaskDescription = function()
	{
		// ajax
		var self = this;

		self._dialogView.onCloseMyself();
	}

}



/**
 * [ ]
 * @param  {[type]} position 对话框产生的位置
 * @param  {[type]} priority
 * @param  {[type]} npcId
 * @return {[type]}
 */
NpcDialog.create = function (position,priority,npcId)
{
	var ret = new NpcDialog();
	if(ret && ret.init(position,priority,npcId))
		return ret;
	return null;
}