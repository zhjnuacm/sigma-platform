
<?php

/**
 * This is the model class for table "sigma_user_task".
 *
 * The followings are the available columns in table 'sigma_user_task':
 * @property integer $user_task_id
 * @property integer $user_task_task_id
 * @property integer $user_task_user_id
 * @property integer $user_task_status
 *
 * The followings are the available model relations:
 * @property Task $userTaskTask
 * @property User $userTaskUser
 */
class UserTask extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return UserTask the static model class
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
		return 'sigma_user_task';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_task_task_id, user_task_user_id, user_task_status', 'required'),
			array('user_task_task_id, user_task_user_id, user_task_status', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('user_task_id, user_task_task_id, user_task_user_id, user_task_status', 'safe', 'on'=>'search'),
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
			'userTaskTask' => array(self::BELONGS_TO, 'Task', 'user_task_task_id'),
			'userTaskUser' => array(self::BELONGS_TO, 'User', 'user_task_user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'user_task_id' => 'User Task',
			'user_task_task_id' => 'User Task Task',
			'user_task_user_id' => 'User Task User',
			'user_task_status' => 'User Task Status',
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

		$criteria->compare('user_task_id',$this->user_task_id);
		$criteria->compare('user_task_task_id',$this->user_task_task_id);
		$criteria->compare('user_task_user_id',$this->user_task_user_id);
		$criteria->compare('user_task_status',$this->user_task_status);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}