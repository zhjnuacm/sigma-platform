<?php
/* @var $this NpcController */
/* @var $model Npc */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'npc_id'); ?>
		<?php echo $form->textField($model,'npc_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'npc_name'); ?>
		<?php echo $form->textField($model,'npc_name',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'npc_position_x'); ?>
		<?php echo $form->textField($model,'npc_position_x'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'npc_position_y'); ?>
		<?php echo $form->textField($model,'npc_position_y'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'npc_map_belong'); ?>
		<?php echo $form->textField($model,'npc_map_belong'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->