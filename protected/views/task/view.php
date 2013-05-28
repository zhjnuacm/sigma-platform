<?php
/* @var $this TaskController */
/* @var $model Task */

$this->breadcrumbs=array(
	'Tasks'=>array('index'),
	$model->task_id,
);

$this->menu=array(
	array('label'=>iconv("gb2312","utf-8","��ȡ����"), 'url'=>array('site/getTask', 'id'=>$model->task_id)),
	array('label'=>iconv("gb2312","utf-8","��������"), 'url'=>array('site/DealWithTask', 'id'=>$model->task_id)),
);

?>

<h1>View Task #<?php echo $model->task_id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'task_id',
		'task_type',
		'task_problem_id',
		'task_name',
		'task_pretask',
		'npc_id',
	),
)); ?>