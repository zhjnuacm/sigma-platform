<?php
/* @var $this UserController */
/* @var $model User */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'user-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">表单中含有 <span class="required">*</span> 为必填项</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'user_username'); ?>
		<?php echo $form->textField($model,'user_username',array('size'=>25,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'user_username'); ?>
	</div>
	
	<div class="row">
		<?php echo $form->labelEx($model,'user_password'); ?>
		<?php echo $form->passwordField($model,'user_password',array('size'=>25,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'user_password'); ?>
	</div>
	
	<div class="row">
		<?php echo $form->labelEx($model,'user_password_repeat'); ?>
		<?php echo $form->passwordField($model,'user_password_repeat',array('size'=>25,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'user_password_repeat'); ?>
	</div>
	
	<div class="row">
		<?php echo $form->labelEx($model,'user_email'); ?>
		<?php echo $form->textField($model,'user_email',array('size'=>35, 'maxlength'=>75)); ?>
		<?php echo $form->error($model,'user_email'); ?>
	</div>
	
	<div class="row">
		<?php echo $form->labelEx($model,'user_sign'); ?>
		<?php echo $form->textArea($model,'user_sign',array('cols'=>27, 'rows'=>4)); ?>
		<?php echo $form->error($model,'user_sign'); ?>
	</div>
	
	<div class="row">
		<?php echo $form->labelEx($model,'user_declare'); ?>
		<?php echo $form->textArea($model,'user_declare',array('cols'=>27, 'rows'=>4)); ?>
		<?php echo $form->error($model,'user_declare'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->