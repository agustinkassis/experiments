function Player (data) {
    this.name = data.name;
    this.id = isoMap.players.length+1;
    this.htmlObject = null;
    this.position = {top:0,left:0,zIndex:0};
    this.tile = null;
    this.state = "disabled";
    this.size = {width:data.width,height:data.height};
    this.path = [];
    this.cameraFollow = true;
    this.sprite = null;
    this.direction = "downIdle";
    
    this.getTilePosition = function (tile) {
        var position = {
            top: tile.htmlPosition.top + isoMap.tileSize.height/2+3,
            left: tile.htmlPosition.left + (isoMap.tileSize.width)/2,
            zIndex: tile.tilePosition.zIndex+4
        };
        return position;
    }
    
    this.setSprite = function (img) {
        this.sprite = new Sprite(img);
        this.sprite.loadData(testData);
        this.sprite.start("downIdle");
    }
    
    this.calculateDirection = function (from,to) {
        var horizontal = "";
        var vertical = "";
        if (from.left < to.left) {
            horizontal = "right";
        } else if (from.left > to.left) {
            horizontal = "left";
        }
        if (from.top < to.top) {
            vertical = horizontal!==""?"Down":"down";
        } else if (from.top > to.top) {
            vertical = horizontal!==""?"Up":"up";
        }
        
        return (horizontal===""&&vertical==="")?"down":horizontal+vertical;
    }
    
    this.refreshSprite = function (direction,state,callback) {
        var name = "";
        if (this.direction !== direction || this.state !== state) {
            this.direction = direction;
            this.state = state;
            name = direction;
            switch (state) {
                case "moving":
                    name += "Walking";
                break;
                case "idle":
                    name += "Idle";
                break;
                case "attacking":
                    name += "Attack";
                break;
            }
            this.sprite.start(name,callback);
        }
    };
    
    this.moving = function () {
        if (this.path.length <=0) {
            this.refreshSprite(this.direction,"idle");
            return;
        } else {
            this.refreshSprite(this.direction,"moving");
            this.path = isoMap.calculatePath(this.tile,this.path[this.path.length-1]);
            var nextTile = this.path.shift();
        }

        var delay = 452; //Diagonal
        
        direction = this.calculateDirection(this.tile.htmlPosition,nextTile.htmlPosition);
        this.refreshSprite(direction,"moving");
        try {
            if (nextTile.htmlPosition.top === this.tile.htmlPosition.top) { //Horizontal
                delay = 640;
            } else if (nextTile.htmlPosition.left === this.tile.htmlPosition.left) { //Vertical
                delay = 400;
            }
            var newPosition = this.getTilePosition(nextTile);
            this.tile = nextTile;
            var thisObject = this;

            this.htmlObject.animate({
                top: newPosition.top,
                left: newPosition.left,
                zIndex: isoMap.getZIndex(newPosition.top)+16
            },{duration:delay,easing:"linear",step:function() {
                thisObject.htmlObject.css("zIndex",isoMap.getZIndex(thisObject.htmlObject.css("top"))+16);
                thisObject.position.left = parseInt(thisObject.htmlObject.css("left"));
                thisObject.position.top = parseInt(thisObject.htmlObject.css("top"));
                var newPosition = {top:$(this).css("top"),left:$(this).css("left")};
                if (thisObject.cameraFollow === true) {
                    isoMap.centerCamera(newPosition);
                }
            }});
            
            setTimeout(function () {
                thisObject.moving();
            },delay);
        } catch (e) {
            this.refreshSprite(this.direction,"idle");
            this.path = [];
        }
    };
    
    this.attack = function (tile) {
        var direction = this.calculateDirection(this.tile.htmlPosition,tile.htmlPosition);
        var thisObject = this;
        this.refreshSprite(direction,"attacking", function () {
            thisObject.refreshSprite(thisObject.direction,"idle");
        }); 
    }
    
    this.move = function (tile) {
        this.path = isoMap.calculatePath(this.tile,tile);
        if (this.state != "moving") {
            this.moving();
        }
    };
    
    this.spawn = function (tile) {
        if (tile !== null) {
            this.position = this.getTilePosition(tile);
            this.tile = tile;
            var div = $("<div class=\"player\" id=\"player_"+this.id+"\"><div width=\"100%\" height=\"100%\" </div></div>");
            div.css({
                width: this.size.width,
                height: this.size.height,
                top: this.position.top,
                left: this.position.left,
                zIndex: this.position.zIndex,
            });
            this.htmlObject = div.appendTo(isoMap.mapDiv).hide().fadeIn(450);
            this.setSprite(div.find("div"));
            this.state = "idle";
            return this;
        }
        return null;
    }
    
    this.setClickHandler= function (action) {
        switch (action) {
            case "attack":
                var thisObject = this;
                this.htmlObject.click(function (e) {
                    if (isoMap.clickHandler.clickPlayer(thisObject)) {
                        if (thisObject.tile.tileDistance(isoMap.userPlayer.tile) <= 1.8) {
                            isoMap.userPlayer.attack(thisObject.tile);
                            isoMap.clickHandler.stopPropagation(e);
                        }
                    }
                });
                return true;
            break;
        }
        return false;
    }
    isoMap.addPlayer(this);
}