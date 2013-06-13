<?php

class ChatController extends Controller
{
	/**
	 * @abstract pull the talk info from server to ajax
	 * 			 for talk system 
	 * @throws CHttpException
	 */
	public function actionPull()
	{
		set_time_limit(0);//无限请求超时时间
 		$i=0;
 		while (true){
 			//sleep(1);
 			//usleep(500000);//0.5秒
 			$i++;
 			$info="";
 			$user = Yii::app()->user->name;
 			$modelarray = $this->getTalkLog();
 			foreach($modelarray as $model) {
 				if($model->message_reciever == "所有人") {
 					$model->message_reciever = "【闲聊】";
 					$model->message_content = "说:".$model->message_content;
 				}
 			    /*if($model->message_sender == $user)
				 continue;*/ 
				/* else {
				 $model->message_sender = "";
				} */
				$info .= "[".$model->message_sender."]: ".$model->message_content." --".$model->message_time."\n";
			}
			
			if($info != "")
			{
				$this->updateUserOnlineFromTime();
				$arr=array('success'=>"1",'name'=>'','text'=>$info);
				echo json_encode($arr);
				break;
			}
			else if($info == "") {
				$arr=array('success'=>"0",'name'=>'','text'=>$info);
				echo json_encode($arr);
				break;
			}  
		}
	}
	
	/**
	 * save the chat_status
	 * @param unknown_type $status
	 */
	private function saveChatStatus($status) {
		$res = TmpMap::model()->find("id=1");
		$res->chat_status = $status;
		$res->save();
	}
	
	public function  actionTest() {
		$this->renderPartial("test");
	} 
	
	/**
	 * @abstract 更新在线用户表中的用户提取信息的最后一次时间。
	 */
	private function updateUserOnlineFromTime() {
		$user = Yii::app()->user->name;
		$criteria = new CDbCriteria;
		$criteria->addCondition("online_name='$user'");
		$res = UserOnline::model()->find($criteria);
		$res->online_from_time = date("YmdHis");
		
		if($res->save() < 0) {
			Yii::log("update failed!!!", CLogger::LEVEL_INFO, 'system.protected.ChatController.updateUserOnlineFromTime');
		}
		else {
			Yii::app()->user->setState("pullTalking", false);
		}
	}
	
	/**
	 * @abstract 得到需要显示的聊天内容
	 * @return Message(array model)
	 */
	private function getTalkLog() {
		$model = $this->getFromtime();
		$time = $model->online_from_time;
		$timer = $this->dotimer($time);
	
		$model = new Message();
		$res = $model->findAll("message_time > $timer");
		return $res; //array
	}
	
	/**
	 * @abstract 得到用户的显示聊天内容的起始时间
	 * @return UserOnline(model)
	 */
	private function getFromtime() {
		$user = Yii::app()->user->name;
		$tbl_useronline = new UserOnline();
		$res = $tbl_useronline->find("online_name='$user'");
		return $res;
	}
	
	/**
	 * @abstract chang the string time to double time
	 * @return timer(double)
	 */
	private function dotimer($timer) {
		$timer = str_replace("-", "", $timer);
		$timer = str_replace(":", "", $timer);
		$timer = str_replace(" ", "", $timer);
		$timer = chop($timer);
		//echo doubleval($timer);
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
			if($model->save() > 0) {
				Yii::log("save success!!!",CLogger::LEVEL_INFO,'system.protected.ChatController');
			}
			else {
				Yii::log("save failed!!!",CLogger::LEVEL_INFO,'system.protected.ChatController.actionPush');
			}
			$this->renderPartial("_push",array("msg"=>$msg));
		}
	}
}


