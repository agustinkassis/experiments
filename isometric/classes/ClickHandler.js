function ClickHandler () {
    var action = "";
    var graphic = "";
    var player = null;
    var height = 96;
    
    this.stopPropagation = function (event) {
        if (event.stopPropagation){
            event.stopPropagation();
        } else if(window.event){
            window.event.cancelBubble=true;
        }
    }
    
    
    this.setPlayerAction = function (player,action) {
        isoMap.pointer.setHoverType("none");
        this.action = action+"Player";
        this.player = player;
    };
    
    this.setAction = function (action,graphic,height) {
        switch (action) {
            case "createBuilding":
            case "destroy":
                isoMap.pointer.setHoverType("tiles");
            break;
            default:
                isoMap.pointer.setHoverType("none");
            break;
        }
        this.action = action;
        this.graphic = graphic;
        this.height = height;
    };
    
    this.clickPlayer = function (player) {
        if (this.action == "movePlayer") {
            return true;
        }
        return false;
    };
    
    this.click = function (tile) {
        switch (this.action) {
            case "createBuilding":
                tile.createBuilding(this.graphic,this.height);
            break;
            case "destroy":
                tile.destroyBuilding();
            break;
            case "movePlayer":
                this.player.move(tile);
            break;
        }
    }
}