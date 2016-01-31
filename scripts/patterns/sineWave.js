var sineWave = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 20,
        amplitude: 15,
        period: 0.8,
        maxDistance: 25,
        minDistance: -25,
        boundify: false
    };
    buildBaseline("sineWave", function(params) {
        var distanceMod = params.maxDistance - (((params.maxDistance - params.minDistance) / scene.maxPointerPos) * Math.abs(curPos.x));
        curPos.z += distanceMod;

        var theta = Math.PI * scene.time / params.period;
        var wave = Math.cos(theta) * params.amplitude;
        curPos.y += wave;
    }, params);
};