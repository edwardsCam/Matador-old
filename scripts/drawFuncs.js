var curPos = null;
var baseline = null;

var sineWave = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 20,
        amplitude: 15,
        period: 0.8,
        maxDistance: 25,
        minDistance: -25,
        boundify: false
    };
    buildBaseline("sineWave", function(params) {
        var distanceMod = params.maxDistance - (((params.maxDistance - params.minDistance) / scene.maxPointerPos) * Math.abs(curPos.x));
        curPos.z += distanceMod;

        var theta = Math.PI * scene.time / params.period;
        var wave = Math.cos(theta) * params.amplitude;
        curPos.y += wave;
    }, params);
};

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



function buildCustom(name, customFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    var points = customFunc(params);
    BABYLON.Mesh.CreateLines(name, points, scene);
}

function buildBaseline(name, modifyFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    var p1 = vector(curPos);
    curPos = copyVector(baseline);
    modifyFunc(params);
    if (params.boundify) {
        boundify(curPos, scene.bounds);
    }
    var p2 = vector(curPos);
    BABYLON.Mesh.CreateLines(name, [p1, p2], scene);
}

function getDiff(elastic) {
    var goal = copyVector(scene.camTarget);
    var diff = {
        x: (goal.x - baseline.x) / elastic,
        y: (goal.y - baseline.y) / elastic,
        z: (goal.z - baseline.z) / elastic
    };
    return diff;
}

function init() {
    if (!curPos && !isNaN(scene.camTarget.x)) curPos = copyVector(scene.camTarget);
    if (!baseline && curPos) baseline = copyVector(curPos);
    return curPos;
}
