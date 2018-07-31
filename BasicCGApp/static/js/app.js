requirejs.config({
    baseUrl:'./static/js/',
    paths:{
        jquery:[
            'modules/jquery-1.11.2.min',
        ],
        underscore:[
            'modules/underscore-min',
        ],
        backbone:'modules/backbone-min',
        bootstrap:[
            'modules/bootstrap-min',
        ],
    },

    shim:{
        underscore:{
            exports:'_'
        },
        backbone: {
            deps:['underscore', 'jquery'],
            exports:'Backbone',
        },
    },
});

var BasicCG = function(){};
define(['app/BasicCG'], function() {
});
