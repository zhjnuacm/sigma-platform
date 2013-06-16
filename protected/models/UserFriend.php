<?php

/**
 * This is the model class for table "sigma_user_friend".
 *
 * The followings are the available columns in table 'sigma_user_friend':
 * @property string $user_name
 * @property string $user_friend_name
 *
 * The followings are the available model relations:
 * @property User $userFriendName
 * @property User $userName
 */
class UserFriend extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return UserFriend the static model class
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
		return 'sigma_user_friend';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_name, user_friend_name', 'required'),
			array('user_name, user_friend_name', 'length', 'max'=>45),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('user_name, user_friend_name', 'safe', 'on'=>'search'),
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
			'userFriendName' => array(self::BELONGS_TO, 'User', 'user_friend_name'),
			'userName' => array(self::BELONGS_TO, 'User', 'user_name'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'user_name' => 'User Name',
			'user_friend_name' => 'User Friend Name',
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

		$criteria->compare('user_name',$this->user_name,true);
		$criteria->compare('user_friend_name',$this->user_friend_name,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}