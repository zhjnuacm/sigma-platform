<?php
/* @var $this TaskProType1Controller */
/* @var $model TaskProType1 */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'task-pro-type1-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'problem_type'); ?>
		<?php echo $form->textField($model,'problem_type'); ?>
		<?php echo $form->error($model,'problem_type'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'problem_name'); ?>
		<?php echo $form->textField($model,'problem_name',array('size'=>60,'maxlength'=>105)); ?>
		<?php echo $form->error($model,'problem_name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'problem_declare'); ?>
		<?php echo $form->textArea($model,'problem_declare',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'problem_declare'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'problem_answer'); ?>
		<?php echo $form->textField($model,'problem_answer',array('size'=>60,'maxlength'=>105)); ?>
		<?php echo $form->error($model,'problem_answer'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'task_id'); ?>
		<?php echo $form->textField($model,'task_id'); ?>
		<?php echo $form->error($model,'task_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'task_type'); ?>
		<?php echo $form->textField($model,'task_type'); ?>
		<?php echo $form->error($model,'task_type'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->