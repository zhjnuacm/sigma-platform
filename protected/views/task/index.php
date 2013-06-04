<<<<<<< HEAD
<?php
/* @var $this TaskController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Tasks',
);

$this->menu=array(
	array('label'=>'Create Task', 'url'=>array('create')),
	array('label'=>'Manage Task', 'url'=>array('admin')),
	array('label'=>'Show Task', 'url'=>array('TaskShow')),
);
?>

<h1>Tasks</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>


=======
<?php
/* @var $this TaskController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Tasks',
);

$this->menu=array(
	array('label'=>'Create Task', 'url'=>array('create')),
	array('label'=>'Manage Task', 'url'=>array('admin')),
	array('label'=>'Show Task', 'url'=>array('TaskShow')),
);
?>

<h1>Tasks</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>


>>>>>>> 603ea58808a6e67c1b04697187f2fe589157c0ce
