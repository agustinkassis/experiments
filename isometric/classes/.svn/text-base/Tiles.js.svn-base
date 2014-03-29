function Tile(graphic,width,height) {
    this.graphic = graphic;
    this.size = {width:width,height:height};
    this.htmlObject;
    this.htmlPosition = {top:0,left:0};
    this.tilePosition = {x:0,y:0,zIndex:0};
    this.object = null;
    
    this.setPosition = function (positions) {
        this.tilePosition.x = positions.x;
        this.tilePosition.y = positions.y;
        this.tilePosition.zIndex = positions.zIndex;
        this.htmlPosition.top = positions.top;
        this.htmlPosition.left = positions.left;
    };
    
    this.isFree = function () {
        return (this.object === null);
    }
    
    this.tileDistance = function (tile) {
        var x = Math.abs(this.tilePosition.x - tile.tilePosition.x)+1;
        var y = Math.abs(this.tilePosition.y - tile.tilePosition.y)+1;
        return Math.sqrt(x*y-1);
    }
    
    this.isPosition = function (pos) {
        var xDistance,yDistance,proportion,yCenter,xCenter;
        if (pos.top > this.htmlPosition.top && pos.top < this.htmlPosition.top + this.size.height) {
            if (pos.left > this.htmlPosition.left && pos.left < this.htmlPosition.left + this.size.width) {
                proportion = this.size.width / this.size.height;
                yCenter = this.htmlPosition.top + Math.round(this.size.height/2);
                xCenter = this.htmlPosition.left + Math.round(this.size.width/2);
                yDistance = Math.abs(pos.top - yCenter)*proportion;
                xDistance = Math.abs(pos.left - xCenter);
                if ((yDistance + xDistance) <= (this.size.width/proportion)) {
                    return true;
                }
            }
        }
        return false;
    };
    
    this.printTile = function (mapDiv) {
        var div;
        div = $("<div class=\"tile\"></div>");
        div.css({
            'background-image' : 'url(images/tiles/'+graphic+'.png)',
            'top' : this.htmlPosition.top,
            'left' : this.htmlPosition.left,
            'x' : this.tilePosition.x,
            'y' : this.tilePosition.y,
            'zIndex' : this.tilePosition.zIndex,
            'width' : this.size.width,
            'height' : this.size.height
        });
        //div.attr("title","["+this.tilePosition.x+"]["+this.tilePosition.y+"]")
        this.htmlObject = div.appendTo(mapDiv);
        return this.htmlObject;
    };
    
    this.createBuilding = function (graphic,top) {
        if (this.isFree()) {
            var zIndex = this.tilePosition.zIndex + 12;
            var img = $("<img src=\"images/"+graphic+".png\" />").appendTo(this.htmlObject).hide();
            this.htmlObject.css({"opacity":0.3,zIndex:zIndex}).animate({opacity:1},1000);                        
            this.object = img.css("marginTop",top).show().animate({marginTop:0},{duration:1200,easing:"easeOutBounce"});
            this.object.css("top",isoMap.tileSize.height-top);
        }
    };
    
    this.setPath = function () {
        this.htmlObject.addClass("path");
    };
    
    this.destroyBuilding = function () {
        if (!this.isFree()) {
            this.object.fadeOut(450, function() {
                $(this).remove();
            });
            this.object = null;
        }
    };
    
    this.setHover = function(status) {
        if (status===true) {
            this.htmlObject.addClass("hover");
        } else {
            this.htmlObject.removeClass("hover");
        }
    };
}