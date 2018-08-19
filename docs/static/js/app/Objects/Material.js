define([
    'modules/backbone-min'
], function(BackBone){
    BasicCG.Material = BackBone.View.extend({
        initialize: function() {
        },
        draw: function(camera) {},
        getTransformedTriangles: function(camera) {
            var that = this;
            var transformedTriangles = [];
            _.each(this.triangles, function(triangle) {
                transformedTriangles.push(new BasicCG.TransformedTriangle(triangle, camera, that.getColorRGB(), that.pos));
            });
            return transformedTriangles;
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
        getColorTxt: function() {
            return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ' )';
        },
    });
    return BasicCG.Material;
});
