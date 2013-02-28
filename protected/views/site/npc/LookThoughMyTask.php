<?php echo CHtml::ajaxLink(
          iconv("gb2312","utf-8","未完成任务"),
          // array('UpdateAjax'),
           CController::createUrl('site/LookThoughUndo'),
           array('update' => '#undo',
          ));
?>

<br /><br />
<div id="undo"></div>

<?php echo CHtml::ajaxLink(
          iconv("gb2312","utf-8","已完成任务"),
          // array('UpdateAjax'),
           CController::createUrl('site/LookThoughFinish'),
           array('update' => '#finish',
          ));
?>
<br /><br />
<div id="finish"></div>







