var initFlappingChevron = function() {};

var flappingChevron = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 40,
        minAmp: -40,
        maxAmp: 40,
        minDistance: -1,
        maxDistance: 5,
        minZDist: 100,
        maxZDist: -20,
        boundify: false,
        bound_size: 50,
        maxSegments: 150
    };
    build("flappingChevron", function(params) {

        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var amp = twoPoint(params.minDistance, params.maxAmp, params.maxDistance, params.minAmp, distanceMod);
        var waveSin = Math.sin(centerAngle) * amp;
        var waveCos = Math.cos(centerAngle) * amp;

        var zDistMod = twoPoint(params.minDistance, params.minZDist, params.maxDistance, params.maxZDist, distanceMod);

        var p1 = copyVector(baseline);
        p1.x -= waveSin;
        p1.y += waveCos;
        p1.z += zDistMod;

        var p2 = copyVector(baseline);
        p2.x += waveSin;
        p2.y -= waveCos;
        p2.z += zDistMod;

        if (params.boundify) {
            boundify(p1, params.bound_size);
            boundify(p2, params.bound_size);
        }

        return buildSegments([p1, baseline, p2]);

    }, params);
};
