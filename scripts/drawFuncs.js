var curPos = null;
var baseline = null;

function init() {
    if (!curPos && !isNaN(scene.camTarget.x)) curPos = copyVector(scene.camTarget);
    if (!baseline && curPos) baseline = copyVector(curPos);
    return curPos;
}

function buildCustom(name, customFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    var points = customFunc(params);
    for (var i = 0; i < points.length; i++) {
        BABYLON.Mesh.CreateLines(name, points[i], scene);
    }
}

function buildSimple(name, modifyFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    var p1 = vector(curPos);
    curPos = copyVector(baseline);
    modifyFunc(params);
    if (params.boundify) {
        boundify(curPos, params.bound_size);
    }
    var p2 = vector(curPos);
    BABYLON.Mesh.CreateLines(name, [p1, p2], scene);
}
