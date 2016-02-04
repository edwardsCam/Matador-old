var initCrosshair = function() {
    prevPos.a = null;
    prevPos.b = null;
    prevPos.c = null;
    prevPos.d = null;
    prevPos.e = null;
    prevPos.f = null;
    prevPos.g = null;
    prevPos.h = null;
};

var crosshair = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 30,
        minDistance: -1,
        maxDistance: 5,
        minSpread: 1,
        maxSpread: 80,
        outerSpread: 2.5,
        boundify: false,
        bound_size: 50,
        maxSegments: 200
    };
    build("crosshair", function(params) {

        var speed = getSpeed(params.elasticity);

        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var spread = twoPoint(params.minDistance, params.maxSpread, params.maxDistance, params.minSpread, distanceMod)

        var p1 = copyVector(baseline);
        p1.x -= spread;

        var p2 = copyVector(baseline);
        p2.y -= spread;

        var p3 = copyVector(baseline);
        p3.x += spread;

        var p4 = copyVector(baseline);
        p4.y += spread;

        var p5 = copyVector(baseline);
        p5.x -= spread * params.outerSpread;
        p5.y -= spread * params.outerSpread;

        var p6 = copyVector(baseline);
        p6.x += spread * params.outerSpread;
        p6.y -= spread * params.outerSpread;

        var p7 = copyVector(baseline);
        p7.x += spread * params.outerSpread;
        p7.y += spread * params.outerSpread;

        var p8 = copyVector(baseline);
        p8.x -= spread * params.outerSpread;
        p8.y += spread * params.outerSpread;

        var c1 = prevPos.a || p1;
        var c2 = prevPos.b || p2;
        var c3 = prevPos.c || p3;
        var c4 = prevPos.d || p4;
        var c5 = prevPos.e || p5;
        var c6 = prevPos.f || p6;
        var c7 = prevPos.g || p7;
        var c8 = prevPos.h || p8;

        prevPos.a = p1;
        prevPos.b = p2;
        prevPos.c = p3;
        prevPos.d = p4;
        prevPos.e = p5;
        prevPos.f = p6;
        prevPos.g = p7;
        prevPos.h = p8;

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

        return [
            [vector(p1), vector(c1)],
            [vector(p2), vector(c2)],
            [vector(p3), vector(c3)],
            [vector(p4), vector(c4)],
            [vector(p5), vector(c5)],
            [vector(p6), vector(c6)],
            [vector(p7), vector(c7)],
            [vector(p8), vector(c8)]
        ];
    }, params);
};
