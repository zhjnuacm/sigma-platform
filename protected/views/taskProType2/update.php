<?php
/* @var $this TaskProType2Controller */
/* @var $model TaskProType2 */

$this->breadcrumbs=array(
	'Task Pro Type2s'=>array('index'),
	$model->problem_id=>array('view','id'=>$model->problem_id),
	'Update',
);

$this->menu=array(
	array('label'=>'List TaskProType2', 'url'=>array('index')),
	array('label'=>'Create TaskProType2', 'url'=>array('create')),
	array('label'=>'View TaskProType2', 'url'=>array('view', 'id'=>$model->problem_id)),
	array('label'=>'Manage TaskProType2', 'url'=>array('admin')),
);
?>

<h1>Update TaskProType2 <?php echo $model->problem_id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>