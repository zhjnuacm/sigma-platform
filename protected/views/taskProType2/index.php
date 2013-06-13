<?php
/* @var $this TaskProType2Controller */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Task Pro Type2s',
);

$this->menu=array(
	array('label'=>'Create TaskProType2', 'url'=>array('create')),
	array('label'=>'Manage TaskProType2', 'url'=>array('admin')),
);
?>

<h1>Task Pro Type2s</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
