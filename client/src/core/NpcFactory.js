function NpcFactory() {
	this._npcLayer;
	this._mapLayer;
	this.init = function(layer) {
		var self = this;
		self._mapLayer = layer;
		self._npcLayer = cc.Layer.create();
		layer.addChild(self._npcLayer);
		self.addNpcs();
	}
	
	this.addNpcs = function()
	{
		var self = this;
		self.addNpc(cc.p(5,7),2);
		self.addNpc(cc.p(11,12),3);
	}
	
	this.addNpc = function(position,id)
	{
		var self = this;
		var npc = Npc.create(self._mapLayer.tilePositionToWorldLocation(position),id);
		npc.setPriority(self._mapLayer.getTouchPriority() - 1);
		self._npcLayer.addChild(npc);
	}
	
}

NpcFactory.create = function(layer) {
	var ret = new NpcFactory();
	if (ret && ret.init(layer))
		return ret;
	return null;
}