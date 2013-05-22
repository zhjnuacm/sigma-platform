function Npc() {
	this.init = function() {
		return true;
	}
}

Npc.create = function() {
	var ret = new Npc();
	if (ret && ret.init()) {
		return ret;
	}
	return null;
}
