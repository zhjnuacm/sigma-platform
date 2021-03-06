<?php

class SiteController extends Controller
{
	public function filters()
	{
		return array(
				'accessControl',
		);
	}
	
	public function accessRules()
	{
		return array(
			array('deny', 
				'actions'=>array('game'),
				'users'=>array('?'),
			),
			array('allow',  // allow all users to perform 'index' and 'view' actions
	 			'actions'=>array('game', 'Index', 'Error','Contact', 'Login', 'logout'), 
				'users'=>array('@'),
			),
 			/* array('deny',  // deny all users
 				'users'=>array('*'),
 			), */
		);
	}
	
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
		// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
		),
		// page action renders "static" pages stored under 'protected/views/site/pages'
		// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * @abstract initialize the var which will use later
	 */
	private function initialize() {
		Yii::app()->user->setState("pullTalking", "yes");
		$res = TmpMap::model()->find("id=1");
		$res->chat_status = 0;
		$res->save();
	}
	
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('index');
	}
	
	public function actionGame()
	{
		$this->render("game");
	}
	
	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
			echo $error['message'];
			else
			$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}

	
	/**
	 * @abstract do some action after npc login
	 */
	private function afterLogin($username) {
		$this->initialize(); //init
		
		Yii::log("name is : ".$username, CLogger::LEVEL_INFO, 'system.protected.SiteController.actionLogin');
		$resNum = UserOnline::model()->deleteAll('online_name=:name', array(':name'=> $username));
		if($resNum == 0) {
			Yii::log("delete failed!", CLogger::LEVEL_INFO, 'system.protected.SiteController.actionLogin');
		}
		else {
			Yii::log("delete successed!", CLogger::LEVEL_INFO, 'system.protected.SiteController.actionLogin');
		}
		
		//把登录用户信息添加到tbl_useronline表上
		$tbl_useron = new UserOnline();
		$tbl_useron->online_name = $username; 
		$tbl_useron->online_time_now = date("YmdHis");
		$tbl_useron->online_from_time = date("YmdHis");
		$tbl_useron->save();
		
		$namefrom = $username;
		$nameto = "【系统消息】";
		$content = $username."进入了聊天室!";
		$this->addToTblChatcont($namefrom, $nameto, $content);
	}
	
	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
			{
				$this->afterLogin($model->username);
				$this->redirect(Yii::app()->user->returnUrl);
			}	
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	
	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		$user = Yii::app()->user->name;
		Yii::app()->user->logout();
		//TblUseronline::delete(Yii::app()->user->name);
		$tbl_useron = new UserOnline();
		$tbl_useron->deleteAll("online_name='$user'");
		//$this->render('test', array('na'=>$na));
		
		$namefrom = $user;
		$nameto = "【系统消息】";
		$content = $user."离开了聊天室!";
		$this->addToTblChatcont($namefrom, $nameto, $content);
		$this->redirect(Yii::app()->homeUrl);
	}
	
	/**
	 * function:插入数据到$sigma_message_content
	 * para:发送者 接受者  内容
	 */
	private function addToTblChatcont($namefrom, $nameto, $content) {
		$tbl_userChatcontent = new Message();
		$tbl_userChatcontent->message_time = date("YmdHis")+1;
		$tbl_userChatcontent->message_sender = $namefrom;
		$tbl_userChatcontent->message_reciever = $nameto;
		$tbl_userChatcontent->message_content = $content;
		$tbl_userChatcontent->save();
	}
}
