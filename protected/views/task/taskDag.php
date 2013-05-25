<?php 
		$data=$dataProvider->getData();
		$array = array();
		if(($n = count($data))>0)
		{
			$j=0;
			foreach($data as $i=>$item)
			{
				$dataTmp = array();
				$dataTmp['task_id'] = $item->task_id;
				$dataTmp['task_pretask'] = $item->task_pretask;
				array_push($array, $dataTmp);
			}
		}
	
		/* $graph = array();
		for($i = 0; $i < 50; $i++) {
			$gtaph[$i] = array();
		}
		array_push($graph[1], array('0'=>'1', '1'=>'112'));
		array_push($graph[3], array('0'=>'3', '1'=>'332'));
		for($i = 0; $i < count($graph); $i++) {
			if(count($graph[$i]) > 1) {
				for($j = 0; $j < count($graph[$i]); $j++) {
					echo $graph[$i][$j]."<br>";
				}
			}
			else
				echo $graph[$i]."<br>";
		} */
		
		/* echo json_encode($array) ;
		echo "<br>"; */
?>


<script type="text/javascript">
	var jsData = <?php echo json_encode($array); ?>
</script>


<canvas id="myCanvas" width="600" height="400" style="border:1px solid #c3c3c3;">
Your browser does not support the canvas element.
</canvas>

 <script src="client/drawDAG.js"> </script>


