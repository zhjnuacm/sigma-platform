<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="en" />
	<meta name="GENERATOR" content="PHPEclipse 1.2.0" />
	<title</title>
	
	<style type="text/css">
	a.active:link {background:#00ff00}
	
	</style>
</style>
</head>
<body>

	<h3>hello to Debug!!</h3><br>
	<?php 
		echo 	"HHHHHHHHH<br>";
		echo CHtml::link("linkTest", Yii::app()->createAbsoluteUrl("task"), array('class'=>'active'))."<br>";
		echo Yii::app()->createAbsoluteUrl("site/test")."<br>";
		echo Yii::app()->createUrl("site/test")."<br>";
		echo sbu('images/ID33707.png')
		//print_r($para);
	 ?>
	 <img src="<?php sbu('images/ID33707.png') ?>" />
	 
	 <img src="http://localhost/sigma_local/resources/images/ID33707.png" />
</body>
</html>



