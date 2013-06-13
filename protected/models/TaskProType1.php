<?php

/**
 * This is the model class for table "sigma_taskpro_type1".
 *
 * The followings are the available columns in table 'sigma_taskpro_type1':
 * @property integer $problem_id
 * @property integer $problem_type
 * @property string $problem_name
 * @property string $problem_declare
 * @property string $problem_answer
 * @property integer $task_id
 *
 * The followings are the available model relations:
 * @property Task $task
 */
class TaskProType1 extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TaskProType1 the static model class
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
		return 'sigma_taskpro_type1';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('problem_declare, task_id', 'required'),
			array('problem_type, task_id', 'numerical', 'integerOnly'=>true),
			array('problem_name, problem_answer', 'length', 'max'=>105),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('problem_id, problem_type, problem_name, problem_declare, problem_answer, task_id', 'safe', 'on'=>'search'),
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
			'task' => array(self::BELONGS_TO, 'Task', 'task_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'problem_id' => 'Problem',
			'problem_type' => 'Problem Type',
			'problem_name' => 'Problem Name',
			'problem_declare' => 'Problem Declare',
			'problem_answer' => 'Problem Answer',
			'task_id' => 'Task',
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

		$criteria->compare('problem_id',$this->problem_id);
		$criteria->compare('problem_type',$this->problem_type);
		$criteria->compare('problem_name',$this->problem_name,true);
		$criteria->compare('problem_declare',$this->problem_declare,true);
		$criteria->compare('problem_answer',$this->problem_answer,true);
		$criteria->compare('task_id',$this->task_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}