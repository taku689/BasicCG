define([
    'modules/backbone-min',
    'app/Objects/Material',
], function(Backbone, Material){
    BasicCG.Material.Box = Material.extend({
        initialize: function(x, y, z, w, h, d) {
            if(typeof(x) !== 'number') x = 0;
            this.w = w;
            this.h = h;
            this.d = d;
            this.angle = new BasicCG.util.Vector3D(0, 0, 0);
            this.pos = new BasicCG.util.Vector3D(x, y, z);
            this.vertexes = {
                p11: new BasicCG.util.Vector3D(x - w/2, y - h/2, z - d/2),
                p12: new BasicCG.util.Vector3D(x - w/2, y + h/2, z - d/2),
                p13: new BasicCG.util.Vector3D(x + w/2, y + h/2, z - d/2),
                p14: new BasicCG.util.Vector3D(x + w/2, y - h/2, z - d/2),
                p21: new BasicCG.util.Vector3D(x - w/2, y - h/2, z + d/2),
                p22: new BasicCG.util.Vector3D(x - w/2, y + h/2, z + d/2),
                p23: new BasicCG.util.Vector3D(x + w/2, y + h/2, z + d/2),
                p24: new BasicCG.util.Vector3D(x + w/2, y - h/2, z + d/2),
            };
            var vertex = this.vertexes;
            this.triangles = [
                //正面
                new BasicCG.Material.Triangle(vertex.p11.getInstance(), vertex.p12.getInstance(), vertex.p13.getInstance()),
                new BasicCG.Material.Triangle(vertex.p13.getInstance(), vertex.p14.getInstance(), vertex.p11.getInstance()),
                //右面
                new BasicCG.Material.Triangle(vertex.p14.getInstance(), vertex.p13.getInstance(), vertex.p23.getInstance()),
                new BasicCG.Material.Triangle(vertex.p23.getInstance(), vertex.p24.getInstance(), vertex.p14.getInstance()),
                //裏面
                /*
                new BasicCG.Material.Triangle(vertex.p24.getInstance(), vertex.p23.getInstance(), vertex.p22.getInstance()),
                new BasicCG.Material.Triangle(vertex.p21.getInstance(), vertex.p24.getInstance(), vertex.p22.getInstance()),
                */
                new BasicCG.Material.Triangle(vertex.p22.getInstance(), vertex.p21.getInstance(), vertex.p24.getInstance()),
                new BasicCG.Material.Triangle(vertex.p24.getInstance(), vertex.p23.getInstance(), vertex.p22.getInstance()),
                //左面
                new BasicCG.Material.Triangle(vertex.p21.getInstance(), vertex.p22.getInstance(), vertex.p12.getInstance()),
                new BasicCG.Material.Triangle(vertex.p11.getInstance(), vertex.p21.getInstance(), vertex.p12.getInstance()),
                //上面
                new BasicCG.Material.Triangle(vertex.p21.getInstance(), vertex.p11.getInstance(), vertex.p14.getInstance()),
                new BasicCG.Material.Triangle(vertex.p24.getInstance(), vertex.p21.getInstance(), vertex.p14.getInstance()),
                //下面
                new BasicCG.Material.Triangle(vertex.p12.getInstance(), vertex.p22.getInstance(), vertex.p23.getInstance()),
                new BasicCG.Material.Triangle(vertex.p13.getInstance(), vertex.p12.getInstance(), vertex.p23.getInstance()),
            ];
            this.r = 0;
            this.g = 0;
            this.b = 0;
        },
        setColor: function (r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        },
        getColorRGB: function() {
            return {
                r: this.r,
                g: this.g,
                b: this.b
            };
        },
        /*
        getTransformedTriangles: function(camera) {
            var that = this;
            var transformedTriangles = [];
            _.each(this.triangles, function(triangle) {
                transformedTriangles.push(new BasicCG.TransformedTriangle(triangle, camera, that.getColorRGB(), that.pos));
            });
            return transformedTriangles;
        },
        */
        draw: function(camera) {
            var that = this;
            _.each(this.triangles, function(triangle) {
                triangle.draw(camera);
            });
        },
        scale: function(x, y, z) {
            this.w *=  x;
            this.h *=  y;
            this.d *=  z;
            var currentPos = this.pos.getInstance();
            this.moveDistance(-currentPos.x, -currentPos.y, -currentPos.z);
            _.each(this.triangles, function(triangle) {
                triangle.scale(x, y, z);
            });
            this.moveDistance(currentPos.x, currentPos.y, currentPos.z);
        },
        rotate: function(angleX, angleY, angleZ) {
            var that = this;
            var Conf = BasicCG.Conf;
            this._setAngle(angleX, angleY, angleZ);
            var currentPos = this.pos.getInstance();
            if (!Conf.isNotBack) this.moveDistance(-currentPos.x, -currentPos.y, -currentPos.z);
            _.each(this.triangles, function(triangle) {
                if (angleZ !== 0) triangle.xyRotate(angleZ);
                if (angleY !== 0) triangle.xzRotate(angleY);
                if (angleX !== 0) triangle.yzRotate(angleX);
            });
            if (!Conf.isNotBack) this.moveDistance(currentPos.x, currentPos.y, currentPos.z);
            if (Conf.isNotBack) {
                this.pos.rotatePoint(angleX, angleY, angleZ);
            }
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
        moveDistance: function(x, y, z) {
            this.pos.moveDistancePoint(x,y,z);
            _.each (this.triangles, function(triangle) {
                triangle.moveDistance(x, y, z);
            });
        },
        _setAngle: function (x, y, z) {
            this.angle.x += x;
            this.angle.y += y;
            this.angle.z += z;
        },
    });
});
