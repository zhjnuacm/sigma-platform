<?php
<<<<<<< HEAD
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

=======
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

>>>>>>> 603ea58808a6e67c1b04697187f2fe589157c0ce
<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>