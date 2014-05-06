<?php
/* @var $this TaskProType1Controller */
/* @var $model TaskProType1 */

$this->breadcrumbs=array(
	'Task Pro Type1s'=>array('index'),
	$model->problem_id,
);

$this->menu=array(
	array('label'=>'List TaskProType1', 'url'=>array('index')),
	array('label'=>'Create TaskProType1', 'url'=>array('create')),
	array('label'=>'Update TaskProType1', 'url'=>array('update', 'id'=>$model->problem_id)),
	array('label'=>'Delete TaskProType1', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->problem_id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage TaskProType1', 'url'=>array('admin')),
);
?>

<h1>View TaskProType1 #<?php echo $model->problem_id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'problem_id',
		'problem_type',
		'problem_name',
		'problem_declare',
		'problem_answer',
		'task_id',
		'task_type',
	),
)); ?>
