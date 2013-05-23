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
			$this->renderPartial("_pull");
		}
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
			switch ($type) {
				case 0:			// game hall message
					;
					break;
				case 1: ;			// region message
				break;
				case 2:break;	 	// private message
				default:
					;
					break;
			}

			$this->renderPartial("_push",array("to"=>$to));
		}
	}
	
	public function actionTalk() {
		
	}
}







