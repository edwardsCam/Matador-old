var initSoundWave = function() {
    prevPos.a = null;
    prevPos.b = null;
};

var soundWave = function(scene) {
    if (!init(scene)) return;
    var params = {
        elasticity: 20,
        amplitude: 100,
        minDistance: 2,
        maxDistance: 20,
        minSpread: 100,
        maxSpread: 100,
        minTrail: 1,
        maxTrail: 70
    };
    build("soundWave", function(params) {

        var distanceMod = twoPoint(0, params.maxDistance, scene.maxPointerPos, params.minDistance, dist);
        baseline.z += distanceMod;

        var spread = twoPoint(params.minDistance, params.minSpread, params.maxDistance, params.maxSpread, distanceMod);
        var waveSin = Math.sin(centerAngle);
        var waveCos = Math.cos(centerAngle);

        var bfd = scene.SOUND.getByteFrequencyData();
        var fbc = scene.SOUND.getFrequencyBinCount();
        var line = [];
        for (var i = 0; i < fbc; i++) {
            var point = copyVector(baseline);
            var ival = ((spread * i) / fbc) - (spread / 2);
            var xval = twoPoint(-1, ival * -1, 1, ival, waveSin);
            var yval = twoPoint(-1, ival, 1, ival * -1, waveCos);
            var soundVal = twoPoint(0, (params.amplitude / -2), 255, (params.amplitude / 2), bfd[i]);
            point.x += xval + soundVal * waveCos;
            point.y += yval + soundVal * waveSin;
            line.push(point);
        }

        trail = Math.round(twoPoint(params.minDistance, params.maxTrail, params.maxDistance, params.minTrail, distanceMod));
        cleanup(trail);

        return buildSegments(line);

    }, params);
};
