<?php
class ChatController extends Controller
{
	/**
	 * 
	 * 某个用户拉取信息
	 * @param user $user
	 */
	public function actionPull($user)
	{
		$this->render("_pull");
	}
	
	/**
	 * 
	 * 从客户端推送信息到服务器
	 * @param user $from
	 * @param user $to
	 * @param type $type
	 * @param message $msg
	 */
	public function actionPush($from,$to,$msg)
	{
		$this->render("_push");
	}
}