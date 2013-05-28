<?php

/**
 * This is the model class for table "sigma_task".
 *
 * The followings are the available columns in table 'sigma_task':
 * @property integer $task_id
 * @property integer $task_type
 * @property integer $task_problem_id
 * @property string  $task_name
 * @property integer $task_pretask
 * @property integer $npc_id
 *
 * The followings are the available model relations:
 * @property Npc $npc
 * @property UserTask[] $userTasks
 */
 
class Task extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Task the static model class
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
		return 'sigma_task';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('task_name', 'required'),
			array('task_id, task_type, task_problem_id, task_pretask, npc_id', 'numerical', 'integerOnly'=>true),
			array('task_name', 'length', 'max'=>45),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('task_id, task_type, task_problem_id, task_name, task_pretask, npc_id', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'npc' => array(self::BELONGS_TO, 'Npc', 'npc_id'),
			'userTasks' => array(self::HAS_MANY, 'UserTask', 'user_task_task_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'task_id' => 'Task ID',
			'task_type' => 'Task Type',
			'task_problem_id' => 'Task Problem',
			'task_name' => 'Task Name',
			'task_pretask' => 'Task Pretask',
			'npc_id' => 'Npc',
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

		$criteria->compare('task_id',$this->task_id);
		$criteria->compare('task_type',$this->task_type);
		$criteria->compare('task_problem_id',$this->task_problem_id);
		$criteria->compare('task_name',$this->task_name,true);
		$criteria->compare('task_pretask',$this->task_pretask);
		$criteria->compare('npc_id',$this->npc_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}