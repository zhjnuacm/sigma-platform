<?php

/**
 * This is the model class for table "sigma_user".
 *
 * The followings are the available columns in table 'sigma_user':
 * @property integer $user_id
 * @property string $user_password
 * @property string $user_username
 * @property string $user_email
 * @property text $user_sign
 * @property text $user_declare'
 * string $user_place
 * text $user_photo
 *
 * The followings are the available model relations:
 * @property Blog[] $blogs
 * @property Competition[] $competitions
 * @property CompetitionSubmit[] $competitionSubmits
 * @property UserCompetition[] $userCompetitions
 * @property UserTask[] $userTasks
 */
class User extends CActiveRecord
{
	private $passwd;
	
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return User the static model class
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
		return 'sigma_user';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_password, user_username, user_email, user_password_repeat', 'required'),
			array('user_username', 'judgeUserNameRepeat'),
			array('user_password, user_username', 'length', 'max'=>45),
			array('user_sign, user_declare', 'length'),
			array('user_email', 'length', 'max'=>105),
			array('user_password', 'password1'),
			array('user_password_repeat', 'passwordRepeat'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('user_id, user_password, user_username, user_email', 'safe', 'on'=>'search'),
		);
	}

	public function judgeUserNameRepeat($attribute,$params) {
		$name = $this->$attribute;
		$res = User::model()->find("user_username='$name'");
		if(!empty($res)) {
			$this->addError($attribute, "该用户名已经被使用");
		}
	}
	
	public function password1($attribute,$params) {
		$this->passwd = $this->$attribute;
		//$this->addError($attribute, "please input a number in Npc Position X!");
	}
	
	public function passwordRepeat($attribute,$params) {
		if($this->$attribute != $this->passwd)
			$this->addError($attribute, "两次密码输入不一致");
	}
	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'blogs' => array(self::HAS_MANY, 'Blog', 'blog_user_id'),
			'competitions' => array(self::HAS_MANY, 'Competition', 'competition_creater'),
			'competitionSubmits' => array(self::HAS_MANY, 'CompetitionSubmit', 'competition_submit_user_id'),
			'userCompetitions' => array(self::HAS_MANY, 'UserCompetition', 'user_competition_user_id'),
			'userTasks' => array(self::HAS_MANY, 'UserTask', 'user_task_user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'user_id' => '用户ID',
			'user_username' => '用户名',
			'user_password' => '用户密码',
			'user_password_repeat' => '重复密码',
			'user_email' => '用户邮箱',
			'user_sign' => '个性签名',
			'user_declare' => '个人说明',
			//暂时没有添加place，photo，测试一下是否一定需要
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

		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('user_password',$this->user_password,true);
		$criteria->compare('user_username',$this->user_username,true);
		$criteria->compare('user_email',$this->user_email,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	public function validatePassword($password) {
		return $password === $this->user_password;
	}
	
	public static function getUserOnline() {
		$userArray = array();
		$model = new UserOnline;
		$modelArray = $model->findAll();
		foreach($modelArray as $mod) {
			array_push($userArray, $mod->online_name);
		}
		return $userArray;
	}
}