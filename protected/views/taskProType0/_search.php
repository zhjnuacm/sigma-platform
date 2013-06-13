<?php
/* @var $this TaskProType0Controller */
/* @var $model TaskProType0 */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'problem_id'); ?>
		<?php echo $form->textField($model,'problem_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'task_id'); ?>
		<?php echo $form->textField($model,'task_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'task_type'); ?>
		<?php echo $form->textField($model,'task_type'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'problem_name'); ?>
		<?php echo $form->textField($model,'problem_name',array('size'=>60,'maxlength'=>105)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'problem_declare'); ?>
		<?php echo $form->textArea($model,'problem_declare',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'problem_answer'); ?>
		<?php echo $form->textArea($model,'problem_answer',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->