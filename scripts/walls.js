function drawWalls(scene) {
    var wid = scene.bounds.size;
    var _wid = scene.bounds.size * -1;
    var len = scene.bounds.len;

    BABYLON.Mesh.CreateLines("lines", [
        new BABYLON.Vector3(_wid, _wid, _wid), new BABYLON.Vector3(_wid, _wid, len)
    ], scene);
    BABYLON.Mesh.CreateLines("lines", [
        new BABYLON.Vector3(_wid, wid, _wid), new BABYLON.Vector3(_wid, wid, len)
    ], scene);
    BABYLON.Mesh.CreateLines("lines", [
        new BABYLON.Vector3(wid, _wid, _wid), new BABYLON.Vector3(wid, _wid, len)
    ], scene);
    BABYLON.Mesh.CreateLines("lines", [
        new BABYLON.Vector3(wid, wid, _wid), new BABYLON.Vector3(wid, wid, len)
    ], scene);

    var num_milestones = 4;
    var dist = len / num_milestones;

    var lines;
    for (var i = 1; i <= num_milestones; i++) {
        var startpos = i * dist;
        lines = BABYLON.Mesh.CreateLines("markers", [
            new BABYLON.Vector3(_wid, _wid, startpos),
            new BABYLON.Vector3(wid, _wid, startpos),
            new BABYLON.Vector3(wid, wid, startpos),
            new BABYLON.Vector3(_wid, wid, startpos),
            new BABYLON.Vector3(_wid, _wid, startpos)
        ], scene);
    }
}