var prePos = null;
var curPos = null;

var amp = 10;
var period = 1;

var maxDistance = 50;
var minDistance = -75;

var sineWave = function(scene) {
    if (!curPos) curPos = copyPosObject(scene.camTarget);

    prePos = copyPosObject(curPos);
    curPos = copyPosObject(scene.camTarget);

    var distanceModifier = maxDistance - (((maxDistance - minDistance) / scene.maxPointerPos) * Math.abs(curPos.x));
    curPos.z += distanceModifier;

    var theta = Math.PI * scene.time / period;
    curPos.y += amp * Math.cos(theta);

    boundify(curPos, scene.bounds);
    var v1 = new BABYLON.Vector3(prePos.x, prePos.y, prePos.z);
    var v2 = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);
    BABYLON.Mesh.CreateLines("sineWave", [v1, v2], scene);
};
