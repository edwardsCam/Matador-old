var sineWave = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 20,
        amplitude: 15,
        period: 0.8,
        maxDistance: 25,
        minDistance: -25,
        bound_size: scene.bounds.size
    };
    buildSimple("sineWave", function(params) {
        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, Math.abs(curPos.x));
        curPos.z += distanceMod;

        var theta = pi2 * scene.time / params.period;
        theta %= pi2;
        var wave = Math.cos(theta) * params.amplitude;
        curPos.y += wave;
    }, params);
};
