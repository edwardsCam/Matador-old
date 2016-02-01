var spiral = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 10,
        minAmp: 5,
        maxAmp: 20,
        minPeriod: 1,
        maxPeriod: 1,
        maxDistance: 10,
        minDistance: 0,
        boundify: true,
        bound_size: 100
    };
    buildCustom("spiral", function(params) {

        var dist = pythagorean(baseline.x, baseline.y);
        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var amp = twoPoint(params.minDistance, params.maxAmp, params.maxDistance, params.minAmp, distanceMod);
        var per = twoPoint(params.minDistance, params.maxPeriod, params.maxDistance, params.minPeriod, distanceMod);

        var theta = pi2 * scene.time / per;
        theta %= pi2;
        var waveSin = Math.sin(theta) * amp;
        var waveCos = Math.cos(theta) * amp;

        var p1 = copyVector(baseline);
        p1.x += waveCos;
        p1.y += waveSin;

        var p2 = copyVector(baseline);
        p2.x -= waveCos;
        p2.y -= waveSin;

        var p3 = copyVector(baseline);
        p3.x -= waveSin;
        p3.y += waveCos;

        var p4 = copyVector(baseline);
        p4.x += waveSin;
        p4.y -= waveCos;

        var c1 = curPos.a || p1;
        var c2 = curPos.b || p2;
        var c3 = curPos.c || p3;
        var c4 = curPos.d || p4;

        curPos.a = p1;
        curPos.b = p2;
        curPos.c = p3;
        curPos.d = p4;

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(p2, params.bound_size);
            boundify(p3, params.bound_size);
            boundify(p4, params.bound_size);
            boundify(c1, params.bound_size);
            boundify(c2, params.bound_size);
            boundify(c3, params.bound_size);
            boundify(c4, params.bound_size);
        }

        return [
            [vector(p1), vector(c1)],
            [vector(p2), vector(c2)],
            [vector(p3), vector(c3)],
            [vector(p4), vector(c4)]
        ];
    }, params);
};
