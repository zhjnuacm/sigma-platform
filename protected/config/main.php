﻿<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'sigma-platform',
	'runtimePath'=>'/home/conlan/runtime',
	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'application.extensions.yiidebugtb.*',
	),

	'modules'=>array(					//GII模块
		// uncomment the following to enable the Gii tool
		
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'123',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		'mutex' => array(
			'class' => 'application.extensions.EMutex',
		),
		// uncomment the following to enable URLs in path-format
		/*
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		*/
		/*
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		),
		*/
			

		// uncomment the following to use a MySQL database
		//mysql的连接
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=sigma_local',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '123456',
			'charset' => 'utf8',
			'enableProfiling' => true,
			'enableParamLogging' => true
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				/* array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				), */
				/* array(
						'class'=>'ext.yii-debug-toolbar.YiiDebugToolbarRoute',
						//'ipFilters'=>array('127.0.0.1','192.168.1.215'),
				), */
				// uncomment the following to show log messages on web pages
					 array( // configuration for the toolbar
							'class'=>'XWebDebugRouter',
							'config'=>'alignLeft, opaque, runInDebug, fixedPos, collapsed, yamlStyle',
							'levels'=>'error, warning, trace, profile, info',
							'allowedIPs'=>array('127.0.0.1','::1','192.168.1.54','192\.168\.1[0-5]\.[0-9]{3}'),
					), 
			),
		),
	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
			),
);