define([
    'modules/backbone-min',
    'modules/underscore-min'
], function(BackBone){
    BasicCG.Objects = BackBone.View.extend({
        initialize: function() {
            this.objects = [];
        },
        set: function(obj) {
            this.objects.push(obj);
        },
        get: function() {
            return this.objects;
        },
        num: function() {
            return this.objects.length;
        },
        reset: function() {
            this.objects = [];
        },
        moveAll: function(x, y, z) {
            _.each(this.objects, function(object) {
                object.moveDistance(x, y, z);
            });
        },
        scaleAll: function(x, y, z) {
            _.each(this.objects, function(object) {
                object.scale(x, y, z);
            });
        },
        rotateAll: function(x, y, z) {
            _.each(this.objects, function(object) {
                object.rotate(x, y, z);
            });
        },
    });
});
