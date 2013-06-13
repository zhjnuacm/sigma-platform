<?php
/* @var $this TaskProType2Controller */
/* @var $model TaskProType2 */

$this->breadcrumbs=array(
	'Task Pro Type2s'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List TaskProType2', 'url'=>array('index')),
	array('label'=>'Create TaskProType2', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('task-pro-type2-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Task Pro Type2s</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'task-pro-type2-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'problem_id',
		'problem_type',
		'problem_name',
		'problem_declare',
		'problem_answer',
		'task_id',
		/*
		'task_type',
		*/
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
