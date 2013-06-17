//================================
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
        'PositionY': 900,
        'Photo': 'client/res/user/user_4.jpg'
    },
    {
    	'ID': 2,
        'name': 'nanke',
        'PositionX': 1480,
        'PositionY': 900,
        'Photo': 'client/res/user/user_4.jpg'
    },
    {
    	'ID': 3,
        'name': 'vainner',
        'PositionX': 1380,
        'PositionY': 900,
        'Photo': 'client/res/user/user_4.jpg'
    },
    {
    	'ID': 4,
        'name': 'huangniang',
        'PositionX': 1180,
        'PositionY': 900,
        'Photo': 'client/res/user/user_4.jpg'
    },
    {
    	'ID': 5,
        'name': 'cchun',
        'PositionX': 980,
        'PositionY': 900,
        'Photo': 'client/res/user/user_4.jpg'
    }
    );
//===可删


var User = cc.Sprite.extend({
    _menu: null,
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

    init: function (userdata) {
        this._super();
        this._priority = -15;
        this.initUserData(userdata);
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
     //   alert(this.touchRect().origin.x + ' ' + this.touchRect().origin.y + ' ' + this.touchRect().size.width + ' ' + this.touchRect().size.height);
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
       return true;
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
var UserMenu = function(){ 

    this._uData;
    this._menu;
    this._isShow;
    this.init = function (uData)
    {
        //初始化菜单
        this._isShow = false;
        var showButton = cc.MenuItemImage.create(s_user_menu_show, s_user_menu_show, s_user_menu_show, this.show, this);
       showButton.setPosition(cc.p(0, 60));
        var chatButton = cc.MenuItemImage.create(s_user_menu_chat, s_user_menu_chat, s_user_menu_chat, this.chat, this);
         chatButton.setPosition(cc.p(32, 60));
        var pkButton = cc.MenuItemImage.create(s_user_menu_pk, s_user_menu_pk, s_user_menu_pk, this.pk, this);
        pkButton.setPosition(cc.p(60, 40));
        var favButton = cc.MenuItemImage.create(s_user_menu_fav, s_user_menu_fav, s_user_menu_fav, this.fav, this);
        favButton.setPosition(cc.p(60, 10));

        // 将所有的按钮加到菜单容器里面
        this._menu = cc.Menu.create(showButton, chatButton, pkButton, favButton);
        return true;
    },

    this.show = function () {
        //这里自定以函数体
        alert("yes");
        this.destorySelf();
    };

    this.chat = function () {
        //这里自定以函数体
        alert("yes");
        this.destorySelf();
    };

    this.fav = function () {
        //这里自定以函数体

        alert("yes");
        this.destorySelf();
    };

    this.pk = function () {
        //这里自定以函数体
        alert("yes");
        this.destorySelf();
    };

    this.chagestate = function(){
        this._isShow ^= true;
    };

    this.destorySelf = function () {
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
