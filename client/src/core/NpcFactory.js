function NpcFactory() {
	this._npcLayer;
	this._mapLayer;
	this.init = function(layer, mapName) {
		var self = this;
		self._mapLayer = layer;
		self._npcLayer = cc.Layer.create();
		layer.addChild(self._npcLayer);
		self.addNpcs();
	}

	this.addNpcs = function(mapName) {
		var self = this;
		$.ajax({
			type : "GET",
			url : genNpcsConfigUrl(mapName),
			success : function(data) {
				var npcs = data.split("@");
				for ( var i = 1; i < npcs.length; i++) {
					var NpcConfig = npcs[i].split(",");
					self.addNpc(cc.p(parseInt(NpcConfig[1]),
							parseInt(NpcConfig[2])), parseInt(NpcConfig[0]),NpcConfig[3]);
				}
			}
		});
	}

	this.addNpc = function(position, id ,name) {
		var self = this;
		var npc = Npc.create(self._mapLayer
				.tilePositionToWorldLocation(position), id,name);
		npc.setPriority(self._mapLayer.getTouchPriority() - 1);
		self._npcLayer.addChild(npc);
	}

}

NpcFactory.create = function(layer, mapName) {
	var ret = new NpcFactory();
	if (ret && ret.init(layer, mapName))
		return ret;
	return null;
}