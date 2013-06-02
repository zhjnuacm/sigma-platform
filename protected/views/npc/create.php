<?php
/* @var $this NpcController */
/* @var $model Npc */

$this->breadcrumbs=array(
	'Npcs'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Npc', 'url'=>array('index')),
	array('label'=>'Manage Npc', 'url'=>array('admin')),
);
?>

<h1>Create Npc</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>