
var CHOICE_QUESTION = 1;        //选择题
var FILL_IN_QUESTION = 2;       //填空题
var ASK_ANSWER_QUESTION = 3;    //简答
var JUDGE_QUESTION = 4;         //判断题

var NPC_ADVISOR = 1;
var NPC_TASKLIST = 2;

var FINISHALLTASK = 0;

var QuestionData = [];
QuestionData.push(
    {
        'npc_id': 2,
        'npc_type': NPC_ADVISOR,
        'task_id': 1,
        'description': "先搞定三个地瓜妹子吧"
    },

    {
        'npc_id': 18,
        'npc_type': NPC_TASKLIST,
        'task_id': 2,
        'title' : "追本溯源",
        'question_type': CHOICE_QUESTION,
        'description': "最早的计算机是用来进行________的",
        'choices': [{"0" : "A．科学计算"},{"1": "B．系统仿真"}, {"2" : "C．自动控制"}, {"3" : "D．信息处理"}],
        'state': "未完成",
        'answer': "A"
    },
    {
        'npc_id': 17,
        'npc_type': NPC_TASKLIST,
        'task_id': 3,
        'title' : "厚积薄发",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "简述冯·诺依曼型计算机的组成与工作原理。",
        'state': "未完成"    
    },
    {
        'npc_id':17,
        'npc_type': NPC_TASKLIST,
        'task_id': 4,
        'title': "寻根问底",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "计算机内部为什么要采用二进制编码表示",
        'state': "未完成"
    },

    {
        'npc_id': 17,
        'npc_type': NPC_TASKLIST,
        'task_id': 5,
        'title' : "是非对错",
        'question_type': CHOICE_QUESTION,
        'description': "下面有关计算机操作系统的叙述中，__________是不正确的。",
        'choices': [{"0" : "A．操作系统属于系统软件"} , {"1": "B．操作系统只负责管理内存储器，而不管理外存储器"}, {"2": "C．UNIX、Windows 2000属于操作系统"},{ "3": "D．计算机的内存、I/O设备等硬件资源也由操作系统管理"}],
        'state': "未完成",
        'answer': "B"
    },

    {
        'npc_id': 17,
        'npc_type': NPC_TASKLIST,
        'task_id': 6,
        'title' : "天道酬勤",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "试将（123.3125）10转换为二进制数。",
        'state': "未完成"          
    },

    {
        'npc_id': 18,
        'npc_type': NPC_TASKLIST,
        'task_id': 7,
        'title' : "明辨是非",
        'question_type': JUDGE_QUESTION,
        'description': "全加器只能实现一位二进制数相加。",
        'choices': [{"0" : "Ture"}, {"1" : "FAlse"}],
        'state': "未完成",
        'answer': true
    },

    {
        'npc_id': 18,
        'npc_type': NPC_TASKLIST,
        'task_id': 8,
        'title' : "集思广益",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "简述利用因特网获取信息的主要方法",
        'state': "未完成"          
    },
    {
        'npc_id': 18,
        'npc_type': NPC_TASKLIST,
        'task_id': 9,
        'title' : "柳暗花明",
        'question_type': JUDGE_QUESTION,
        'description': "浮点数表示中尾数部分位数越多则可以表示的数据精度越高",
        'choices': [{"0" : "True"}, {"1" : "False"}],
        'state': "未完成",
        'answer': true
    },

    {
        'npc_id': 19,
        'npc_type': NPC_TASKLIST,
        'task_id': 10,
        'title' : "熟能生巧",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "求-128的8位补码机器数",
        'state': "未完成"          
    },

    {
        'npc_id': 19,
        'npc_type': NPC_TASKLIST,
        'task_id': 11,
        'title' : "才思敏捷",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "如何理解“图灵测试”与西尔勒的“中文小屋”？你更认可哪个？说明理由",
        'state': "未完成"          
    },

    {
        'npc_id': 19,
        'npc_type': NPC_TASKLIST,
        'task_id': 12,
        'title' : "与时俱进",
        'question_type': ASK_ANSWER_QUESTION,
        'description': "分别解释网格计算和云计算的概念",
        'state': "未完成"          
    }
);
//===可删


var _DialogBackground = cc.LayerColor.extend({
    _width: 0,
    _height: 0,
    sprite: null,
    menu: null,

    init: function (pw, ph) {

        this._super(cc.c4(255,255,255,255), pw+1, ph+1);
        this._width = pw;
        this._height = ph;
        this.setAnchorPoint(cc.p(0, 0));

        var x = this.getPositionX(), y = this.getPositionY();
     
        var spriteCb = cc.Sprite.create(s_dlg[2]["res"]);
        spriteCb.setPosition(cc.p(x + this._width / 2 + 1, y - 3));
        spriteCb.setScaleX((this._width - 22) / 10);
        this.addChild(spriteCb);

        var spriteCl = cc.Sprite.create(s_dlg[3]["res"]);
        spriteCl.setPosition(cc.p(x - 1, y + this._height / 2 - 2));
        spriteCl.setScaleY((this._height - 11) / 10);
        this.addChild(spriteCl);

        var spriteClb = cc.Sprite.create(s_dlg[4]["res"]);
        spriteClb.setPosition(cc.p(x + 5, y - 1));
        this.addChild(spriteClb);

        var spriteClt = cc.Sprite.create(s_dlg[5]["res"]);
        spriteClt.setPosition(cc.p(x + 3, y + this._height - 2.5));
        this.addChild(spriteClt);

        var spriteCr = cc.Sprite.create(s_dlg[6]["res"]);
        spriteCr.setPosition(cc.p(x + this._width + 1.5, y + this._height / 2 - 2));
        spriteCr.setScaleY((this._height - 21) / 10);
        this.addChild(spriteCr);

        var spriteCrb = cc.Sprite.create(s_dlg[7]["res"]);
        spriteCrb.setPosition(cc.p(x + this._width - 3.3, y + 1));
        this.addChild(spriteCrb);

        var spriteCrt = cc.Sprite.create(s_dlg[8]["res"]);
        spriteCrt.setPosition(cc.p(x + this._width - 3.3, y + this._height - 5.5));
        this.addChild(spriteCrt);

        var spriteCt = cc.Sprite.create(s_dlg[9]["res"]);
        spriteCt.setPosition(cc.p(x + this._width / 2 - 1.5, y + this._height + 1.5));
        spriteCt.setScaleX((this._width - 17) / 10);
        this.addChild(spriteCt);

        return true;
    },
});

/**
 * [ ]
 * @param  {[type]} pw 对话框背景的宽
 * @param  {[type]} ph 对话框背景的高
 * @return {[type]}
 */

_DialogBackground.create = function (pw, ph) {
    var ret = new _DialogBackground();
    if (ret && ret.init(pw, ph)) return ret;
    return null;
}

var myDialog = cc.Layer.extend({
    layer: null,
    _width: 0,
    _height: 0,
    
    closeButton: null,
    closeItem: null,

    init: function (pw, ph, oPoint) {

        this._super();
        this._width = pw;
        this._height = ph;
        this.setAnchorPoint(cc.p(0, 0));
        this.setPosition(oPoint);
        this.layer = DialogBackground.create(pw, ph);
        this.setTouchEnabled(true);
        this.setMouseEnabled(true);
        this.setKeyboardEnabled(true);
        this.addChild(this.layer);
        this.addClose();
        return true;
    },
    
    
    onCloseMyself: function () {

        this.removeFromParent(true);
    },
    
    boundaryDetect: function() {
    	var size = cc.Director.getInstance().getWinSize();
    	var point = this.getParent().convertToWorldSpace(this.getPosition());
    	
    	var screenRect = cc.RectMake(0, 0, size.width, size.height);
    	var dialogRect = cc.RectMake(point.x, point.y, this._width, this._height);
    	
    	//cc.log(screenRect);
    	//cc.log(dialogRect);
    	if(cc.rectContainsRect(screenRect, dialogRect)){
    		cc.log("contain");
    	}
    	else {
    		var midPoint = cc.p(size.width / 2 - this._width / 2, size.height / 2 - this._height / 2);
    		//cc.log(midPoint);
    		var arPoint = this._parent.convertToNodeSpace(midPoint);
    		//cc.log(arPoint);
    		this.setPosition(arPoint);
    	}
    },
    addClose: function () {

        this.closeItem = cc.MenuItemImage.create(s_dlg_close_normal, s_dlg_close_select, this.onCloseMyself, this);
    	this.closeButton = cc.Menu.create(this.closeItem);
        //var rect = this.closeItem.getBoundingBoxToWorld();
        //cc.log(rect.size.width + ' ' + rect.size.height + ' ' + rect.origin.x + ' '+rect.origin.y );
    	this.closeButton.setPosition(cc.p(this._width - 15, this._height - 10));
        this.addChild(this.closeButton, 0);
    },
    
    addContent: function(content, tag)
    {
        content.setTouchPriority(this.getTouchPriority() - 1);
        this.addChild(content, tag);
    },

    changeContent: function(tag1, content, tag)
    {
        this.removeChildByTag(tag1);
        addContent(content, tag);
    },

    setPosition: function (point) {
		
        this._super(point);
    },
    
    setTouchPriority: function(prority){
    	this._super(prority);
    	//this.closeButton.setTouchPriority(prority - 1);
    },
    onTouchBegan: function (touch, event) {
        cc.log("touch dialog" + this.getTouchPriority());
        return true;
    },

    onEnter: function () {
        this._super();
        cc.log("dialog enter " + this.getTouchPriority());
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
        this.scheduleOnce(this.boundaryDetect);
        //cc.KeyboardDispatcher.getInstance().addDelegate(this);
        //alert(this.getTouchPriority());
    },

    
    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        //cc.KeyboardDispatcher.getInstance().removeDelegate(this);
        this._super();
    },

    onKeyDown: function (key){
    	if(key == 27)
    	{
    		this.onCloseMyself();
    		return true;
    	}
    	return false;
    }
});

/**
 * [ ]
 * @param  {[type]} pw 对话框的宽
 * @param  {[type]} ph 对话框的高
 * @param  {[type]} po 相对于父节点的位置
 * @param  {[type]} parent 父节点
 * @return {[type]}
 */
myDialog.create = function (pw, ph, po) {
    var ret = new myDialog();
    if (ret && ret.init(pw, ph, po)) return ret;
    return null;
};


var TaskList = cc.Layer.extend({

    _menu: null,
    _task_stack: [],
    _id: null,
    _touchPriority: null,
    _p: null,
    _task_num: null,
    _task_state: null,

    init: function(id, TouchPriority){
        var self = this;
        _touchPriority = TouchPriority;
        this._id = id;
        this._task_state = 0;
        for(var i = 0; i < NpcData.length; ++i)
        {
            if(id == NpcData[i].npc_id)
            {
                if(NpcData[i].npc_type == NPC_ADVISOR && FINISHALLTASK == 1)
                {
                    var description = cc.LabelTTF.create(NpcData[i].finish, s_yahei, 14);
                    description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                    description.setColor(cc.c3(50, 50, 50));
                    description.setPosition(cc.p(200, 150));
                    this.addChild(description);

                    var t = cc.LabelTTF.create("确定", s_yahei, 14);
                    t.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                    t.setColor(cc.c3(50, 50, 50));
                    t.setPositionX(0);
                    var btn_OK = cc.MenuItemLabel.create(t, this.Close, this);
                    var btn_menu = cc.Menu.create(btn_OK);
                    btn_menu.setPosition(cc.p(200, 100));
                    this.addChild(btn_menu);
                    return true;
                }
                
                var description = cc.LabelTTF.create(NpcData[i].description, s_yahei, 14);
                description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                description.setColor(cc.c3(50, 50, 50));
                description.setPosition(cc.p(200, 150));
                this.addChild(description);

                var t = cc.LabelTTF.create("确定", s_yahei, 14);
                t.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                t.setColor(cc.c3(50, 50, 50));
                t.setPositionX(0);
                var btn_OK = null;

                var t2 = cc.LabelTTF.create("取消",s_yahei, 12);
                t2.setColor(cc.c3b(80,80,80));
                var btn_Cancel = cc.MenuItemLabel.create(t2,this.Close,this);

                if(NpcData[i].npc_type == NPC_ADVISOR)
                {

                    btn_OK = cc.MenuItemLabel.create(t, this.Close, this);
                }
                else 
                {
                    btn_OK = cc.MenuItemLabel.create(t, this.showMenu, this);
                }
                var btn_menu = cc.Menu.create(btn_OK, btn_Cancel);
                btn_menu.alignItemsHorizontallyWithPadding(100);
                btn_menu.setPosition(cc.p(200, 100));
                this.addChild(btn_menu);
                return true;
            }
        }
        return true;
    },

    Close: function()
    {
        var p = this.getParent();
        if(p != null)
        {
            p.removeFromParent();
        }
    },
    showMenu: function(sender) {
        this.removeAllChildren();  
        this._p = new Array();
        var num = 0;
        for(var i = 0; i < QuestionData.length; ++i){
            if(this._id == QuestionData[i].npc_id){
                
                cc.log(this._id + " " + QuestionData[i].npc_type);
                var title = QuestionData[i].title + "(" + QuestionData[i].state + ")";
                var t = cc.LabelTTF.create(title, s_yahei, 14);
                t.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                t.setColor(QuestionData[i].state == "未完成" ? cc.c3(50, 50, 50) : cc.c3(140, 140, 140));
                t.setPositionX(0);
                this._p[num] = cc.MenuItemLabel.create(t, this.showTask, this);
                this._p[num].setAnchorPoint(cc.p(0, 0));
                this._p[num].task_id = QuestionData[i].task_id;
                this._p[num].setTag(QuestionData[i].task_id);
                this.TaskContent(QuestionData[i]);
                ++num;
            }
        }
        this._task_num = num;
        this._menu = cc.Menu.create(this._p);
        this._menu.alignItemsVerticallyWithPadding(8);
        this._menu.setPosition(cc.p(100, 100));
        this.addChild(this._menu, 1);
        this._menu.setTag(0);
        this._task_stack.push(0);
    },

    TaskContent: function(question) {
        cc.log(question);
        var task = Task.create(question, _touchPriority - 1);

        var backItem = cc.MenuItemImage.create(s_dlg_backarrow_normal, s_dlg_backarrow_down, this.CallBack, this);
        var menu_back = cc.Menu.create(backItem);
        menu_back.setPosition(cc.p(20, 200 - 20));
        
        task.addChild(menu_back);

        var t = cc.LabelTTF.create("确认提交", s_yahei, 14);
        t.setColor(cc.c3(50, 50, 50));
        var btn_OK = cc.MenuItemLabel.create(t, this.submit, this);;

        var t2 = cc.LabelTTF.create("取消",s_yahei, 12);
        t2.setColor(cc.c3b(80,80,80));
        var btn_Cancel = cc.MenuItemLabel.create(t2, this.CallBack, this);
        
        var btn_menu = cc.Menu.create(btn_OK, btn_Cancel);
        btn_menu.alignItemsHorizontallyWithPadding(100);
        btn_menu.setPosition(cc.p(150, 20));

        
        task.addChild(btn_menu);


        task.setTag(question.task_id);
        task.setVisible(false);
        this.addChild(task);
        
        this._task_stack.push(question.task_id);
        cc.log(this._task_stack.length);
    },
    test: function()
    {
        if(FINISHALLTASK != 1)
        {
            this.Close();
        }
        this.removeAllChildren();
        var title = "有新的任务可以提交，快去找计算机导论老师吧";
        var description = cc.LabelTTF.create(title, s_yahei, 14);
        description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        description.setColor(cc.c3(50, 50, 50));
        description.setPosition(cc.p(200, 150));
        this.addChild(description);

        var t = cc.LabelTTF.create("确定", s_yahei, 14);
        t.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        t.setColor(cc.c3(50, 50, 50));
        t.setPositionX(0);
        var btn_OK = cc.MenuItemLabel.create(t, this.Close, this);
        var btn_menu = cc.Menu.create(btn_OK);
        btn_menu.setPosition(cc.p(200, 100));
        this.addChild(btn_menu);       
    },

    finishAllTask: function(){

    },

    finishTask: function() {
        this.removeAllChildren();
        var title = null;
        for(var i = 0; i < NpcData.length; ++i)
        {
            if(NpcData[i].npc_id == this._id)
            {
                title = NpcData[i].finish;
            }
        }
        var description = cc.LabelTTF.create(title, s_yahei, 14);
        description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        description.setColor(cc.c3(50, 50, 50));
        description.setPosition(cc.p(200, 150));
        this.addChild(description);

        var t = cc.LabelTTF.create("确定", s_yahei, 14);
        t.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        t.setColor(cc.c3(50, 50, 50));
        t.setPositionX(0);
        var btn_OK = cc.MenuItemLabel.create(t, this.test, this);
        var btn_menu = cc.Menu.create(btn_OK);
        btn_menu.setPosition(cc.p(200, 100));
        this.addChild(btn_menu);
        if(this._id == 19)
        {
            FINISHALLTASK = 1;
        }

    },

    submit: function(){
        var task_id = this._task_stack[this._task_stack.length - 1];
        this._task_state++;
        if(this._task_state == this._task_num)
        {
            this.finishTask();
            return ;
        }
        this.getChildByTag(task_id).setVisible(false);
        var num = 0;
        for(var i = 0; i < this._p.length; ++i)
        {
            if(this._p[i].task_id == task_id)
            {
                for(var j = 0; j < QuestionData.length; ++j)
                {
                    if(QuestionData[j].task_id == task_id)
                    {
                        var title = QuestionData[j].title + "(完成)";
                        this._menu.getChildByTag(task_id).setString(title);
                        cc.log("menuItem " + i);
                    }
                }
            }
        }

        cc.log(this._p.length);
        //this.removeChildByTag(0);

        // this._menu = cc.Menu.create(this._p);
        // this._menu.alignItemsVerticallyWithPadding(8);
        // this._menu.setPosition(cc.p(100, 100));
        // this.addChild(this._menu, 1);
        // this._menu.setTag(0);
        // while(this._task_stack.length != 0)
        // {
        //     this._task_stack.pop();
        // }
        this._task_stack.pop();

        this.getChildByTag(this._task_stack[this._task_stack.length - 1]).setVisible(true);
    },

    showTask: function(sender) {
        //this.getChildByTag(0).setVisible(false);
        this._menu.setVisible(false);
        var tag = sender.task_id;
        cc.log("task_id: " + tag);
        this.getChildByTag(tag).setVisible(true);
        this._task_stack.push(tag);
    },

    CallBack: function() {
        cc.log("start back");
        cc.log("set " + this._task_stack[this._task_stack.length - 1] + "false");
        var tag = this._task_stack[this._task_stack.length - 1];
        var tmp = this.getChildByTag(tag);
        if(tmp != null)
        {
            cc.log("not null");
            cc.log(tmp);
            tmp.setVisible(false);
        }
       

        this._task_stack.pop();
        cc.log("set " + this._task_stack[this._task_stack.length - 1] + "true");
        this.getChildByTag(this._task_stack[this._task_stack.length - 1]).setVisible(true);

        cc.log("back");
    },

    onTouchBegan: function (touch, event) {
        //cc.log("touch dialog" + this.getTouchPriority());
        return true;
    },

    onEnter: function () {
        this._super();
        //cc.log("dialog enter " + this.getTouchPriority());
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this.getTouchPriority(), true);
        //cc.KeyboardDispatcher.getInstance().addDelegate(this);
        //alert(this.getTouchPriority());
    },

    
    onExit: function () {
        while(this._task_stack.length)
        {
            this._task_stack.pop();
        }
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        //cc.KeyboardDispatcher.getInstance().removeDelegate(this);
        this._super();
    },
});

TaskList.create = function(id, TouchPriority) {
    var ret = new TaskList();
    if(ret && ret.init(id, TouchPriority))
        return ret;
    return null;
}