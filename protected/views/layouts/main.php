<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>text</title>
</head> 

<body onresize="changeSizeAuto()">
    <div id ="topMenu">
        <span id ="logo">Sigma</span>     
        <?php echo l('主页', aurl('task/index'), array('class'=>'topButton', 'style'=>"margin-left:200px"));?>
        <?php echo l('快速入口', aurl('task/index'), array('class'=>'topButton', 'onmousemove'=>"showDivQuick()"));?>
        <?php echo l('设置', aurl('task/index'), array('class'=>'topButton'));?>
        <?php echo l('退出', aurl('task/index'), array('class'=>'topButton'));?>
    </div>
    
    <div id ="mainBox">
        <div id ="leftMenu">
            <div id="userDataFrame">
                <div id="userPhoto">
                	<img src="http://localhost/sigma_local/resources/images/ID33707.png" />
                </div>
            </div>

            <div id="userMessage" class="leftMenuBox">
                <img src="http://localhost/sigma_local/resources/images/icon/pecial.png" />
            </div>
            
            <div id="userNotice" class="leftMenuBox">
                <img src="http://localhost/sigma_local/resources/images/icon/volume.png" />
            </div>
             
            <div id="userMail" class="leftMenuBox" onclick="showDivMessage()">
                <img class="box3" src="http://localhost/sigma_local/resources/images/icon/message.png" />
                <span style="float:right; margin-right:30px; margin-top:10px;"> +2</span>
            </div>

            <div id="userComment" class="leftMenuBox">
                <img src="http://localhost/sigma_local/resources/images/icon/comment.png" />
            </div>

            <div id="userFriend" class="leftMenuBox">
                <img src="http://localhost/sigma_local/resources/images/icon/user.png" />
            </div>
        </div>

        <div id="rightMenu">
            <div id ="map"></div>
        </div>
    </div>
 </body>     
    <script type="text/javascript">
        changeSizeAuto();
    </script>
</html>

<?php// echo $content ?>

<?php
cs()->registerCssFile(sbu('style/mainpage.css'))
    ->registerCoreScript('jquery')
    ->registerScriptFile(sbu('libs/kinetic-v4.3.1.min.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('libs/modernizr-1.6.min.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/divContral.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/map.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/mapApp.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/message.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/NPC.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/pageOnload.js'), CClientScript::POS_END)
    ->registerScriptFile(sbu('script/User.js'), CClientScript::POS_END);
?>
