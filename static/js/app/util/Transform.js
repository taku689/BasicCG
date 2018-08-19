define([
    'modules/backbone-min'
], function(BackBone){
    BasicCG.util.Transform = {
        getModelingTransformation: function(vector3D, camera) {
            return vector3D.getInstance();
                //TODO
        },
        getViewingTransformation: function(vector3D, camera) {
            //TODO カメラの回転
            var _vector3D = vector3D.getInstance();
            _vector3D.moveDistancePoint(-camera.pos.x, -camera.pos.y, -camera.pos.z);
            return _vector3D;
        },
        getPerspectiveProjection: function(vector3D, camera) {
            var screenZ = camera.screenZ;
            var projectedX =((screenZ - camera.pos.z) / (vector3D.z - camera.pos.z)) * vector3D.x;
            var projectedY =((screenZ - camera.pos.z) / (vector3D.z - camera.pos.z)) * vector3D.y;
            return new BasicCG.util.Vector3D(projectedX, projectedY, vector3D.z);
        },
        getViewportTransformation: function(vector3D) {
            var Conf = BasicCG.Conf;
            var _vector3D = vector3D.getInstance();
            _vector3D.moveDistancePoint(Conf.screen.width/2, Conf.screen.height/2, 0);
            return _vector3D;
        },
    };
});
