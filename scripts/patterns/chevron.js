var initChevron = function() {

};

var chevron = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 25,
        minAmp: 20,
        maxAmp: 100,
        minDistance: 0,
        maxDistance: 10,
        minZDist: 100,
        maxZDist: 200,
        minSqueeze: 1,
        maxSqueeze: 10,
        boundify: false,
        bound_size: scene.bounds.size
    };
    buildCustom("chevron", function(params) {

        var dist = pythagorean(baseline);
        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var amp = twoPoint(params.minDistance, params.maxAmp, params.maxDistance, params.minAmp, distanceMod);
        var squeezeMod = twoPoint(params.minDistance, params.minSqueeze, params.maxDistance, params.maxSqueeze, distanceMod);

        var centerAngle = angle(baseline);
        var waveSin = Math.sin(centerAngle) * amp / squeezeMod;
        var waveCos = Math.cos(centerAngle) * amp / squeezeMod;

        var zDistMod = twoPoint(params.minDistance, params.minZDist, params.maxDistance, params.maxZDist, distanceMod);

        var p1 = copyVector(baseline);
        p1.x -= waveSin;
        p1.y += waveCos;
        p1.z -= zDistMod;

        var p2 = copyVector(baseline);
        p2.x += waveSin;
        p2.y -= waveCos;
        p2.z -= zDistMod;

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(p2, params.bound_size);
        }

        return [
            [vector(p1), vector(baseline), vector(p2)]
        ];
    }, params);
};
