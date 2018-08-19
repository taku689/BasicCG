define([
    'modules/backbone-min'
    ], function(Backbone){
    BasicCG.util.Vector3D = function(x,y,z) {
            this.x = x;
            this.y = y;
            this.z = z;
    },
    BasicCG.util.Vector3D.prototype = {
        transCoordinatesPoint: function (trans_matrix) {
            var res = BasicCG.util.Matrix.mul(trans_matrix, [[this.x], [this.y], [this.z], [1]]);
            this.x = res[0][0];
            this.y = res[1][0];
            this.z = res[2][0];
        },
        //点の移動
        moveDistancePoint: function(x,y,z) {
            this.transCoordinatesPoint(
                [
                    [1,0,0,x],
                    [0,1,0,y],
                    [0,0,1,z],
                    [0,0,0,1]
                ]
            );
        },
        //点の拡大・縮小
        scalePoint: function (x, y, z) {
            this.transCoordinatesPoint(
                [
                    [x,0,0,0],
                    [0,y,0,0],
                    [0,0,z,0],
                    [0,0,0,1]
                ]
            );
        },
        rotatePoint: function(angleX, angleY, angleZ) {
            if(angleZ !== 0) this.xyRotatePoint(angleZ);
            if(angleY !== 0) this.xzRotatePoint(angleY);
            if(angleX !== 0) this.yzRotatePoint(angleX);
        },
        //点のx-y平面内における回転（z軸中心の回転）
        xyRotatePoint: function (angle) {
            var theta = Math.PI * angle / 180;
            var sin = Math.sin(theta);
            var cos = Math.cos(theta);
            this.transCoordinatesPoint(
                        [
                            [cos,-sin,0,0],
                            [sin,cos,0,0],
                            [0,0,1,0],
                            [0,0,0,1]
                        ] 
            );
        },
        //点のy-z平面内における回転（x軸中心の回転）
        yzRotatePoint: function (angle) {
            var theta = Math.PI * angle / 180;
            var sin = Math.sin(theta);
            var cos = Math.cos(theta);
            this.transCoordinatesPoint(
                        [
                            [1,0,0,0],
                            [0,cos,-sin,0],
                            [0,sin,cos,0],
                            [0,0,0,1]
                        ]
            );
        },
        //x-z平面内における回転（y軸中心の回転）
        xzRotatePoint: function (angle) {
            var theta = Math.PI * angle / 180;
            var sin = Math.sin(theta);
            var cos = Math.cos(theta);
            this.transCoordinatesPoint(
                        [
                            [cos,0,sin,0],
                            [0,1,0,0],
                            [-sin,0,cos,0],
                            [0,0,0,1]
                        ]
            );
        },
        getInstance: function() {
            return new BasicCG.util.Vector3D(this.x, this.y, this.z);
        },
    };
});
