//================================
//  Jopix  其它用户类
//  2013年6月7日 09:12:45
//===============================


//==临时用户数据

var userData = [];
userData.push(
    {
        'ID': 123456,
        'name': 'Jopix',
        'PositionX': '1500',
        'PositionY': '900',
        'Photo': 'client/res/user/user_4.jpg'
    }
    );
//===可删


var User = cc.Sprite.extend({
    _touchBegan: false,
    _touchEnabled: true,
    _touchDraw: false,
    _priority: 0,
    _x: null,
    _y: null,
    _uData:{
        'ID': null,
        'name': null,
        'PositionX': null,
        'PositionY': null,
        'Photo': null
    },

    ctor: function () {
        this._super();
    },

    init: function (id) {
        this._super();
        this._priority = -15;
        this.getDataFromID(id);
        this.initWithFile(this._uData.Photo);
        this.setPosition(cc.p(this._uData.PositionX, this._uData.PositionY));
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
        
        // 如果点击在npc上，则弹出对话框，并返回true，截断touch， 否则，返回false，响应下层touch
        if (cc.Rect.CCRectContainsPoint(this.touchRect(), touch.getLocation())) {
            this._touchBegan = true;
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

        }
    },

    getDataFromID: function (ID) {
        for (var i = 0; i < userData.length; i++) {
            if (userData[i].ID == ID) {
                this._uData.ID = userData[i].ID;
                this._uData.name = userData[i].name;
                this._uData.Photo = userData[i].Photo;
                this._uData.PositionX = userData[i].PositionX;
                this._uData.PositionY = userData[i].PositionY;
                return true;
            }
        
        }
    return false;
    },

    setButtom: function () {
        // this.point.setPositionY(2);
    }
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


var UserMenu = cc.LayerColor.extend({
    _userID: null,
    _uData: null,
    _touchBegan: null,
    _width: null,
    _height: null,


    init: function (uData) {
        this._width = 260;
        this._height = 133;
        this._super(cc.c4(255, 255, 255, 200), this._width, this._height);
        this._fData = fData;
        this._touchBegan = false;

        //初始化菜单
        var homeButton = cc.MenuItemImage.create(s_friend_menu_home, s_friend_menu_home2, s_friend_menu_home2, this.home, this);
        var chatButton = cc.MenuItemImage.create(s_friend_menu_chat, s_friend_menu_chat2, s_friend_menu_chat2, this.chat, this);
        var mailButton = cc.MenuItemImage.create(s_friend_menu_mail, s_friend_menu_mail2, s_friend_menu_mail2, this.mail, this);
        var showButton = cc.MenuItemImage.create(s_friend_menu_show, s_friend_menu_show2, s_friend_menu_show2, this.show, this);
        var pkButton = cc.MenuItemImage.create(s_friend_menu_pk, s_friend_menu_pk2, s_friend_menu_pk2, this.pk, this);

        // 将所有的按钮加到菜单容器里面
        var menu = cc.Menu.create(homeButton, chatButton, mailButton, showButton, pkButton);
        menu.alignItemsHorizontallyWithPadding(2);
        menu.setPosition(cc.p(this._width - 70, 10));
        this.addChild(menu);

        var photo = cc.Sprite.create(this._fData.photo);
        photo.setPosition(cc.p(30, 105));

        this.addChild(photo);

        var n = cc.LabelTTF.create(this._fData.name, s_yahei, 12);
        n.setColor(cc.c3(30, 30, 30));
        n.setAnchorPoint(cc.p(0, 0));
        n.setPosition(cc.p(60, 110));
        this.addChild(n);

        var p = cc.LabelTTF.create(this._fData.place, s_yahei, 12);
        p.setColor(cc.c3(30, 30, 30));
        p.setAnchorPoint(cc.p(0, 0));
        p.setPosition(cc.p(60, 90));
        this.addChild(p);


        var m = cc.LabelTTF.create(this._fData.mood, s_yahei, 12);
        m.setColor(cc.c3(30, 30, 30));
        m.setAnchorPoint(cc.p(0, 0));
        m.setPosition(cc.p(60, 70));

        this.addChild(m);
        return true;
    },

    onEnter: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -14, true);
        this._super();
    },

    onExit: function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },

    onTouchBegan: function (touch, event) {
        var _root = this.getPosition();
        var pt = touch.getLocation();
        if (pt.x > _root.x && pt.x < _root.x + this._width && pt.y > _root.y && pt.y < _root.y + this._height) {
            this._touchBegan = true;
            return true;
        }

        this.removeFromParent(true);
        return false;
    },

    onTouchEnded: function (touch, event) {
        if (this._touchBegan) {
            this._touchBegan = false;

        }
    },


    show: function () {
        //这里自定以函数体

        this.destorySelf();
    },

    chat: function () {
        //这里自定以函数体

        this.destorySelf();
    },

    home: function () {
        //这里自定以函数体


        this.destorySelf();
    },

    mail: function () {
        //这里自定以函数体

        this.destorySelf();
    },

    pk: function () {
        //这里自定以函数体

        this.destorySelf();
    },


    destorySelf: function () {
        this.removeFromParent(true);
    }
});


UserMenu.create = function (uData) {
    var ret = new UserMenu();
    if (ret && ret.init(uData)) {
        return ret;
    }
    return null;
};
