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
				this.addChild(this._sprite);
				this._sprite.setPosition(cc.p(0,40));
				
				
				this.setPosition(position);//坐标位置
				this.setAnchorPoint(cc.p(0.5, 0.5));
				position.y-=10;
				this.setPosition(position);
				this._id = id;
				this._title = name;

				var tn = cc.LabelTTF.create( name, 'Microsoft YaHei', 14, cc.size(100, 16), cc.TEXT_ALIGNMENT_CENTER);
				tn.setPosition(cc.p(25, -12));
				tn.setColor(cc.c3(22, 50, 31));
				this.addChild(tn);
				
				var npcTile = cc.Sprite.create(s_npcTile);
				npcTile.setPosition(cc.p(0,10));
				this.addChild(npcTile,-1);
				
		
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
				/*
					var self = this;
					var dialog = NpcTaskListDialog.create(cc.p(0,0), self._priority, 0, self._title);
					this.addChild(dialog._dialogView);
					var t = cc.LabelTTF.create("正在获取数据...", s_yahei, 14);
					t.setPosition(cc.p(dialog._dialogView._width / 2, dialog._dialogView._height / 2));
					t.setColor(cc.c3(80, 80, 80));
					dialog._dialogView.addChild(t, 2, 101);
					
					cc.log("dialog show");
					$.ajax({
						type : "GET",
						url: getTasksFromNpcUrl(self._id),
						success : function(data) {
							var tasks = data.split("@");
							self._touchBegan = true;
							//self._title为npc名字
							dialog._dialogView.removeChildByTag(101, true);
							dialog.initTaskList(tasks);
							cc.log("initTaskList");
						}
					});
					*/
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
