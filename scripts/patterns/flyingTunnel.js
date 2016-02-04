var initFlyingTunnel = function() {
    prevPos.a = null;
    prevPos.b = null;
};

var flyingTunnel = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 50,
        minAmp: 5,
        maxAmp: 50,
        minDistance: 0,
        maxDistance: 5,
        boundify: false,
        bound_size: 50,
        maxSegments: 200
    };
    build("flyingTunnel", function(params) {

        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var amp = twoPoint(params.minDistance, params.maxAmp, params.maxDistance, params.minAmp, distanceMod);

        var waveSin = Math.sin(centerAngle) * amp;
        var waveCos = Math.cos(centerAngle) * amp;

        var p1 = copyVector(baseline);
        p1.x -= waveSin;
        p1.y += waveCos;

        var p2 = copyVector(baseline);
        p2.x += waveSin;
        p2.y -= waveCos;

        var c1 = prevPos.a || p1;
        var c2 = prevPos.b || p2;

        prevPos.a = p1;
        prevPos.b = p2;

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(p2, params.bound_size);
            boundify(c1, params.bound_size);
            boundify(c2, params.bound_size);
        }

        cleanup(params.maxSegments);

        var ret = [];
        ret.push(buildSegment(c1, p1, p2, c2));
        return ret;

    }, params);
};
