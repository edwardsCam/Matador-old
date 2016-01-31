var curPos = null;
var baseline = null;

var sineWave = function(scene) {
    if (!init()) return;
    buildBaseline("sineWave", function() {
        var amplitude = 15;
        var period = 0.8;
        var maxDistance = 25;
        var minDistance = -25;

        var distanceModifier = maxDistance - (((maxDistance - minDistance) / scene.maxPointerPos) * Math.abs(curPos.x));
        curPos.z += distanceModifier;

        var theta = Math.PI * scene.time / period;
        curPos.y += Math.cos(theta) * amplitude;
    });
};

var sineTunnel = function(scene) {
    if (!init()) return;
    buildBaseline("sineTunnel", function() {});
};

function buildBaseline(name, modifyFunc) {
    var p1 = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);
    addVectors(baseline, getDiff(20));
    curPos = copyVector(baseline);
    modifyFunc();
    boundify(curPos, scene.bounds);
    var p2 = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);
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
