function NPC() {
    this.userImage;
    this.NPCImage;

    this.init = function (imageObj) {
        this.NPCImage = new Kinetic.Image({
            x: 500,
            y: 350,
            image: imageObj,
        });
    }
}