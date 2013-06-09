<?php
/* @var $this UserController */
/* @var $model User */

$this->menu=array(
	array('label'=>'更新用户信息', 'url'=>array('updateMyself')),
);
?>

<h1>用户信息 #<?php echo $model->user_id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'user_id',
		'user_username',
		'user_email',
		'user_sign',
		'user_declare'
	),
)); ?>
