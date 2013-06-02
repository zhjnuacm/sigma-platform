var Npc = cc.Sprite
		.extend({

			_title : null,
			_touchBegan : false,
			_touchEnabled : true,
			_touchDraw : false,
			_priority : null,
			_x : null,
			_y : null,
			_id : null,
			ctor : function() {
				this._super();
			},

			init : function(position,id) {
				this._super();
				this.initWithFile(s_npc_1);
				this.setAnchorPoint(cc.p(0.5, 0.5));
				this.setPosition(position);
				this._id = id;

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
				return this.getBoundingBoxToWorld();
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
				if (cc.Rect.CCRectContainsPoint(this.touchRect(), touch
						.getLocation())) {
					this._touchBegan = true;
					
					
					var dialog = NpcDialog.create(touch.getLocation(),this._priority,0);
					this.addChild(dialog._dialogView);
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

Npc.create = function(position,id) {
	var ret = new Npc();
	if (ret && ret.init(position,id))
		return ret;
	return null;
};
