<?php
/* @var $this TaskProType1Controller */
/* @var $model TaskProType1 */

$this->breadcrumbs=array(
	'Task Pro Type1s'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List TaskProType1', 'url'=>array('index')),
	array('label'=>'Manage TaskProType1', 'url'=>array('admin')),
);
?>

<h1>Create TaskProType1</h1>

<?php
echo $str;

echo $this->renderPartial('_form', array('model'=>$model)); ?>