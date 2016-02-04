var initSineWave = function() {
    prevPos.a = null;
    prevPos.b = null;
};

var sineWave = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 20,
        amplitude: 15,
        period: 0.8,
        minDistance: -2,
        maxDistance: 20,
        symmetry: true,
        boundify: false,
        bound_size: 50,
        maxSegments: 400
    };
    build("sineWave", function(params) {

        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, Math.abs(baseline.x));
        baseline.z += distanceMod;

        var theta = pi2 * scene.time / params.period;
        theta %= pi2;
        var wave = Math.cos(theta) * params.amplitude;

        var p1 = copyVector(baseline);
        p1.y += wave;

        var c1 = prevPos.a || p1;
        prevPos.a = p1;

        if (params.symmetry) {
            var p2 = flipX(baseline);
            p2.y += wave;

            var c2 = prevPos.b || p2;
            prevPos.b = p2;
        }

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(c1, params.bound_size);
            if (params.symmetry) {
                boundify(p2, params.bound_size);
                boundify(c2, params.bound_size);
            }
        }

        cleanup(params.maxSegments);

        var ret = [];
        ret.push([vector(p1), vector(c1)]);
        if (params.symmetry) ret.push([vector(p2), vector(c2)]);
        
        return ret;
    }, params);
};
