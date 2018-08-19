define([
    'modules/backbone-min'
    ], function(Backbone){
    BasicCG.util.Matrix = {
        //行列の掛け算
        mul: function(m1, m2){
            var res = new Array(m2.length);
            for (var i = 0; i < res.length; i++){
                res[i] = [];
            }
            var ans = 0;

            if (m1[0].length === m2.length) {
                for (var i = 0; i < m1.length; i++){
                    for (var j = 0; j < m2[0].length; j++){
                        ans = 0;
                        for (var k = 0; k < m2.length; k++){
                            ans += m1[i][k] * m2[k][j];
                        }
                        res[i][j] = ans;
                    }
                }
                return res;
            } else {
                console.log("error: cannnot mul matrix -> m1-col-length !== m2-row-length");
            }
        }
    };
});
