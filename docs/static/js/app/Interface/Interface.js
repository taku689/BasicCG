define([
    'modules/backbone-min',
], function(BackBone
    ){
    BasicCG.Interface = BackBone.View.extend({
        initialize: function(world) {
            this.world = world;
            this._buttonClick();
        },
        _buttonClick: function() {
            var that = this;
            _.bindAll(
                this, 
                '_createBoxRandom',
                '_reset',
                '_moveObject',
                '_scaleObject',
                '_rotateObject',
                '_moveScreen',
                '_threeWayDeadLock',
                '_penetration'
            );
            $("#create_object").on('click', that._createBoxRandom);
            $("#reset").on('click', that._reset);
            $("#move_object").on('click', that._moveObject);
            $("#scale_object").on('click', that._scaleObject);
            $("#rotate_object").on('click', that._rotateObject);
            $("#move_screen").on('click', that._moveScreen);
            $("#three_way_dead_lock").on('click', that._threeWayDeadLock);
            $("#penetration").on('click', that._penetration);
        },
        _createBoxRandom: function() {
            //説明のため、1個目は(0, 0, 500)に作成する
            if (this.world.objectsNum() === 0) {
                var color = {r: 0, g: 0, b: 0};
                this.world.createBox(0, 0, 500, 100, 100, 100, color);
            } else {
                this.world.createBox(
                    -500+Math.random()*1000,
                    -200+Math.random()*400,
                    200+Math.random()*1000,
                    10 + Math.random() * 100,
                    10 + Math.random() * 100,
                    10 + Math.random() * 100,
                    this._getRandomColor()
                );
            }
        },
        _reset: function() {
            this.world.reset();
        },
        _moveObject: function() {
            var x = +($("#move_x").val());
            var y = +($("#move_y").val());
            var z = +($("#move_z").val());
            if(typeof(x) !== 'number') x = 0;
            if(typeof(y) !== 'number') y = 0;
            if(typeof(z) !== 'number') z = 0;
            this.world.objectsMove(x, y, z);
        },
        _scaleObject: function() {
            var x = +($("#scale_x").val());
            var y = +($("#scale_y").val());
            var z = +($("#scale_z").val());
            if(typeof(x) !== 'number') x = 0;
            if(typeof(y) !== 'number') y = 0;
            if(typeof(z) !== 'number') z = 0;
            this.world.objectsScale(x, y, z);
        },
        _rotateObject: function() {
            var isNotBackDefault = $("#not_back_default:checked").val();
            BasicCG.Conf.isNotBack = isNotBackDefault;
            var x = +($("#rotate_x").val());
            var y = +($("#rotate_y").val());
            var z = +($("#rotate_z").val());
            if(typeof(x) !== 'number') x = 0;
            if(typeof(y) !== 'number') y = 0;
            if(typeof(z) !== 'number') z = 0;
            this.world.objectsRotate(x, y, z);
        },
        _moveScreen: function() {
            var frontZ  = +($("#front_clipping").val());
            var backZ   = +($("#back_clipping").val());
            var screenZ = +($("#screen").val());
            if(typeof(frontZ) !== 'number') frontZ = 0;
            if(typeof(backZ) !== 'number') backZ = 0;
            if(typeof(screenZ) !== 'number') screenZ = 0;
            this.world.moveScreen(frontZ, backZ, screenZ);
        },
        _threeWayDeadLock: function() {
            this.world.reset();
            //三角形1
            var triangle1P1 = new BasicCG.util.Vector3D(-100, -100, 500);
            var triangle1P2 = new BasicCG.util.Vector3D(-150, 50, 500);
            var triangle1P3 = new BasicCG.util.Vector3D(50, 100, 601);
            this.world.createTriangle(triangle1P1, triangle1P2, triangle1P3);
            //三角形2
            var triangle2P1 = new BasicCG.util.Vector3D(-50, 50, 400);
            var triangle2P2 = new BasicCG.util.Vector3D(30, 50, 400);
            var triangle2P3 = new BasicCG.util.Vector3D(30, -100, 600);
            this.world.createTriangle(triangle2P1, triangle2P2, triangle2P3);
            //三角形3
            var triangle3P1 = new BasicCG.util.Vector3D(50, 50, 200);
            var triangle3P2 = new BasicCG.util.Vector3D(50, 0, 200);
            var triangle3P3 = new BasicCG.util.Vector3D(-150, -100, 650);
            this.world.createTriangle(triangle3P1, triangle3P2, triangle3P3);
        },
        _penetration: function() {
            this.world.reset();
            //三角形1
            var triangle1P1 = new BasicCG.util.Vector3D(0, -100, 300);
            var triangle1P2 = new BasicCG.util.Vector3D(-100, 100, 300);
            var triangle1P3 = new BasicCG.util.Vector3D(100, 50, 300);
            this.world.createTriangle(triangle1P1, triangle1P2, triangle1P3);
            //三角形2
            var triangle2P1 = new BasicCG.util.Vector3D(100, -120, 500);
            var triangle2P2 = new BasicCG.util.Vector3D(50, -150, 500);
            var triangle2P3 = new BasicCG.util.Vector3D(-30, 50, 200);
            this.world.createTriangle(triangle2P1, triangle2P2, triangle2P3);
        },
        _getRandomColor: function() {
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);
            return {r: r, g: g, b: b};
        },
    });
});
