var soundtest = function(scene) {
    if (!init(scene)) return;
    var params = {
        spread: 200,
        zDist: 200,
        height: 200,
        maxSegments: 0
    };
    build("soundtest", function(params) {

        var bfd = scene.SOUND.getByteFrequencyData();
        var fbc = scene.SOUND.getFrequencyBinCount();

        var arr = [];
        for (var i = 0; i < fbc; i++) {
            var xval = ((params.spread * i) / fbc) - (params.spread / 2);
            var zval = baseline.z + params.zDist;
            var points = [];
            points.push(vector({
                x: xval,
                y: -100,
                z: zval
            }));
            points.push(vector({
                x: xval,
                y: twoPoint(0, 0, 255, params.height, bfd[i]) - 100,
                z: zval
            }));
            arr.push(buildSegment(points));
        }

        return arr;

    }, params);
};
