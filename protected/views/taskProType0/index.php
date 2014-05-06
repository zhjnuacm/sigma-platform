<?php
/* @var $this TaskProType0Controller */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Task Pro Type0s',
);

$this->menu=array(
	array('label'=>'Create TaskProType0', 'url'=>array('create')),
	array('label'=>'Manage TaskProType0', 'url'=>array('admin')),
);
?>

<h1>Task Pro Type0s</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
