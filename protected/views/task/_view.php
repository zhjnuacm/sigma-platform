<?php
/* @var $this TaskController */
/* @var $data Task */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->task_id), array('view', 'id'=>$data->task_id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_type')); ?>:</b>
	<?php echo CHtml::encode($data->task_type); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_problem_id')); ?>:</b>
	<?php echo CHtml::encode($data->task_problem_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_name')); ?>:</b>
	<?php echo CHtml::encode($data->task_name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_pretask')); ?>:</b>
	<?php echo CHtml::encode($data->task_pretask); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('npc_id')); ?>:</b>
	<?php echo CHtml::encode($data->npc_id); ?>
	<br />

</div>