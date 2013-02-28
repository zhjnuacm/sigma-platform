<?php
/**
 * This is the bootstrap file for test application.
 * This file should be removed when the application is deployed for production.
 */

// change the following paths if necessary
$yii=dirname(__FILE__).'/library/framework/yii.php';
$config=dirname(__FILE__).'/protected/config/test.php';
$shortcut = dirname(__FILE__).'/library/shortcut.php';

// remove the following line when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
defined('DS') or define('DS', DIRECTORY_SEPARATOR);
define('BETA_WEBROOT', dirname(__FILE__));

require_once($yii);
require_once($shortcut);

Yii::createWebApplication($config)->run();
