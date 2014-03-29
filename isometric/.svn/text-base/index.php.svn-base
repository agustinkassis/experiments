<!DOCTYPE html>

<html>
    <head>
        <title>Isometric Tests</title>
        <link rel="stylesheet" media="screen" type="text/css" href="style.css" />
        <script type="text/javascript" src="classes/jquery.min.js"></script>
        <script type="text/javascript" src="classes/jquery-ui.min.js"></script>
        
        <script type="text/javascript" src="classes/PathFinder.js"></script>
        <script type="text/javascript" src="classes/IsoMap.js"></script>
        <script type="text/javascript" src="classes/ClickHandler.js"></script>
        <script type="text/javascript" src="classes/Player.js"></script>
        <script type="text/javascript" src="classes/Pointer.js"></script>
        <script type="text/javascript" src="classes/Tiles.js"></script>
        <script type="text/javascript" src="classes/Sprite.js"></script>
        
        <script type="text/javascript">
            var isoMap;
            
            var divSprite;
            var sprite;
            var testData = {
                "name":"Test Player",
                "width":112,
                "height":77,
                "url":"http://www.admasis.com/experiments/isometric/images/players/barbarian.png",
                "autoStart":true,
                "states":{
                    "downIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,0],
                            center: [38,112]
                        }
                    },
                    "downWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,896],
                            center: [39,112]
                        }
                    },
                    "rightDownIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,786],
                            center: [42,109]
                        }
                    },
                    "rightDownWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1706],
                            center: [43,117]
                        }
                    },
                    "rightIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,672],
                            center: [43,110]
                        }
                    },
                    "rightWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1590],
                            center: [44,114]
                        }
                    },
                    "rightUpIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,560],
                            center: [42,110]
                        }
                    },
                    "rightUpWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1474],
                            center: [42,114]
                        }
                    },
                    "upIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,448],
                            center: [40,110]
                        }
                    },
                    "upWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1358],
                            center: [40,114]
                        }
                    },
                    "leftUpIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,336],
                            center: [39,110]
                            //38 112
                        }
                    },
                    "leftUpWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1242],
                            center: [38,114]
                        }
                    },
                    "leftIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,224],
                            center: [37,110]
                        }
                    },
                    "leftWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1126],
                            center: [38,115]
                        }
                    },
                    "leftDownIdle":{
                        "loops":0,
                        "generator": {
                            size: [77,112],
                            count: 8,
                            delay: 110,
                            start: [3200,112],
                            center: [37,111]
                        }
                    },
                    "leftDownWalking":{
                        "loops":0,
                        "generator": {
                            size: [78,116],
                            count: 8,
                            delay: 70,
                            start: [3200,1012],
                            center: [38,111]
                        }
                    },
                    
                    
                    "downAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,0],
                            center: [100,119]
                        }
                    },
                    "leftDownAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,160],
                            center: [98,120]
                        }
                    },
                    
                    "leftAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,320],
                            center: [96,118]
                        }
                    },
                    "leftUpAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,480],
                            center: [96,118]
                        }
                    },
                    "upAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,640],
                            center: [98,116]
                        }
                    },
                    "rightUpAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,800],
                            center: [102,116]
                        }
                    },
                    "rightAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,960],
                            center: [108,116]
                        }
                    },
                    "rightDownAttack":{
                        "loops":1,
                        "generator": {
                            size: [200,160],
                            count: 16,
                            delay: 40,
                            start: [0,1120],
                            center: [108,117]
                        }
                    }
                    
                }
            };
            
            
            
            function startMenu () {
                $("#floatingMenu div").click(function () {
                    $(this).addClass("selected");
                    $("#floatingMenu div").not(this).removeClass("selected");
                });
                
                $("#movePlayer").click(function () {
                    isoMap.clickHandler.setPlayerAction(barbarian,"move");
                });
                
                $("#buildTower").click(function () {
                    isoMap.clickHandler.setAction("createBuilding","buildings/faro",96);
                });
                $("#buildFactory").click(function () {
                    isoMap.clickHandler.setAction("createBuilding","buildings/factory",52);
                });
                $("#destroyBuilding").click(function () {
                    isoMap.clickHandler.setAction("destroy");
                });
            }
            
            $(function () {
                isoMap = new IsoMap("#isoMap",1024,600);
                isoMap.generate(40,40);
                isoMap.printMap();
                barbarian = new Player({
                    name: "Barbarian",
                    width: 112,
                    height: 77,
                });
                
                //barbarian.setSprite(testData);
                barbarian.spawn(isoMap.tiles[20][20]);
                
                isoMap.userPlayer = barbarian;
                var npc = [];
                npc[0] = new Player({name:"NPCBarbarian1",width:112,height:77}).spawn(isoMap.tiles[25][32]);
                npc[0].refreshSprite("leftUp","idle");
                npc[0].setClickHandler("attack");
                
                npc[1] = new Player({name:"NPCBarbarian2",width:112,height:77}).spawn(isoMap.tiles[30][23]);
                npc[1].refreshSprite("leftDown","idle");
                npc[1].setClickHandler("attack");
                
                npc[2] = new Player({name:"NPCBarbarian3",width:112,height:77}).spawn(isoMap.tiles[12][25]);
                npc[2].refreshSprite("rightDown","idle");
                npc[2].setClickHandler("attack");
                
                isoMap.centerCamera(barbarian.position,true,2000)
                startMenu();
            });
        </script>
    </head>
    <body>
        <h1>Isometric Prueba</h1>
        
        <div id="floatingMenu">
            <div class="button" id="movePlayer">Mover Barbarian</div>
            <div class="button" id="buildTower">Construir Torres</div>
            <div class="button" id="buildFactory">Construir Fabricas</div>
            <div class="button" id="destroyBuilding">Destruir Edificios</div>
        </div>
        <div id="isoMap">
            <div style="color: #F00;font-size:60px;">Error en Javascript</div>
        </div>
    </body>
</html>