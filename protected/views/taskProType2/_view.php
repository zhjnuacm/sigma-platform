<?php
/* @var $this TaskProType2Controller */
/* @var $data TaskProType2 */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('problem_id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->problem_id), array('view', 'id'=>$data->problem_id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('problem_type')); ?>:</b>
	<?php echo CHtml::encode($data->problem_type); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('problem_name')); ?>:</b>
	<?php echo CHtml::encode($data->problem_name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('problem_declare')); ?>:</b>
	<?php echo CHtml::encode($data->problem_declare); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('problem_answer')); ?>:</b>
	<?php echo CHtml::encode($data->problem_answer); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_id')); ?>:</b>
	<?php echo CHtml::encode($data->task_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('task_type')); ?>:</b>
	<?php echo CHtml::encode($data->task_type); ?>
	<br />


</div>