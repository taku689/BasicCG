define([
    //モジュール系
    'jquery',
    //app
    './Conf',
    './TopView/TopView',
    './World',
    './CameraView',
    './TransformedTriangle',
    './Interface/Interface',
    './util/util',
    './util/Matrix',
    './util/Vector3D',
    './util/Transform',
    './Objects/Objects',
    './Objects/Material',
    './Objects/Triangle',
    './Objects/Rectangle',
    './Objects/Box'
], function($) {
    if (BasicCG.context === void 0) {
        var canvas = $('#app_canvas')[0];
        BasicCG.canvas = canvas;
        BasicCG.context = canvas.getContext('2d');
    }

    var objects = new BasicCG.Objects();

    var context = BasicCG.context;
    var topView = new BasicCG.TopView();
    var box2 = new BasicCG.Material.Box(80, 0, 300, 30, 30, 30);
    var box3 = new BasicCG.Material.Box(100, 50, 300, 30, 30, 30);
    var box4 = new BasicCG.Material.Box(50, - 50, 500, 30, 30, 30);
    var box5 = new BasicCG.Material.Box(-300, 50, 300, 30, 30, 30);
    var box6 = new BasicCG.Material.Box(100, 0, 500, 30, 30, 30);
//    objects.set(box2);
//    objects.set(box3);
//    objects.set(box4);
//    objects.set(box5);
//    objects.set(box6);

    var camera = new BasicCG.CameraView();
    var world = new BasicCG.World(objects, camera, topView);
    world.drawAllObjects();
    var interface = new BasicCG.Interface(world);
});
