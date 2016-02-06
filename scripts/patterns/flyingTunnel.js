var initFlyingTunnel = function() {
    prevPos.a = null;
    prevPos.b = null;
};

var flyingTunnel = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 50,
        minAmp: 2,
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

        var bfd = scene.SOUND.getByteFrequencyData();
        var fbc = scene.SOUND.getFrequencyBinCount() * 2.0 / 3.0;
        var soundLvl = 0;
        for (var i = 0; i < fbc; i++) {
            soundLvl += bfd[i];
        }
        soundLvl /= fbc;

        var amp = twoPoint(50, params.minAmp, 200, params.maxAmp, soundLvl);
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

        return buildSegments([c1, p1, p2, c2]);

    }, params);
};
