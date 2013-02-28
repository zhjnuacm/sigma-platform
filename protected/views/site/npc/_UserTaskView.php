<?php
/* @var $this ProjectController */
/* @var $data Project */
?>

<div class="view">
	<b><?php echo CHtml::encode($data->getAttributeLabel('Task ID')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->user_task_task_id), array('Task/view', 'id'=>$data->user_task_task_id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('User ID')); ?>:</b>
	<?php echo CHtml::encode($data->user_task_user_id); ?>
	<br />
	
	<b><?php echo CHtml::encode($data->getAttributeLabel('User Task Status')); ?>:</b>
	<?php echo CHtml::encode($data->user_task_status); ?>
	<br />
	
</div>