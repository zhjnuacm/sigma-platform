﻿//================================
//  Jopix  其它用户类
//  2013年6月7日 09:12:45
//===============================

//==临时用户数据

var userData = [];
userData.push(
    {
        'ID': 1,
        'name': 'Jopix',
        'PositionX': 1580,
        'sex': 0,
        'PositionY': 900,
        'Photo': 'client/res/user/1.png'
    },
    {
        'ID': 2,
        'name': 'nanke',
        'PositionX': 1480,
        'PositionY': 900,
        'sex': 0,
        'Photo': 'client/res/user/2.png'
    },
    {
        'ID': 3,
        'name': 'vainner',
        'PositionX': 1380,
        'PositionY': 900,
        'sex': 0,
        'Photo': 'client/res/user/3.png'
    },
    {
        'ID': 4,
        'name': 'huangniang',
        'PositionX': 1180,
        'PositionY': 900,
        'sex': 1,
        'Photo': 'client/res/user/4.png'
    },
    {
        'ID': 5,
        'name': 'cchun',
        'PositionX': 980,
        'PositionY': 900,
        'sex': 0,
        'Photo': 'client/res/user/5.png'
    }
    );
//===可删


var User= cc.Sprite.extend({
    _menu: null,
    _touchBegan: false,
    _touchEnabled: true,
    _touchDraw: false,
    _priority: 0,
    _x: null,
    _y: null,
    _mesLayer: null,

    _uData:{
        'ID': null,
        'name': null,
        'PositionX': null,
        'PositionY': null,
        'Photo': null,
        'sex':null
    },

    ctor: function () {
        this._super();
    },

    init: function (userdata) {
        this._super();
        this._priority = -15;
        this.initUserData(userdata);
        this.initWithFile(this._uData.Photo);
        this.setScale(0.6, 0.6);

        var br = cc.Sprite.create(s_user_block);
        br.setPosition(cc.p(41, 39));
        br.setScale(5 / 3, 5 / 3);
        this.addChild(br);
        
        var mark;
        if (this._uData.sex == 0) {
            mark = cc.Sprite.create(s_user_boy_mark);
            mark.setPosition(cc.p(8, 70));
        } else {
            mark = cc.Sprite.create(s_user_girl_mark);
            mark.setPosition(cc.p(4, 72));
        }
        mark.setScale(5 / 3, 5 / 3);
        this.addChild(mark);

        var name = cc.LabelTTF.create('['+ this._uData.name + ']', 'Microsoft YaHei', 14, cc.size(100, 16), cc.TEXT_ALIGNMENT_CENTER);
        name.setPosition(cc.p(40, -16));
        name.setColor(cc.c3(30, 30, 30));
        name.setScale(5 / 3, 5 / 3);
        this.addChild(name);

        this.setPosition(cc.p(this._uData.PositionX, this._uData.PositionY));
        //信息的位置。到时候修改。
        this._mesLayer = MessageList.create(cc.p(-10, 30));
        this.addChild(this._mesLayer);
        return true;
    },


    setPriority: function (priority) {
        this._priority = priority;
    },


    onEnter: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this._priority, true);
        this._touchEnabled = true;
        this._super();
    },


    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._touchEnabled = false;
        this._super();
    },


    touchRect: function () {
        return this.getBoundingBoxToWorld();
    },

    setTouchEnabled: function (enable) {
        if (enable && !this._touchEnabled) {
            cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, this._priority, true);
            this._touchEnabled = true;
        }
        else if (!enable && this._touchEnabled) {
            cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
            this._touchEnabled = false;
        }
    },


    onTouchBegan: function (touch, event) {
        // alert("npc");    
        if (this._menu != null && this._menu._isShow)
                this._menu.removeSelf();
        // 如果点击在npc上，则弹出对话框，并返回true，截断touch， 否则，返回false，响应下层touch
     //   alert(this.touchRect().origin.x + ' ' + this.touchRect().origin.y + ' ' + this.touchRect().size.width + ' ' + this.touchRect().size.height);
        if (cc.Rect.CCRectContainsPoint(this.touchRect(), touch.getLocation())) {
            this._touchBegan = true;

            cc.log(this.touchRect());
            //var self = this;
            //$.ajax({
            //    type: "GET",
            //    url: getTasksFromNpcUrl(self._id),
            //    success: function (data) {
            //        var tasks = data.split("@");
            //        self._touchBegan = true;
            //        var dialog = NpcTaskListDialog.create(cc.p(0, 0), self._priority, 0, tasks, self._title);
            //        self.addChild(dialog._dialogView);
            //    }
            //  });
            return true;
        }

        return false;
    },


    onTouchMoved: function (touches, event) {
        if (this._touchDraw) {
        }
    },

    onTouchEnded: function (touch, event) {
        if (this._touchBegan && (cc.Rect.CCRectContainsPoint(this.touchRect(), touch.getLocation()))) {
            this._touchBegan = false;
            this._touchDraw = false;
            
            if (this._menu == null)
            {
                this._menu = UserMenu.create(this._uData, this);
                this._menu.getMenu().setPosition(cc.p(0, 0));
            }

            if (!this._menu._isShow) {
                this.addChild(this._menu.getMenu());
                this._menu.chagestate();
            }
        }
    },

    initUserData: function (userdata) {
        //cc.log(userdata);
       this._uData.ID = userdata.ID;
       this._uData.name = userdata.name;
       this._uData.Photo = userdata.Photo;
       this._uData.PositionX = userdata.PositionX;
       this._uData.PositionY = userdata.PositionY;
       this._uData.sex = userdata.sex;
       return true;
    },

    setButtom: function () {
        // this.point.setPositionY(2);
    },


    /**
     * [addMessage 在user上面显示消息 5秒自动消失，超过3条则消失
     * @param  {[string]} mes        [文本信息]
     */
    addMessage: function (mes) {
        this._mesLayer.addMessage(mes);
    },

});

User.create = function (ID) {
    var ret = new User();
    if (ret && ret.init(ID))
        return ret;
    return null;
};








//================================
//  Jopix  用户操作菜单
//  2013年6月7日 09:12:45
//===============================
var UserMenu = function(){ 

    this._uData;
    this._menu;
    this._isShow;
    this.init = function (uData)
    {
        //初始化菜单
        this._isShow = false;
        this._uData = uData;
        var showButton = cc.MenuItemImage.create(s_user_menu_show, s_user_menu_show, s_user_menu_show, this.show, this);
        showButton.setPosition(cc.p(5, 80));
        var chatButton = cc.MenuItemImage.create(s_user_menu_chat, s_user_menu_chat, s_user_menu_chat, this.chat, this);
        chatButton.setPosition(cc.p(42, 80));
        var pkButton = cc.MenuItemImage.create(s_user_menu_pk, s_user_menu_pk, s_user_menu_pk, this.pk, this);
        pkButton.setPosition(cc.p(80, 50));
        var favButton = cc.MenuItemImage.create(s_user_menu_fav, s_user_menu_fav, s_user_menu_fav, this.fav, this);
        favButton.setPosition(cc.p(80, 15));
        // 将所有的按钮加到菜单容器里面
        this._menu = cc.Menu.create(showButton, chatButton, pkButton, favButton);
        return true;
    },

    this.show = function () {
        //这里自定以函数体
        alert("yes");
        this.removeSelf();
    };

    this.chat = function () {
        //这里自定以函数体
        var size = cc.Director.getInstance().getWinSize();
        GLOBAL.chatD = ChatPanel.create(this._uData.name, cc.p(size.width / 2 - 120, size.height / 2 - 50), cc.p(0, 150));
        this.removeSelf();
    };

    this.fav = function () {
        //这里自定以函数体

        alert("桂淳。添加好有啊。。");
        this.removeSelf();
    };

    this.pk = function () {
        //这里自定以函数体
        var data = new Array();
        var contenSize = cc.SizeMake(300, 300);
        var cellSize = cc.SizeMake(300, 60);
        cc.log(userData[0].name);
        for (var i = 0; i < 10; i++) {

            var node = cc.Node.create();
            node.setContentSize(cellSize);

            var label1 = cc.LabelTTF.create(userData[i >= 5 ? i - 5 : i].name, s_yahei, 12);
            label1.setAnchorPoint(cc.p(0, 0));
            label1.setColor(cc.c3(20 * i, 15 * i, 10 * i));
            label1.setPosition(cc.p(20, 5));
            node.addChild(label1);

            var label2 = cc.LabelTTF.create("x"+i, s_yahei, 12);
            label2.setAnchorPoint(cc.p(0, 0));
            label2.setColor(cc.c3(20 * i, 15 * i, 10 * i));
            label2.setPosition(cc.p(220, 5));
            node.addChild(label2);

            //var bg = cc.LayerColor.create(cc.c4(20 * i, 15 * i, 10 * i, 255), 30, 30);
            //bg.setPosition(cc.p(260, 5));
            cc.log(userData[i >= 5 ? i - 5 : i].Photo);
            var photo = cc.Sprite.create(userData[i >= 5 ? i - 5 : i].Photo);
            photo.setScale(0.5, 0.5);
            photo.setPosition(cc.p(260, 20));

            node.addChild(photo);
         //   node.setTag(i);
            data[i] = node;
        }

        var list = TileList.create(data, contenSize, cellSize, cc.p(200, 200));

        //var dialog = DialogView.create(300, 300, cc.p(0, 0));
        GLOBAL.mainLayer.addChild(list, 100);
        //dialog.addChild(list);
        //GLOBAL.mainLayer.addChild(dialog, 50);

        this.removeSelf();
    };

    this.chagestate = function(){
        this._isShow ^= true;
    };

    this.removeSelf = function () {
        this.chagestate();
        this._menu.removeFromParent(true);
    };

    this.getMenu = function () {
        return this._menu;
    };
}

UserMenu.create = function (uData) {
    var ret = new UserMenu();
    if (ret && ret.init(uData)) {
        return ret;
    }
    return null;
};
