define([
    'modules/backbone-min',
], function(BackBone) {
    BasicCG.CameraView = BackBone.View.extend({
        initialize: function() {
            this.reset();
            _.bindAll(this, 'render', 'move');
            $(document).on('keypress', this.move);
        },
        move: function(e) {
            switch (e.which) {
                case 104: // h
                    this.moveLeft();
                    break;
                case 106: // j
                    this.moveBack();
                    break;
                case 107: // k
                    this.moveForWard();
                    break;
                case 108: // l
                    this.moveRight();
                    break;
            }
        },
        moveLeft: function(){
            this.pos.x -= 10;
        },
        moveRight: function(){
            this.pos.x += 10;
        },
        moveBack: function(){
            var moveVal = 2;
            this.pos.z -= moveVal;
            this.screenZ -= moveVal;
            this.minZ -= moveVal;
            this.maxZ -= moveVal;
        },
        moveForWard: function(){
            var moveVal = 2;
            this.pos.z += moveVal;
            this.screenZ += moveVal;
            this.minZ += moveVal;
            this.maxZ += moveVal;
        },
        reset: function() {
            this.pos = new BasicCG.util.Vector3D(0, 0, 0);
            this.angle = new BasicCG.util.Vector3D(0, 0, 0);
            this.maxZ = 700;
            this.minZ = 50;
            this.screenZ = 300;
        },
        moveMaxZ: function(z) {
            this.maxZ += z;
        },
        moveMinZ: function(z) {
            this.minZ += z;
        },
        moveScreenZ: function(z) {
            this.screenZ += z;
        }
    });
});
