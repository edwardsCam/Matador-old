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
