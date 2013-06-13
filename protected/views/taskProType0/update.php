<?php
/* @var $this TaskProType0Controller */
/* @var $model TaskProType0 */

$this->breadcrumbs=array(
	'Task Pro Type0s'=>array('index'),
	$model->problem_id=>array('view','id'=>$model->problem_id),
	'Update',
);

$this->menu=array(
	array('label'=>'List TaskProType0', 'url'=>array('index')),
	array('label'=>'Create TaskProType0', 'url'=>array('create')),
	array('label'=>'View TaskProType0', 'url'=>array('view', 'id'=>$model->problem_id)),
	array('label'=>'Manage TaskProType0', 'url'=>array('admin')),
);
?>

<h1>Update TaskProType0 <?php echo $model->problem_id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>