<?php echo CHtml::ajaxLink(
          iconv("gb2312","utf-8","iamNpc"),
          // array('UpdateAjax'),
           CController::createUrl('site/NpcTaskList'),
           array('update' => '#npcTask',
          ));
?>

<br /><br /><br />
<div id="npcTask">

</div>






