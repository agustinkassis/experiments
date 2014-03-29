function IsoMap(htmlDiv,width,height) {
    this.htmlDiv;
    this.mapDiv;
    this.pointer = null;
    this.clickHandler = null;
    this.players = [];
    this.userPlayer = null;
    
    this.loaded = false;
    this.tileSize = {width:64,height:32};
    this.htmlSize = {width:800,height:600,maxLeft:0,maxTop:0};
    this.mapSize = {width:10,height:10};
    this.position = {top:0,left:0};
    this.zIndex = {max:0,start:0,min:100};
    this.tiles = [];
    this.setSize = function (width,height) {
        this.htmlDiv.css("width",width);
        this.htmlDiv.css("height",height);
    };
    this.zTopRelation = 0;
    
    //Functions
    
    this.getZIndex = function (top) {
        return parseInt(top)+this.zTopRelation-this.tileSize.height/2;
    }
    
    this._constructor = function (htmlDiv,width,height) {
        if (this.htmlDiv = $(htmlDiv)) {
            this.loaded = true;
            this.htmlSize.width = width;
            this.htmlSize.height = height;
            this.htmlDiv.addClass("isoMap");
            this.setSize(width,height);
            this.htmlDiv.html("");
            this.mapDiv = $("<div class=\"mapDiv\"></div>").appendTo(this.htmlDiv);
            this.pointer = new Pointer(this.mapDiv);
            this.clickHandler = new ClickHandler();
        }
    };
    
    this.calculatePath = function (originTile,destinationTile) {
        var result = [];
        if (!destinationTile.isFree()) {
            return result;
        }
        var start = [originTile.tilePosition.x,originTile.tilePosition.y];
        var destination = [destinationTile.tilePosition.x,destinationTile.tilePosition.y];
        
        
        var path = a_star(start, destination, this.tiles, this.mapSize.width, this.mapSize.height);
        for (var i=0;i<path.length;i++) {
            result.push(this.tiles[path[i].x][path[i].y]);
        }
        result.shift();
        return result;
    };
    
    this.centerCamera = function (position,animate,delay) {
        var newPosition = {
            left: this.htmlSize.width/2 - parseInt(position.left),
            top: this.htmlSize.height/2 - parseInt(position.top)
        };
        
        var limitLeft = -this.htmlSize.maxLeft+this.htmlSize.width-this.tileSize.width/2;
        var limitTop = -this.htmlSize.maxTop+this.htmlSize.height;
        
        newPosition.left = newPosition.left>0?0:newPosition.left;
        newPosition.left = newPosition.left<limitLeft?limitLeft:newPosition.left;
        
        newPosition.top = newPosition.top>0?0:newPosition.top;
        newPosition.top = newPosition.top<limitTop?limitTop:newPosition.top;
        if (animate !== undefined) {
            delay = delay===undefined?1000:delay;
            this.mapDiv.animate(newPosition,delay);
        } else {
            this.mapDiv.css(newPosition);
        }
    }
    
    this.addPlayer = function (player) {
        this.players.push(player);
    };
    
    this.generate = function (width,height) {
        this.mapSize.width = width;
        this.mapSize.height = height;
        var x,y,xPosition,yPosition,zIndex,top,left;
        this.zIndex.start = this.zIndex.min + this.tileSize.height/2 * (this.mapSize.height+this.mapSize.width);
        this.zIndex.max = this.zIndex.start + this.mapSize.height * this.htmlSize.height/2;
        
        zIndex = this.zIndex.start;
        topStart = Math.ceil(this.mapSize.height*this.tileSize.height/2);
        leftStart = 0;
        
        
        for (x=0;x<this.mapSize.width;x++) {
            zIndex = this.zIndex.start + this.tileSize.height/2*x;
            top = topStart + this.tileSize.height/2*x;
            left = leftStart + this.tileSize.width/2*x;
            this.tiles[x] = [];
            for (y=0;y<this.mapSize.height;y++) {
                zIndex -= Math.ceil(this.tileSize.height/2);
                top -= this.tileSize.height/2;
                left += this.tileSize.width/2;
                this.tiles[x][y] = new Tile("grass",this.tileSize.width,this.tileSize.height);
                this.tiles[x][y].setPosition({
                    x:x,
                    y:y,
                    top:top,
                    left:left,
                    zIndex:zIndex
                });
            }
            zIndex = this.tileSize.height;
        }
        
        this.htmlSize.maxLeft = (this.mapSize.width/2+this.mapSize.height/2)*this.tileSize.width;
        this.htmlSize.maxTop = (this.mapSize.width/2+this.mapSize.height/2)*this.tileSize.height;
        this.zTopRelation = this.tiles[0][0].tilePosition.zIndex - this.tiles[0][0].htmlPosition.top;
    };
    
    this.printMap = function() {
        var x,y;
        for (x=0;x<this.mapSize.width;x++) {
            for (y=0;y<this.mapSize.height;y++) {
                this.tiles[x][y].printTile(this.mapDiv);
            }
        }
    };
    
    
    //Start
    this._constructor(htmlDiv,width,height);
}