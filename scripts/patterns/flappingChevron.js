var flappingChevron = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 50,
        amplitude: 100,
        maxDistance: 5,
        minDistance: -5,
        amplitudeMod: 60.5,
        centerDistMod: 2,
        chev1: 100,
        chev2: -20,
        boundify: false
    };
    buildCustom("flappingChevron", function(params) {

        var xpos = baseline.x;
        var ypos = baseline.y;

        var centerDist = pythagorean(xpos, ypos) / params.centerDistMod;
        var distanceMod = params.maxDistance - (((params.maxDistance - params.minDistance) / scene.maxPointerPos) * centerDist);
        baseline.z += distanceMod;

        var amp = params.amplitude;
        amp -= distanceMod * params.amplitudeMod;

        var centerAngle = angle(xpos, ypos);
        var tx = Math.sin(centerAngle) * amp / 2;
        var ty = Math.cos(centerAngle) * amp / 2;

        var p1 = copyVector(baseline);
        p1.x -= tx;
        p1.y += ty;
        p1.z += params.chev1 - (distanceMod * params.chev2);

        var p2 = copyVector(baseline);
        p2.x += tx;
        p2.y -= ty;
        p2.z += params.chev1 - (distanceMod * params.chev2);

        if (params.boundify) {
            boundify(p1, scene.bounds);
            boundify(p2, scene.bounds);
        }

        return [vector(p1), vector(baseline), vector(p2)];
    }, params);
};