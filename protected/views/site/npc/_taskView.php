<?php
/* @var $this ProjectController */
/* @var $data Project */
?>

<div class="view">
	<b><?php echo CHtml::encode($data->getAttributeLabel('Task ID')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->task_id), array('Task/view', 'id'=>$data->task_id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('Task Name')); ?>:</b>
	<?php echo CHtml::encode($data->task_name); ?>
	<br />
</div>