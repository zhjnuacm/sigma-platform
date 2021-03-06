/**
 * @ Jopix  左下角聊天窗口
 * @ 2013年6月5日 22:41:23
 * 在过程中修改了extensions/CCControlEditBox.js 添加监控html标签方法
 */
var InputPanel = cc.Layer
		.extend({
		    _FONT_NAME: null,
		    _FONT_SIZE: null,
		    _WIDTH: null,
		    _HEIGHT: null,
		    _isOpen: true,
		    _box: null,
		    _view: null,
		    _viewButton: null,
		    _rootPoint: null,
		    _canSend:null,
		    init: function () {

		        this._super();
		        this._canSend = true;
		        this._WIDTH = 354;
		        this._HEIGHT = 188;
		        var twidth = cc.canvas.width;
		        this._rootPoint = cc.p(twidth - 380, 8);
		        this.setPosition(this._rootPoint);

		        // 定义外框
		        var bgImage = cc.Sprite.create(s_inputR);
		        bgImage.setPosition(cc.p(177, 13));
		        this.addChild(bgImage);

		        // 定义输入框,对输入框加入键盘回车动作
		        this._box = cc.EditBox.create(cc.size(252, 20));
		        this._box.setPosition(72, 3);
		        this._box.setBgClr(cc.c3(255, 255, 255));
		        this._box.setFontColor(cc.c3(30, 30, 30));
		        this._box.setBorderClr(cc.c3(255, 255, 255));
		        this._box.setFontSize(13);
		        this._box.setFunction("keydown", function (event) {
		            if (event.keyCode == 13) {
		                if (GLOBAL.inputD._canSend) {
		                    GLOBAL.inputD.sendMessage();
		                    //inputD._canSend = false;
		                    //setTimeout(function () {
		                    //    inputD._canSend = true;
		                    //}, 1000);
		                }
		                else {
		                    GLOBAL.inputD.sendMessage();
		                }
		            }
		        });

		        this.addChild(this._box);
		        // 定义表情菜单
		        var faceButton = cc.MenuItemImage.create(s_face, s_face2, s_face,
                    function () {
                        alert("jsdk");
                    }, this);

		        // 定义聊天对象
		        var charKind_str = "[ " + "世界" + " ]:";
		        var charLabel = cc.LabelTTF.create(charKind_str, "Microsoft YaHei", 12);
		        charLabel.setColor(cc.c3(30, 30, 30));
		        var CharButton = cc.MenuItemLabel.create(charLabel, function () {
		            alert("sdsds");
		        }, this);
		        CharButton.setPosition(cc.p(34, -2));

		        // 定义回车
		        var crButton = cc.MenuItemImage.create(s_cr, s_cr, s_cr,
						this.sendMessage, this);
		        crButton.setPosition(cc.p(322, 0));

		        // 定义聊天记录开关
		        this._viewButton = cc.MenuItemImage.create(s_openview,
						s_openview, s_closeview, this.changeViewVisible, this);
		        this._viewButton.setPosition(cc.p(310, 20));

		        // 将所有的按钮加到菜单容器里面
		        var menu = cc.Menu.create(faceButton, CharButton, crButton,
						this._viewButton);
		        menu.setPosition(cc.p(15, 13));

		        this.addChild(menu, 3);

		        // 定义聊天记录
		        this._isOpen = true;
		        this.view = ViewPanel.create(cc.c4b(70, 70, 70, 60), 340, 155);
		        this.view.setPosition(cc.p(5, 33));
		        this.addChild(this.view);
		        this.view.setVisible(this._isOpen);
		        //this.schedule(this.step, 1);
		        this.step();
		        return true;
		    },

		    onEnter: function () {
		        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, -9, true);
		        this._super();
		    },

		    onExit: function () {
		        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
		        this._super();
		    },


		    onTouchBegan: function (touch, event) {

		        var x = touch.getLocation().x;
		        var y = touch.getLocation().y;

		        if (this._isOpen && x > this._rootPoint.x + 5 && x < this._rootPoint.x + 345 && y > this._rootPoint.y + 33 && y < this._rootPoint.y + 188) {
		            return true;
		        }
		        return false;
		    },

		    step: function () {
		        var self = this;
		        $.ajax({
		            type: "POST",
		            dataType: "json", 
		            timeout: 80000,
		            data:{time:"80"}, 
		            url: genPullMessageUrl(),
		            success: function (data, textStatus) {
		                if (data.success == "1") {
		                    self.splitMessage(data.text);
		                    self.step();
		                }
		            	if(data.success=="0"){          
		            		self.step();
		                }
		                //	cc.log(data);
		            }, 
		            //Ajax请求超时，继续查询      
		          /*  error:function(XMLHttpRequest,textStatus,errorThrown){      
		                // if(textStatus=="timeout"){       
		                   	self.step();      
		                 }    
		            } */
		        });
		    },

		    showFace: function () {
		        alert("sdsd");
		    },

		    sendMessage: function () {
		        if (this._box.getText() == '')
		            return;

		        if (this._canSend) {
		            var str = this._box.getText();
		            // cc.log(str);
		            $.ajax({
		                type: "GET",
		                url: genPushMessageUrl("all", 0, str),
		                success: function (data) {
		                    // cc.log(data);
		                }
		            });
		            str = '[' + '我' + ']:' + str;
                    //这里整个字符串不需要加回车
		            //this.view.addWord(str);
		        }
		        else {
		            var str = "[系统]：草，别按那么快，老子不用休息啊";
		            this.view.addWord(str);
		        }

		        this._box.setText("");
		    },

		    onKeyDown: function (key) {
		        window.alert(key);
		    },

		    changeViewVisible: function () {
		        if (this._isOpen) {
		            // this._viewButton.setNormalSpriteFrame(cc.SpriteFrame.create(s_closeview,cc.rect(900, 20, 90, 128)));
		        } else {
		            // this._viewButton.setNormalSpriteFrame(cc.SpriteFrame.create(s_openview,cc.rect(900, 20, 90, 128)));
		        }
		        this._isOpen = this._isOpen ^ true;
		        this.view.setVisible(this._isOpen);
		    },

		    splitMessage: function (mes) {
		        var i = 0, j;
		        while (i < mes.length) {
		            j = mes.indexOf("\n", i);
		            var tmsa = mes.substring(i, j);
		            //alert(mes);
		            //alert(i + ' ' + j + ' ' + tmsa + ' ' + mes.length);
		            this.view.addWord(tmsa);
		            i = j+1;
		        }
		    }
		});
InputPanel.create = function () {
    var ret = new InputPanel();
    if (ret && ret.init())
        return ret;
    return null;
}