define([
    'modules/backbone-min',
    'app/Objects/Material',
], function(Backbone, Material){
    BasicCG.Material.Rectangle = Material.extend({
        initialize: function(p1, p2, p3, p4) {
            this.w = Math.abs(p3.x - p1.x);
            this.h = Math.abs(p2.y - p1.y);
            this.d = 1;
            this.vertexes = [p1, p2, p3, p4];
            this.drawable = true;
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
            console.log(vertexes[0]);

            // TODO ビューポート変換
            ctx.beginPath();
            ctx.moveTo(vertexes[0].x, vertexes[0].y);
            for (var i = 1; i < 4; i++){
                ctx.lineTo(vertexes[i].x, vertexes[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fill();
        },
        moveDistance: function(x,y,z) {
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].moveDistancePoint(x,y,z);
            }
        },
        rotate: function(angleX,angleY,angleZ) {
            var center = new BasicCG.util.Vector3D(this.vertexes[0].x+this.w/2, this.vertexes[0].y+this.h/2, this.vertexes[0].z);
            this.moveDistance(-center.x, -center.y, -center.z);
            console.log(this.vertexes[0].y);
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                console.log(this.vertexes[i]);
                if (angleZ !== 0) this.vertexes[i].xyRotatePoint(angleZ);
                if (angleY !== 0) this.vertexes[i].xzRotatePoint(angleY);
                if (angleX !== 0) this.vertexes[i].yzRotatePoint(angleX);
            }
            this.moveDistance(center.x, center.y, center.z);
        },
        _xyRotate: function (angle) {
            var center = new BasicCG.util.Vector3D(this.vertexes[0].x, this.vertexes[0].y, this.vertexes[0].z);
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].xyRotatePoint(angle, center);
            }
        },
        _yzRotate: function (angle) {
            var center = new BasicCG.util.Vector3D(this.vertexes[0].x, this.vertexes[0].y, this.vertexes[0].z);
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].yzRotatePoint(angle, center);
            }
        },
        _xzRotate: function (angle) {
            var center = new BasicCG.util.Vector3D(this.vertexes[0].x, this.vertexes[0].y, this.vertexes[0].z);
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i].xzRotatePoint(angle, center);
            }
        },
        //面の法線ベクトル
        //現在持っている点からベクトルを2つ導出し、
        //そのベクトル2つの外積を求める
        getNormalLine: function () {
            var vec1 = new BasicCG.util.Vector3D(0, 0, 0);
            var vec2 = new BasicCG.util.Vector3D(0, 0, 0);
            var normalLine = new BasicCG.util.Vector3D(0, 0, 0); //法線ベクトル
            vec1.x = this.vertexes[1].x - this.vertexes[0].x;
            vec2.x = this.vertexes[3].x - this.vertexes[0].x;
            vec1.y = this.vertexes[1].y - this.vertexes[0].y;
            vec2.y = this.vertexes[3].y - this.vertexes[0].y;
            vec1.z = this.vertexes[1].z - this.vertexes[0].z;
            vec2.z = this.vertexes[3].z - this.vertexes[0].z;
            // 外積
            // | i    j    k |
            // |v1x  v1y  v1z|
            // |v2x  v2y  v2z|
            normalLine.x = vec1.x * vec2.z - vec1.z * vec2.y;
            normalLine.y = vec1.z * vec2.x - vec1.x * vec2.z;
            normalLine.z = vec1.x * vec2.y - vec1.y * vec2.x;
            return normalLine;
        },
    });
});
