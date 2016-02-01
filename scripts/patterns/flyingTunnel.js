var flyingTunnel = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 50,
        minAmp: 5,
        maxAmp: 80,
        maxDistance: 5,
        minDistance: 0,
        amplitudeMod: 3,
        boundify: false,
        bound_size: scene.bounds.size
    };
    buildCustom("flyingTunnel", function(params) {

        var xpos = baseline.x;
        var ypos = baseline.y;

        var dist = pythagorean(xpos, ypos);
        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var amp = twoPoint(params.minDistance, params.maxAmp, params.maxDistance, params.minAmp, distanceMod);

        var centerAngle = angle(xpos, ypos);
        var waveSin = Math.sin(centerAngle) * amp / 2;
        var waveCos = Math.cos(centerAngle) * amp / 2;

        var p1 = copyVector(baseline);
        p1.x -= waveSin;
        p1.y += waveCos;

        var p2 = copyVector(baseline);
        p2.x += waveSin;
        p2.y -= waveCos;

        var c1 = curPos.a || p1;
        var c2 = curPos.b || p2;

        curPos.a = p1;
        curPos.b = p2;

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(p2, params.bound_size);
            boundify(c1, params.bound_size);
            boundify(c2, params.bound_size);
        }

        return [
            [vector(c1), vector(p1), vector(p2), vector(c2)]
        ];
    }, params);
};
