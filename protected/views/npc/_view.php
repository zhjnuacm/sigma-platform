<?php
<<<<<<< HEAD
/* @var $this NpcController */
/* @var $data Npc */
?>

<div class="view">

=======
/* @var $this NpcController */
/* @var $data Npc */
?>

<div class="view">

>>>>>>> 603ea58808a6e67c1b04697187f2fe589157c0ce
	<b><?php echo CHtml::encode($data->getAttributeLabel('npc_id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->npc_id), array('view', 'id'=>$data->npc_id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('npc_name')); ?>:</b>
	<?php echo CHtml::encode($data->npc_name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('npc_position_x')); ?>:</b>
	<?php echo CHtml::encode($data->npc_position_x); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('npc_position_y')); ?>:</b>
	<?php echo CHtml::encode($data->npc_position_y); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('npc_map_belong')); ?>:</b>
	<?php echo CHtml::encode($data->npc_map_belong); ?>
	<br />

<<<<<<< HEAD

=======

>>>>>>> 603ea58808a6e67c1b04697187f2fe589157c0ce
</div>