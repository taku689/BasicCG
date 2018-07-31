define([
    'modules/backbone-min',
], function(BackBone
    ){
    var Conf = BasicCG.Conf;
    BasicCG.TopView = BackBone.View.extend({
        initialize: function() {
            if (BasicCG.topViewContext === void 0) {
                var topViewCanvas = $('#top_view_canvas')[0];
                BasicCG.topViewCanvas = topViewCanvas;
                BasicCG.topViewContext = topViewCanvas.getContext('2d');
                BasicCG.topViewContext.fillStyle = 'rgb(250, 250, 250)';
                BasicCG.topViewContext.fillRect(0, 0, 600, 400);
            }
            this.cameraImage = new Image();
            this.cameraImage.src = './static/img/camera.png';
            this.width = 600;
            this.height = 400;
        },
        draw: function(camera, objects) {
            var that = this;
            var context = BasicCG.topViewContext;
            context.lineWidth = 1.0;
            context.clearRect(0, 0, 600, 400);
            context.fillStyle = 'rgb(255, 240, 240)';
            context.fillRect(0, 0, 600, 400);
            this._drawObjects(objects);
            this._drawSurfaces(camera);
            if (this.cameraImage.complete) {
                this._drawCamera(camera);
            } else {
                this.cameraImage.onload = function () {
                    that._drawCamera(camera);
                };
            }
        },
        _drawCamera: function(camera) {
            var context = BasicCG.topViewContext;
            context.drawImage(this.cameraImage,camera.pos.x/4 + this.width/2 - 15, -camera.pos.z / 2 + 370, 30, 30);
        },
        _drawObjects: function(objects) {
            var that = this;
            var context = BasicCG.topViewContext;
            _.each(objects, function(object) {
                context.beginPath();
//                context.fillStyle = 'rgb(0,0,0)';
                context.fillStyle = object.getColorTxt();
                var r = 5;
                context.arc(object.pos.x/4 + that.width/2, -object.pos.z/4 + 370, r,  0, Math.PI*2, true);
                context.fill();
            });
        },
        _drawSurfaces: function(camera) {
            var context = BasicCG.topViewContext;
            context.strokeStyle = 'rgb(100,150,150)';
            /*
            context.moveTo(camera.pos.x + Conf.screen.width/2, -camera.pos.z / 2 + 370);
            context.lineTo(camera.pos.x + Conf.screen.width/2 - 400, -camera.pos.z / 2 + 370 - camera.maxZ/4);
            context.lineTo(camera.pos.x + Conf.screen.width/2 + 400, -camera.pos.z / 2 + 370 - camera.maxZ/4);
            context.lineTo(camera.pos.x + Conf.screen.width/2, -camera.pos.z / 2 + 370);
            context.stroke();
            */

            var text_adjust_x = 50;
            var text_adjust_y = 8;
            //前方クリッピング面
            context.beginPath();
            context.moveTo(camera.pos.x/4 + this.width/2 - 200/7, -camera.pos.z / 4 + 370 - camera.minZ/4);
            context.lineTo(camera.pos.x/4 + this.width/2 + 200/7, -camera.pos.z / 4 + 370 - camera.minZ/4);
            context.stroke();
            context.strokeText("前方クリッピング面", camera.pos.x/4 + this.width/2 - 200/7 + text_adjust_x, -camera.pos.z / 4 + 370 - camera.minZ/4 - text_adjust_y);
            //スクリーン
            context.beginPath();
            context.moveTo(camera.pos.x/4 + this.width/2 - 200/7, -camera.pos.z / 4 + 370 - camera.screenZ/4);
            context.lineTo(camera.pos.x/4 + this.width/2 + 200/7, -camera.pos.z / 4 + 370 - camera.screenZ/4);
            context.stroke();
            context.strokeText("スクリーン", camera.pos.x/4 + this.width/2 - 200/7 + text_adjust_x, -camera.pos.z / 4 + 370 - camera.screenZ/4 - text_adjust_y);
            //後方クリッピング面
            context.beginPath();
            context.moveTo(camera.pos.x/4 + this.width/2 - 200/7, -camera.pos.z / 4 + 370 - camera.maxZ/4);
            context.lineTo(camera.pos.x/4 + this.width/2 + 200/7, -camera.pos.z / 4 + 370 - camera.maxZ/4);
            context.stroke();
            context.strokeText("後方クリッピング面", camera.pos.x/4 + this.width/2 - 200/7 + text_adjust_x, -camera.pos.z / 4 + 370 - camera.maxZ/4 - text_adjust_y);

            //x軸
            context.lineWidth = 0.5;
            context.strokeStyle = 'rgb(0,0,0)';
            context.beginPath();
            context.moveTo(0, 380);
            context.lineTo(600, 380);
            context.stroke();
            context.strokeText("x軸", 580, 370);

            //z軸
            context.lineWidth = 0.5;
            context.strokeStyle = 'rgb(0,0,0)';
            context.beginPath();
            context.moveTo(300, 400);
            context.lineTo(300, 0);
            context.stroke();
            context.strokeText("z軸", 310, 10);

        },
    });
});
