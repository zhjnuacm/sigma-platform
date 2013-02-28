function User() {

    this.userName;
    this.userID;
    this.userImage;

    this.animAction = function (tx, ty, userImage) {
        var X = 6;

        if (tx < userImage.getX()) {
            if (userImage.getX() > tx + X) {
                userImage.setX(userImage.getX() - X);
            }
            else
                userImage.setX(tx);
        } else {
            if (userImage.getX() + X < tx) {
                userImage.setX(userImage.getX() + X);
            } else {
                userImage.setX(tx);
            }
        }
        if (ty < userImage.getY()) {
            if (userImage.getY() > ty + X) {
                userImage.setY(userImage.getY() - X);
            }
            else
                userImage.setY(ty);
        } else {
            if (userImage.getY() + X < ty) {
                userImage.setY(userImage.getY() + X);
            } else {
                userImage.setY(ty);
            }
        }
    }

    this.init = function (imageObj) {
        this.userName = "Jopix";
        this.userID = "123456789";
        this.userImage = new Kinetic.Image({
            x: 400,
            y: 200,
            image: imageObj,
        });
    }
}
















