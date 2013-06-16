<?php 

class UserFriendController extends Controller {
	
	public function ActionGetMyFriendInfo() {
		$allFriend = array();
		$username = Yii::app()->user->name;
		$allFriendMod = UserFriend::model()->findAll("user_name='$username'");
		foreach ($allFriendMod as $mod) {
			$userFriendMod = $mod->userFriendName;
			
			/* $userFriendMod = User::model()->find("user_name='$userFriendName'"); */
			$oneFriend = array("name"=>"$userFriendMod->user_username", "place"=>"$userFriendMod->user_place", 
								"photo"=>"$userFriendMod->user_photo", "mood"=>"$userFriendMod->user_sign");
			array_push($allFriend, $oneFriend);
		}
		echo json_encode($allFriend);
	}
	
	public function ActionGetFriendOfSearch($name) {
		$userMod = User::model()->find("user_username='$name'");
		$allFriend = array();
		$oneFriend = array("name"=>"$userMod->user_username", "place"=>"$userMod->user_place",
				"photo"=>"$userMod->user_photo", "mood"=>"$userMod->user_sign");
		array_push($allFriend, $oneFriend);
		echo json_encode($allFriend);
	}
}


?>

