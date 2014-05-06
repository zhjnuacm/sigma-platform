<?php

/**
 * This is the model class for table "sigma_tmp_map".
 *
 * The followings are the available columns in table 'sigma_tmp_map':
 * @property integer $row
 * @property integer $col
 * @property string $strMap
 * @property integer $pos_x
 * @property integer $pos_y
 * @property integer $id
 */
class TmpMap extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TmpMap the static model class
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
		return 'sigma_tmp_map';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('row, col, strMap, pos_x, pos_y, id', 'required'),
			array('row, col, pos_x, pos_y, id', 'numerical', 'integerOnly'=>true),
			array('strMap', 'length', 'max'=>1024),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('row, col, strMap, pos_x, pos_y, id', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'row' => 'Row',
			'col' => 'Col',
			'strMap' => 'Str Map',
			'pos_x' => 'Pos X',
			'pos_y' => 'Pos Y',
			'id' => 'ID',
			'chat_status' => 'chat_status', 
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

		$criteria->compare('row',$this->row);
		$criteria->compare('col',$this->col);
		$criteria->compare('strMap',$this->strMap,true);
		$criteria->compare('pos_x',$this->pos_x);
		$criteria->compare('pos_y',$this->pos_y);
		$criteria->compare('id',$this->id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}

