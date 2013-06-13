<?php
/* @var $this TaskProType0Controller */
/* @var $model TaskProType0 */

$this->breadcrumbs=array(
	'Task Pro Type0s'=>array('index'),
	$model->problem_id,
);

$this->menu=array(
	array('label'=>'List TaskProType0', 'url'=>array('index')),
	array('label'=>'Create TaskProType0', 'url'=>array('create')),
	array('label'=>'Update TaskProType0', 'url'=>array('update', 'id'=>$model->problem_id)),
	array('label'=>'Delete TaskProType0', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->problem_id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage TaskProType0', 'url'=>array('admin')),
);
?>

<h1>View TaskProType0 #<?php echo $model->problem_id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'problem_id',
		'task_id',
		'task_type',
		'problem_name',
		'problem_declare',
		'problem_answer',
	),
)); ?>
