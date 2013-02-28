function Message() {

    this.message;
    this.createMessage = function(mes){
        this.message = mes;
    }

    this.show = function (px, py) {

        var complexText = new Kinetic.Text({
            x:px,
            text: this.message,
            fontSize: 18,
            visible: true,
            fontFamily: 'Calibri',
            fill: '#555',
            width: 200,
            padding: 20,
            align: 'center'
        });

        complexText.setY(py - complexText.getHeight()/2);

        var rectMessage = new Kinetic.Rect({
            x: px - 20,
            y: py - complexText.getHeight() / 2,
            width: 240,
            height: complexText.getHeight() + 20,
            fill: '#fff',
        });

        NPCframe = true;
        
        setTimeout(function () {
            rectMessage.hide();
            complexText.hide();
            NPCframe = false;
            complexText = null;
            NPCframe = null;
        }, 3000);

        messageLayer.add(rectMessage);
        messageLayer.add(complexText);
        mapStage.add(messageLayer);
    }
}




