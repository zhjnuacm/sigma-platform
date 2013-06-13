<?php
/* @var $this TaskProType2Controller */
/* @var $model TaskProType2 */

$this->breadcrumbs=array(
	'Task Pro Type2s'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List TaskProType2', 'url'=>array('index')),
	array('label'=>'Manage TaskProType2', 'url'=>array('admin')),
);
?>

<h1>Create TaskProType2</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>