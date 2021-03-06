<?php
/* @var $this NpcController */
/* @var $model Npc */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'npc-form',
	'enableAjaxValidation'=>false,
));
?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'npc_id'); ?>
		<?php echo $form->textField($model,'npc_id'); ?>
		<?php echo $form->error($model,'npc_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'npc_name'); ?>
		<?php echo $form->textField($model,'npc_name',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'npc_name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'npc_position_x'); ?>
		<?php echo $form->textField($model,'npc_position_x'); ?>
		<?php echo $form->error($model,'npc_position_x'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'npc_position_y'); ?>
		<?php echo $form->textField($model,'npc_position_y'); ?>
		<?php echo $form->error($model,'npc_position_y'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'npc_map_belong'); ?>
		<?php echo $form->dropDownList($model, 'npc_map_belong',  Yii::app()->user->getState("mapConfArr")); ?>
		<?php echo $form->error($model,'npc_map_belong'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->