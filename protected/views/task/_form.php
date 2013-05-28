<?php
/* @var $this TaskController */
/* @var $model Task */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'task-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'task_id&nbsp;&nbsp;&nbsp;(start from 1)'); ?>
		<?php echo $form->textField($model,'task_id'); ?>
		<?php echo $form->error($model,'task_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'task_type'); ?>
		<?php echo $form->textField($model,'task_type'); ?>
		<?php echo $form->error($model,'task_type'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'task_problem_id'); ?>
		<?php echo $form->textField($model,'task_problem_id'); ?>
		<?php echo $form->error($model,'task_problem_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'task_name'); ?>
		<?php echo $form->textField($model,'task_name',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'task_name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'task_pretask'); ?>
		<?php echo $form->textField($model,'task_pretask'); ?>
		<?php echo $form->error($model,'task_pretask'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'npc_id'); ?>
		<?php echo $form->textField($model,'npc_id'); ?>
		<?php echo $form->error($model,'npc_id'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->