
<?php 
		$data=$dataProvider->getData();
		$array = array();
		if(($n = count($data))>0)
		{
			$j=0;
			foreach($data as $i=>$item)
			{
				//$data['index']=$i;
				$data['task_id'] = $item->task_id;
				$data['task_type'] = $item->task_type;
				$data['task_name'] = $item->task_name;
				$data['task_pretask'] = $item->task_pretask;
				$data['npc_id'] = $item->npc_id;
				array_push($array, $data);
			}
		}
?>

<script type="text/javascript">
	var data = <?php echo json_encode($array); ?>
</script>

<script src="client/test.js"></script>