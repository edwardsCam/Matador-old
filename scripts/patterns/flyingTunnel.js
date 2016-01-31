var flyingTunnel = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 50,
        amplitude: 20,
        maxDistance: 5,
        minDistance: -5,
        amplitudeMod: 3,
        centerDistMod: 2,
        boundify: false
    };
    buildCustom("flyingTunnel", function(params) {

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

        var p2 = copyVector(baseline);
        p2.x += tx;
        p2.y -= ty;

        var c1 = curPos.a || p1;
        var c2 = curPos.b || p2;

        curPos.a = p1;
        curPos.b = p2;

        if (params.boundify) {
            boundify(p1, scene.bounds);
            boundify(p2, scene.bounds);
            boundify(c1, scene.bounds);
            boundify(c2, scene.bounds);
        }

        return [vector(c1), vector(p1), vector(p2), vector(c2)];
    }, params);
};