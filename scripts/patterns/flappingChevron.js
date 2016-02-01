var flappingChevron = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 50,
        minAmp: -200,
        maxAmp: 100,
        maxDistance: 5,
        minDistance: -1,
        amplitudeMod: 60.5,
        chev1: 100,
        chev2: -20,
        boundify: false,
        bound_size: scene.bounds.size
    };
    buildCustom("flappingChevron", function(params) {
        
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
        p1.z += params.chev1 - (distanceMod * params.chev2);

        var p2 = copyVector(baseline);
        p2.x += waveSin;
        p2.y -= waveCos;
        p2.z += params.chev1 - (distanceMod * params.chev2);

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(p2, params.bound_size);
        }

        return [
            [vector(p1), vector(baseline), vector(p2)]
        ];
    }, params);
};
