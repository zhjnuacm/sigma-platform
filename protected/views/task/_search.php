<?php
/* @var $this TaskController */
/* @var $model Task */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'task_id'); ?>
		<?php echo $form->textField($model,'task_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'task_type'); ?>
		<?php echo $form->textField($model,'task_type'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'task_problem_id'); ?>
		<?php echo $form->textField($model,'task_problem_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'task_name'); ?>
		<?php echo $form->textField($model,'task_name',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'task_pretask'); ?>
		<?php echo $form->textField($model,'task_pretask'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'npc_id'); ?>
		<?php echo $form->textField($model,'npc_id'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->