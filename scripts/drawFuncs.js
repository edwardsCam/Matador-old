var prevPos = null;
var baseline = null;
var dist = 0;
var centerAngle = 0;
var segments = [];

var draw = function(n, scene) {
    if (n == 0) soundWave(scene);
    else if (n == 1) flyingTunnel(scene);
    else if (n == 2) flappingChevron(scene);
    else if (n == 3) chevron(scene);
    else if (n == 4) spiral(scene);
    else if (n == 5) crosshair(scene);
    else sineWave(scene);
}

function init(scene) {
    if (!prevPos && !isNaN(scene.camTarget.x)) prevPos = copyVector(scene.camTarget);
    if (!baseline && prevPos) baseline = copyVector(prevPos);
    return prevPos;
}

function build(name, customFunc, params) {
    cleanup(params.maxSegments);
    addVectors(baseline, getDiff(params.elasticity));
    dist = pythagorean(baseline);
    centerAngle = angle(baseline);
    var lines = customFunc(params);
    for (var i = 0; i < lines.length; i++) {
        segments.push(BABYLON.Mesh.CreateLines(name, lines[i], scene));
    }
}

function cleanup(max) {
    while (segments.length > max) {
        segments[0].dispose();
        segments.splice(0, 1);
    }
}
