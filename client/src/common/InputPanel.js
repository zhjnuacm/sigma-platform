﻿//********************
//在过程中修改了extensions/CCControlEditBox.js

var InputPanel = cc.Layer
		.extend({
			_FONT_NAME : null,
			_FONT_SIZE : null,
			_WIDTH : null,
			_HEIGHT : null,
			_isOpen : true,
			_box : null,
			_view : null,
			_viewButton : null,

			init : function() {

				this._super();
				this.setTouchEnabled(true);
				this._WIDTH = 354;
				this._HEIGHT = 26;
				var twidth = cc.canvas.width;
				this.setPosition(cc.p(twidth - 230, 8));

				// 定义外框
				var bgImage = cc.Sprite.create(s_inputR);
				bgImage.setPosition(cc.p(177, 13));
				this.addChild(bgImage);

				// 定义输入框,对输入框加入键盘回车动作
				this._box = cc.EditBox.create(cc.size(252, 20));
				this._box.setText("文字位置");
				this._box.setPosition(72, 3);
				this._box.setBgClr(new cc.Color3B(255, 255, 255));
				this._box.setFontColor(new cc.Color3B(30, 30, 30));
				this._box.setBorderClr(new cc.Color3B(255, 255, 255));
				this._box.setFontSize(13);
				this._box.setFunction("keydown", function(event) {
					if (event.keyCode == 13)
						inputD.sendMessage();
				});

				this.addChild(this._box);
				// 定义表情菜单
				var faceButton = cc.MenuItemImage.create(s_face, s_face2,
						s_face, function() {
							alert("jsdk");
						}, this);

				// 定义聊天对象
				var charKind_str = "[ " + "世界" + " ]:";
				var charLabel = cc.LabelTTF.create(charKind_str,
						"Microsoft YaHei", 12);
				charLabel.setColor(cc.c3(30, 30, 30));
				var CharButton = cc.MenuItemLabel.create(charLabel, function() {
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
				this.view = ViewPanel.create(cc.c4b(136, 136, 136, 55), 340,
						155);
				this.view.setPosition(cc.p(5, 33));
				this.addChild(this.view);
				this.view.setVisible(this._isOpen);
				this.schedule(this.step,2);
				return true;
			},

			step : function() {
				var self = this;
				$.ajax({
					type : "GET",
					url : genPullMessageUrl(),
					success : function(data) {
						// cc.log(data);
						if(data != "@@")
							self.view.addWord("系统",data);
					}
				});
			},
			
			showFace : function() {
				alert("sdsd");
			},

			sendMessage : function() {
				var str = this._box.getText();
				//cc.log(genPushMessageUrl("all", 0, str));
				cc.log(str);
				$.ajax({
					type : "GET",
					url : genPushMessageUrl("all", 0, str),
					success : function(data) {
					//	 cc.log(data);
					}
				});

				//这里的addWord函数有问题。
				this.view.addWord("佳旺", str);
				this._box.setText("");
			},

			adaptPoistion : function() {
				var twidth = cc.canvas.width;
				this.setPosition(cc.p(twidth - 370, 8));
			},

			onKeyDown : function(key) {
				window.alert(key);
			},

			changeViewVisible : function() {
				if (this._isOpen) {
					// this._viewButton.setNormalSpriteFrame(cc.SpriteFrame.create(s_closeview,
					// cc.rect(900, 20, 90, 128)));
				} else {
					// this._viewButton.setNormalSpriteFrame(cc.SpriteFrame.create(s_openview,
					// cc.rect(900, 20, 90, 128)));
				}
				this._isOpen = this._isOpen ^ true;
				this.view.setVisible(this._isOpen);
			}

		});

InputPanel.create = function() {
	var ret = new InputPanel();
	if (ret && ret.init())
		return ret;
	return null;
}

var Message = function() {
	this.CCLable;
	this._height;
	this._lk;

	this.init = function(String, maxLenth) {
		// alert(String);
		// /<summary>获得字符串实际长度，中文2，英文1</summary>
		// /<param name="str">要获得长度的字符串</param>
		var newStr = "";
		this._lk = 1;
		var realLength = 0, len = String.length, charCode = -1, b = 0, k = maxLenth;
		for ( var i = 0; i < len; i++) {
			charCode = String.charCodeAt(i);
			if (charCode < 299)
				realLength += 1;
			else
				realLength += 2;

			if (realLength > k) {
				newStr += String.substring(b, i);
				newStr += "\n    ";
				//alert(newStr);
				realLength += 4;
				b = i;
				k += maxLenth;
				this._lk++;
			}
		}
		newStr += String.substring(b, len);

		this.CCLable = cc.LabelTTF.create(newStr, 'Microsoft YaHei', 12, cc
				.size(330, 20), cc.TEXT_ALIGNMENT_LEFT);
		this.CCLable.setColor(cc.c3(30, 30, 30));

		this._height = this._lk * 14;
	}

	this.init2 = function(String, maxLenth) {
		// /<summary>获得字符串实际长度，中文2，英文1</summary>
		// /<param name="str">要获得长度的字符串</param>
		var newStr = "";
		this._lk = 1;
		var realLength = 0, len = String.length, charCode = -1, b = 0, k = maxLenth;
		for ( var i = 0; i < len; i++) {
			charCode = String.charCodeAt(i);

			if (charCode < 299)
				realLength += 1;
			else
				realLength += 2;

			if (realLength > k) {
				newStr += String.substring(b, i);
				newStr += "\n";
				b = i;
				k += maxLenth;
				this._lk++;
			}
		}
		newStr += String.substring(b, len);
		this.CCLable = cc.LabelTTF.create(newStr, 'Microsoft YaHei', 12, cc
				.size(330, 20), cc.TEXT_ALIGNMENT_LEFT);
		this.CCLable.setColor(cc.c3(30, 30, 30)); // alert(this.CCLable.getCharCount());
		this._height = this._lk * 14;
	}

	this.setMaxLenth = function(num) {
		this._maxLenth = num;
	}
}




