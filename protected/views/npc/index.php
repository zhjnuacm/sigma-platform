<?php
/* @var $this NpcController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Npcs',
);

$this->menu=array(
	array('label'=>'Create Npc', 'url'=>array('create')),
	array('label'=>'Manage Npc', 'url'=>array('admin')),
);
?>

<h1>Npcs</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
