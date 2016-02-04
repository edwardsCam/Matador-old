var prevPos = null;
var baseline = null;

var dist = 0;
var centerAngle = 0;

var segments = [];

var maxSegments = 100;

var draw = function(n, scene) {
    if (n == 0) flyingTunnel(scene);
    else if (n == 1) flappingChevron(scene);
    else if (n == 2) chevron(scene);
    else if (n == 3) spiral(scene);
    else if (n == 4) crosshair(scene);
    else sineWave(scene);
}

function init(scene) {
    if (!prevPos && !isNaN(scene.camTarget.x)) prevPos = copyVector(scene.camTarget);
    if (!baseline && prevPos) baseline = copyVector(prevPos);
    return prevPos;
}

function build(name, customFunc, params) {
    addVectors(baseline, getDiff(params.elasticity));
    dist = pythagorean(baseline);
    centerAngle = angle(baseline);
    var points = customFunc(params);
    for (var i = 0; i < points.length; i++) {
        segments.push(BABYLON.Mesh.CreateLines(name, points[i], scene));
    }
}

var cleanup = function(max) {
    while (segments.length > max) {
        segments[0].dispose();
        segments.splice(0, 1);
    }
}
