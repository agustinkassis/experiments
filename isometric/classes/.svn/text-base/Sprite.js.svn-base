function Sprite (element) {
    this.data = {states:{}};
    this.element = null;
    this.state = "";
    this.playing = false;
    this.actualFrame = 0;
    this.actualLoop = 0;
    this.timeout = null;
    this.callback = null;
    
    this.loadData = function (data) {
        if (!this.parseData(data)) {
            return false;
        }
        return true;
    };
    
    this.setElement = function (element) {
        this.element = element;
        this.element.css("position","relative");
    };
    
    this.setState = function (state) {
        if (this.data.states[state] === undefined) {
            return false;
        }
        
        if (this.element !== null) {
            element.css("background-image","url("+this.data.url+")");
        }
        
        this.state = state;
        return true;
    };
    
    this.stop = function () {
        this.playing = false;
        clearTimeout(this.timeout);
    };
    
    this.setCallback = function (callback) {
        if (callback !== undefined) {
            this.callback = callback;
            return false
        }
        this.callback = null;
        return true;
    };
    
    this.start = function (state,callback) {
        if (state !== undefined && state !== this.state) {
            if (!this.setState(state)) {
                return false;
            }
        }
        this.stop();
        this.actualFrame = 0;
        this.actualLoop = 0;
        this.setCallback(callback);
        this.playing = true;
        this.nextFrame();
    }
    
    this.nextFrame = function () {
        if (!this.playing) {
            this.finishedAnimation();
            return false;
        }
        var frame = this.data.states[this.state].frames[this.actualFrame];
        this.element.css({
            "backgroundPosition": "-"+frame.position[0]+"px -"+frame.position[1]+"px",
            "top" : -frame.center[1],
            "left" : -frame.center[0],
            "width": frame.size[0],
            "height": frame.size[1]
        });
        
        if (++this.actualFrame >= this.data.states[this.state].frames.length) {
            if (++this.actualLoop >= this.data.states[this.state].loops && this.data.states[this.state].loops>0) {
                this.finishedAnimation();
                return false;
            }
            this.actualFrame = 0;
        }
        
        var thisObject = this;
        this.timeout = setTimeout(function () {
            thisObject.nextFrame();
        },frame.delay);
        return true;
    };
    
    this.finishedAnimation = function () {
        this.playing = false;
        if (this.callback !== null) {
            this.callback();
            this.callback = null;
        }
    };
    
    this.parseData = function (data) {
        if (data.url === undefined) {
            console.log("URL missing for Sprite");
            return false;
        }
        if (data.height === undefined && data.width === undefined) {
            console.log("Size undefined for Sprite");
            return false;
        }
        
        if (data.states === undefined || data.states.length === 0) { //If no states defined, create default
            console.log("No states defined for Sprite");
            this.data.states.default = {
                loops: 1,
                frames : [{
                    "center":[Math.ceil(data.width)/2,data.height-1],
                    "size":[data.width,data.height],
                    "position":[0,0],
                    "delay":300
                }]
            };
        } else {
            this.data.states = data.states;
        }

        var thisObject = this;
        $.each(this.data.states,function (k,v) {
            if (v.generator !== undefined) {
                thisObject.data.states[k].frames = thisObject.generateFrames(v.generator);
            }
        });
        this.data.url = data.url;
        this.data.width = data.width;
        this.data.height = data.height;
        this.data.name = data.name===undefined?"":data.name;
        this.data.autoStart = data.autoStart===undefined?true:data.autoStart;
        this.data.loops = data.loops===undefined?0:data.loops;
        return true;
    }
    
    this.generateFrames = function (generator) {
        var frames=[],e;
        /*
        generator = {
            size: [56,120],
            count: 7,
            delay: 200,
            start: [0,0],
            center: [28,120]
        };
        */
        var frame;
        for (e=0;e<generator.count;e++) {
            frame = {
                "center":generator.center,
                "size":generator.size,
                "position":[generator.start[0] + (e * generator.size[0]),generator.start[1]],
                "delay":generator.delay
            };
            frames.push(frame);
        }
        return frames;
    };
    
    this.loadFile = function (filePath,callback) {
        $.ajax({
            url: filePath,
            complete: function (data) {
                
                data = $.parseJSON(data.responseText);
                var res = this.loadData(data);
                if (typeof callback == "function") {
                    callback(res);
                }
            }
        });
    };
    
    //Constructor
    
    this.setElement(element);
    
}