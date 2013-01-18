<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/yii/yii.php'; 				//框架目录
$config=dirname(__FILE__).'/protected/config/main.php';  //程序目录

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);			//是否开启debug
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);	

require_once($yii);
Yii::createWebApplication($config)->run();
