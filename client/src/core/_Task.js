var Task = cc.Layer.extend({

	_btn_submit: null, 
	_btn_cancel: null,
    _task_id: null,
    _menu: null,
    _box: null,

    init: function(task, TouchPriority){

    	this.setTouchPriority(TouchPriority);
        this._task_id = task.task_id;
        cc.log("task_type:" + task.question_type);
    	switch(task.question_type)
    	{
    		//问答
    		case 3:
    			cc.log(task.description);
    			var description = cc.LabelTTF.create(task.description, s_yahei, 14);
    			description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                description.setColor(cc.c3(50, 50, 50));
                description.setPosition(cc.p(200, 150));
                this.addChild(description, 1, 1);

                this._box = cc.ControlEditBox.create(new cc.size(170,50),new cc.Color3B(255,255,0));
                this._box.setText("输入答案");
                this._box.setPosition(350, 250);
                this._box.setBgClr(new cc.Color3B(255,255,255));
                this._box.setFontColor(new cc.Color3B(251,250,0));
                this._box.setBorderClr(new cc.Color3B(55,250,120));
                this._box.hideEditBox();
                this.addChild(this._box, 0);
                cc.log("box");
            	break;
            //选择
            case 1:
            //判断
            case 4:
                cc.log("选择/判断： " + task.description);
                var description = cc.LabelTTF.create(task.description, s_yahei, 14);
                description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                description.setColor(cc.c3(50, 50, 50));
                description.setPosition(cc.p(200, 150));
                this.addChild(description);

                var choose = SelectButton.create(task.choices, cc.p(70, 80), task.question_type);
                this.addChild(choose);

                break;
            //填空
            case 2:
                cc.log("填空: " + task.description);
                break;

            default:
            	break;

    	}
        return true;
    },
    onTouchBegan: function (touch, event) {
        //cc.log("touch dialog" + this.getTouchPriority());

        return true;
    },

    setVisible: function(value) {
        
        cc.log("set " + value);
        if(this._box != null)
        {
            if(value == true)
            {
                this._box.showEditBox();
            }
            else 
            {
                this._box.hideEditBox();
            }
        }
        this._super(value);
    },
    onEnter: function () {

        this._super();
        //cc.log("dialog enter " + this.getTouchPriority());
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
        //cc.KeyboardDispatcher.getInstance().addDelegate(this);
        //alert(this.getTouchPriority());
    },

    
    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        //cc.KeyboardDispatcher.getInstance().removeDelegate(this);
        this._super();
    },
});

Task.create = function(task, TouchPriority) {
    var ret = new Task();
    if(ret && ret.init(task, TouchPriority))
        return ret;
    return null;
}