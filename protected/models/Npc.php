<?php
/**
 * This is the model class for table "sigma_npc".
 *
 * The followings are the available columns in table 'sigma_npc':
 * @property integer $npc_id
 * @property string $npc_name
 * @property integer $npc_position_x
 * @property integer $npc_position_y
 * @property integer $npc_map_belong
 *
 * The followings are the available model relations:
 * @property Task[] $tasks
 */

class Npc extends CActiveRecord
{
	public $MapMatrix = array();
	
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Npc the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sigma_npc';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('npc_id, npc_position_x, npc_position_y, npc_map_belong', 'required'),
			array('npc_id, npc_position_x, npc_position_y', 'numerical', 'integerOnly'=>true),
			array('npc_name', 'length', 'max'=>45), 
			
			array('npc_id', 'judgeNpcIdExist'),
			array('npc_position_x', 'fileterAndInsertToDB'), //the filter function
			array('npc_position_y', 'fileterAndJudgePosition'), //the filter function
			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			 array('npc_id, npc_name, npc_position_x, npc_position_y, npc_map_belong', 'safe', 'on'=>'search'), 
		);
	}
	
	/*
	 * function: judge the NpcId existed
	 */
	public function judgeNpcIdExist($attribute,$params) {
		if($this->$attribute != "" || intval($this->$attribute)) {
			$modelNpc = new Npc;
			$res = Npc::model()->findByPk($this->$attribute); 
			if(!empty($res))
				$this->addError($attribute, "the Npc Id have existed"); 
		}
		else {
			$this->addError($attribute, "please input a number in Npc Id!");
		}
	}
	
	/*
	 * return : true(already have a npc in ($pos_x, $pos_y))
	 * 			false(haven't have a npc in ($pos_x, $pos_y));
	 */
	public function findAllNpcPosition($pos_x, $pos_y) {
		$res = Npc::model()->findAll();
		//Yii::log("an is: ".count($res),CLogger::LEVEL_INFO,'system.protected.models.Npc.findAllNpcPosition');
		for($i = 0; $i < count($res); $i++) {
			//Yii::log($i." is: ".$res[$i]->npc_position_x,CLogger::LEVEL_INFO,'system.protected.models.Npc.findAllNpcPosition');
			if($res[$i]->npc_position_x == $pos_x &&
					$res[$i]->npc_position_y == $pos_y) {
				return true;		
			}
		}
		return false;
	}
	
	/*
	 * function: filter function for npc_position_x
	 * 			it will insert npc_position_x to 'table_sigma_tmp_map' as a variable
	 */
	public function fileterAndInsertToDB($attribute,$params)
	{
		
		if($this->$attribute != "" || intval($this->$attribute)) {
		 	$modelMap = new TmpMap;
			$res = $modelMap->find("id='1'");
			$res->pos_x = $this->$attribute;
			if($res->save() > 0)
				Yii::log("save success!!!",CLogger::LEVEL_INFO,'system.protected.models.Npc');
			else {
				Yii::log("save fail!!!",CLogger::LEVEL_INFO,'system.protected.models.Npc');
			}
		}
		else {
			$this->addError($attribute, "please input a number in Npc Position X!");
		}
	}
	
	/*
	 * function: filter function for npc_position_y
	 * 			it will get variable npc_position_x from 'table_sigma_tmp_map'
	 * 			and then judge if the position (npc_position_x, npc_position_y) can put a npc
	 */
	public function fileterAndJudgePosition($attribute,$params)
	{
		 if($this->$attribute != "" || intval($this->$attribute)) {
			$modelMap = new TmpMap;
			$res = $modelMap->find("id='1'");
			
			$row = $res->row;
			$col = $res->col;
			$mapStr = $res->strMap;
			
			$mapArr = array();
			$ind = 0;
			for($i = 0; $i < $row; $i++) {
				$mapArr[$i] = array();
				for($j = 0; $j < $col; $j++) {
					$mapArr[$i][$j] = $mapStr[$ind++];
				}
			}
			$x = $res->pos_x;
			$y = $this->$attribute;
			
			if($this->findAllNpcPosition($x, $y) == true) {
				$this->addError($attribute, "there already have npc, you can't put npc in here!!!");
			}
			
			if($mapArr[$x][$y] == '1') {
				$this->addError($attribute, "you can't put npc in here!!!");
			}
		}
		else {
			$this->addError($attribute, "please input a number in Npc Position Y!");
		} 
	}
	
	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'tasks' => array(self::HAS_MANY, 'Task', 'npc_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'npc_id' => 'Npc',
			'npc_name' => 'Npc Name',
			'npc_position_x' => 'Npc Position X',
			'npc_position_y' => 'Npc Position Y',
			'npc_map_belong' => 'Npc Map Belong',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('npc_id',$this->npc_id);
		$criteria->compare('npc_name',$this->npc_name,true);
		$criteria->compare('npc_position_x',$this->npc_position_x);
		$criteria->compare('npc_position_y',$this->npc_position_y);
		$criteria->compare('npc_map_belong',$this->npc_map_belong);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}