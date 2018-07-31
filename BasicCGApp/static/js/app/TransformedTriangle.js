define([
    'modules/backbone-min',
    './Objects/Triangle',
], function(Backbone, Triangle){
    BasicCG.TransformedTriangle = Triangle.extend({
        initialize: function(triangle, camera, color, pos) {
            this.drawable = true;
            this.setColor(color);
            this.pos = pos.getInstance();

            this.vertexes = [
                triangle.vertexes[0].getInstance(),
                triangle.vertexes[1].getInstance(),
                triangle.vertexes[2].getInstance(),
            ];

            //モデリング変換
            this._modelingTransformation(camera);
            //面がカメラの方向を向いているかの計算
            this._calcTowardCamera(camera);
            //視野変換
            this._viewingTransformation(camera);
            //ビューボリューム内にあるかどうかの計算
            this._calcInViewVolume(camera);
            //投影変換
            this._perspectiveProjection(camera);
            //ビューポート変換
            this._viewportTransformation();
        },
        _modelingTransformation: function(camera) {
            var transform = BasicCG.util.Transform;
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i] = transform.getModelingTransformation(this.vertexes[i], camera);
            }
        },
        _viewingTransformation: function(camera) {
            var transform = BasicCG.util.Transform;
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i] = transform.getViewingTransformation(this.vertexes[i], camera);
            }
        },
        _perspectiveProjection: function(camera) {
            var transform = BasicCG.util.Transform;
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i] = transform.getPerspectiveProjection(this.vertexes[i], camera);
            }
        },
        _viewportTransformation: function() {
            var transform = BasicCG.util.Transform;
            for (var i = 0, len = this.vertexes.length; i < len; i++) {
                this.vertexes[i] = transform.getViewportTransformation(this.vertexes[i]);
            }
        },
        _calcTowardCamera: function(camera) {
            var normalLine = this.getNormalLine();
            var cameraVec = new BasicCG.util.Vector3D(
                    camera.pos.x -this.vertexes[0].x,
                    camera.pos.y -this.vertexes[0].y,
                    camera.pos.z -this.vertexes[0].z
            );
            var innerProduct = normalLine.x * cameraVec.x + normalLine.y * cameraVec.y + normalLine.z * cameraVec.z;
            if (innerProduct <= 0) {
                this.drawable = false;
            }
        },
        draw: function() {
            if(!this.drawable) return;
            var that = this;
            var ctx = BasicCG.context;
            ctx.beginPath();
            ctx.moveTo(this.vertexes[0].x, this.vertexes[0].y);
            for (var i = 1; i < 3; i++){
                ctx.lineTo(this.vertexes[i].x, this.vertexes[i].y);
            }
            ctx.closePath();
            ctx.strokeStyle = this.getStrokeColorTxt();
            ctx.stroke();
            ctx.fillStyle = this.getColorTxt();
            //ctx.fillStyle = 'rgb(100,0,0)';
            ctx.fill();
        },
        //面の法線ベクトル
        //現在持っている点からベクトルを2つ導出し、
        //そのベクトル2つの外積を求める
        getNormalLine: function () {
            var vec1 = new BasicCG.util.Vector3D(0, 0, 0);
            var vec2 = new BasicCG.util.Vector3D(0, 0, 0);
            var normalLine = new BasicCG.util.Vector3D(0, 0, 0); //法線ベクトル
            vec1.x = this.vertexes[1].x - this.vertexes[0].x;
            vec1.y = this.vertexes[1].y - this.vertexes[0].y;
            vec1.z = this.vertexes[1].z - this.vertexes[0].z;
            vec2.x = this.vertexes[2].x - this.vertexes[0].x;
            vec2.y = this.vertexes[2].y - this.vertexes[0].y;
            vec2.z = this.vertexes[2].z - this.vertexes[0].z;
            // 外積
            // | i    j    k |
            // |v1x  v1y  v1z|
            // |v2x  v2y  v2z|
            normalLine.x = vec1.y * vec2.z - vec1.z * vec2.y;
            normalLine.y = vec1.z * vec2.x - vec1.x * vec2.z;
            normalLine.z = vec1.x * vec2.y - vec1.y * vec2.x;

            return normalLine;
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
        _calcInViewVolume: function(camera) {
            if (this.getMinZ() > camera.minZ && this.getMaxZ() < camera.maxZ) return;
            this.drawable = false;
        },
        setColor: function(color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
        },
        getColorTxt: function() {
            return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ' )';
        },
        getStrokeColorTxt: function() {
            return 'rgb(' + 200 + ',' + 200 + ',' + 255 + ' )';
        },
    });
});
