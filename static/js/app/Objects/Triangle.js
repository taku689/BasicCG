define([
    'modules/backbone-min',
    'app/Objects/Material',
], function(Backbone, Material){
    BasicCG.Material.Triangle = Material.extend({
        initialize: function(p1, p2, p3) {
            this.vertexes = [p1, p2, p3];
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.pos = new BasicCG.util.Vector3D(
                (p1.x + p2.x + p3.x)/3,
                (p1.y + p2.y + p3.y)/3,
                (p1.z + p2.z + p3.z)/3
            );
        },
        getCenterVertex: function () {
            return new BasicCG.util.Vector3D(
                (this.vertexes[0].x + this.vertexes[2].x)/2,
                (this.vertexes[0].y + this.vertexes[1].y)/2,
                1
            );
        },
        setColor: function (color) {
        },
        draw: function(camera) {
            if(!this.drawable) return;
            var that = this;
            var ctx = BasicCG.context;
            var vertexes = [];
            _.each(this.vertexes, function(vertex) {
                vertexes.push(that.getPerspectiveProjection(vertex, camera));
            });

            // TODO ビューポート変換
            ctx.beginPath();
            ctx.moveTo(vertexes[0].x, vertexes[0].y);
            for (var i = 1; i < 3; i++){
                ctx.lineTo(vertexes[i].x, vertexes[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            //ctx.fillStyle = 'rgb(0, 0, 0)';
            //ctx.fill();
        },
        moveDistance: function(x, y, z) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].moveDistancePoint(x,y,z);
            }
        },
        scale: function(x, y, z) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].scalePoint(x,y,z);
            }
        },
        rotate: function(angleX, angleY, angleZ) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                if (angleZ !== 0) this.vertexes[i].xyRotatePoint(angleZ);
                if (angleY !== 0) this.vertexes[i].xzRotatePoint(angleY);
                if (angleX !== 0) this.vertexes[i].yzRotatePoint(angleX);
            }
        },
        xyRotate: function (angle) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].xyRotatePoint(angle);
            }
        },
        yzRotate: function (angle) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].yzRotatePoint(angle);
            }
        },
        xzRotate: function (angle) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].xzRotatePoint(angle);
            }
        },
        getMinZ: function() {
            //十分大きな値
            var z = 10000000;
            _.each(this.vertexes, function(vertex) {
                if (vertex.z < z) {
                    z = vertex.z;
                }
            });
            return z;
        },
        getMaxZ: function() {
            //十分小さな値
            var z = -10000000;
            _.each(this.vertexes, function(vertex) {
                if (vertex.z > z) {
                    z = vertex.z;
                }
            });
            return z;
        },
        getTransformedTriangles: function(camera) {
            var transformedTriangles = [];
            return [new BasicCG.TransformedTriangle(this, camera, this.getColorRGB(), this.pos)];
        },
    });
    return BasicCG.Material.Triangle;
});
