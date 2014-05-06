<?php
/* @var $this TaskProType1Controller */
/* @var $model TaskProType1 */

$this->breadcrumbs=array(
	'Task Pro Type1s'=>array('index'),
	$model->problem_id=>array('view','id'=>$model->problem_id),
	'Update',
);

$this->menu=array(
	array('label'=>'List TaskProType1', 'url'=>array('index')),
	array('label'=>'Create TaskProType1', 'url'=>array('create')),
	array('label'=>'View TaskProType1', 'url'=>array('view', 'id'=>$model->problem_id)),
	array('label'=>'Manage TaskProType1', 'url'=>array('admin')),
);
?>

<h1>Update TaskProType1 <?php echo $model->problem_id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>