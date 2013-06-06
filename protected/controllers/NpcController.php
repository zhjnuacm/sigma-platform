<?php

class NpcController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';
	
	public function actionSetGlobal() {
		Yii::app()->user->setState("cchun", "good job123!!!");
	}
	
	/**
	 * @abstract get the ajax of the information of the map config
	 * @param unknown_type $mapConfStr
	 */
	public function actionSetGlobalMapConf($mapConfStr) {
		if(Yii::app()->request->isAjaxRequest) 
		{
			$res = array();
			$mapArr = explode("|", $mapConfStr);
			for($i = 0; $i < count($mapArr); $i++) {
				$res[$i+1] = $mapArr[$i];
			}
			Yii::app()->user->setState("mapConfArr", $res);
		}
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
				'actions'=>array('index','view', 'Getnpcs', 'Gettasks', 'SetGlobal', 'SetGlobalMapConf'),
				'users'=>array('@'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete', 'AjaxGetMapMatrix', 'Test'),
				'users'=>array('@'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * @abstract get the string of map from client/src/Map to 'sigma_local'
	 * @param unknown_type $mapStr
	 * @param unknown_type $row
	 * @param unknown_type $col
	 */
	public function actionAjaxGetMapMatrix($mapStr, $row, $col)
	{
		if(Yii::app()->request->isAjaxRequest)
		{		
			$model = new TmpMap;
			$res = $model->find("id='1'");
			$res->strMap = $mapStr;
			$res->row = $row;
			$res->col = $col; 
			if($res->save() <= 0){
				Yii::log("save fail",CLogger::LEVEL_INFO,'system.protected.controllers.NpcController');
			}
		}
	}
	
	/**
	 * @abstract just for test
	 */
	public function actionTest() {
		global $mm;
		$this->render('test',array(
				'model'=>$mm,
		));
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
		$model=new Npc;
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Npc']))
		{
			$model->attributes=$_POST['Npc'];
			
			if($model->save())
				$this->redirect(array('view','id'=>$model->npc_id));
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

		if(isset($_POST['Npc']))
		{
			$model->attributes=$_POST['Npc'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->npc_id));
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
		$dataProvider=new CActiveDataProvider('Npc');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Npc('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Npc']))
			$model->attributes=$_GET['Npc'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Npc::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='npc-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	/**
	 *
	 * 根据地图传NPC配置信息@分割
	 * @param unknown_type $mapName
	 */
	public function actionGetnpcs($mapName) {
		if(Yii::app()->request->isAjaxRequest)
		{
			//@, id, pos_x, pos_y, npc_name
			$res = Npc::model()->findAll();
			foreach($res as $model) {
				$id = $model->npc_id;
				$name = $model->npc_name;
				$pos_x = $model->npc_position_x;
				$pos_y = $model->npc_position_y;
				echo "@".$id.",".$pos_x.",".$pos_y.",".$name;
			}
		}
	}
	
	/**
	 * 根据NPCid 传任务信息，@分割
	 * Enter description here ...
	 * @param unknown_type $npcid
	 */
	public function ActionGettasks($npcid)
	{
		// id,title,content,完成状态(未接受，任务完成没有交任务),
		$title = "C语言入门";
		for($i = 0 ; $i < 2 ; $i++)
		{
			echo "@".$i."|"."测试任务".$i."请熟练唱出山路十八弯|如果我 和你的猫咪一起掉进水里,没关系,脂肪有浮力,你们沉不下去|".$i%2;
		}
	}
}

