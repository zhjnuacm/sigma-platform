<?php
/* @var $this TaskProType2Controller */
/* @var $model TaskProType2 */

$this->breadcrumbs=array(
	'Task Pro Type2s'=>array('index'),
	$model->problem_id,
);

$this->menu=array(
	array('label'=>'List TaskProType2', 'url'=>array('index')),
	array('label'=>'Create TaskProType2', 'url'=>array('create')),
	array('label'=>'Update TaskProType2', 'url'=>array('update', 'id'=>$model->problem_id)),
	array('label'=>'Delete TaskProType2', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->problem_id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage TaskProType2', 'url'=>array('admin')),
);
?>

<h1>View TaskProType2 #<?php echo $model->problem_id; ?></h1>

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
