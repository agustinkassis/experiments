function Pointer (mapDiv) {
    this.loaded = false;
    this.tileStatus = {hover:[],selected:[]};
    this.countHover = 1;
    this.shape = []; //Sin uso
    this.hoverType = "none"; //tiles or none
    
    this.unHoverTiles = function () {
        if (this.tileStatus.hover.length>0) {
            for (var i=0;i<this.tileStatus.hover.length;i++) {
                this.tileStatus.hover[i].setHover(false);
            }
            this.tileStatus.hover = [];
        }
    };
    
    this.hoverTiles = function (tiles) {
        for (var i=0;i<tiles.length;i++) {
            this.tileStatus.hover.push(tiles[i]);
            if (tiles[i] !== null) {
                tiles[i].setHover(true);
            }
        }
    };
    
    this.calculateTiles = function (tile) {
        var tiles = [],tmpTile;
        if (tile === null) {
            return tiles;
        }
        switch (this.countHover) {
            //Square 4
            case 4:
                tiles.push(tile);
                //Check if next tile right exists
                if (isoMap.tiles[tile.tilePosition.x][tile.tilePosition.y+1] !== undefined) {
                    tiles.push(isoMap.tiles[tile.tilePosition.x][tile.tilePosition.y+1]);
                }
                //Check if next tile down exists
                if (isoMap.tiles[tile.tilePosition.x+1] !== undefined) {
                    tiles.push(isoMap.tiles[tile.tilePosition.x+1][tile.tilePosition.y]);
                }
                //Check if 3 available
                if (tiles.length === 3 ) {
                    tiles.push(isoMap.tiles[tile.tilePosition.x+1][tile.tilePosition.y+1]);
                }
            break;
            //Horizontal 3
            case 3:
                //Check if next tile right exists
                if (isoMap.tiles[tile.tilePosition.x][tile.tilePosition.y+2] !== undefined) {
                    tiles.push(isoMap.tiles[tile.tilePosition.x][tile.tilePosition.y+2]);
                }
            //Horizontal 2
            case 2:
                //Check if next tile right exists
                if (isoMap.tiles[tile.tilePosition.x][tile.tilePosition.y+1] !== undefined) {
                    tiles.push(isoMap.tiles[tile.tilePosition.x][tile.tilePosition.y+1]);
                }
            //Only One
            default:
                tiles.push(tile);
            break;
        }
        return tiles;
    };
    
    this.setHoverType = function (type) {
        this.unHoverTiles();
        this.hoverType = type;
    };
    
    this.mouseMove = function (e) {
        var offset = $(this).offset();
        var tiles = [];
        
        var top = e.pageY-offset.top;
        var left = e.pageX-offset.left;

        switch (isoMap.pointer.hoverType) {
            case "tiles":
                var tile = isoMap.pointer.matchTile({top:top,left:left});
                isoMap.pointer.unHoverTiles();
                tiles = isoMap.pointer.calculateTiles(tile);
                isoMap.pointer.hoverTiles(tiles);
            break;
            case "none":
            default:
            
            break;
        }
    };
    
    this.mouseClick = function (e) {
        var offset = $(this).offset();
        
        var top = e.pageY-offset.top;
        var left = e.pageX-offset.left;
        var tile = isoMap.pointer.matchTile({top:top,left:left});
        if (tile !== null) {
            isoMap.clickHandler.click(tile);
        }
    };
    
    this.matchTile = function (pos) {
        var x,y;
        for (x=0;x<isoMap.mapSize.width;x++) {
            for (y=0;y<isoMap.mapSize.height;y++) {
                
                if (isoMap.tiles[x][y].isPosition(pos)) {
                    
                    return isoMap.tiles[x][y];
                }
            }
        }
        return null;
    }
    this.loaded = true;
    mapDiv.mousemove(this.mouseMove);
    mapDiv.click(this.mouseClick);
    
}