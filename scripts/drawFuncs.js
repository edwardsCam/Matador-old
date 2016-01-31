var curPos = null;
var baseline = null;

var sineWave = function(scene) {
    if (!init()) return;
    var params = {
        elasticity: 20,
        amplitude: 15,
        period: 0.8,
        maxDistance: 25,
        minDistance: -25
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
        elasticity: 30,
        amplitude: 20,
        maxDistance: 5,
        minDistance: -5,
        amplitudeMod: 3,
        centerDistMod: 1.5
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

        return [vector(p1), vector(p2)];
    }, params);
};



function buildCustom(name, customFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    curPos = copyVector(baseline);
    var points = customFunc(params);
    BABYLON.Mesh.CreateLines(name, points, scene);
}

function buildBaseline(name, modifyFunc) {
    addVectors(baseline, getDiff(params.elasticity));
    var p1 = vector(curPos.x, curPos.y, curPos.z);
    curPos = copyVector(baseline);
    modifyFunc();
    boundify(curPos, scene.bounds);
    var p2 = vector(curPos.x, curPos.y, curPos.z);
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
