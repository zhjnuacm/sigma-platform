(function() {
	var d = document;
	var prefix = 'client/';
	var c = {
		COCOS2D_DEBUG : 2, // 0 to turn debug off, 1 for basic debug, and 2 for
							// full debug
		box2d : false,
		chipmunk : false,
		showFPS : true,
		frameRate : 60,
		loadExtension : false,
		tag : 'gameCanvas', // the dom element to run cocos2d on
		// engineDir:'../cocos2d/',
		SingleEngineFile : prefix + 'Cocos2d-html5-v2.1.1.min.js',
		appFiles : [ 
		        prefix + 'src/resource.js', 
		        prefix + 'src/myApp.js',
                prefix + 'src/common/ScrollList.js',
				prefix + 'src/core/Mediator.js',
				prefix + 'src/common/ChatPanel.js',
				prefix + 'src/core/Hero.js',
				prefix + 'src/core/HeroPanel.js',
				prefix + 'src/core/HeroPosition.js',
				prefix + 'src/core/Map.js', 
				prefix + 'src/core/Npc.js',
				prefix + 'src/core/SystemFunction.js',
				prefix + 'src/core/Map.js',
				prefix + 'src/config/config.js',
                prefix + 'src/config/global.js',
				prefix + 'src/config/mapConfig.js',
				prefix + 'src/common/TipBox.js',
				prefix + 'src/common/TipsManage.js',
				prefix + 'src/common/FriendList.js',
				prefix + 'src/common/MessageList.js',
				prefix + 'src/common/InputPanel.js',
				prefix + 'src/common/ViewPanel.js',
				prefix + 'src/common/Tools.js', 
				prefix + 'jquery-2.0.0.min.js',
				prefix + 'src/common/Button.js',
				prefix + 'src/common/RadioButton.js',
				prefix + 'src/common/Dialog.js',
				prefix + 'src/common/_Dialog.js',
				prefix + 'src/common/ControlEditBox.js',
				prefix + 'src/common/SelectButton.js',
				prefix + 'src/core/_Task.js',
				prefix + 'src/common/TileList.js',
				prefix + 'src/core/NpcDialog.js',
				prefix + 'src/core/LoaderScene.js',
				prefix + 'src/core/NpcFactory.js',
				prefix + 'src/core/ChildScene.js',
                prefix + 'src/core/UserContral.js',
                prefix + 'src/core/TaskCheck.js',
               
                ],
	};
	window
			.addEventListener(
					'DOMContentLoaded',
					function() {
						// first load engine file if specified
						var s = d.createElement('script');
						/**
						 * *******Delete this section if you have packed all
						 * files into one******
						 */
						if (c.SingleEngineFile && !c.engineDir) {
							s.src = c.SingleEngineFile;
						} else if (c.engineDir && !c.SingleEngineFile) {
							s.src = c.engineDir + 'platform/jsloader.js';
						} else {
							alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
						}
						/**
						 * *******Delete this section if you have packed all
						 * files into one******
						 */

						// s.src = 'Packed_Release_File.js'; //IMPORTANT:
						// Un-comment this line if you have packed all files
						// into one
						document.ccConfig = c;
						s.id = 'cocos2d-html5';
						d.body.appendChild(s);
						// else if single file specified, load singlefile
					});
})();
