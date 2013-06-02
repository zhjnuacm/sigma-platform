<?php
/* @var $this NpcController */
/* @var $model Npc */

$this->breadcrumbs=array(
	'Npcs'=>array('index'),
	$model->npc_id,
);

$this->menu=array(
	array('label'=>'List Npc', 'url'=>array('index')),
	array('label'=>'Create Npc', 'url'=>array('create')),
	array('label'=>'Update Npc', 'url'=>array('update', 'id'=>$model->npc_id)),
	array('label'=>'Delete Npc', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->npc_id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Npc', 'url'=>array('admin')),
);
?>

<h1>View Npc #<?php echo $model->npc_id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'npc_id',
		'npc_name',
		'npc_position_x',
		'npc_position_y',
		'npc_map_belong',
	),
)); ?>
