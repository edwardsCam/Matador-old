var initSpiral = function() {
    prevPos.a = null;
    prevPos.b = null;
    prevPos.c = null;
    prevPos.d = null;
};

var spiral = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 10,
        minAmp: 5,
        maxAmp: 20,
        minPeriod: 1,
        maxPeriod: 1,
        minDistance: 0,
        maxDistance: 10,
        boundify: true,
        bound_size: 100,
        maxSegments: 400
    };
    build("spiral", function(params) {

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

        var c1 = prevPos.a || p1;
        var c2 = prevPos.b || p2;
        var c3 = prevPos.c || p3;
        var c4 = prevPos.d || p4;

        prevPos.a = p1;
        prevPos.b = p2;
        prevPos.c = p3;
        prevPos.d = p4;

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

        cleanup(params.maxSegments);

        var ret = [];
        ret.push(buildSegment(p1, c1));
        ret.push(buildSegment(p2, c2));
        ret.push(buildSegment(p3, c3));
        ret.push(buildSegment(p4, c4));

        return ret;

    }, params);
};
