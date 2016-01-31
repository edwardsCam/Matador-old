var chevron = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 25,
        amplitude: 300,
        maxDistance: 5,
        minDistance: -5,
        amplitudeMod: 60.5,
        centerDistMod: 2,
        boundify: false
    };
    buildCustom("chevron", function(params) {

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
        p1.z -= 300;

        var p2 = copyVector(baseline);
        p2.x += tx;
        p2.y -= ty;
        p2.z -= 300;

        if (params.boundify) {
            boundify(p1, scene.bounds);
            boundify(p2, scene.bounds);
        }

        return [vector(p1), vector(baseline), vector(p2)];
    }, params);
};
