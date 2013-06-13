<?php
/* @var $this TaskProType1Controller */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Task Pro Type1s',
);

$this->menu=array(
	array('label'=>'Create TaskProType1', 'url'=>array('create')),
	array('label'=>'Manage TaskProType1', 'url'=>array('admin')),
);
?>

<h1>Task Pro Type1s</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
