var prevPos = null;
var baseline = null;

function init() {
    if (!prevPos && !isNaN(scene.camTarget.x)) prevPos = copyVector(scene.camTarget);
    if (!baseline && prevPos) baseline = copyVector(prevPos);
    return prevPos;
}

function buildCustom(name, customFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    var points = customFunc(params);
    for (var i = 0; i < points.length; i++) {
        BABYLON.Mesh.CreateLines(name, points[i], scene);
    }
}
