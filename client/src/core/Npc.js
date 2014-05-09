var NpcData = [];
NpcData.push(
	{
		'npc_id': 2,
		'npc_type': 1,
		'description': "想要入我门下？可是我带的学生已经够多了，\n已经没法再带了。但如果你能帮我捎几个地瓜来，\n或许我会考虑下...",
		'finish': "什么？只有一个？好吧，看你也很有诚意，那么我就收了你吧，\n从今天开始，你就是我们地瓜园的一份子，啊，口误，是我们计算\n机导论课程的学生才对。现在你可以去教学区那边的参观下我们的课室。\n"
	},
	{
		'npc_id': 18,
		'npc_type': 2,
		'description': "你是地瓜老师派来要地瓜的？不知是真是假，\n要是能答对我几个问题，我便信你。",
		'finish' : "可是这里的地瓜刚刚种，不能取，\n你去找挖地瓜的妹子要吧。"
	},
	{
		'npc_id': 17,
		'npc_type': 2,
		'description': "想要瓜？先过我这关，这里几道题目，\n上吧。",
		'finish': "很厉害嘛，可惜的是我今天挖到的地瓜刚刚都\n送给烤地瓜的妹子去了？今天好像有好几个要地瓜的人，\n劝你赶紧过去哦。"
	},
	{
		'npc_id': 19,
		'npc_type': 2,
		'description': "又来要瓜了啊，我这里的地瓜已经没多少了...啊，\n别想随便忽悠走我的瓜，做出这些题目再说。",
		'finish': "啧，居然都做对了，刚烤好的地瓜，拿去吧。"
	}
);
var Npc = cc.Sprite
		.extend({

			_title : null,
			_touchBegan : false,
			_touchEnabled : true,
			_touchDraw : false,
			_priority : null,
			_sprite:null,
			_x : null,
			_y : null,
			_id : null,
			ctor : function() {
				this._super();
			},

			init : function(position, id, name) {
			    this._super();
			    var x = Math.floor(id % 9);
			    var y = Math.floor(id / 9);
			    
			    
			  
				
				this._sprite=cc.Sprite.create();
				this._sprite.initWithFile(s_npc, cc.rect(x*50, y* 80, 50, 80));	
				this.addChild(this._sprite,-1);
				this._sprite.setPosition(cc.p(0,40));
				
				
				this.setPosition(position);//坐标位置
				this.setAnchorPoint(cc.p(0.5, 0.5));
				position.y-=10;
				this.setPosition(position);
				this._id = id;
				this._title = name;

				var tn = cc.LabelTTF.create( name, 'Microsoft YaHei', 14, cc.size(100, 16), cc.TEXT_ALIGNMENT_CENTER);
				tn.setPosition(cc.p(0, 0));
				tn.setColor(cc.c3(0, 0, 10));
				this.addChild(tn);
				
				var npcTile = cc.Sprite.create(s_npcTile);
				npcTile.setPosition(cc.p(0,10));
				this.addChild(npcTile,-10);
				
		
				return true;
			},

			setPriority : function(priority) {
				this._priority = priority;
			},

			onEnter : function() {
				cc.Director.getInstance().getTouchDispatcher()
						.addTargetedDelegate(this, this._priority, true);
				this._touchEnabled = true;
				this._super();
			},

			onExit : function() {
				cc.Director.getInstance().getTouchDispatcher().removeDelegate(
						this);
				this._touchEnabled = false;
				this._super();
			},

			touchRect : function() {
				return this._sprite.getBoundingBoxToWorld();
				
			},

			setTouchEnabled : function(enable) {
				if (enable && !this._touchEnabled) {
					cc.Director.getInstance().getTouchDispatcher()
							.addTargetedDelegate(this, this._priority, true);
					this._touchEnabled = true;
				} else if (!enable && this._touchEnabled) {
					cc.Director.getInstance().getTouchDispatcher()
							.removeDelegate(this);
					this._touchEnabled = false;
				}
			},

			onTouchBegan : function(touch, event) {
				// alert("npc");
				// 如果点击在npc上，则弹出对话框，并返回true，截断touch， 否则，返回false，响应下层touch
				if (cc.Rect.CCRectContainsPoint(this.touchRect(), touch.getLocation())) 
				{
				
					// var self = this;
					// var dialog = NpcTaskListDialog.create(cc.p(0,0), self._priority, 0, self._title);
					// this.addChild(dialog._dialogView);
					// var t = cc.LabelTTF.create("正在获取数据...", s_yahei, 14);
					// t.setPosition(cc.p(dialog._dialogView._width / 2, dialog._dialogView._height / 2));
					// t.setColor(cc.c3(80, 80, 80));
					// dialog._dialogView.addChild(t, 2, 101);
					
					// cc.log("dialog show");
					// $.ajax({
					// 	type : "GET",
					// 	url: getTasksFromNpcUrl(self._id),
					// 	success : function(data) {
					// 		var tasks = data.split("@");
					// 		self._touchBegan = true;
					// 		//self._title为npc名字
					// 		dialog._dialogView.removeChildByTag(101, true);
					// 		dialog.initTaskList(tasks);
					// 		cc.log("initTaskList");
					// 	}
					// });
					cc.log("touch npc " + this._priority);
					var self = this;
					var dialog = myDialog.create(400, 200, cc.p(0, 0));
					dialog.setTouchPriority(self._priority - 1);
					GLOBAL.mediator._childScene.addChild(dialog, 1000);
					var t = cc.LabelTTF.create("正在获取数据...", s_yahei, 14);
					t.setPosition(cc.p(dialog._width / 2, dialog._height / 2));
					t.setColor(cc.c3(80, 80, 80));
					dialog.addChild(t, 2, 101);
					t.setVisible(false);

					var tasklist = TaskList.create(self._id, self._priority - 2);
					if(tasklist)
						dialog.addChild(tasklist, 3);

					cc.log(dialog.getTouchPriority());
					self._touchBegan = true;
					cc.log("dialog show");
					return true;
				}
				return false;
			},

			onTouchMoved : function(touches, event) {
				if (this._touchDraw) {
				}
			},

			onTouchEnded : function(touch, event) {

				if (this._touchBegan
						&& (cc.Rect.CCRectContainsPoint(this.touchRect(), touch
								.getLocation()))) {
					this._touchBegan = false;
					this._touchDraw = false;
				}
			},

			setButtom : function() {
				// this.point.setPositionY(2);
			}
		});

Npc.create = function(position, id, name) {
	var ret = new Npc();
	if (ret && ret.init(position, id, name))
		return ret;
	return null;
};
