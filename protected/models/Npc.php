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
	//判断是x坐标还是y坐标
	const focusX = 0;
	const focesY = 1;
	public $MapMatrix = array();
	
	public function setMapArray($arr, $row, $col) {
		//$MapMatrix = array();
		for($i = 0; $i < $row; $i++) {
			$this->MapMatrix[$i] = array();
			for($j = 0; $j < $col; $j++) {
				$this->MapMatrix[$i][$j] = $arr[$i][$j];
			}
		}
	}
	
	public function get() {
		return $this->MapMatrix;
	}
	
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
			array('npc_id, npc_position_x, npc_position_y, npc_map_belong', 'numerical', 'integerOnly'=>true),
			array('npc_name', 'length', 'max'=>45), 
			array('npc_position_x', 'f1'),
			
			//array('npc_position_y', 'npcCanPut', 'position'=>self::focusY),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
		// array('npc_id, npc_name, npc_position_x, npc_position_y, npc_map_belong', 'safe', 'on'=>'search'), 
		);
	}
	
	/*
	 * 我的自定义函数
	 */
	public function f1($attribute,$params)
	{
		//Yii::log("第一次调试啦啦啦啦", LEVEL_ERROR, $category);
		if(ff() == 12)
			$this->addError($attribute, '该TAG已经存在!');
		/* $flag = false;
		if ($params['position'] === self::focusX) {
			if($this->attribute != 0) {
				$this->addError($attribute, 'XXXXXXXXyour password is not strong enough!');
			}
		}
		elseif ($params['strength'] === self::focusY) {
			if($this->attribute != 1) {
				$this->addError($attribute, 'YYYYYYYYYYYyour password is not strong enough!');
			}		
		} */
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