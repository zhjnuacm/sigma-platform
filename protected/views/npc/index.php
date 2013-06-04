<?php
<<<<<<< HEAD
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
=======
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
>>>>>>> 603ea58808a6e67c1b04697187f2fe589157c0ce
