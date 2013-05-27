<?php
class ChatController extends Controller
{
	/**
	 *
	 * 某个用户拉取信息
	 * @param user $user
	 */
	public function actionPull()
	{
		if(Yii::app()->request->isAjaxRequest)
		{
			$info="";
			 if(Yii::app()->user->isGuest)
				throw new CHttpException("请先登录");
			$user = Yii::app()->user->name;
			$modelarray = $this->getTalkLog();
			foreach($modelarray as $model) {
				if($model->message_reciever == "所有人") {
					$model->message_reciever = "【闲聊】";
					$model->message_content = "说:".$model->message_content;
				}
				else {
					$model->message_sender = "";
				}
				$info .= $model->message_sender.$model->message_content."\n\n\n";
			} 
			if($info != "") {
				$this->actionTest();
				$this->renderPartial("_pull", array("info"=>$info));
			} 
			 else
				$this->renderPartial("_pull1"); 
		}
	}
	
	private function actionTest() {
		$user = Yii::app()->user->name;
		$tbl_useronline = new UserOnline();
		$res = $tbl_useronline->find("online_name='$user'");
		$res->online_from_time = date("YmdHis");
		$res->save();
		
		/* $user = Yii::app()->user->name;
		$res = UserOnline::model()->find("online_name='$user'");
		$res->online_from_time = date("YmdHis");
		$res->save(); */
		//$this->renderPartial("test", array("res"=>$res->online_from_time));
	}
	
	
	//得到需要显示的聊天内容
	private function getTalkLog() {
		$model = $this->getFromtime();
		$time = $model->online_from_time;
		$timer = $this->dotimer($time);
	
		$model = new Message();
		$res = $model->findAll("message_time > $timer");
		return $res; //array
	}
	
	//得到用户的显示聊天内容的起始时间
	private function getFromtime() {
		$user = Yii::app()->user->name;
		$tbl_useronline = new UserOnline();
		$res = $tbl_useronline->find("online_name='$user'");
		return $res;
	}
	
	//chang the string time to double time
	private function dotimer($timer) {
		$timer = str_replace("-", "", $timer);
		$timer = str_replace(":", "", $timer);
		$timer = str_replace(" ", "", $timer);
		$timer = chop($timer);
		return doubleval($timer);
	}
	
	/**
	 * function:插入数据到$sigma_message_content
	 * para:发送者 接受者  内容
	 */
	private function addToTblChatcont($namefrom, $nameto, $content) {
		$tbl_userChatcontent = new Message();
		$tbl_userChatcontent->message_time = date("YmdHis")+1;
		$tbl_userChatcontent->message_sender = $namefrom;
		$tbl_userChatcontent->message_reciever = $nameto;
		$tbl_userChatcontent->message_content = $content;
		$tbl_userChatcontent->save();
	}
	
	/**
	 *
	 * 从客户端推送信息到服务器
	 * @param user $from
	 * @param user $to
	 * @param type $type
	 * @param message $msg
	 */
	public function actionPush($to,$type,$msg)
	{
		if(Yii::app()->request->isAjaxRequest)
		{
			$user = Yii::app()->user->name;
			$model = new Message;
			$model->message_content = $msg;
			$model->message_sender = $user;
			$model->message_reciever = $to;
			$model->message_time = date("YmdHis");
			$model->save();
			$this->renderPartial("_push",array("msg"=>$msg));
		}
	}
}

