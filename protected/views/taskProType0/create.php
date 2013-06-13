<?php
/* @var $this TaskProType0Controller */
/* @var $model TaskProType0 */

$this->breadcrumbs=array(
	'Task Pro Type0s'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List TaskProType0', 'url'=>array('index')),
	array('label'=>'Manage TaskProType0', 'url'=>array('admin')),
);
?>

<h1>Create TaskProType0</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>