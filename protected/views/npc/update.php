<?php
<<<<<<< HEAD
/* @var $this NpcController */
/* @var $model Npc */

$this->breadcrumbs=array(
	'Npcs'=>array('index'),
	$model->npc_id=>array('view','id'=>$model->npc_id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Npc', 'url'=>array('index')),
	array('label'=>'Create Npc', 'url'=>array('create')),
	array('label'=>'View Npc', 'url'=>array('view', 'id'=>$model->npc_id)),
	array('label'=>'Manage Npc', 'url'=>array('admin')),
);
?>

<h1>Update Npc <?php echo $model->npc_id; ?></h1>

=======
/* @var $this NpcController */
/* @var $model Npc */

$this->breadcrumbs=array(
	'Npcs'=>array('index'),
	$model->npc_id=>array('view','id'=>$model->npc_id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Npc', 'url'=>array('index')),
	array('label'=>'Create Npc', 'url'=>array('create')),
	array('label'=>'View Npc', 'url'=>array('view', 'id'=>$model->npc_id)),
	array('label'=>'Manage Npc', 'url'=>array('admin')),
);
?>

<h1>Update Npc <?php echo $model->npc_id; ?></h1>

>>>>>>> 603ea58808a6e67c1b04697187f2fe589157c0ce
<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>