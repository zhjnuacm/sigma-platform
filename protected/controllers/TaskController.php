<?php
class TaskController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';
	
	public function actionGetGlobal() {
		//Yii::app()->setParams(array('cchun'=>"good job!"));
		$tmp = Yii::app()->user->getState("cchun");
		Yii::log("the ans is: ".$tmp,CLogger::LEVEL_INFO,'system.protected.controllers.TaskController');
	}
	
	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view', 'GetGlobal', 'Gettask', 'Submittask'),
				'users'=>array('@'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update','gettask','submittask'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete','taskShow'),
				'users'=>array('@'),
			),
			 array('deny',  // deny all users
				'users'=>array('*'),
			), 
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		/* $type1 = new TaskProType1;
	//	$url = $this->createUrl('TaskProType1/create', array('model'=>$type1) ,'/');
		$str = "hello";
		$url=$this->createUrl('index.php?r=TaskProType1/create', array('model'=>$type1,'str'=>$str) ,'&');
		$this->redirect($url); */
		
		$model=new Task;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Task']))
		{
			$model->attributes=$_POST['Task'];
			if($model->save()) {
				$this->redirect(array('view','id'=>$model->task_id));
			}
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Task']))
		{
			$model->attributes=$_POST['Task'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->task_id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		
		$dataProvider=new CActiveDataProvider('Task');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Task('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Task']))
			$model->attributes=$_GET['Task'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Task the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Task::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Task $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='task-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	/**
	 * Dispaly the Task diagram
	 *
	 */
	public function actionTaskShow()
	{
		Yii::log("actionTaskShow","info","Task.action");
		$dataProvider=new CActiveDataProvider('Task');
		$this->render('taskDraw',array(
			'dataProvider'=>$dataProvider,
		));
	}
	
	/**
	 * 用户接受任务时，调用
	 * Enter description here ...
	 * @param unknown_type $taskId
	 */
	public function actionGettask($taskId)
	{
		$username = Yii::app()->user->name;
		$model = new UserTask;
		$model->task_id = $taskId;
		$model->user_name = $username;
		
		if($model->save()) {
			Yii::log("save success!","info","TaskController.actionGettask");
		}
		else {
			Yii::log("save failed!","info","TaskController.actionGettask");
		}
		echo "你接受了一个任务";
	}
	
	/**
	 * 用户交任务的时候调用
	 * Enter description here ...
	 * @param unknown_type $taskId
	 */
	public function actionSubmittask($taskId,$answer)
	{
		if($this->isTheUserHaveDonePreTask ($taskId)) {
			$criteria = new CDbCriteria;
			$criteria->addCondition("task_id='$taskId'");
				
			$allTask = array();
			$res = TaskProType0::model()->findAll($criteria);
			$this->putResToArr($allTask, $res);
			$res = TaskProType1::model()->findAll($criteria);
			$this->putResToArr($allTask, $res);
			$res = TaskProType2::model()->findAll($criteria);
			$this->putResToArr($allTask, $res);
			
			$ans = $allTask[0]->problem_answer;
			//Yii::log("the problem answer is: ".$ans ,"info","TaskController.actionSubmittask");
			//echo "你完成了一个任务 ,答案是".$answer;
			if($ans != $answer) {
				echo "不好意思，你的答案是错误的~";
			}
			else {
				
				$userTaskModel = UserTask::model()->find("task_id='$taskId'");
				if(!empty($userTaskModel)) {
					$userTaskModel->status = 1;
					$userTaskModel->save();
				}
				else {
					$username = Yii::app()->user->name;
					$model = new UserTask;
					$model->task_id = $taskId;
					$model->user_name = $username;
					$model->status = 1;
					if($model->save()) {
						Yii::log("save success!","info","TaskController.actionSubmittask");
					}
					else {
						Yii::log("save failed!","info","TaskController.actionSubmittask");
					}
				}
				echo "恭喜你，你答对了!";
			}
		}
		else {
			echo "请做好这个任务的前置任务才能领取该任务！！";
		}
	}
	
	
	/**
	 * @abstract judge the user is have done the prepose task
	 * @return true:(you can do this task)  false:(you can't do this task) 
	 */
	private function isTheUserHaveDonePreTask ($taskId) {
		$task = Task::model()->find("task_id='$taskId'");
		$taskPreTaskId = $task->task_pretask;
		if($taskId == $taskPreTaskId) return true;
		
		$username =  Yii::app()->user->name;
		$userTask = UserTask::model()->findAll("user_name='$username'");
	
		if(empty($userTask)) return false;
		
		foreach ($userTask as $mod) {
			if($mod->task_id == $taskPreTaskId && $mod->status == 1) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * @abstract put the element from a array to a array
	 */
	private function putResToArr(&$allTask, &$res) {
		foreach ($res as $mol) {
			array_push($allTask, $mol);
		}
	}
}


