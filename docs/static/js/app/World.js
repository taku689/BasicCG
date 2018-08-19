define([
    'modules/backbone-min',
], function(BackBone
    ){
    BasicCG.World = BackBone.View.extend({
        initialize: function(objects, camera, topView) {
            this.objects = objects;
            this.camera = camera;
            this.topView = topView;
            this.projectionMethod = this.perspectiveProjection;
            _.bindAll(this, 'render', 'move');
            $(document).on('keypress', this.move);
        },
        drawAllObjects: function() {
            var that = this;
            var ctx = BasicCG.context;
            this._drawBackGround(ctx);

            var transformedTriangles = [];
            _.each(this.objects.get(), function(object) {
                $.merge(transformedTriangles, object.getTransformedTriangles(that.camera));
            });

            transformedTriangles = this._zSort(transformedTriangles);
            _.each(transformedTriangles, function(transformedTriangle) {
                transformedTriangle.draw();
            });
            this.topView.draw(this.camera, this.objects.get());
        },
        _drawBackGround: function(ctx) {
            //TODO 一旦べた書き
            ctx.clearRect(0, 0, 600, 400);
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.fillRect(0, 0, 600, 400);
        },
        _zSort: function(transformedTriangles) {
            return _.sortBy(transformedTriangles, function(triangle) {
                return triangle.getMaxZ();
            }).reverse();
        },
        move: function(e) {
            if (e.which === 104 || 105 || 106 || 107) {
                    this.drawAllObjects();
            }
        },
        createBox: function(x, y, z, w, h, d, color) {
            var box = new BasicCG.Material.Box(x, y, z, w, h, d);
            box.setColor(color.r, color.g, color.b);
            this.objects.set(box);
            this.drawAllObjects();
        },
        objectsNum: function() {
            return this.objects.num();
        },
        reset: function() {
            this.objects.reset();
            this.camera.reset();
            this.drawAllObjects();
        },
        objectsMove: function(x, y, z) {
            this.objects.moveAll(x, y, z);
            this.drawAllObjects();
        },
        objectsScale: function(x, y, z) {
            this.objects.scaleAll(x, y, z);
            this.drawAllObjects();
        },
        objectsRotate: function(x, y, z) {
            this.objects.rotateAll(x, y, z);
            this.drawAllObjects();
        },
        moveScreen: function(frontZ, backZ, screenZ) {
            this.camera.moveMaxZ(backZ);
            this.camera.moveMinZ(frontZ);
            this.camera.moveScreenZ(screenZ);
            this.drawAllObjects();
        },
        createTriangle: function(p1, p2, p3) {
            var triangle = new BasicCG.Material.Triangle(p1, p2, p3);
            this.objects.set(triangle);
            this.drawAllObjects();
        },
    });
});
